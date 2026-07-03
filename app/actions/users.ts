"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { db } from "../../db"
import { users } from "../../db/schema"

type State = {
  error: string
  values?: {
    username: string
    name: string
  }
}

export async function registerUser(prevState: State, formData: FormData) {
  const username = formData.get("username") as string
  const name = formData.get("name") as string
  const password = formData.get("password") as string
  const passwordConfirm = formData.get("passwordConfirm") as string

  if (username.length < 4) {
    return {
      error: "Username must be at least 4 characters long",
      values: { username, name }
    }
  }

  if (password.length < 4) {
    return {
      error: "Password must be at least 4 characters long",
      values: { username, name }
    }
  }

  if (password !== passwordConfirm) {
    return {
      error: "Passwords do not match",
      values: { username, name }
    }
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, username),
  })

  if (existingUser) {
    return {
      error: "Username already taken",
      values: { username, name }
    }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({
    username,
    name,
    passwordHash,
  })

  redirect("/login")
}