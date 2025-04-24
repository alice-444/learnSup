import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FiFilter,
  FiCalendar,
  FiAward,
  FiBook,
  FiStar,
  FiPlus,
  FiChevronDown,
} from "react-icons/fi";
import { SearchFiltersProps } from "@/lib/types";

export const SearchFilters = ({
  selectedFilters,
  onFilterChange,
}: SearchFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <motion.div
        className="text-sm text-white flex items-center gap-2"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        <FiFilter className="w-4 h-4" />
        Filtres
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Button
          variant="outline"
          className={`rounded-full text-sm gap-2 border-white/10 hover:bg-[var(--secondary-blue)] hover:text-white transition-all duration-200 relative overflow-hidden ${
            selectedFilters.today
              ? "bg-[var(--secondary-blue)] text-white"
              : "bg-white/5 text-white"
          }`}
          onClick={() => onFilterChange("today", !selectedFilters.today)}
        >
          <FiCalendar className="w-4 h-4" />
          Aujourd&apos;hui
          {selectedFilters.today && (
            <motion.div
              className="absolute inset-0 bg-white/10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            />
          )}
        </Button>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full text-sm gap-2 bg-white/5 text-white border-white/10 hover:bg-white/10 transition-all duration-200"
            >
              <FiAward className="w-4 h-4" />
              Statut : {selectedFilters.level}
              <motion.div
                animate={{ rotate: 180 }}
                transition={{ duration: 0.2 }}
              >
                <FiChevronDown className="w-4 h-4" />
              </motion.div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#1B2559] border-white/10">
            <DropdownMenuItem
              className="text-white/80 hover:text-white focus:text-white hover:bg-white/10 focus:bg-white/10"
              onClick={() => onFilterChange("level", "débutant")}
            >
              Débutant
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-white/80 hover:text-white focus:text-white hover:bg-white/10 focus:bg-white/10"
              onClick={() => onFilterChange("level", "intermédiaire")}
            >
              Intermédiaire
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-white/80 hover:text-white focus:text-white hover:bg-white/10 focus:bg-white/10"
              onClick={() => onFilterChange("level", "expert")}
            >
              Expert
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full text-sm gap-2 bg-white/5 text-white border-white/10 hover:bg-white/10 transition-all duration-200"
            >
              <FiBook className="w-4 h-4" />
              Sujet : {selectedFilters.subject}
              <motion.div
                animate={{ rotate: 180 }}
                transition={{ duration: 0.2 }}
              >
                <FiChevronDown className="w-4 h-4" />
              </motion.div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#1B2559] border-white/10">
            <DropdownMenuItem
              className="text-white/80 hover:text-white focus:text-white hover:bg-white/10 focus:bg-white/10"
              onClick={() => onFilterChange("subject", "UX Design")}
            >
              UX Design
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-white/80 hover:text-white focus:text-white hover:bg-white/10 focus:bg-white/10"
              onClick={() => onFilterChange("subject", "UI Design")}
            >
              UI Design
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-white/80 hover:text-white focus:text-white hover:bg-white/10 focus:bg-white/10"
              onClick={() => onFilterChange("subject", "Web Design")}
            >
              Web Design
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Button
          variant="outline"
          className={`rounded-full text-sm gap-2 border-white/10 hover:bg-[#3B82F6] hover:text-white transition-all duration-200 relative overflow-hidden ${
            selectedFilters.rating
              ? "bg-[#3B82F6] text-white"
              : "bg-white/5 text-white"
          }`}
          onClick={() => onFilterChange("rating", !selectedFilters.rating)}
        >
          <FiStar className="w-4 h-4" />
          Mieux notés
          {selectedFilters.rating && (
            <motion.div
              className="absolute inset-0 bg-white/10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            />
          )}
        </Button>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Button
          variant="outline"
          className="rounded-full text-sm gap-2 bg-white/5 text-white border-white/10 hover:bg-[#3B82F6] transition-all duration-200"
        >
          <FiPlus className="w-4 h-4" />
          Ajouter un filtre
        </Button>
      </motion.div>
    </div>
  );
};
