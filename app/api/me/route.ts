import { NextRequest, NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { db } from "../../../db"
import { users } from "../../../db/schema"

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Unauthorized: Missing or invalid token" },
      { status: 401 }
    )
  }

  const token = authHeader.split(" ")[1]

  const user = await db.query.users.findFirst({
    where: eq(users.token, token),
  })

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid token" },
      { status: 401 }
    )
  }

  return NextResponse.json({
    id: user.id,
    username: user.username,
    name: user.name,
  })
}