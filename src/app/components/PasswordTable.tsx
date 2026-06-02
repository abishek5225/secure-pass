"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { showToast } from "./Toast";

interface PasswordItem {
  id: number;
  title: string;
  username: string;
  encryptedPassword: string;
  note: string | null;
  createdAt: string;
}

export default function PasswordTable() {
  const [passwords, setPasswords] = useState<PasswordItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPasswords = async () => {
    try {
      const res = await fetch("/api/passwords");
      if (res.ok) {
        const data = await res.json();
        setPasswords(data.passwords || []);
      }
    } catch {
      showToast("Failed to load passwords", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch("/api/passwords", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setPasswords((prev) => prev.filter((p) => p.id !== id));
        showToast("Password deleted", "success");
      }
    } catch {
      showToast("Failed to delete password", "error");
    }
  };

  const handleCopy = async (item: PasswordItem) => {
    try {
      await navigator.clipboard.writeText(item.encryptedPassword);
      showToast("Password copied", "success");
    } catch {
      showToast("Failed to copy", "error");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-400">
        <div className="animate-pulse">Loading passwords...</div>
      </div>
    );
  }

  if (passwords.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16 text-gray-500 border border-dashed border-gray-700 rounded-xl"
      >
        <p className="text-lg mb-2">No passwords yet</p>
        <p className="text-sm">Click "+ Add Password" to get started</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/60 backdrop-blur-xl shadow-lg"
    >
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-800 text-gray-400 uppercase text-xs tracking-wider">
            <th className="px-6 py-3">Title</th>
            <th className="px-6 py-3">Username</th>
            <th className="px-6 py-3">Password</th>
            <th className="px-6 py-3">Created</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {passwords.map((item, index) => (
            <motion.tr
              key={item.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border-b border-gray-800 hover:bg-gray-800/60 transition"
            >
              <td className="px-6 py-3">{item.title}</td>
              <td className="px-6 py-3 text-gray-300">{item.username}</td>
              <td className="px-6 py-3 font-mono">••••••••••••••••</td>
              <td className="px-6 py-3 text-gray-400">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-3 text-center">
                <button
                  onClick={() => handleCopy(item)}
                  className="text-blue-500 hover:text-blue-400 mr-3"
                >
                  Copy
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-400"
                >
                  Delete
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
