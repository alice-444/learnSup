"use client";

import { mockTutors } from "@/lib/data/mockTutors";
import { useState, useMemo, useEffect } from "react";
import { SearchHeader } from "@/components/search/SearchHeader";
import { TutorList } from "@/components/search/tutor/TutorList";
import { SearchFilters } from "@/components/search/SearchFilters";

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

  const handleFilterChange = (
    key: keyof typeof selectedFilters,
    value: boolean | string
  ) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
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
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
