import Link from "next/link"
import { getBlogs } from "../services/blogs"

// Отключаем кеширование для этой страницы
export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: Promise<{ search?: string }>
}

export default async function Blogs({ searchParams }: PageProps) {
  const { search } = await searchParams
  const allBlogs = getBlogs()
  
  // Фильтруем блоги по поисковому запросу
  const filteredBlogs = search
    ? allBlogs.filter(blog => 
        blog.title.toLowerCase().includes(search.toLowerCase())
      )
    : allBlogs
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Blogs</h2>
        
        {/* Форма поиска */}
        <form action="/blogs" method="GET" className="flex gap-2">
          <input
            type="text"
            name="search"
            placeholder="Search by title..."
            defaultValue={search || ""}
            className="border rounded px-3 py-1"
          />
          <button 
            type="submit" 
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </form>
      </div>
      
      {search && (
        <p className="text-sm text-gray-600 mb-4">
          Showing results for: <strong>"{search}"</strong>
        </p>
      )}
      
      {filteredBlogs.length === 0 ? (
        <p className="text-gray-500">No blogs found.</p>
      ) : (
        <ul className="space-y-2">
          {filteredBlogs.map((blog) => (
            <li key={blog.id} className="border rounded p-3 hover:bg-gray-50">
              <Link href={`/blogs/${blog.id}`} className="text-blue-600 hover:underline">
                {blog.title}
              </Link>
              <div className="text-sm text-gray-600">
                by {blog.author} · {blog.likes} likes
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}