"use client"
import { log } from "console";
import React, { useState } from "react"

interface AuthFormProps {
    isLogin: boolean;
}

export default function AuthForm({isLogin}: AuthFormProps){
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(isLogin){
            console.log("Logging in:", {identifier, password})
        }else{
            console.log("Signing up", {identifier,password})
        }
    }
    return(
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
        type="text"
        placeholder="Identifier"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 transition"
      >
        {isLogin ? "Login" : "Sign Up"}
      </button>
        </form>
    )
}