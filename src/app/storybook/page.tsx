"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Storybook() {
  const [storyTitle, setStoryTitle] = useState("");
  const [storyText, setStoryText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const title = sessionStorage.getItem("finalStoryTitle");
    const text = sessionStorage.getItem("finalStoryText");
    
    if (!title || !text) {
      router.push("/onboarding");
      return;
    }
    
    setStoryTitle(title);
    setStoryText(text);
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-peach-100 via-mint-100 to-sky-100 font-nunito">
        <div className="text-2xl text-gray-800">Loading your story...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-peach-100 via-mint-100 to-sky-100 font-nunito text-gray-800 p-6">
      <div className="max-w-2xl w-full flex flex-col items-center gap-6 bg-white/80 rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2">{storyTitle}</h1>
        <div className="w-full prose prose-lg max-w-none">
          {storyText.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4 text-lg">
              {paragraph}
            </p>
          ))}
        </div>
        <button
          onClick={() => router.push("/onboarding")}
          className="px-8 py-3 rounded-full bg-peach-300 hover:bg-peach-400 text-white font-semibold text-lg shadow transition"
        >
          Create Another Story
        </button>
      </div>
    </div>
  );
} 