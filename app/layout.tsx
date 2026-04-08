import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mosaico Engine Assessment',
  description: 'Evaluación de madurez para motores de crecimiento, eficiencia y adaptabilidad',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
