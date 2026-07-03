import { redirect } from "next/navigation"
import { getCurrentUser } from "../services/session"
import { generateToken } from "../actions/token"
import { markAsRead } from "../actions/readingList"
import { db } from "../../db"
import { readingList, blogs } from "../../db/schema"
import { eq } from "drizzle-orm"
import Link from "next/link"
import TokenGenerator from "../components/TokenGenerator"

export const dynamic = "force-dynamic"

export default async function MePage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const readingListItems = await db
    .select()
    .from(readingList)
    .innerJoin(blogs, eq(readingList.blogId, blogs.id))
    .where(eq(readingList.userId, user.id))

  const unread = readingListItems.filter((item) => !item.reading_list.read)
  const read = readingListItems.filter((item) => item.reading_list.read)

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h2>
      
      <div data-testid="user-profile" className="border border-gray-200 rounded-xl p-6 space-y-4">
        <p data-testid="user-name">
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p data-testid="user-username">
          <span className="font-semibold">Username:</span> {user.username}
        </p>
      </div>

      <div data-testid="reading-list-section" className="mt-8 border border-gray-200 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Reading List</h3>
        
        {readingListItems.length === 0 && (
          <p data-testid="empty-reading-list" className="text-gray-500">
            No blogs in your reading list.
          </p>
        )}

        {readingListItems.length > 0 && (
          <>
            <div data-testid="unread-section">
              <h4 className="font-medium text-gray-600 mb-2">Unread ({unread.length})</h4>
              {unread.length === 0 && (
                <p data-testid="no-unread-blogs" className="text-gray-400 text-sm mb-4">
                  No unread blogs.
                </p>
              )}
              {unread.length > 0 && (
                <ul className="space-y-2 mb-6">
                  {unread.map((item) => (
                    <li key={item.reading_list.id} className="flex items-center justify-between border border-gray-100 rounded-lg p-3">
                      <Link
                        href={`/blogs/${item.blogs.id}`}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        {item.blogs.title}
                      </Link>
                      <form action={markAsRead}>
                        <input type="hidden" name="blogId" value={item.blogs.id} />
                        <button
                          type="submit"
                          data-testid={`mark-read-${item.blogs.id}`}
                          className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded transition"
                        >
                          Mark as Read
                        </button>
                      </form>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <h4 className="font-medium text-gray-600 mb-2">Read ({read.length})</h4>
              {read.length === 0 && (
                <p className="text-gray-400 text-sm">No read blogs yet.</p>
              )}
              {read.length > 0 && (
                <ul className="space-y-2">
                  {read.map((item) => (
                    <li key={item.reading_list.id} className="border border-gray-100 rounded-lg p-3">
                      <Link
                        href={`/blogs/${item.blogs.id}`}
                        className="text-gray-600 hover:text-blue-600 hover:underline font-medium"
                      >
                        {item.blogs.title}
                      </Link>
                      <span className="text-sm text-gray-400 ml-2">✅ Read</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>

      <div data-testid="api-token-section" className="mt-8 border border-gray-200 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">API Token</h3>
        {user.token ? (
          <div data-testid="token-display">
            <code data-testid="api-token" className="text-sm font-mono bg-gray-100 p-3 rounded-lg break-all block">
              {user.token}
            </code>
          </div>
        ) : (
          <p data-testid="no-token-message" className="text-gray-500">No token generated yet.</p>
        )}
        <TokenGenerator />
      </div>
    </div>
  )
}