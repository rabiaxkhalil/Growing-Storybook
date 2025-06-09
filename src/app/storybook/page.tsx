"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { jsPDF } from "jspdf";

export default function Storybook() {
  const [storyTitle, setStoryTitle] = useState("");
  const [storyText, setStoryText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const router = useRouter();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

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