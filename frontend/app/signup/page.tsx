"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSignup = async () => {
    if (!name || !password || !confirm) {
      return alert("Fill all fields da 🙄");
    }

    if (password !== confirm) {
      return alert("Passwords don’t match 😭");
    }

    // sanitize name
    const cleanName = name.toLowerCase().replace(/\s+/g, "");

    // Firebase-safe fake email
    const fakeEmail = `${cleanName}@mindcare.app`;

    try {
      await createUserWithEmailAndPassword(auth, fakeEmail, password);
      router.push("/home");
    } catch (err) {
      alert("Name already taken or weak password 😬");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-[#FFE6F2] via-[#EDE7FF] to-[#DFF8FF]">

      <div className="w-[380px] bg-white rounded-[32px] shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 p-6 text-center">
          <div className="flex justify-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-yellow-300 flex items-center justify-center">😊</div>
            <div className="w-8 h-8 rounded-full bg-green-300 flex items-center justify-center">🙂</div>
            <div className="w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center">😔</div>
            <div className="w-8 h-8 rounded-full bg-red-300 flex items-center justify-center">😟</div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800">MindCare</h1>
          <p className="text-sm text-gray-600">
            Create your safe space 🌱
          </p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          <input
            placeholder="HappySoul 🌸"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#f6f7ff] border border-gray-200"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#f6f7ff] border border-gray-200"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#f6f7ff] border border-gray-200"
          />

          <button
            onClick={handleSignup}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg"
          >
            Create Account ✨
          </button>

          <p className="text-xs text-center text-gray-400">
            No email • No identity • 100% anonymous
          </p>

          <p className="text-sm text-center text-gray-600">
            Already have a space?{" "}
            <Link href="/login" className="text-purple-500 font-semibold">
              Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
