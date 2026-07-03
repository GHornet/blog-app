"use client"

import { useActionState } from "react"
import Link from "next/link"
import { registerUser } from "../actions/users"

const initialState = {
  error: "",
  values: {
    username: "",
    name: "",
  },
}

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, initialState)

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Register</h2>
      {state.error && (
        <p className="text-red-600 text-sm mb-4">{state.error}</p>
      )}
      <form action={formAction} className="space-y-5">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            required
            defaultValue={state.values?.username || ""}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Minimum 4 characters</p>
          {state.error === "Username must be at least 4 characters long" && (
            <p data-testid="username-error" className="text-red-600 text-sm mt-1">
              {state.error}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            required
            defaultValue={state.values?.name || ""}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Minimum 4 characters</p>
        </div>
        <div>
          <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            id="passwordConfirm"
            type="password"
            name="passwordConfirm"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state.error === "Passwords do not match" && (
            <p data-testid="passwordConfirm-error" className="text-red-600 text-sm mt-1">
              {state.error}
            </p>
          )}
        </div>
        <button
          type="submit"
          data-testid="register-button"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  )
}