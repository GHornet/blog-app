import type { Metadata } from "next"
import "./globals.css"
import NavBar from "./components/NavBar"
import AuthSessionProvider from "./components/SessionProvider"
import { NotificationProvider } from "./components/NotificationContext"
import Notification from "./components/Notification"

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
        <AuthSessionProvider>
          <NotificationProvider>
            <NavBar />
            <main className="max-w-2xl mx-auto p-6">
              <Notification />
              {children}
            </main>
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}