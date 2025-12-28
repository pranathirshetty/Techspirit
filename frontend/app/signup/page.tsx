"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSignup = async () => {
    if (!name || !password) return;
    if (password !== confirm) return alert("Passwords don’t match 😭");

    const fakeEmail = `${name.toLowerCase()}@moodshare.local`;

    try {
      await createUserWithEmailAndPassword(auth, fakeEmail, password);
      router.push("/home"); // or /action
    } catch (err: any) {
      alert("Name already taken 😬");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE6F2] via-[#EDE7FF] to-[#DFF8FF] flex items-center justify-center px-4">
      <div className="bg-white/80 backdrop-blur rounded-3xl shadow-xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-semibold text-center text-[#8A4F5C] mb-2">
          Create your space 🌱
        </h2>

        <div className="space-y-4">
          <input
            placeholder="Choose a name"
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

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full rounded-2xl p-4 bg-[#FFF7FB] outline-none focus:ring-2 focus:ring-pink-200"
          />

          <button
            onClick={handleSignup}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium"
          >
            Create Account
          </button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          Already have a name?{" "}
          <span
            className="text-[#8A4F5C] font-semibold cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
