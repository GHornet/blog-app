"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { toggleLike } from "../../services/blogs"

export async function toggleLikeAction(formData: FormData) {
  const id = Number(formData.get("id"))
  toggleLike(id)
  
  // Ревалидируем оба пути
  revalidatePath("/blogs")
  revalidatePath(`/blogs/${id}`)
  
  // Используем redirect без указания пути, чтобы остаться на той же странице
  // или перенаправляем на страницу блога
  redirect(`/blogs/${id}`)
}