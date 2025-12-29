"use client";

import { useState } from "react";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!name || !password) {
      alert("Fill all fields ");
      return;
    }

    const cleanName = name.toLowerCase().replace(/\s+/g, "");
    const fakeEmail = `${cleanName}@mindcare.app`;

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, fakeEmail, password);
      router.push("/home");
    } catch {
      alert("Invalid name or password ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4
      bg-gradient-to-br from-[#f3e8ff] to-[#fde2f3]">

      <div className="w-full max-w-[380px] bg-white rounded-[36px] shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="px-6 py-8 text-center
          bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200">

          <div className="flex justify-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-yellow-300 flex items-center justify-center">😊</div>
            <div className="w-10 h-10 rounded-full bg-green-300 flex items-center justify-center">🙂</div>
            <div className="w-10 h-10 rounded-full bg-blue-300 flex items-center justify-center">😔</div>
            <div className="w-10 h-10 rounded-full bg-orange-300 flex items-center justify-center">😟</div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800">MindCare</h1>
          <p className="text-sm text-gray-600">Welcome back </p>
        </div>

        {/* FORM */}
        <div className="px-6 py-7 space-y-4">
          <input
            placeholder="CalmSoul 🌸"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl bg-[#f7f8ff]
              border border-gray-200 focus:outline-none"
          />

          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl bg-[#f7f8ff]
              border border-gray-200 focus:outline-none"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-4 rounded-2xl text-white font-semibold
              bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg"
          >
            {loading ? "Logging in..." : "Login 🌈"}
          </button>

          <p className="text-xs text-center text-gray-400">
            No email • No identity • 100% private
          </p>

          <p className="text-sm text-center text-gray-600">
            New here?{" "}
            <Link href="/signup" className="text-purple-500 font-semibold">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
