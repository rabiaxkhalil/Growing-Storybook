"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const [childName, setChildName] = useState("");
  const [parentName, setParentName] = useState("");
  const router = useRouter();

  function handleNext(e: React.FormEvent) {
    e.preventDefault();
    if (childName.trim() && parentName.trim()) {
      sessionStorage.setItem("childName", childName);
      sessionStorage.setItem("parentName", parentName);
      router.push("/avatar");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-peach-100 via-mint-100 to-sky-100 font-nunito text-gray-800 p-6">
      <form onSubmit={handleNext} className="max-w-md w-full flex flex-col items-center gap-6 bg-white/80 rounded-3xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center">Let's get started!</h2>
        <p className="text-center text-lg">What is your child's name?</p>
        <input
          type="text"
          value={childName}
          onChange={e => setChildName(e.target.value)}
          placeholder="Enter your child's name"
          className="w-full px-4 py-3 rounded-xl border border-peach-300 focus:outline-none focus:ring-2 focus:ring-peach-400 text-lg bg-peach-100"
          required
        />
        <p className="text-center text-lg">And what is your name?</p>
        <input
          type="text"
          value={parentName}
          onChange={e => setParentName(e.target.value)}
          placeholder="Enter your name"
          className="w-full px-4 py-3 rounded-xl border border-peach-300 focus:outline-none focus:ring-2 focus:ring-peach-400 text-lg bg-peach-100"
          required
        />
        <button
          type="submit"
          className="mt-2 px-8 py-3 rounded-full bg-peach-300 hover:bg-peach-400 text-white font-semibold text-lg shadow transition disabled:opacity-50"
          disabled={!childName.trim() || !parentName.trim()}
        >
          Next
        </button>
      </form>
    </div>
  );
} 