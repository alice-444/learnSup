import { RelationCardProps } from "@/lib/types";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiMoreVertical } from "react-icons/fi";

export const RelationCard = ({ relation }: RelationCardProps) => {
  return (
    <motion.div
      className="bg-[#1E1E1E]/80 backdrop-blur-md rounded-xl p-4 flex items-center justify-between border border-white/10 hover:border-white/20 transition-all relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-black/30 to-transparent" />
      <div className="flex items-center gap-4">
        <div className="relative">
          <Image
            src={relation.imageUrl}
            alt={relation.name}
            width={64}
            height={64}
            className="rounded-full ring-2 ring-white/10"
          />
        </div>
        <div>
          <h3 className="text-white text-lg font-semibold">
            {relation.name}
          </h3>
          <p className="text-gray-400">
            {relation.commonRelations} relations en commun
          </p>
        </div>
      </div>
      <button className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-black/20">
        <FiMoreVertical size={20} />
      </button>
    </motion.div>
  );
}; 