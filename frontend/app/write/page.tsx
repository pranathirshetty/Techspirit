"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WritePage() {
  const [text, setText] = useState("");
  const router = useRouter();

  async function post() {
    if (!text.trim()) return;

    await fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, mood: "unknown" })
    });

    router.push("/wall");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE6F2] to-[#EDE7FF] flex justify-center items-center px-4">
      <div className="bg-white/80 backdrop-blur rounded-3xl p-8 max-w-xl w-full shadow-xl">
        <h2 className="text-2xl font-semibold text-center mb-4 text-[#8A4F5C]">
          Write It Out ✍️
        </h2>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type freely… no one is watching."
          className="w-full h-44 rounded-2xl p-4 bg-[#FFF7FB] mb-5 focus:outline-none focus:ring-2 focus:ring-pink-200"
        />

        <button
          onClick={post}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium"
        >
          Post Anonymously 🤍
        </button>
      </div>
    </div>
  );
}
