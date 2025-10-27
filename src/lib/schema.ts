import { pgTable, serial, varchar, integer, timestamp, text} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { on } from "events";


export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 256 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 512 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const groups = pgTable("groups", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  createdBy: integer("created_by").notNull().references(() => users.id, {onDelete: 'cascade'}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const passwords = pgTable("passwords", {
  
})