import { db } from "../../db"
import { blogs } from "../../db/schema"
import { eq, desc } from "drizzle-orm"
import { getCurrentUser } from "./session"

export type Blog = {
  id: number
  title: string
  author: string
  url: string
  likes: number
  userId: number | null
}

export async function getBlogs() {
  const result = await db
    .select()
    .from(blogs)
    .orderBy(desc(blogs.likes))
  return result
}

export async function getBlogById(id: number) {
  const result = await db.select().from(blogs).where(eq(blogs.id, id))
  return result[0]
}

export async function addBlog(title: string, author: string, url: string) {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not logged in")
  }

  const result = await db
    .insert(blogs)
    .values({
      title,
      author,
      url,
      userId: user.id,
    })
    .returning()
  return result[0]
}

export async function toggleLike(id: number) {
  const blog = await getBlogById(id)
  if (!blog) return false

  await db
    .update(blogs)
    .set({ likes: blog.likes + 1 })
    .where(eq(blogs.id, id))

  return true
}