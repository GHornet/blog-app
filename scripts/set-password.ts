import * as dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") })

import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { db } from "../db"
import { users } from "../db/schema"

async function setPassword(username: string, password: string) {
  console.log(`🔐 Setting password for user: ${username}`)
  
  const hash = await bcrypt.hash(password, 10)
  console.log("✅ Hash created")
  
  const result = await db
    .update(users)
    .set({ passwordHash: hash })
    .where(eq(users.username, username))
    .returning()
  
  console.log(`✅ Password set for user: ${username}`)
  console.log("Result:", result)
}

const username = process.argv[2]
const password = process.argv[3]

console.log("📝 Script started")

if (!username || !password) {
  console.log("❌ Usage: npx tsx scripts/set-password.ts <username> <password>")
  process.exit(1)
}

console.log(`👤 Username: ${username}`)
console.log(`🔑 Password: ${password}`)

setPassword(username, password)
  .then(() => {
    console.log("✅ Done")
    process.exit(0)
  })
  .catch((error) => {
    console.error("❌ Error:", error)
    process.exit(1)
  })