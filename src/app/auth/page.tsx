"use client";

import { useState } from "react";

interface AuthFormProps {
  isLogin: boolean;
}

export default function AuthForm({ isLogin }: AuthFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/${isLogin ? "login" : "signup"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        // Success (for now just log the response)
        console.log(data);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="p-3 bg-blue-600 hover:bg-blue-500 rounded-md font-medium transition"
      >
        {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
      </button>
    </form>
  );
}
