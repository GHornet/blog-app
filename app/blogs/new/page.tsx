"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBlog } from "./actions"
import { useNotification } from "../../components/NotificationContext"

const initialState = {
  error: "",
  success: false,
  values: {
    title: "",
    author: "",
    url: "",
  },
}

export default function NewBlog() {
  const [state, formAction] = useActionState(createBlog, initialState)
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("Blog created successfully!")
      router.push("/blogs")
    }
  }, [state.success, showNotification, router])

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Create a New Blog</h2>
      <form action={formAction} className="space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            required
            defaultValue={state.values?.title || ""}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Minimum 5 characters</p>
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
            Author
          </label>
          <input
            id="author"
            type="text"
            name="author"
            required
            defaultValue={state.values?.author || ""}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Minimum 5 characters</p>
        </div>
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
            URL
          </label>
          <input
            id="url"
            type="url"
            name="url"
            required
            defaultValue={state.values?.url || ""}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Minimum 5 characters</p>
        </div>
        {state.error && (
          <p className="text-red-600 text-sm">{state.error}</p>
        )}
        <button
          type="submit"
          data-testid="create-blog-button"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
        >
          Create Blog
        </button>
      </form>
    </div>
  )
}