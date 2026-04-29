type WhatsAppButtonProps = {
  productName: string;
};

const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export function WhatsAppButton({ productName }: WhatsAppButtonProps) {
  const message = `Hola TeeJosh, vi en el catalogo el producto ${productName}. ¿Sigue disponible?`;
  const href = phoneNumber
    ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    : `https://wa.me/?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
      target="_blank"
      rel="noreferrer"
    >
      Consultar por WhatsApp
    </a>
  );
}
