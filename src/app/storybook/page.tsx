"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Storybook() {
  const [avatar, setAvatar] = useState("");
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const router = useRouter();

  useEffect(() => {
    setAvatar(sessionStorage.getItem("childAvatar") || "");
    setTitle(sessionStorage.getItem("finalStoryTitle") || "");
    setStory(sessionStorage.getItem("finalStoryText") || "");
  }, []);

  function handleRestart() {
    sessionStorage.clear();
    router.push("/");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-peach-100 via-mint-100 to-sky-100 font-nunito text-gray-800 p-6">
      <div className="max-w-2xl w-full flex flex-col items-center gap-6 bg-white/90 rounded-3xl shadow-2xl p-10 border-4 border-peach-100">
        <div className="flex flex-col items-center gap-2">
          <span className="text-6xl mb-2">{avatar}</span>
          <h1 className="text-3xl font-bold text-center text-peach-400 mb-2">{title}</h1>
          <h2 className="text-lg text-center text-gray-500 mb-4">A story for {sessionStorage.getItem("childName")} and {sessionStorage.getItem("parentName")}</h2>
        </div>
        <div className="w-full text-lg leading-relaxed whitespace-pre-line bg-mint-100 rounded-xl p-6 shadow-inner">
          {story}
        </div>
        <div className="flex gap-4 mt-6">
          <button onClick={handleRestart} className="px-6 py-2 rounded-full bg-peach-300 hover:bg-peach-400 text-white font-semibold shadow transition">Start Over</button>
          <button disabled className="px-6 py-2 rounded-full bg-sky-100 text-gray-400 font-semibold shadow transition cursor-not-allowed">🔊 Narrate (coming soon)</button>
        </div>
      </div>
    </div>
  );
} 