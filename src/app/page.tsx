"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-6">
        <h1 className="text-2xl font-bold">SecurePass</h1>
        <nav className="space-x-6">
          <Link href="#features" className="hover:text-blue-400">Features</Link>
          <Link href="/auth" className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500">Get Started</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center text-center mt-20 px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold mb-4"
        >
          Secure Your Passwords with <span className="text-blue-500">SecurePass</span>
        </motion.h2>
        <p className="text-gray-300 max-w-2xl mb-8">
          Manage all your passwords in one place with end-to-end encryption.
          Simple, secure, and open-source — because your privacy matters.
        </p>
        <Link href="/auth">
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-medium">
            Get Started
          </button>
        </Link>
      </main>

      {/* Features */}
      <section id="features" className="mt-32 px-8">
        <h3 className="text-3xl font-semibold text-center mb-12">Why Choose SecurePass?</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Strong Encryption",
              desc: "Your data is protected with strong encryption method.",
              icon: "fa-solid fa-lock",
            },
            {
              title: "Cross-Platform",
              desc: "Access your vault from any device securely.",
              icon: "fa-solid fa-cloud",
            },
            {
              title: "Open Source",
              desc: "Fully transparent code — trust through visibility.",
              icon: "fa-brands fa-github",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-8 rounded-2xl shadow-lg"
            >
              <i className={`${f.icon} text-blue-500 text-4xl mb-4`}></i>
              <h4 className="text-xl font-semibold mb-2">{f.title}</h4>
              <p className="text-gray-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="mt-32 px-8 mb-32">
        <h3 className="text-3xl font-semibold text-center mb-12">Simple Pricing</h3>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <div className="bg-gray-800 p-10 rounded-2xl w-80 text-center shadow-lg">
            <h4 className="text-2xl font-semibold mb-2">Free</h4>
            <p className="text-gray-400 mb-4">Perfect for personal use</p>
            <p className="text-4xl font-bold mb-6">$0</p>
            <ul className="text-gray-400 mb-6 space-y-2">
              <li>✓ Secure Storage</li>
              <li>✓ Unlimited Devices</li>
              <li>✓ End-to-End Encryption</li>
            </ul>
            <Link href="/auth">
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 text-center py-6 text-gray-500">
        © {new Date().getFullYear()} NextPass — Secure Password Manager
      </footer>
    </div>
  );
}
