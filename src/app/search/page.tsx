"use client";

import Image from "next/image";
import { mockTutors } from "@/lib/data/mockTutors";
import { useState, useMemo, useEffect } from "react";
import { SearchHeader } from "@/components/search/SearchHeader";
import { TutorList } from "@/components/search/tutor/TutorList";
import { SearchFilters } from "@/components/search/SearchFilters";
import { Modal } from "@/components/ui/modal";
import { Tutor } from "@/lib/types";
import { useRouter } from "next/navigation";
import {
  Smartphone,
  CheckCircle,
  Link2,
  DoorOpen,
  Coins,
  MailIcon,
} from "lucide-react";
import { FaStar } from "react-icons/fa";
import { FiBook } from "react-icons/fi";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    today: true,
    level: "intermédiaire",
    subject: "UX Design",
    rating: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<
    "info" | "atelier" | "code" | "loading" | "success"
  >("info");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const router = useRouter();

  const filteredTutors = useMemo(() => {
    const normalizeLevel = (level: string) => {
      const levelMap: { [key: string]: string } = {
        "Bac +2": "débutant",
        "Bac +3": "intermédiaire",
        "Bac +4": "intermédiaire",
        "Bac +5": "expert",
      };
      return levelMap[level] || level.toLowerCase();
    };

    return mockTutors.filter((tutor) => {
      const matchesSearch =
        !searchQuery ||
        tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.atelier.title.toLowerCase().includes(searchQuery.toLowerCase());

      const tutorNormalizedLevel = normalizeLevel(tutor.level);
      const matchesLevel =
        !selectedFilters.level ||
        tutorNormalizedLevel === selectedFilters.level.toLowerCase();

      const matchesSubject =
        !selectedFilters.subject ||
        tutor.atelier.title === selectedFilters.subject;

      const matchesRating = !selectedFilters.rating || tutor.rating >= 4.5;

      const matchesToday = !selectedFilters.today || true;

      return (
        matchesSearch &&
        matchesLevel &&
        matchesSubject &&
        matchesRating &&
        matchesToday
      );
    });
  }, [searchQuery, selectedFilters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedFilters]);

  useEffect(() => {
    if (modalStep === "loading") {
      const timeout = setTimeout(() => setModalStep("success"), 3000);
      return () => clearTimeout(timeout);
    }
  }, [modalStep]);

  const handleFilterChange = (
    key: keyof typeof selectedFilters,
    value: boolean | string
  ) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleParticipate = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setIsModalOpen(true);
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/search/bg-search.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="relative z-10 pt-20 px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SearchHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            totalResults={filteredTutors.length}
          />

          <SearchFilters
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
          />

          <TutorList
            tutors={filteredTutors}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onParticipate={handleParticipate}
          />

          <Modal
            open={isModalOpen}
            onOpenChange={(open) => {
              setIsModalOpen(open);
              if (!open) setModalStep("info");
            }}
          >
            {selectedTutor && modalStep === "info" && (
              <div className="flex flex-col min-h-0 bg-white rounded-2xl p-0">
                <div className="px-8 pt-8 pb-4">
                  <h2 className="text-3xl text-[var(--secondary-blue)] mb-2 text-center">
                    Rejoindre l&apos;atelier
                  </h2>
                  <p className="text-gray-500 text-center mb-6">
                    Tu seras débité de{" "}
                    <span className="font-bold">2 crédits</span> sur ton compte.
                    <br />
                    Il te reste actuellement{" "}
                    <span className="font-bold">9 crédits</span>.
                  </p>
                  <div className="flex justify-center gap-4 mb-8">
                    <button
                      className="flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--secondary-blue)] text-white font-medium hover:bg-blue-200 transition text-base shadow-sm"
                      onClick={() => setModalStep("atelier")}
                    >
                      <DoorOpen className="w-5 h-5" />
                      S&apos;inscrire
                    </button>
                    <button
                      className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#FF8000] text-white font-medium hover:bg-[#FF8000]/80 transition text-base shadow-sm"
                      onClick={() => setModalStep("code")}
                    >
                      <Coins className="w-5 h-5" />
                      Gérer mes crédits
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-6 px-8 pb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 h-px bg-[var(--secondary-blue)]" />
                    <span className="text-[var(--secondary-blue)] text-xl">
                      Informations sur l&apos;atelier
                    </span>
                    <div className="flex-1 h-px bg-[var(--secondary-blue)]" />
                  </div>
                  <div className="bg-white border-[var(--secondary-blue)] border-2 rounded-3xl p-4 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                      <img
                        src={selectedTutor.avatar}
                        alt={selectedTutor.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-blue-200"
                      />
                      <div className="flex flex-col justify-center">
                        <span className="font-semibold text-[var(--secondary-blue)] text-lg leading-tight">
                          {selectedTutor.name}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[var(--secondary-blue)] text-base">
                            Profil intermédiaire
                          </span>
                          <span className="text-[var(--secondary-blue)] text-base">
                            •
                          </span>
                          <span className="text-[var(--secondary-blue)] text-base">
                            Bac+2
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[var(--secondary-blue)] text-sm mb-1">
                        Note :{" "}
                      </span>
                      <span className="bg-white text-[var(--secondary-blue)] border-1 border-[var(--secondary-blue)] rounded-full px-3 py-1 text-sm flex items-center gap-1 shadow">
                        {selectedTutor.rating.toFixed(1)}
                        <FaStar className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                  <div className="bg-white border-2 border-[var(--secondary-blue)] rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
                    <div className="font-bold text-[var(--secondary-blue)] text-base mb-1">
                      Description
                    </div>
                    <div className="flex flex-wrap gap-4 text-base text-[var(--secondary-blue)] mb-1">
                      <span>{selectedTutor.atelier.title}</span>
                      <span>•</span>
                      <span>{selectedTutor.atelier.time}</span>
                      <span>•</span>
                      <span>{selectedTutor.atelier.date}</span>
                    </div>
                    <div className="text-[var(--secondary-blue)] text-base mb-2">
                      Introduction au Business Model.
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <img
                        src={selectedTutor.avatar}
                        alt="avatar1"
                        className="w-7 h-7 rounded-full border-2 border-white -ml-1"
                      />
                      <img
                        src="/profils/edouard.jpg"
                        alt="avatar2"
                        className="w-7 h-7 rounded-full border-2 border-white -ml-1"
                      />
                      <img
                        src="/profils/nathan.png"
                        alt="avatar3"
                        className="w-7 h-7 rounded-full border-2 border-white -ml-1"
                      />
                      <span className="text-[var(--secondary-blue)] text-base ml-2">
                        13 étudiants qui participent
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {modalStep === "code" && (
              <div className="flex flex-col min-h-0 bg-[#F7FAFF] rounded-2xl">
                <button
                  className="flex items-center gap-2 text-[var(--secondary-blue)] text-sm mb-4 mt-6 ml-4 w-fit hover:underline"
                  onClick={() => setModalStep("info")}
                >
                  <span className="text-lg">&lt;</span> Retour
                </button>
                <h2 className="text-2xl text-[var(--secondary-blue)] mb-2 text-center">
                  Rejoindre l&apos;atelier
                </h2>
                <p className="text-gray-500 text-center mb-6 px-4 text-lg">
                  Rentre le code d&apos;entrée reçu par mail ou par SMS pour
                  participer à l&apos;atelier.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (code.every((val) => val.length === 1))
                      setModalStep("loading");
                  }}
                >
                  <div className="flex justify-center items-center gap-4 mb-6">
                    <div className="flex gap-4">
                      {code.slice(0, 3).map((val, idx) => (
                        <input
                          key={idx}
                          className="w-16 h-16 text-3xl text-center border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:border-[var(--secondary-blue)]"
                          maxLength={1}
                          placeholder="0"
                          value={val}
                          onChange={(e) => {
                            const newCode = [...code];
                            newCode[idx] = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 1);
                            setCode(newCode);
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-3xl text-gray-400 font-bold flex items-center justify-center h-16">
                      -
                    </span>
                    <div className="flex gap-4">
                      {code.slice(3, 6).map((val, idx) => (
                        <input
                          key={idx + 3}
                          className="w-16 h-16 text-3xl text-center border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:border-[var(--secondary-blue)]"
                          maxLength={1}
                          placeholder="0"
                          value={val}
                          onChange={(e) => {
                            const newCode = [...code];
                            newCode[idx + 3] = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 1);
                            setCode(newCode);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-[var(--secondary-blue)]/10 p-6 mx-4 flex flex-col items-center">
                    <p className="text-gray-500 text-lg mb-4 text-center">
                      Tu n&apos;as toujours pas reçu ton code de vérification ?
                    </p>
                    <button
                      type="button"
                      className="bg-[var(--secondary-blue)] hover:bg-blue-200 text-white  px-6 py-2 rounded-full mb-4 transition"
                    >
                      Envoyer un nouveau code
                    </button>
                    <div className="flex items-center w-full mb-4">
                      <div className="flex-1 h-px bg-[var(--secondary-blue)]" />
                      <span className="mx-2 text-[var(--secondary-blue)] text-base">
                        Essayer une autre méthode
                      </span>
                      <div className="flex-1 h-px bg-[var(--secondary-blue)]" />
                    </div>
                    <button
                      type="button"
                      className="flex items-center gap-2 bg-[var(--secondary-blue)] hover:bg-blue-200 text-white px-5 py-2 rounded-full transition"
                    >
                      <Smartphone className="w-5 h-5" />
                      Envoyer par SMS
                    </button>
                  </div>
                  <button type="submit" className="hidden" aria-hidden="true" />
                </form>
              </div>
            )}
            {modalStep === "loading" && (
              <div className="flex flex-col items-center justify-center min-h-[400px] bg-[#F7FAFF] rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-[var(--secondary-blue)] mb-2 text-center">
                  Rejoindre l&apos;atelier
                </h2>
                <p className="text-gray-500 text-center mb-8">
                  Vérification du code en cours…
                </p>
                <div className="flex items-center justify-center">
                  <Image
                    src="/logo/icon.png"
                    alt="logo"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            )}
            {modalStep === "success" && (
              <div className="flex flex-col items-center justify-center min-h-[400px] bg-[#F7FAFF] rounded-2xl p-8">
                <h2 className="text-3xl text-[var(--secondary-blue)] mb-2 text-center">
                  Rejoindre l&apos;atelier
                </h2>
                <p className="text-gray-500 text-center mb-8 text-lg">
                  Le code de vérification est validé.
                  <br />
                  Vous allez bientôt accéder à l&apos;atelier.
                </p>
                <div className="flex items-center justify-center mb-8">
                  <CheckCircle className="w-32 h-32 text-[var(--secondary-blue)]" />
                </div>
                <button
                  className="flex items-center gap-2 bg-[var(--secondary-blue)] hover:bg-[var(--secondary-blue)]/20 text-white font-medium px-6 py-2 rounded-full mb-4 transition"
                  onClick={() => {
                    if (selectedTutor) {
                      router.push(`/workshops/${selectedTutor.id}`);
                    }
                  }}
                >
                  <FiBook className="w-5 h-5" />
                  Rejoindre l&apos;atelier
                </button>
                <button className="flex items-center gap-2 bg-[var(--secondary-blue)] hover:bg-[var(--secondary-blue)]/30 text-white font-medium px-6 py-2 rounded-full transition">
                  <Link2 className="w-5 h-5" />
                  Copier le lien
                </button>
              </div>
            )}
            {modalStep === "atelier" && selectedTutor && (
              <div className="flex flex-col items-center w-full bg-white rounded-2xl p-8 gap-6">
                <h2 className="text-3xl text-[var(--secondary-blue)] font-semibold text-center mb-1">
                  Rejoindre l&apos;atelier
                </h2>
                <p className="text-gray-500 text-center mb-4">
                  Reçois ton code d&apos;entrée pour participer à
                  l&apos;atelier.
                </p>
                <div className="flex gap-4 mb-4">
                  <button
                    className="flex items-center gap-2 border border-[var(--secondary-blue)] text-[var(--secondary-blue)] font-medium px-5 py-2 rounded-lg bg-white hover:bg-blue-50 transition"
                    onClick={() => setModalStep("code")}
                  >
                    <Smartphone className="w-5 h-5" />
                    Envoyer par SMS
                  </button>

                  <button
                    className="flex items-center gap-2 border border-[var(--secondary-blue)] text-[var(--secondary-blue)] font-medium px-5 py-2 rounded-lg bg-white hover:bg-blue-50 transition"
                    onClick={() => setModalStep("code")}
                  >
                    <MailIcon className="w-5 h-5" />
                    Envoyer par mail
                  </button>
                </div>
                <div className="flex items-center w-full mb-4">
                  <div className="flex-1 h-px bg-[var(--secondary-blue)]" />
                  <span className="mx-2 text-[var(--secondary-blue)] text-base font-medium">
                    Informations sur la session
                  </span>
                  <div className="flex-1 h-px bg-[var(--secondary-blue)]" />
                </div>
                <div className="w-full border-2 border-[var(--secondary-blue)] rounded-2xl p-4 flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedTutor.avatar}
                      alt={selectedTutor.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-blue-200"
                    />
                    <div className="flex flex-col justify-center">
                      <span className="font-semibold text-[var(--secondary-blue)] text-lg leading-tight">
                        {selectedTutor.name}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[var(--secondary-blue)] text-base">
                          Profil intermédiaire
                        </span>
                        <span className="text-[var(--secondary-blue)] text-base">
                          •
                        </span>
                        <span className="text-[var(--secondary-blue)] text-base">
                          Bac+2
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--secondary-blue)] text-sm">
                      Note :
                    </span>
                    <span className="bg-white text-[var(--secondary-blue)] border border-[var(--secondary-blue)] rounded-full px-3 py-1 text-sm flex items-center gap-1 shadow">
                      {selectedTutor.rating.toFixed(1)}
                      <FaStar className="w-4 h-4" />
                    </span>
                  </div>
                </div>
                <div className="w-full border-2 border-[var(--secondary-blue)] rounded-2xl p-4 flex flex-col gap-3">
                  <div className="font-bold text-[var(--secondary-blue)] text-base mb-1">
                    Description
                  </div>
                  <div className="flex flex-wrap gap-4 text-base text-[var(--secondary-blue)] mb-1">
                    <span>{selectedTutor.atelier.title}</span>
                    <span>•</span>
                    <span>{selectedTutor.atelier.time}</span>
                  </div>
                  <div className="text-[var(--secondary-blue)] text-base mb-2">
                    Introduction au business model
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <img
                      src={selectedTutor.avatar}
                      alt="avatar1"
                      className="w-7 h-7 rounded-full border-2 border-white -ml-1"
                    />
                    <img
                      src="/profils/edouard.jpg"
                      alt="avatar2"
                      className="w-7 h-7 rounded-full border-2 border-white -ml-1"
                    />
                    <img
                      src="/profils/nathan.png"
                      alt="avatar3"
                      className="w-7 h-7 rounded-full border-2 border-white -ml-1"
                    />
                    <span className="text-[var(--secondary-blue)] text-base ml-2">
                      13 étudiants qui participent
                    </span>
                  </div>
                </div>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Search;
