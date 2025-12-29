"use client";

import { useEffect, useState } from "react";

type Post = {
  text: string;
  reactions: { heart: number; hug: number; leaf: number };
};

const dummyPosts: Post[] = [
  { text: "Some days I feel strong, some days I just exist.", reactions: { heart: 6, hug: 3, leaf: 4 } },
  { text: "Exams + expectations = mental mess 😮‍💨", reactions: { heart: 9, hug: 6, leaf: 2 } },
  { text: "Today I chose myself. That felt good.", reactions: { heart: 12, hug: 4, leaf: 8 } },
];

export default function WallPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
 fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`)
      .then(res => res.json())
      .then(data => setPosts([...data, ...dummyPosts]))
      .catch(() => setPosts(dummyPosts));
  }, []);

  function react(index: number, type: "heart" | "hug" | "leaf") {
    const updated = [...posts];
    updated[index].reactions[type]++;
    setPosts(updated);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF0F7] to-[#EEF1FF] px-4 py-10 flex justify-center">
      <div className="w-full max-w-xl">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold">Wall 🌸</h1>
          <p className="text-gray-500">Anonymous thoughts. Silent support.</p>
        </div>

        <div className="space-y-5">
          {posts.map((post, i) => (
            <div key={i} className="bg-white/80 backdrop-blur rounded-3xl shadow-md p-6">
              <p className="text-gray-800 mb-4">{post.text}</p>
              <div className="flex gap-6 text-sm text-gray-600">
                <button onClick={() => react(i, "heart")}>💛 {post.reactions.heart}</button>
                <button onClick={() => react(i, "hug")}>🫂 {post.reactions.hug}</button>
                <button onClick={() => react(i, "leaf")}>🌱 {post.reactions.leaf}</button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          No comments • No identity • Just support 💗
        </p>
      </div>
    </div>
  );
}
