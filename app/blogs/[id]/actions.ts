"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { toggleLike } from "../../services/blogs"

export async function toggleLikeAction(formData: FormData) {
  const id = Number(formData.get("id"))
  await toggleLike(id)
  
  revalidatePath("/blogs")
  revalidatePath(`/blogs/${id}`)
  
  redirect(`/blogs/${id}`)
}