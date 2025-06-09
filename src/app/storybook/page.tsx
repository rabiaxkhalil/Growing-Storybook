"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { jsPDF } from "jspdf";
import Image from "next/image";
import React from "react";

// Pre-made illustrations for each story theme
const storyIllustrations = {
  "The Rocket Repair Team": "/illustrations/rocket.svg",
  "The Dinosaur Discovery": "/illustrations/dinosaur.svg",
  "The Sky Painter": "/illustrations/sky.svg",
  "The Kindness Parade": "/illustrations/kindness.svg",
  "Captain of the Sea": "/illustrations/sea.svg",
  "The Quiet Rescue": "/illustrations/rescue.svg",
  "The Starlight Wish": "/illustrations/stars.svg",
  "The Loud Idea": "/illustrations/idea.svg",
  "The Time Machine": "/illustrations/time.svg",
  "The Great Messy Masterpiece": "/illustrations/art.svg",
};

const allStories = Object.keys(storyIllustrations);

export default function Storybook() {
  const [storyTitle, setStoryTitle] = useState("");
  const [storyText, setStoryText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [childAvatar, setChildAvatar] = useState<string | null>(null);
  const router = useRouter();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [selectedStories, setSelectedStories] = useState<string[]>([]);
  const [selectionConfirmed, setSelectionConfirmed] = useState(false);

  useEffect(() => {
    if (!selectionConfirmed) return; // Only run after selection is confirmed
    
    const customizedStories = JSON.parse(sessionStorage.getItem("customizedStories") || "[]");
    const avatar = sessionStorage.getItem("childAvatar");
    
    if (!customizedStories || customizedStories.length === 0) {
      router.push("/onboarding");
      return;
    }
    
    setStoryTitle(customizedStories[0].title);
    setStoryText(customizedStories[0].text);
    setChildAvatar(avatar);
    setIsLoading(false);
  }, [router, selectionConfirmed]);

  function handleAIVoice() {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(storyText);
    utterance.rate = 0.9; // Slightly slower for better clarity
    utterance.pitch = 1;
    
    // Get available voices and select a child-friendly one if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes("Female") || voice.name.includes("Samantha")
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  async function handleRecordVoice() {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Could not access microphone. Please ensure you have granted microphone permissions.");
    }
  }

  function handleDownloadPDF() {
    const doc = new jsPDF();
    const childName = sessionStorage.getItem("childName") || "";
    const parentName = sessionStorage.getItem("parentName") || "";

    // Add title
    doc.setFontSize(24);
    doc.text(storyTitle, 20, 20);

    // Add subtitle
    doc.setFontSize(14);
    doc.text(`A story for ${childName} and ${parentName}`, 20, 30);

    // Add story text
    doc.setFontSize(12);
    const splitText = doc.splitTextToSize(storyText, 170);
    doc.text(splitText, 20, 40);

    doc.save(`${storyTitle.toLowerCase().replace(/\s+/g, '-')}.pdf`);
  }

  function handleDownloadAudio() {
    if (!audioUrl) return;
    
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `${storyTitle.toLowerCase().replace(/\s+/g, '-')}-recording.wav`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function handleDownloadText() {
    const childName = sessionStorage.getItem("childName") || "";
    const parentName = sessionStorage.getItem("parentName") || "";
    const text = `${storyTitle}\n\nA story for ${childName} and ${parentName}\n\n${storyText}`;
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${storyTitle.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Story selection handler
  function handleStorySelect(story: string) {
    if (selectedStories.includes(story)) {
      setSelectedStories(selectedStories.filter((s) => s !== story));
    } else {
      if (selectedStories.length < 10) {
        setSelectedStories([...selectedStories, story]);
      }
    }
  }

  // Confirm selection
  function handleConfirmSelection() {
    setSelectionConfirmed(true);
  }

  if (!selectionConfirmed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-peach-100 via-mint-100 to-sky-100 font-nunito text-gray-800 p-6">
        <div className="max-w-2xl w-full flex flex-col items-center gap-6 bg-white/80 rounded-3xl shadow-xl p-8">
          <h1 className="text-3xl font-bold mb-4">Select up to 10 Stories</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {allStories.map((story) => (
              <label key={story} className={`flex items-center gap-3 p-3 rounded-xl border transition cursor-pointer ${selectedStories.includes(story) ? 'bg-peach-100 border-peach-300' : 'bg-white border-gray-200'}`}> 
                <input
                  type="checkbox"
                  checked={selectedStories.includes(story)}
                  onChange={() => handleStorySelect(story)}
                  disabled={!selectedStories.includes(story) && selectedStories.length >= 10}
                  className="accent-peach-400 w-5 h-5"
                />
                <span className="font-semibold">{story}</span>
              </label>
            ))}
          </div>
          <button
            onClick={handleConfirmSelection}
            disabled={selectedStories.length === 0}
            className="mt-6 px-6 py-2 rounded-full bg-peach-300 hover:bg-peach-400 text-white font-semibold shadow transition disabled:opacity-50"
          >
            Start Storybook
          </button>
          <div className="text-sm text-gray-500 mt-2">{selectedStories.length}/10 selected</div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-peach-100 via-mint-100 to-sky-100 font-nunito">
        <div className="text-2xl text-gray-800">Loading your story...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-peach-100 via-mint-100 to-sky-100 font-nunito text-gray-800 p-6">
      <div className="max-w-4xl w-full flex flex-col items-center gap-6 bg-white/80 rounded-3xl shadow-xl p-8">
        <div className="flex items-center gap-6 mb-4">
          {childAvatar && (
            <div className="w-24 h-24 relative rounded-full overflow-hidden border-4 border-peach-300">
              <Image
                src={childAvatar}
                alt="Child Avatar"
                fill
                className="object-cover"
              />
            </div>
          )}
          <h1 className="text-3xl font-bold text-center">{storyTitle}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={storyIllustrations[storyTitle as keyof typeof storyIllustrations] || "/illustrations/default.svg"}
              alt="Story Illustration"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="prose prose-lg max-w-none">
            {storyText.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4 text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          <button
            onClick={handleAIVoice}
            className="px-6 py-2 rounded-full bg-sky-300 hover:bg-sky-400 text-white font-semibold shadow transition flex items-center gap-2"
          >
            {isSpeaking ? "⏹️ Stop" : "🔊 Listen"}
          </button>
          
          <button
            onClick={handleRecordVoice}
            className="px-6 py-2 rounded-full bg-white hover:bg-gray-100 text-gray-800 font-semibold shadow transition flex items-center gap-2 border border-gray-200"
          >
            {isRecording ? "⏹️ Stop Recording" : "🎤 Record Voice"}
          </button>
          
          <button
            onClick={() => setShowDownloadOptions(!showDownloadOptions)}
            className="px-6 py-2 rounded-full bg-peach-300 hover:bg-peach-400 text-white font-semibold shadow transition flex items-center gap-2"
          >
            💾 Download
          </button>
          
          <button
            onClick={() => router.push("/onboarding")}
            className="px-6 py-2 rounded-full bg-gray-300 hover:bg-gray-400 text-white font-semibold shadow transition"
          >
            Create Another Story
          </button>
        </div>

        {showDownloadOptions && (
          <div className="flex flex-wrap gap-4 justify-center mt-4 p-4 bg-white/50 rounded-xl">
            <button
              onClick={handleDownloadPDF}
              className="px-4 py-2 rounded-full bg-peach-200 hover:bg-peach-300 text-peach-700 font-semibold shadow transition"
            >
              📄 PDF
            </button>
            <button
              onClick={handleDownloadText}
              className="px-4 py-2 rounded-full bg-peach-200 hover:bg-peach-300 text-peach-700 font-semibold shadow transition"
            >
              📝 Text
            </button>
            {audioUrl && (
              <button
                onClick={handleDownloadAudio}
                className="px-4 py-2 rounded-full bg-peach-200 hover:bg-peach-300 text-peach-700 font-semibold shadow transition"
              >
                🎵 Audio
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 