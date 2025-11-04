
"use client";

import { useState } from "react";

interface AuthFormProps {
  isLogin: boolean;
}

export default function AuthForm({ isLogin }: AuthFormProps) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isLogin ? "Logging in..." : "Signing up...");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Username or Email"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-lg transition"
      >
        {isLogin ? "Login" : "Sign Up"}
      </button>
    </form>
  );
}