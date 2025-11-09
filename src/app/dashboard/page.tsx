"use client";
import Navbar from "../components/Navbar";
import PasswordTable from "../components/PasswordTable";
import { motion } from "framer-motion";
export default function DashboardPage() {
  return (
     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <Navbar />
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Your Vault</h1>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition">
            + Add Password
          </button>
        </div>

        {/* Password Table */}
        <PasswordTable />
      </motion.div>
    </div>
  );
}
