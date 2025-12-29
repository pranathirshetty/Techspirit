"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const ADMIN_EMAIL = "admin@mindcare.app";

export default function AdminEntry() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user?.email === ADMIN_EMAIL) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsub();
  }, []);

  if (!isAdmin) return null;

  return (
    <Link
      href="/admin"
      className="fixed bottom-6 right-6 z-50
        bg-[#8A4F5C] text-white
        px-5 py-3 rounded-full
        shadow-xl hover:scale-105 transition"
    >
      Admin Dashboard 📊
    </Link>
  );
}
