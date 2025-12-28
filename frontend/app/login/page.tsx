"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!name || !password) return;

    const fakeEmail = `${name.toLowerCase()}@moodshare.local`;

    try {
      await signInWithEmailAndPassword(auth, fakeEmail, password);
      router.push("/home"); // or /action
    } catch (err: any) {
      alert("Invalid name or password 😭");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE6F2] via-[#EDE7FF] to-[#DFF8FF] flex items-center justify-center px-4">
      <div className="bg-white/80 backdrop-blur rounded-3xl shadow-xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-semibold text-center text-[#8A4F5C] mb-2">
          Welcome back 🌷
        </h2>

        <div className="space-y-4">
          <input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl p-4 bg-[#FFF7FB] outline-none focus:ring-2 focus:ring-pink-200"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl p-4 bg-[#FFF7FB] outline-none focus:ring-2 focus:ring-pink-200"
          />

          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-400 text-white font-medium"
          >
            Login
          </button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          New here?{" "}
          <span
            className="text-[#8A4F5C] font-semibold cursor-pointer"
            onClick={() => router.push("/signup")}
          >
            Create a name
          </span>
        </p>
      </div>
    </div>
  );
}
