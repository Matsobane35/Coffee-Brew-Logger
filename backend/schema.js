import { pgTable, text, integer, check } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const coffee_brews = pgTable("coffee_brews", {
    brew_id: integer("brew_id").primaryKey(),
    beans_used: text("beans_used").notNull(),
    brewing_method: text("brewing_method").notNull(),
    coffee_content: text("coffee_content").notNull(),
    water_content: text("water_content").notNull(),
    rating: integer("rating").notNull(),
    notes: text("notes")
}, (table) => [
    check("check_rating", sql`${table.rating} >= 0 AND ${table.rating} <= 5`)
])