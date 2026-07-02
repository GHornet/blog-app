// app/blogs/new/page.tsx
import { createBlog } from "./actions"

export default function NewBlog() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create a New Blog</h2>
      <form action={createBlog} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Title
            <input 
              type="text" 
              name="title" 
              required 
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Author
            <input 
              type="text" 
              name="author" 
              required 
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            URL
            <input 
              type="url" 
              name="url" 
              required 
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </label>
        </div>
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create
        </button>
      </form>
    </div>
  )
}