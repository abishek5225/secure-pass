import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";

export async function post(req:Request) {
    try{
        const {identifier, password} = await req.json();

        if(!identifier || !password){
            return NextResponse.json({error: "Id and password are required to signup"}, {status:400})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await pool.query(
            "INSERT INTO users (identifier, password_hash) VALUES ($1, $2) RETURNING id",
            [identifier, hashedPassword]
        )
        return NextResponse.json({message: "User created", userId: result.rows[0].id})
    }catch(err: any){
        console.error("Signup Error:", err);
        return NextResponse.json({error: "Something went"}, {status:500})
    }
}