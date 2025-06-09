import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-peach-100 via-mint-100 to-sky-100 font-nunito text-gray-800 p-6">
      <div className="max-w-xl w-full flex flex-col items-center gap-6 bg-white/80 rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">Welcome to OurHealth: Your Child Is Growing Up</h1>
        <p className="text-center text-lg mb-8">Create personalized digital storybooks for your child</p>
        <Link
          href="/onboarding"
          className="px-8 py-3 rounded-full bg-peach-300 hover:bg-peach-400 text-white font-semibold text-lg shadow transition"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
