"use client";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm p-4 flex justify-between items-center rounded-lg ">
      <h1 className="font-bold text-3xl text-black">Securepass</h1>
      <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
        Logout
      </button>
    </nav>
  );
}
