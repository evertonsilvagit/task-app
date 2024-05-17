import Header from "../components/Header"
import './globals.css'

export const metadata = {
  title: 'MRV',
  description: 'Tarefas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >
        <Header></Header>
        {children}
      </body>
    </html>
  )
}
