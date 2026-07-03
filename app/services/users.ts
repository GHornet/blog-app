import { db } from "../../db"
import { users, blogs } from "../../db/schema"
import { eq } from "drizzle-orm"

export type User = {
  id: number
  username: string
  name: string
}

export async function getUsers() {
  return await db.select().from(users)
}

export async function getUserByUsername(username: string) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
  return result[0]
}

export async function getUserWithBlogs(username: string) {
  const result = await db
    .select()
    .from(users)
    .leftJoin(blogs, eq(blogs.userId, users.id))
    .where(eq(users.username, username))
  
  if (result.length === 0) return null
  
  const user = result[0].users
  const blogList = result
    .filter(row => row.blogs !== null)
    .map(row => row.blogs)
  
  return {
    ...user,
    blogs: blogList,
  }
}