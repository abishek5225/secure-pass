import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";

export async function post(req:Request) {
    const {identifier, password} = await req.json()

    const existing = await db.query.users.findFirst({
        where:(u, {eq})=> eq(u.identifier, identifier),
    })

    if(existing){
        return NextResponse.json({error: "User already exists"}, {status: 400})
    }
    const hashed = await bcrypt.hash(password, 10)

    await db.insert(users).values({
        identifier,
        passwordHash: hashed,
    })

    return NextResponse.json({success:true})
}