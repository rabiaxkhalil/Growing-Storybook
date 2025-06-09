import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-peach-100 via-mint-100 to-sky-100 font-nunito text-gray-800 p-6">
      <div className="max-w-lg w-full flex flex-col items-center gap-8 bg-white/80 rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">Welcome to OurHealth: Inara Is Growing Up</h1>
        <p className="text-lg text-center mb-4">Create a magical, personalized storybook for your child. Strengthen your bond, inspire their imagination, and celebrate their growth—one story at a time.</p>
        <Link href="/onboarding" className="mt-4 px-8 py-3 rounded-full bg-peach-300 hover:bg-peach-400 text-white font-semibold text-lg shadow transition">Start Your Story</Link>
      </div>
    </div>
  );
}
