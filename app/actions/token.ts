"use server"

import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { db } from "../../db"
import { users } from "../../db/schema"
import { getCurrentUser } from "../services/session"
import { randomUUID } from "crypto"

export async function generateToken() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not authenticated")
  }

  const token = randomUUID()

  await db
    .update(users)
    .set({ token })
    .where(eq(users.id, user.id))

  revalidatePath("/me")
}