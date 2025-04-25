"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiUsers } from "react-icons/fi";
import { Pagination } from "@/components/search/Pagination";
import { RelationCard } from "@/components/relations/RelationCard";
import { SearchBar } from "@/components/relations/SearchBar";
import { mockRelations } from "@/lib/data/mockRelations";

export default function Relations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredRelations = mockRelations.filter((relation) =>
    relation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRelations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRelations = filteredRelations.slice(
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
              <FiUsers size={32} className="text-blue-400" />
              Vos relations
            </h1>
            <p className="text-xl text-gray-300">
              Retrouvez votre réseau relationnel
            </p>
          </div>

          <div className="mb-8">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              resultsCount={filteredRelations.length}
            />
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentRelations.map((relation) => (
                <RelationCard key={relation.id} relation={relation} />
              ))}
            </div>

            {filteredRelations.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <p className="text-white/60 text-lg">
                  Aucune relation ne correspond à votre recherche
                </p>
              </motion.div>
            )}

            {filteredRelations.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                totalItems={filteredRelations.length}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
