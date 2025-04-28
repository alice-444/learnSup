import { FaFilter } from "react-icons/fa";

export const WorkshopSearchBar = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
}) => {
  const searchInputClass =
    "w-full px-4 py-2 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 transition";
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center">
      <div className="flex-1 w-full max-w-lg mx-auto sm:mx-0">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={searchInputClass}
        />
      </div>
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-[var(--secondary-blue)] font-medium shadow hover:bg-[var(--secondary-blue)] hover:text-white transition">
        <FaFilter className="h-5 w-5" />
        Filtres
      </button>
    </div>
  );
};
