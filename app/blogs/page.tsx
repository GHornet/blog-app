import Link from "next/link"
import { getBlogs } from "../services/blogs"

interface PageProps {
  searchParams: Promise<{ search?: string }>
}

export default async function Blogs({ searchParams }: PageProps) {
  const { search } = await searchParams
  const allBlogs = await getBlogs()

  const filteredBlogs = search
    ? allBlogs.filter((blog) =>
        blog.title.toLowerCase().includes(search.toLowerCase())
      )
    : allBlogs

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">All Blogs</h2>

        <form action="/blogs" method="GET" className="flex gap-2">
          <input
            type="text"
            name="search"
            data-testid="filter-input"
            placeholder="Search blogs..."
            defaultValue={search || ""}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            data-testid="search-button"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>
      </div>

      {search && (
        <p className="text-sm text-gray-500 mb-4">
          Showing results for: <span className="font-semibold">"{search}"</span>
        </p>
      )}

      {filteredBlogs.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No blogs found.</p>
      ) : (
        <ul data-testid="blogs-list" className="space-y-4">
          {filteredBlogs.map((blog) => (
            <li key={blog.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition">
              <Link href={`/blogs/${blog.id}`} className="text-xl font-semibold text-blue-600 hover:underline">
                {blog.title}
              </Link>
              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                <span>by {blog.author}</span>
                <span>❤️ {blog.likes} likes</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}