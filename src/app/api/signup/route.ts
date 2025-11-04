import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }

    // Check if username already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.username, username));

    if (existingUser.length > 0) {
      return NextResponse.json({ error: "Username already taken" }, { status: 409 });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert user into database
    const insertedUser = await db.insert(users).values({
      username,
      passwordHash,
    }).returning();

    return NextResponse.json({ message: "User created successfully", user: insertedUser[0] }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
