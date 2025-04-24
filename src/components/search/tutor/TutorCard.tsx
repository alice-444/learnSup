import Image from "next/image";
import { TutorCardProps } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { FiStar, FiVideo } from "react-icons/fi";

export const TutorCard = ({ tutor }: TutorCardProps) => {
  return (
    <div className="bg-[#1E1E1E]/80 backdrop-blur-md rounded-2xl overflow-hidden relative shadow-xl border border-white/10 hover:border-white/20 transition-all group">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--tertiary-blue)] via-[var(--tertiary-blue)/80] to-[var(--tertiary-blue)/50] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-black/30 to-transparent" />

      <div className="p-5 flex flex-col lg:flex-row lg:items-center gap-6 relative">
        <div className="flex flex-col sm:flex-row lg:flex-1 gap-5">
          <div className="relative flex-shrink-0">
            <Image
              src={tutor.avatar}
              alt={tutor.name}
              width={64}
              height={64}
              className="rounded-full object-cover ring-2 ring-white/10"
            />
            {tutor.online && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full ring-2 ring-[#151934]" />
            )}
            {!tutor.online && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-gray-400 rounded-full ring-2 ring-[#151934]" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
              <h3 className="font-semibold text-white text-lg">{tutor.name}</h3>
              <span className="text-sm text-white/60">•</span>
              <span className="text-sm text-white/60">{tutor.level}</span>
            </div>
            <p className="text-sm text-white/60 mb-2">{tutor.status}</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="text-sm text-white/80">
                {tutor.ateliersGiven} atelier(s) donnés
              </span>
              <span className="text-white/20">|</span>
              <div className="flex items-center gap-1.5">
                <span className="text-sm text-white/80">{tutor.rating}</span>
                <FiStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm text-white/60">
                  ({tutor.evaluations} évaluations)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:border-l lg:border-white/10 lg:pl-6">
          <div className="flex flex-col gap-3">
            <div>
              <p className="font-medium text-white mb-0.5">
                Atelier donné : {tutor.atelier.title}
              </p>
              <p className="text-sm text-white/60">{tutor.atelier.time}</p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full bg-gray-300 ring-2 ring-[#151934] relative"
                      style={{ zIndex: 3 - i }}
                    />
                  ))}
                  <div className="w-6 h-6 rounded-full bg-gray-200 ring-2 ring-[#151934] flex items-center justify-center relative">
                    <span className="text-xs text-gray-600 font-semibold">
                      {tutor.atelier.participants}
                    </span>
                  </div>
                </div>
                <span className="text-sm text-white/60">participant(s)</span>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="default"
                  size="sm"
                  className="rounded-full h-8 px-3.5 bg-white hover:bg-white/95 text-[#3B82F6] font-medium whitespace-nowrap transition-all flex items-center gap-1.5 shadow-lg shadow-white/10"
                >
                  <span className="text-sm">Participer</span>
                  <FiVideo className="w-3.5 h-3.5" />
                </Button>
                {tutor.atelier.isOnline && (
                  <div className="flex items-center gap-1 px-2 py-3 rounded-full backdrop-blur-sm transition-colors">
                    <span className="text-sm text-white font-medium">
                      En ligne
                    </span>
                    <div className="w-2 h-2 rounded-full bg-green-400 shadow-sm shadow-green-400/20" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
