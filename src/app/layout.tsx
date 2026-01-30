import type { Metadata } from 'next'
import { Inter, Bebas_Neue, Lora } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'

const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' })
const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-heading', display: 'swap' })
const lora = Lora({ subsets: ['latin'], variable: '--font-serif', display: 'swap' })

export const metadata: Metadata = {
  title: 'AI News Portal | Intelligence of the Future',
  description: 'Your portal to the AI revolution. News, trends, and insights from the future.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${bebas.variable} ${lora.variable}`}>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
