"use client"

import { useRouter } from "next/navigation"
import { generateToken } from "../actions/token"

export function GenerateTokenButton() {
  const router = useRouter()

  const handleClick = async () => {
    await generateToken()
    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      data-testid="generate-token-button"
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
    >
      Generate New Token
    </button>
  )
}