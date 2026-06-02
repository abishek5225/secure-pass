"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import PasswordTable from "../components/PasswordTable";
import AddPasswordModal from "../components/AddPasswordModal";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSave = async (data: { title: string; username: string; password: string; note: string }) => {
    await fetch("/api/passwords", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8 mt-8 ">
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition"
          >
            + Add Password
          </button>
        </div>

        <PasswordTable />
      </motion.div>

      <AddPasswordModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
