"use client";

import { useEffect, useState } from "react";

export default function SupportPage() {
  const [text, setText] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(true);

  // 🌷 FALLBACK SUPPORT MESSAGE
  const FALLBACK_REPLY =
    "I’m really glad you reached out. What you’re feeling matters, even if it feels heavy right now. Take a slow breath — you’re not alone in this. 🌷";

  useEffect(() => {
    const storedText = sessionStorage.getItem("supportText");

    if (!storedText) {
      setReply(FALLBACK_REPLY);
      setLoading(false);
      return;
    }

    setText(storedText);

    async function fetchSupport() {
      try {
        const res = await fetch("https://techspirit.onrender.com/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: storedText,
            mood: "low",
          }),
        });

        const data = await res.json();

        // ✅ if API gives reply, use it
        if (data?.reply) {
          setReply(data.reply);
        } 
        // ⚠️ API responded but no reply field
        else {
          setReply(FALLBACK_REPLY);
        }
      } catch (err) {
        // ❌ API totally failed
        setReply(FALLBACK_REPLY);
      } finally {
        setLoading(false);
        sessionStorage.removeItem("supportText");
      }
    }

    fetchSupport();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE6F2] to-[#EDE7FF] flex justify-center items-center px-4">
      <div className="bg-white/80 backdrop-blur rounded-3xl p-8 max-w-xl w-full shadow-xl">

        <h2 className="text-2xl font-semibold text-center mb-2 text-[#8A4F5C]">
          Instant Support 💬
        </h2>

        <p className="text-center text-sm text-gray-500 mb-4">
          This conversation is private and just for you.
        </p>

        {/* User text */}
        {text && (
          <div className="bg-[#FFF7FB] p-4 rounded-2xl mb-4 text-sm text-gray-700">
            <strong>You:</strong> {text}
          </div>
        )}

        {/* AI / Fallback response */}
        <div className="bg-[#F6F2FF] p-4 rounded-2xl text-sm text-gray-700 min-h-[80px]">
          {loading ? "Listening and thinking… " : reply}
        </div>
      </div>
    </div>
  );
}
