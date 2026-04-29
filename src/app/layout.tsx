import type { Metadata } from "next";
import type { Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://teejosh-diecast-fast.vercel.app"),
  title: "TeeJosh Hot Wheels",
  description: "Catalogo mobile-first de carritos Hot Wheels TeeJosh",
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "TeeJosh Hot Wheels",
    description: "Catalogo de diecast y carritos Hot Wheels disponibles.",
    url: "/catalogo",
    siteName: "TeeJosh Diecast",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TeeJosh Diecast Hot Wheels",
      },
    ],
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TeeJosh Hot Wheels",
    description: "Catalogo de diecast y carritos Hot Wheels disponibles.",
    images: ["/og-image.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "TeeJosh",
  },
  icons: {
    icon: [
      { url: "/app-icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#dc2626",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
