"use client"

import { generateToken } from "../actions/token"

export default function TokenGenerator() {
  const handleClick = async () => {
    await generateToken()
    window.location.reload()
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