import pg from "pg"
import { drizzle } from "drizzle-orm/node-postgres"
import * as schema from "./schema.js"
import dotenv from "dotenv"

dotenv.config()

const pool = new pg.Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

export const db = drizzle(pool, { schema })