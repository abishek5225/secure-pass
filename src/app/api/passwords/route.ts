import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { passwords } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { verifyToken } from "@/lib/auth";

function getToken(req: NextRequest) {
  return req.cookies.get("token")?.value;
}

export async function GET(req: NextRequest) {
  try {
    const token = getToken(req);
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = await verifyToken(token);
    const items = await db
      .select()
      .from(passwords)
      .where(eq(passwords.ownerId, payload.id));

    return NextResponse.json({ passwords: items });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = getToken(req);
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = await verifyToken(token);
    const { title, username, password } = await req.json();

    if (!title || !password) {
      return NextResponse.json({ error: "Title and password are required" }, { status: 400 });
    }

    const inserted = await db.insert(passwords).values({
      ownerId: payload.id,
      title,
      username: username || "",
      encryptedPassword: password,
      note: "",
    }).returning();

    return NextResponse.json({ password: inserted[0] }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token = getToken(req);
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = await verifyToken(token);
    const { id } = await req.json();

    await db.delete(passwords)
      .where(eq(passwords.id, id))
      .where(eq(passwords.ownerId, payload.id));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
