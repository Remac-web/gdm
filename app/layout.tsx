import type { Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  display: 'swap'
})

export const metadata: Metadata = {
  title: {
    default: 'Governa | Guía Consultiva de Desempeño Municipal',
    template: '%s | GDM'
  },
  description: 'Governa — Plataforma de gobernanza municipal para la Guía Consultiva de Desempeño Municipal INAFED 2025-2027',
  robots: { index: false, follow: false } // No indexar — app interna
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-MX" className={`${inter.variable} ${lexend.variable}`}>
      <body className="bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  )
}
