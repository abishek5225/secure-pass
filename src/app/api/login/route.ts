import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { error } from "console";

export async function GET(req: Request) {
    
    try{
        const {identifier, password } = await req.json();

        const user= await db.query.users.findFirst({
            where: (u, {eq})=> eq(u.identifier, identifier),

        })

        if(!user){
            return NextResponse.json({error: "User not found"}, {status:404})
        }

        const isValid= await bcrypt.compare(password, user.passwordHash)
        if(!isValid){
            return NextResponse.json({error: "Invalid Password"}, {status:401})
        }

        return NextResponse.json({success: true, message: "Login Successful"})
    }catch(error){
        console.error(error)
        return NextResponse.json({ error: "Internal server error"}, {status:500})
    }
}