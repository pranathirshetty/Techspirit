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
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !password || !confirm) {
      return alert("Fill all fields");
    }

    if (password !== confirm) {
      return alert("Passwords don’t match");
    }

    const cleanName = name.toLowerCase().replace(/\s+/g, "");
    const fakeEmail = `${cleanName}@mindcare.app`;

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, fakeEmail, password);
      router.push("/home");
    } catch {
      alert("Name already taken or weak password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4
      bg-gradient-to-br from-[#FFE6F2] via-[#EDE7FF] to-[#DFF8FF]">

      <div className="w-full max-w-[360px] bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 px-6 py-5 text-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Create your space
          </h1>
          <p className="text-xs text-gray-600 mt-1">
            No judgment. Just feelings.
          </p>
        </div>

        {/* Form */}
        <div className="px-6 py-6 space-y-4">
          <input
            placeholder="CalmSoul"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#f6f7ff] border border-gray-200
              text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#f6f7ff] border border-gray-200
              text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#f6f7ff] border border-gray-200
              text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          />

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500
              text-white text-sm font-semibold shadow-lg active:scale-[0.98] transition"
          >
            {loading ? "Creating…" : "Create Account"}
          </button>

          <p className="text-[11px] text-center text-gray-400">
            No email • No identity • 100% private
          </p>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-purple-500 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
