import { FiSearch } from "react-icons/fi";
import { SearchBarProps } from "@/lib/types";

export const SearchBar = ({
  searchQuery,
  onSearchChange,
  resultsCount,
}: SearchBarProps) => {
  return (
    <div className="flex gap-4 mb-6">
      <div className="flex-1">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full px-4 py-2 pl-11 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-all duration-200"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <FiSearch size={20} />
          </div>
        </div>
      </div>
      <div className="flex items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 text-white">
        <span>{resultsCount} relations trouvées</span>
      </div>
    </div>
  );
};
