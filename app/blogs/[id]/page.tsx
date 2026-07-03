import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { toggleLikeAction } from "./actions"
import { addToReadingList } from "../../actions/readingList"
import { getCurrentUser } from "../../services/session"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function BlogPage({ params }: PageProps) {
  const { id } = await params
  const blog = await getBlogById(Number(id))
  const user = await getCurrentUser()

  if (!blog) {
    notFound()
  }

  const isAuthor = user?.id === blog.userId

  return (
    <div className="max-w-2xl mx-auto" data-testid="blog-detail">
      <h2 data-testid="blog-title" className="text-3xl font-bold text-gray-800 mb-2">
        {blog.title}
      </h2>
      <p data-testid="blog-author" className="text-gray-600 mb-1">
        by {blog.author}
      </p>
      <p className="text-blue-600 mb-6">
        <a href={blog.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
          {blog.url}
        </a>
      </p>

      <div className="flex items-center gap-6 mb-8">
        <span className="text-2xl font-bold text-gray-700">❤️ {blog.likes}</span>

        <form action={toggleLikeAction}>
          <input type="hidden" name="id" value={blog.id} />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
          >
            Like ❤️
          </button>
        </form>

        {user && !isAuthor && (
          <form action={addToReadingList}>
            <input type="hidden" name="blogId" value={blog.id} />
            <button
              type="submit"
              data-testid="add-to-reading-list-button"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
            >
              Add to Reading List
            </button>
          </form>
        )}
      </div>
    </div>
  )
}