"use client";

import { useRouter } from "next/navigation";
import AdminEntry from "../components/AdminEntry";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function MoodSelectPage() {
  const router = useRouter();

  const moods = [
    { label: "Happy", emoji: "😊", grad: "from-[#FFDDEB] to-[#FAD4E3]" },
    { label: "Calm", emoji: "😌", grad: "from-[#FBE6EE] to-[#F5D7E6]" },
    { label: "Sad", emoji: "😟", grad: "from-[#FAD9E5] to-[#F5C7D8]" },
    { label: "Angry", emoji: "😠", grad: "from-[#F7C8D9] to-[#F4B7CD]" },
  ];

  const handleSelect = (mood: string) => {
    sessionStorage.setItem("selectedMood", mood);
    router.push("/action");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#FFE6F2] via-[#EDE7FF] to-[#DFF8FF] flex items-center justify-center px-6">

      {/* ✅ INVISIBLE ADMIN ENTRY (secret access) */}
      <AdminEntry />

      {/* ✅ LOGOUT BUTTON – TOP RIGHT */}
      <button
        onClick={async () => {
          await signOut(auth);
          router.push("/login");
        }}
        className="
          absolute top-6 right-6
          bg-white/80 backdrop-blur
          text-[#8A4F5C] font-semibold text-sm
          px-5 py-2 rounded-full
          shadow-md
          hover:bg-[#FFDDEB]
          hover:scale-105
          transition
        "
      >
        Logout 🚪
      </button>

      <div>

        {/* WELCOME CARD */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-[#8A4F5C] text-center mb-2">
            Welcome to Mood Share
          </h2>
          <p className="text-center text-[#56333C] text-sm leading-relaxed">
            Tap the mood that feels closest to you today —  
            this is just between you & yourself 🌷
          </p>
        </div>

        {/* MOOD GRID */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {moods.map((m) => (
            <button
              key={m.label}
              onClick={() => handleSelect(m.label)}
              className={`bg-gradient-to-br ${m.grad} rounded-3xl shadow-lg p-6 hover:scale-[1.03] active:scale-[0.98] transition`}
            >
              <div className="flex flex-col items-center">
                <span className="text-5xl">{m.emoji}</span>
                <p className="mt-3 font-semibold text-[#56333C]">
                  {m.label}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* INFO CARD */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-md p-6">
          <h4 className="text-[#8A4F5C] font-semibold mb-2">
            Why we ask about mood ?
          </h4>
          <p className="text-[#56333C] text-sm leading-relaxed">
            Your mood helps guide what kind of support we show you.  
            It isn’t saved with your identity — because we don’t collect one.
          </p>
        </div>

        <p className="text-center text-xs text-[#8A4F5C] mt-6">
          You matter. Your feelings matter. Always 🌸
        </p>

      </div>
    </div>
  );
}
