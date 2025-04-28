"use client";

import { FiBook } from "react-icons/fi";
import { useState, useMemo, useEffect } from "react";
import { mockWorkshops } from "@/lib/data/mockWorkshops";
import { Pagination } from "@/components/search/Pagination";
import { WorkshopList } from "@/components/workshops/WorkshopList";
import { WorkshopSearchBar } from "@/components/workshops/WorkshopSearchBar";

const isPast = (dateStr: string) => {
  return new Date(dateStr) < new Date();
};

const Workshops = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"past" | "upcoming">("past");
  const itemsPerPage = 6;

  const pastWorkshops = mockWorkshops.filter((w) => isPast(w.date));
  const upcomingWorkshops = mockWorkshops.filter((w) => !isPast(w.date));

  const filteredPast = useMemo(
    () =>
      pastWorkshops.filter(
        (w) =>
          w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          w.course.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery, pastWorkshops]
  );
  const filteredUpcoming = useMemo(
    () =>
      upcomingWorkshops.filter(
        (w) =>
          w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          w.course.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery, upcomingWorkshops]
  );
  const filteredWorkshops =
    activeTab === "past" ? filteredPast : filteredUpcoming;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeTab]);

  const totalPages = Math.ceil(filteredWorkshops.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentWorkshops = filteredWorkshops.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <FiBook size={32} className="text-blue-400" />
              Mes ateliers
            </h1>
            <p className="text-xl text-gray-300">
              Tu as{" "}
              <span className="text-blue-300 font-bold">
                {filteredWorkshops.length}
              </span>{" "}
              atelier(s) {activeTab === "past" ? "passées" : "à venir"} …
            </p>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === "past"
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("past")}
            >
              Atelier(s) passés
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === "upcoming"
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("upcoming")}
            >
              Atelier(s) à venir
            </button>
          </div>

          <WorkshopSearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <WorkshopList
            workshops={currentWorkshops}
            isUpcoming={activeTab === "upcoming"}
          />

          {filteredWorkshops.length === 0 && (
            <div className="text-center py-8">
              <p className="text-white/60 text-lg">
                Aucun atelier correspond à votre recherche
              </p>
            </div>
          )}

          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              totalItems={filteredWorkshops.length}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workshops;
