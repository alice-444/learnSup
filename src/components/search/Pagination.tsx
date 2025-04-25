import { PaginationProps } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export const Pagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(1);
      pageNumbers.push("...");
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      pageNumbers.push("...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <motion.div
      className="mt-8 flex items-center justify-between gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="text-sm text-white/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        Affichage de {Math.min(currentPage * itemsPerPage, totalItems)} sur{" "}
        {totalItems} résultats
      </motion.div>

      <div className="flex items-center justify-center gap-2">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 rounded-full bg-white/5 text-white border-white/10 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <motion.div
              whileHover={{ x: -2 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
            >
              <FiChevronLeft className="w-4 h-4" />
            </motion.div>
          </Button>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {getPageNumbers().map((page, index) => (
              <motion.div
                key={`${page}-${index}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 17,
                }}
              >
                {page === "..." ? (
                  <span className="w-8 text-center text-white/60">...</span>
                ) : (
                  <Button
                    variant={page === currentPage ? "default" : "outline"}
                    size="sm"
                    className={`rounded-full min-w-[32px] h-8 ${
                      page === currentPage
                        ? "bg-[#3B82F6] hover:bg-[#3B82F6]/90 relative"
                        : "bg-white/5 text-white border-white/10 hover:bg-white/10"
                    }`}
                    onClick={() => onPageChange(Number(page))}
                  >
                    {page}
                    {page === currentPage && (
                      <motion.div
                        className="absolute inset-0 bg-white/10 rounded-full"
                        layoutId="activePage"
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                        }}
                      />
                    )}
                  </Button>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 rounded-full bg-white/5 text-white border-white/10 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <motion.div
              whileHover={{ x: 2 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
            >
              <FiChevronRight className="w-4 h-4" />
            </motion.div>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};
