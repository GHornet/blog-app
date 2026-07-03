import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "./schema"

const pool = new Pool({
  host: "ep-weathered-frog-ahztlmlq-pooler.c-3.us-east-1.aws.neon.tech",
  port: 5432,
  database: "neondb",
  user: "neondb_owner",
  password: "npg_Kj61HWPVmayG",
  ssl: {
    rejectUnauthorized: false,
  },
})

export const db = drizzle(pool, { schema })