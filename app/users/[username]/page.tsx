import { notFound } from "next/navigation"
import Link from "next/link"
import { getUserWithBlogs } from "../../services/users"

interface PageProps {
  params: Promise<{ username: string }>
}

export default async function UserPage({ params }: PageProps) {
  const { username } = await params
  const user = await getUserWithBlogs(username)

  if (!user) {
    notFound()
  }

  const blogs = user.blogs?.filter((blog) => blog !== null) || []

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">{user.name}</h2>
      <p className="text-gray-500 mb-6">Username: {user.username}</p>

      <h3 className="text-2xl font-semibold text-gray-700 mb-4">Blogs</h3>
      {blogs.length > 0 ? (
        <ul className="space-y-3">
          {blogs.map((blog) => (
            <li key={blog.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition">
              <Link
                href={`/blogs/${blog.id}`}
                className="text-lg font-semibold text-blue-600 hover:underline"
              >
                {blog.title}
              </Link>
              <div className="text-sm text-gray-500 mt-1">❤️ {blog.likes} likes</div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">This user hasn't created any blogs yet.</p>
      )}
    </div>
  )
}