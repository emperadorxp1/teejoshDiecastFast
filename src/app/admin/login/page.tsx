import { signInAction } from "../actions";

type AdminLoginPageProps = {
  searchParams: Promise<{
    error?: string;
    next?: string;
  }>;
};

const errorMessages: Record<string, string> = {
  "missing-config":
    "Falta configurar Supabase en .env.local. El panel admin esta bloqueado hasta completar esa configuracion.",
  "invalid-credentials": "Correo o contrasena incorrectos.",
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const { error, next } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-100 px-4 py-8">
      <section className="w-full max-w-sm rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="mb-6">
          <p className="text-xs font-black uppercase tracking-wide text-red-600">
            Admin
          </p>
          <h1 className="text-2xl font-black text-zinc-950">
            Ingresar a TeeJosh
          </h1>
        </div>

        {error ? (
          <p className="mb-4 rounded-md bg-red-50 p-3 text-sm font-semibold text-red-700">
            {errorMessages[error] ?? "No se pudo iniciar sesion."}
          </p>
        ) : null}

        <form action={signInAction} className="space-y-4">
          <input name="next" type="hidden" value={next ?? "/admin"} />
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-zinc-900">
              Correo
            </span>
            <input
              name="email"
              className="h-12 w-full rounded-md border border-zinc-300 px-4 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              placeholder="admin@teejosh.com"
              type="email"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-zinc-900">
              Contrasena
            </span>
            <input
              name="password"
              className="h-12 w-full rounded-md border border-zinc-300 px-4 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              placeholder="********"
              type="password"
            />
          </label>

          <button
            type="submit"
            className="flex min-h-12 w-full items-center justify-center rounded-md bg-red-600 px-5 py-3 text-base font-black text-white transition hover:bg-red-700"
          >
            Ingresar
          </button>
        </form>
      </section>
    </main>
  );
}
