import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { SearchHeaderProps } from "@/lib/types";
import { FiSearch, FiUsers } from "react-icons/fi";

export const SearchHeader = ({
  searchQuery,
  onSearchChange,
  totalResults,
}: SearchHeaderProps) => {
  const { user } = useUser();

  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold mb-2 text-white">
        Hello,{" "}
        <span className="text-[#3B82F6]">{user?.firstName || "Guest"}</span> !
      </h1>
      <div className="flex items-center gap-3 text-white">
        <FiUsers className="w-6 h-6" />
        <p className="text-lg">Trouvez vos futurs accompagnateurs</p>
      </div>

      <div className="relative mt-6">
        <div className="relative">
          <Input
            type="search"
            placeholder="Rechercher un accompagnateur..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-[200px] py-6 rounded-full bg-[#1B2559]/50 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-white/20"
          />
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#1B2559]/80 px-3 py-1 rounded-full text-sm text-white/80">
            {totalResults}{" "}
            {totalResults > 1
              ? "accompagnateurs trouvés"
              : "accompagnateur trouvé"}
          </div>
        </div>
      </div>
    </div>
  );
};
