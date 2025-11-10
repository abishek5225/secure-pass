import { pgTable, serial, varchar, integer, timestamp, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// USERS TABLE
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 256 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 512 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const groups = pgTable("groups", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  createdBy: integer("created_by").notNull().references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// GROUP MEMBERS TABLE
export const groupMembers = pgTable("group_members", {
  id: serial("id").primaryKey(),
  groupId: integer("group_id")
    .notNull()
    .references(() => groups.id, { onDelete: "cascade" }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
});

//passwords table
export const passwords = pgTable("passwords", {
  id: serial("id").primaryKey(),
  ownerId: integer("owner_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  //group id if shared
  groupId: integer("group_id")
    .references(() => groups.id, { onDelete: "set null" }),

  title: varchar("title", { length: 100 }).notNull(),
  username: varchar("username", { length: 100 }),
  encryptedPassword: text("encrypted_password").notNull(),
  note: text("note"),
  

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// passwords_keys table 
export const passwordKeys = pgTable("password_keys", {
  id: serial("id").primaryKey(),
  passwordId: integer("password_id")
    .notNull()
    .references(() => passwords.id, { onDelete: "cascade" }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  wrappedKey: text("wrapped_key").notNull(), // base64 of RSA-wrapped AES key
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
