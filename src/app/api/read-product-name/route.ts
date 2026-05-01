import { NextResponse } from "next/server";

type ProductNameResponse = {
  confidence?: number;
  name?: string | null;
  visible_text?: string;
};

type OpenAIContentItem = {
  text?: string;
  type?: string;
};

type OpenAIOutputItem = {
  content?: OpenAIContentItem[];
};

type OpenAIResponse = {
  error?: {
    message?: string;
  };
  output?: OpenAIOutputItem[];
  output_text?: string;
};

const model = process.env.OPENAI_VISION_MODEL ?? "gpt-5.4-mini";
const maxImageSize = 6 * 1024 * 1024;

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Falta configurar OPENAI_API_KEY." },
      { status: 500 },
    );
  }

  const formData = await request.formData();
  const image = formData.get("image");

  if (!(image instanceof File) || image.size === 0) {
    return NextResponse.json(
      { error: "La imagen es obligatoria." },
      { status: 400 },
    );
  }

  if (image.size > maxImageSize) {
    return NextResponse.json(
      { error: "La imagen es demasiado grande." },
      { status: 413 },
    );
  }

  const imageUrl = await fileToDataUrl(image);
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text:
                "Lee la foto de un empaque o carrito Hot Wheels/Matchbox. " +
                "Devuelve el nombre exacto del modelo del auto si es visible. " +
                "Ignora marcas como Hot Wheels, Mattel, Matchbox, escala, advertencias, codigos de lote, edades y texto legal. " +
                "Si no estas seguro del nombre, usa null. No inventes.",
            },
            {
              type: "input_image",
              image_url: imageUrl,
              detail: "high",
            },
          ],
        },
      ],
      max_output_tokens: 300,
      reasoning: { effort: "low" },
      text: {
        verbosity: "low",
        format: {
          type: "json_schema",
          name: "product_name_result",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              name: {
                type: ["string", "null"],
                description: "Nombre exacto del modelo del auto, o null.",
              },
              visible_text: {
                type: "string",
                description: "Texto relevante visible en el empaque.",
              },
              confidence: {
                type: "number",
                description: "Confianza entre 0 y 1.",
              },
            },
            required: ["name", "visible_text", "confidence"],
          },
        },
      },
    }),
  });

  const data = (await response.json()) as OpenAIResponse;

  if (!response.ok) {
    return NextResponse.json(
      {
        error:
          data.error?.message ?? "No se pudo analizar la imagen con OpenAI.",
      },
      { status: response.status },
    );
  }

  const parsedResult = parseModelJson(data);

  return NextResponse.json({
    confidence: parsedResult.confidence ?? 0,
    name: sanitizeName(parsedResult.name),
    visibleText: parsedResult.visible_text ?? "",
  });
}

async function fileToDataUrl(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const mimeType = file.type || "image/jpeg";

  return `data:${mimeType};base64,${buffer.toString("base64")}`;
}

function parseModelJson(response: OpenAIResponse): ProductNameResponse {
  const rawText =
    response.output_text ??
    response.output
      ?.flatMap((item) => item.content ?? [])
      .map((content) => content.text ?? "")
      .join("")
      .trim() ??
    "{}";

  try {
    return JSON.parse(rawText) as ProductNameResponse;
  } catch {
    return {
      confidence: 0,
      name: null,
      visible_text: rawText,
    };
  }
}

function sanitizeName(name: string | null | undefined) {
  if (!name) return "";

  return name
    .replace(/\s+/g, " ")
    .replace(/^["']|["']$/g, "")
    .trim();
}
