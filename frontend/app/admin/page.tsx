"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";

const ADMIN_EMAIL = "admin@mindcare.app";

export default function AdminPage() {
  const [stats, setStats] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const user = auth.currentUser;

    // 🚫 not logged in
    if (!user) {
      router.push("/login");
      return;
    }

    // 🚫 logged in but not admin
    if (user.email !== ADMIN_EMAIL) {
      alert("Access denied 😬");
      router.push("/home");
      return;
    }

    // ✅ admin only
    fetch("https://techspirit.onrender.com/posts")
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => {
        alert("Failed to load admin stats");
      });
  }, []);

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading stats…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE6F2] to-[#EDE7FF] flex justify-center px-4 py-10">
      <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl w-full max-w-lg">

        <h2 className="text-3xl font-semibold text-center mb-6 text-[#8A4F5C]">
          Admin Insights 📊
        </h2>

        <div className="space-y-4 text-gray-700">
          <div className="flex justify-between">
            <span>Total Posts</span>
            <span>{stats.totalPosts}</span>
          </div>

          <div className="flex justify-between">
            <span>Approved</span>
            <span>{stats.approvalRate}%</span>
          </div>

          <div className="flex justify-between">
            <span>Hidden</span>
            <span>{stats.hiddenRate}%</span>
          </div>

          <div className="flex justify-between">
            <span>Support Sessions</span>
            <span>{stats.supportSessions}</span>
          </div>
        </div>

        <p className="text-xs text-center text-gray-400 mt-6">
          Aggregated only • Privacy-first
        </p>
      </div>
    </div>
  );
}
