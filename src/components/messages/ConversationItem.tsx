import { motion } from "framer-motion";
import { ConversationItemProps } from "@/lib/types";

export const ConversationItem = ({
  conversation,
  isSelected,
  onClick,
}: ConversationItemProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div
        className={`p-3 rounded-lg cursor-pointer transition-all flex items-center gap-3 ${
          isSelected ? "bg-white/20" : "hover:bg-white/10"
        }`}
      >
        <div className="relative flex-shrink-0">
          <img
            src={conversation.avatar}
            alt={conversation.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          {conversation.online && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#2D3250]" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-white truncate">
            {conversation.name}
          </h3>
          <p className="text-sm text-gray-300 truncate">
            {conversation.typing ? (
              <span className="text-blue-400">
                Est en train d&apos;écrire...
              </span>
            ) : (
              conversation.lastMessage
            )}
          </p>
        </div>
        {conversation.unread > 0 && (
          <div className="w-5 h-5 bg-[#D97706] rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xs text-white font-medium">
              {conversation.unread}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
