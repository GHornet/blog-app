import { NextRequest, NextResponse } from "next/server"
import { db } from "../../../../db"
import { users } from "../../../../db/schema"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 }
    )
  }

  try {
    const body = await request.json()
    const { username, name, password } = body

    if (!username || !name) {
      return NextResponse.json(
        { error: "Username and name are required" },
        { status: 400 }
      )
    }

    const existingUser = await db.query.users.findFirst({
      where: eq(users.username, username),
    })

    if (existingUser) {
      return NextResponse.json(existingUser, { status: 200 })
    }

    const passwordHash = password 
      ? await bcrypt.hash(password, 10)
      : await bcrypt.hash("secret", 10)

    const result = await db
      .insert(users)
      .values({
        username,
        name,
        passwordHash,
      })
      .returning()

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json(
      { error: "User creation failed" },
      { status: 400 }
    )
  }
}