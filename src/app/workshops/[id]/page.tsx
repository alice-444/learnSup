"use client";

import Image from "next/image";
import { useState } from "react";
import { CircleX, Send, Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WorkshopActivity() {
  // Données fictives pour la démo
  const workshop = {
    title: "UX Design",
    description: "Introduction aux frames, composants, variantes de Figma.",
    tutor: {
      name: "Sarah Villiers",
      avatar: "/profils/sarah.png",
    },
    screen: "/workshop/screen-demo.png",
    transcription:
      "Sarah Villiers : Donc comme vous pouvez le constater, notre bouton a plusieurs variantes...",
    chat: [
      {
        name: "Wade Warren",
        time: "11h31",
        message: "Salut tout le monde ! :D",
        self: false,
      },
      {
        name: "Zaire Franci",
        time: "11h31",
        message: "Heeey ! Vous allez bien ?",
        self: false,
      },
      {
        name: "Vous",
        time: "11h32",
        message: "Hello guys! ça va et vous ? ^^",
        self: true,
      },
      {
        name: "Zaire Franci",
        time: "11h32",
        message: "Oui ça va super !!!",
        self: false,
      },
      {
        name: "Wade Warren",
        time: "11h33",
        message: "Comme un vendredi ! :) ",
        self: false,
      },
    ],
    participants: [
      "/profils/sarah.png",
      "/profils/edouard.jpg",
      "/profils/nathan.png",
      "/profils/zoe.png",
    ],
  };

  const [showEvaluation, setShowEvaluation] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const router = useRouter();

  return (
    <div
      className="min-h-screen text-white"
      style={{
        backgroundImage: "url('/messages/bg-messages.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <main className="max-w-7xl mx-auto py-26 px-4 flex flex-col gap-6">
        <div className="mb-2">
          <h1 className="text-4xl font-bold text-white mb-1">
            {workshop.title}
          </h1>
          <p className="text-blue-200 text-lg">
            Description :{" "}
            <span className="text-white/80">{workshop.description}</span>
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Zone principale */}
          <div className="flex-1 bg-[#181F3A] rounded-2xl shadow-lg p-6 flex flex-col gap-4 relative">
            <div className="flex items-center gap-3 mb-2">
              <Image
                src={workshop.tutor.avatar}
                alt={workshop.tutor.name}
                width={56}
                height={56}
                className="rounded-full object-cover border-2 border-white"
              />
              <span className="font-semibold text-lg text-white">
                {workshop.tutor.name}
              </span>
              <button
                className="ml-auto bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-full shadow transition"
                onClick={() => setShowEvaluation(true)}
              >
                Mettre fin à l&apos;atelier
              </button>
            </div>
            <div className="rounded-xl overflow-hidden border-2 border-[#232B4A] bg-black flex-1 flex items-center justify-center min-h-[320px]">
              <Image
                src="/workshop/screen-demo.png"
                alt="screen"
                width={800}
                height={400}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="absolute left-6 bottom-4 bg-black/80 text-white text-xs px-4 py-2 rounded-lg flex items-center gap-2">
              <span className="text-red-500 font-bold">CC/Transcription</span>
              <span>02:12</span>
              <span className="font-medium">{workshop.tutor.name} :</span>
              <span className="truncate max-w-xs">
                {workshop.transcription}
              </span>
            </div>
          </div>
          {/* Chat */}
          <aside className="w-full lg:w-[380px] bg-[#181F3A] rounded-2xl shadow-lg flex flex-col">
            <div className="flex items-center justify-between px-6 pt-6 pb-2">
              <span className="text-lg font-semibold">
                Discussion du groupe
              </span>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded-full bg-[#232B4A] text-white/80 font-medium text-sm">
                  Messages
                </button>
                <button className="px-3 py-1 rounded-full bg-[#232B4A] text-white/80 font-medium text-sm">
                  Participants
                </button>
              </div>
            </div>
            <div className="flex-1 px-6 py-2 overflow-y-auto max-h-[340px] flex flex-col gap-2">
              {workshop.chat.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.self ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-xl px-4 py-2 text-sm ${
                      msg.self
                        ? "bg-blue-500 text-white"
                        : "bg-[#232B4A] text-white/90"
                    }`}
                  >
                    {msg.message}
                  </div>
                  <span className="ml-2 text-xs text-white/50 self-end">
                    {msg.time}
                  </span>
                </div>
              ))}
            </div>
            <form className="flex items-center gap-2 px-6 py-4 border-t border-[#232B4A]">
              <input
                type="text"
                placeholder="Taper un message..."
                className="flex-1 rounded-full px-4 py-2 bg-[#232B4A] text-white border-none focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2 flex items-center justify-center"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path d="M2 21l21-9-21-9v7l15 2-15 2v7z" fill="#fff" />
                </svg>
              </button>
            </form>
          </aside>
        </div>
      </main>

      {showEvaluation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-8 w-[420px] max-w-full flex flex-col items-center shadow-xl">
            <h2 className="text-3xl font-semibold text-[var(--secondary-blue)] mb-6 text-center">
              Comment était votre atelier ?
            </h2>
            <div className="flex items-center gap-6 mb-4 w-full justify-center">
              <div className="rounded-full bg-[#F7FAFF] border-2 border-blue-100 flex items-center justify-center w-28 h-28">
                <img
                  src="/emojis/smile.png"
                  alt="smile"
                  className="w-20 h-20"
                />
              </div>
              <div className="text-[var(--secondary-blue)] text-lg font-medium">
                Votre appréciation
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mb-8 border border-[var(--secondary-blue)] rounded-full px-6 py-3 w-fit">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-8 h-8 cursor-pointer transition ${
                    (hoverRating || rating) >= star
                      ? "text-[var(--secondary-blue)] fill-[var(--secondary-blue)]"
                      : "text-blue-200"
                  }`}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  fill={
                    (hoverRating || rating) >= star ? "currentColor" : "none"
                  }
                  strokeWidth={2.5}
                />
              ))}
            </div>
            <div className="w-full border-t border-blue-100 mb-6"></div>
            <div className="w-full bg-[#F7FAFF] border-2 border-[var(--secondary-blue)] rounded-2xl p-4 mb-8">
              <div className="font-semibold text-[var(--secondary-blue)] mb-2">
                Souhaitez-vous laisser un commentaire ?
              </div>
              <textarea
                className="w-full rounded-lg border border-blue-200 p-3 text-gray-700 focus:outline-none focus:border-[var(--secondary-blue)]"
                rows={3}
                placeholder="Votre commentaire..."
              />
            </div>
            <div className="flex gap-4 w-full">
              <button
                className="flex-1 bg-[#F3F4F6] hover:bg-[#E5E7EB] text-gray-700 rounded-full px-4 py-2 font-medium flex items-center justify-center gap-2 border border-gray-200 shadow-sm transition"
                onClick={() => router.push("/search")}
              >
                <CircleX className="w-5 h-5" /> Ne pas évaluer
              </button>
              <button
                className="flex-1 bg-[var(--secondary-blue)] hover:bg-blue-700 text-white rounded-full px-4 py-2 font-medium flex items-center justify-center gap-2 shadow-md transition"
                onClick={() => router.push("/search")}
              >
                Publier votre évaluation
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
