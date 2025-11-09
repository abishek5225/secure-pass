"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface PasswordItem {
  id: number;
  title: string;
  username: string;
  encryptedPassword: string;
  createdAt: string;
}

export default function PasswordTable() {
  // Dummy data 
  const [passwords] = useState<PasswordItem[]>([
    {
      id: 1,
      title: "Gmail",
      username: "user@gmail.com",
      encryptedPassword: "••••••••••••••••",
      createdAt: "2025-11-08",
    },
    {
      id: 2,
      title: "GitHub",
      username: "coder123",
      encryptedPassword: "••••••••••••••••",
      createdAt: "2025-11-08",
    },
  ]);

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
              <td className="px-6 py-3 font-mono">{item.encryptedPassword}</td>
              <td className="px-6 py-3 text-gray-400">{item.createdAt}</td>
              <td className="px-6 py-3 text-center">
                <button className="text-blue-500 hover:text-blue-400 mr-3">View</button>
                <button className="text-yellow-400 hover:text-yellow-300 mr-3">Edit</button>
                <button className="text-red-500 hover:text-red-400">Delete</button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
