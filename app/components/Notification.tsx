"use client"

import { useNotification } from "./NotificationContext"

export default function Notification() {
  const { message, type } = useNotification()

  if (!message) return null

  const bgColor = type === "success" ? "bg-green-600" : "bg-red-600"

  return (
    <div data-testid="notification" className={`${bgColor} text-white px-4 py-3 rounded mb-4`}>
      {message}
    </div>
  )
}