import { motion } from "framer-motion";
import { FiChevronLeft } from "react-icons/fi";
import { ConversationItem } from "./ConversationItem";
import { SidebarProps } from "@/lib/types";

export const Sidebar = ({
  conversations,
  selectedConversation,
  isSidebarOpen,
  onToggleSidebar,
  onSelectConversation,
}: SidebarProps) => {
  return (
    <motion.div
      className="relative h-full"
      initial={false}
      animate={{
        width: isSidebarOpen ? "320px" : "0px",
        opacity: isSidebarOpen ? 1 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <div className="h-full bg-[#2D3250]/50 backdrop-blur-md overflow-hidden">
        <div className="p-4">
          <h2 className="text-xl font-semibold text-white mb-4">Messages</h2>
          <div className="space-y-2">
            {conversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                isSelected={selectedConversation?.id === conversation.id}
                onClick={() => onSelectConversation(conversation)}
              />
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={onToggleSidebar}
        className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10
          bg-[#2D3250] text-white p-1 rounded-full shadow-lg hover:bg-[#373D5E] transition-colors"
      >
        <motion.div
          animate={{ rotate: isSidebarOpen ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          <FiChevronLeft size={20} />
        </motion.div>
      </button>
    </motion.div>
  );
};
