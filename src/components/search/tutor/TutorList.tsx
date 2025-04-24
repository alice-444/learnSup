import { motion } from "framer-motion";
import { TutorCard } from "@/components/search/tutor/TutorCard";
import { Pagination } from "@/components/search/Pagination";
import { TutorListProps } from "@/lib/types";

export const TutorList = ({
  tutors,
  currentPage,
  itemsPerPage,
  onPageChange,
}: TutorListProps) => {
  const totalPages = Math.ceil(tutors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTutors = tutors.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-4">
      {currentTutors.map((tutor) => (
        <TutorCard key={tutor.id} tutor={tutor} />
      ))}

      {tutors.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <p className="text-white/60 text-lg">
            Aucun tuteur ne correspond à vos critères de recherche
          </p>
        </motion.div>
      )}

      {tutors.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={tutors.length}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};
