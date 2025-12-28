"use client";

import { useState } from "react";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";


export default function SignupPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    if (!name || !password) {
      alert("Fill all fields");
      return;
    }

    try {
      const fakeEmail = `${name}@mindcare.app`;
      await createUserWithEmailAndPassword(auth, fakeEmail, password);
      router.push("/home");
    } catch {
      alert("Account already exists or weak password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-[#FFE6F2] via-[#EDE7FF] to-[#DFF8FF]">

      <div className="w-[380px] bg-white rounded-[32px] shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 p-6 text-center">
          <div className="flex justify-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-yellow-300 flex items-center justify-center">😊</div>
            <div className="w-8 h-8 rounded-full bg-green-300 flex items-center justify-center">🙂</div>
            <div className="w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center">😔</div>
            <div className="w-8 h-8 rounded-full bg-red-300 flex items-center justify-center">😟</div>
          </div>

         <div className="flex justify-center mb-2">
  <div className="w-32 h-32 rounded-full bg-white shadow-inner flex items-center justify-center">
    <img
      src="https://www.bing.com/th/id/OIP.4h4LZBsuPMzGoebQOjS6gQHaHa?w=195&h=211&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.7&pid=3.1&rm=2"
      alt="Mood illustration"
      width={110}
      height={110}
      className="object-contain rounded-4xl"
    />
  </div>
</div>


          <h1 className="text-2xl font-bold text-gray-800">Create your space</h1>
          <p className="text-sm text-gray-600">No judgment. Just feelings.</p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          <input
            placeholder="CalmSoul 🌸"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#f6f7ff] border border-gray-200"
          />

          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#f6f7ff] border border-gray-200"
          />

          <button
            onClick={handleSignup}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-lg"
          >
            Start My Journey 💖
          </button>

          <p className="text-xs text-center text-gray-400">
            No email • No identity • 100% private
          </p>

          <p className="text-sm text-center text-gray-600">
          Dont have an account?{" "}
            <Link href="/signup" className="text-purple-500 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}