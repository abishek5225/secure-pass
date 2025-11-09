"use client";
import Navbar from "../components/Navbar";
import PasswordTable from "../components/PasswordTable";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-200">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl text-black  font-semibold mb-6">Your Passwords</h1>
        <PasswordTable />
      </main>
    </div>
  );
}
