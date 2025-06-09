"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const [childName, setChildName] = useState("");
  const [parentName, setParentName] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sessionStorage.setItem("childName", childName);
    sessionStorage.setItem("parentName", parentName);
    router.push("/stories");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-peach-100 via-mint-100 to-sky-100 font-nunito text-gray-800 p-6">
      <div className="max-w-xl w-full flex flex-col items-center gap-6 bg-white/80 rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Welcome to OurHealth Storybook</h1>
        <p className="text-center text-lg mb-8">Let&apos;s create a magical story for your little one</p>
        
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="childName" className="text-lg font-semibold">What&apos;s your child&apos;s name?</label>
            <input
              type="text"
              id="childName"
              value={childName}
              onChange={e => setChildName(e.target.value)}
              className="p-3 rounded-xl border border-peach-300 focus:outline-none focus:ring-2 focus:ring-peach-400 text-lg bg-peach-100"
              placeholder="Enter name"
              required
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="parentName" className="text-lg font-semibold">And your name?</label>
            <input
              type="text"
              id="parentName"
              value={parentName}
              onChange={e => setParentName(e.target.value)}
              className="p-3 rounded-xl border border-peach-300 focus:outline-none focus:ring-2 focus:ring-peach-400 text-lg bg-peach-100"
              placeholder="Enter name"
              required
            />
          </div>
          
          <button type="submit" className="px-8 py-3 rounded-full bg-peach-300 hover:bg-peach-400 text-white font-semibold text-lg shadow transition">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
} 