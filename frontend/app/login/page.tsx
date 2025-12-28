"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // 🔥 Firebase login will come here
    console.log(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE6F2] via-[#EDE7FF] to-[#DFF8FF] flex items-center justify-center px-4">
      <div className="bg-white/80 backdrop-blur rounded-3xl shadow-xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-semibold text-center text-[#8A4F5C] mb-2">
          Welcome back 🌷
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Take a moment. We’re glad you’re here.
        </p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
}
