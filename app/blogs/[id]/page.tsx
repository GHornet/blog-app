import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { toggleLikeAction } from "./actions"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function BlogPage({ params }: PageProps) {
  const { id } = await params
  const blog = getBlogById(Number(id))
  
  if (!blog) {
    notFound()
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
      <p className="text-gray-600 mb-4">by {blog.author}</p>
      <p className="mb-4">
        <a href={blog.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          {blog.url}
        </a>
      </p>
      <p className="text-lg mb-4">Likes: {blog.likes}</p>
      
      {/* Форма для Like */}
      <form action={toggleLikeAction}>
        <input type="hidden" name="id" value={blog.id} />
        <button 
          type="submit" 
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Like ❤️
        </button>
      </form>
    </div>
  )
}