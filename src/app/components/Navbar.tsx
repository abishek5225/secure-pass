"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/auth");
  };

  return (
    <nav className="bg-gray-800 text-white shadow-sm p-4 flex justify-between items-center rounded-lg ">
      <h1 className="font-bold text-3xl text-white">Securepass</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
}
