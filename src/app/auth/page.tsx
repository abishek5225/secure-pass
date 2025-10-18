"use client"
import { useState } from "react";
import AuthForm from "../components/AuthForm";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true)

    return(
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          {isLogin ? "Login" : "Create an Account"}
        </h1>

        <AuthForm isLogin={isLogin} />

        <p className="text-sm text-gray-600 text-center mt-4">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
    )
}