"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const avatars = [
  "🦊", "🐻", "🐰", "🦄", "🐱", "🐶", "🐼", "🐯"
];

export default function Avatar() {
  const [childName, setChildName] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    setChildName(sessionStorage.getItem("childName") || "your child");
  }, []);

  function handleNext(e: React.FormEvent) {
    e.preventDefault();
    if (selected !== null) {
      sessionStorage.setItem("childAvatar", avatars[selected]);
      router.push("/stories");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-peach-100 via-mint-100 to-sky-100 font-nunito text-gray-800 p-6">
      <form onSubmit={handleNext} className="max-w-md w-full flex flex-col items-center gap-6 bg-white/80 rounded-3xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-2">Hi, {childName}!</h2>
        <p className="text-center text-lg mb-4">Pick an avatar for your storybook:</p>
        <div className="grid grid-cols-4 gap-4 mb-4">
          {avatars.map((avatar, idx) => (
            <button
              type="button"
              key={avatar}
              className={`text-4xl w-16 h-16 flex items-center justify-center rounded-full border-4 transition-all ${selected === idx ? "border-peach-400 bg-peach-100" : "border-transparent bg-mint-100 hover:border-peach-300"}`}
              onClick={() => setSelected(idx)}
              aria-label={`Select avatar ${avatar}`}
            >
              {avatar}
            </button>
          ))}
        </div>
        <button
          type="submit"
          className="mt-2 px-8 py-3 rounded-full bg-peach-300 hover:bg-peach-400 text-white font-semibold text-lg shadow transition disabled:opacity-50"
          disabled={selected === null}
        >
          Next
        </button>
      </form>
    </div>
  );
} 