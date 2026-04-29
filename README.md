# teejoshDiecastFast

Catalogo y panel admin para publicar autos Hot Wheels disponibles, gestionados con Next.js y Supabase.

## Requisitos

- Node.js 20.9 o superior
- npm
- Proyecto de Supabase
- Cuenta de Vercel

## Desarrollo local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre `http://localhost:3000`.

## Variables de entorno

Configura estas variables en `.env.local` y tambien en Vercel:

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=51957295957
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

## Supabase

1. Crea un proyecto en Supabase.
2. Ejecuta el contenido de `supabase.sql` en el SQL Editor.
3. Crea un usuario admin desde Authentication.
4. Copia `Project URL` y `anon public key` a las variables de entorno.

El bucket `product-images` y sus politicas se crean desde `supabase.sql`.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Publicar en GitHub y Vercel

Primero conviene subirlo a un repositorio GitHub. Vercel se conecta a ese repo y redeploya automaticamente cada vez que subas cambios a la rama principal.

```bash
git init
git add .
git commit -m "Initial catalog app"
git branch -M main
git remote add origin https://github.com/USUARIO/REPO.git
git push -u origin main
```

En Vercel:

1. Importa el repositorio.
2. Usa el framework preset `Next.js`.
3. Deja el build command como `npm run build`.
4. Agrega las variables de entorno.
5. Deploy.
