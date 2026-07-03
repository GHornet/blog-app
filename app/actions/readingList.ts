"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { eq, and } from "drizzle-orm"
import { db } from "../../db"
import { readingList } from "../../db/schema"
import { getCurrentUser } from "../services/session"

export async function addToReadingList(formData: FormData) {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const blogId = Number(formData.get("blogId"))

  const existing = await db.query.readingList.findFirst({
    where: and(
      eq(readingList.userId, user.id),
      eq(readingList.blogId, blogId)
    ),
  })

  if (!existing) {
    await db.insert(readingList).values({
      userId: user.id,
      blogId: blogId,
      read: false,
    })
  }

  revalidatePath(`/blogs/${blogId}`)
  revalidatePath("/me")
}

export async function markAsRead(formData: FormData) {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const blogId = Number(formData.get("blogId"))

  await db
    .update(readingList)
    .set({ read: true })
    .where(
      and(
        eq(readingList.userId, user.id),
        eq(readingList.blogId, blogId)
      )
    )

  revalidatePath("/me")
}