"use client";

import { useEffect, useState } from "react";

export default function SupportPage() {
  const [text, setText] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedText = sessionStorage.getItem("supportText");

    if (!storedText) {
      setReply("I’m here with you. Share what’s on your mind. 🌱");
      setLoading(false);
      return;
    }

    setText(storedText);

    async function fetchSupport() {
      try {
        const res = await fetch("http://localhost:5000/support", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: storedText,
            mood: "low",
          }),
        });

        const data = await res.json();
        setReply(data.reply);
      } catch (err) {
        setReply(
          "Something went wrong, but I’m still here with you. 🌷"
        );
      } finally {
        setLoading(false);
        sessionStorage.removeItem("supportText"); // clean up
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

        {/* AI response */}
        <div className="bg-[#F6F2FF] p-4 rounded-2xl text-sm text-gray-700 min-h-[80px]">
          {loading ? "Listening and thinking… 🌱" : reply}
        </div>
      </div>
    </div>
  );
}
