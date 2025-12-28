"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ActionPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"public" | "ai" | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const prompts = [
    "What’s been on your mind lately?",
    "Describe how today felt for you.",
    "What do you wish someone understood about you?",
    "If your feelings had a voice, what would they say?",
  ];

  const handleSubmit = async () => {
    if (!text.trim() || !mode) return;

    // ----- AI SUPPORT FLOW (unchanged) -----
    if (mode === "ai") {
      sessionStorage.setItem("supportText", text);
      router.push("/support");
      return;
    }

    // ----- PUBLIC POST FLOW (FIXED) -----
    if (mode === "public") {
      setLoading(true);

      try {
        await fetch("http://localhost:5000/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text,
            mood: sessionStorage.getItem("selectedMood") || "unknown",
          }),
        });

        alert(
          "Thank you for sharing. Your post will appear on the Support Wall after moderation."
        );

        setText("");
        router.push("/wall");
      } catch (err) {
        alert("Something went wrong. Please try again 😭");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE6F2] via-[#EDE7FF] to-[#DFF8FF] flex items-center justify-center px-6">
      <div className="max-w-md w-full">

        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 mb-6 text-center">
          <h2 className="text-xl font-bold text-[#8A4F5C] mb-2">
            What would you like to do?
          </h2>
          <p className="text-[#56333C] text-sm">
            Choose a path — then write your thoughts below
          </p>
        </div>

        {/* Mode Selection */}
        <div className="space-y-4 mb-6">
          <button
            onClick={() => setMode("public")}
            className={`w-full rounded-3xl p-6 text-left shadow-lg transition
              ${
                mode === "public"
                  ? "bg-[#FFDDEB]"
                  : "bg-white/80 backdrop-blur-sm"
              }`}
          >
            <h3 className="text-lg font-semibold text-[#8A4F5C]">
              ✍️ Write It Out (Public)
            </h3>
            <p className="text-[#56333C] text-sm mt-1">
              Your post is anonymous & will go through moderation.
            </p>
          </button>

          <button
            onClick={() => setMode("ai")}
            className={`w-full rounded-3xl p-6 text-left shadow-lg transition
              ${
                mode === "ai"
                  ? "bg-[#FBE6EE]"
                  : "bg-white/80 backdrop-blur-sm"
              }`}
          >
            <h3 className="text-lg font-semibold text-[#8A4F5C]">
              🤖 Get Instant Support (Private)
            </h3>
            <p className="text-[#56333C] text-sm mt-1">
              Share privately & receive a caring response.
            </p>
          </button>
        </div>

        {/* Writing Area */}
        {mode && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6">
            <textarea
              className="w-full h-44 rounded-2xl p-4 outline-none text-[#56333C] bg-white/90"
              placeholder={
                prompts[Math.floor(Math.random() * prompts.length)]
              }
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-4 w-full bg-[#8A4F5C] text-white rounded-2xl py-3 hover:opacity-90 transition"
            >
              {loading
                ? "Posting…"
                : mode === "ai"
                ? "Get Instant Support 🤖"
                : "Post Anonymously ✍️"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
