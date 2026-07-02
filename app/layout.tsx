import type { Metadata } from "next"
import "./globals.css"
import NavBar from "./components/NavBar"

export const metadata: Metadata = {
  title: "Blog App",
  description: "Full Stack Open Next.js Blog",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <NavBar />
        <main className="max-w-2xl mx-auto p-6">
          {children}
        </main>
      </body>
    </html>
  )
}