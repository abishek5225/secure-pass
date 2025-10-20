import { pgTable, serial, varchar, integer, timestamp, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  identifier: varchar("identifier", { length: 100 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
});

export const vault = pgTable("vault", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
  site: varchar("site", { length: 100 }).notNull(),
  encryptedPassword: text("encrypted_password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
