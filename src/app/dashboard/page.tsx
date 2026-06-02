"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import PasswordTable from "../components/PasswordTable";
import AddPasswordModal from "../components/AddPasswordModal";
import ToastContainer from "../components/Toast";
import { showToast } from "../components/Toast";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSave = async (data: { title: string; username: string; password: string; note: string }) => {
    try {
      const res = await fetch("/api/passwords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        showToast("Password saved", "success");
      } else {
        showToast("Failed to save password", "error");
      }
    } catch {
      showToast("Failed to save password", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto px-4 py-6 sm:px-6"
      >
        <div className="flex items-center justify-between mb-6 mt-6 sm:mb-8 sm:mt-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-300">Your Vault</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 sm:px-5 sm:py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition text-sm sm:text-base"
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

      <ToastContainer />
    </div>
  );
}
