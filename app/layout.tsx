import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const viewport: Viewport = {
  themeColor: "#7c3aed",
}

export const metadata: Metadata = {
  title: "Tipy — Sugerí música con propinas",
  description: "Conectá con el DJ en vivo. Sugerí canciones, votá la vibe y dejá propinas directamente desde tu celular.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://tipy.uy"),
  openGraph: {
    title: "Tipy",
    description: "Sugerí música al DJ en vivo",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  )
}
