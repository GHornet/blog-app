"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog } from "../../services/blogs"

type State = {
  error: string
  success: boolean
  values?: {
    title: string
    author: string
    url: string
  }
}

export async function createBlog(prevState: State, formData: FormData) {
  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string

  if (title.length < 5) {
    return {
      error: "Title must be at least 5 characters long",
      success: false,
      values: { title, author, url }
    }
  }

  if (author.length < 5) {
    return {
      error: "Author must be at least 5 characters long",
      success: false,
      values: { title, author, url }
    }
  }

  if (url.length < 5) {
    return {
      error: "URL must be at least 5 characters long",
      success: false,
      values: { title, author, url }
    }
  }

  await addBlog(title, author, url)

  revalidatePath("/blogs")
  return { error: "", success: true }
}