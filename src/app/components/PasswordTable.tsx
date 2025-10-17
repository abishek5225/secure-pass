"use client";
import { useState } from "react";

interface PasswordItem {
  id: number;
  site: string;
  username: string;
  password: string;
}

export default function PasswordTable() {
  const [passwords] = useState<PasswordItem[]>([
    { id: 1, site: "example.com", username: "user123", password: "••••••••" },
  ]);

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b text-gray-600">
            <th className="p-2">Website</th>
            <th className="p-2">Username</th>
            <th className="p-2">Password</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {passwords.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{p.site}</td>
              <td className="p-2">{p.username}</td>
              <td className="p-2">{p.password}</td>
              <td className="p-2">
                <button className="text-blue-600 hover:underline mr-2">
                  Copy
                </button>
                <button className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
