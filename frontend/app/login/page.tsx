"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!name || !password) {
      return alert("Fill all fields");
    }

    const cleanName = name.toLowerCase().replace(/\s+/g, "");
    const fakeEmail = `${cleanName}@mindcare.app`;

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, fakeEmail, password);
      router.push("/home");
    } catch {
      alert("Invalid name or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4
      bg-gradient-to-br from-[#FFE6F2] via-[#EDE7FF] to-[#DFF8FF]">

      <div className="w-full max-w-[380px] bg-white rounded-[32px] shadow-2xl overflow-hidden">

        <div className="bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Welcome back</h1>
          <p className="text-sm text-gray-600">Your safe space missed you</p>
        </div>

        <div className="p-6 space-y-4">
          <input
            placeholder="CalmSoul 🌸"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#f6f7ff] border"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#f6f7ff] border"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold"
          >
            {loading ? "Logging in…" : "Login"}
          </button>

          <p className="text-sm text-center text-gray-600">
            New here?{" "}
            <Link href="/signup" className="text-purple-500 font-semibold">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
