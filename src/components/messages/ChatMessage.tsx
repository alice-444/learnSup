import { motion } from "framer-motion";
import { FiCheck, FiClock, FiImage } from "react-icons/fi";
import { ChatMessageProps } from "@/lib/types";

export const ChatMessage = ({ message, formatTime }: ChatMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${
        message.sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`group relative max-w-[85%] md:max-w-[70%] rounded-lg p-3 ${
          message.sender === "user"
            ? "bg-[#D97706] text-white rounded-br-none"
            : "bg-[#2D3250]/70 backdrop-blur-sm text-white rounded-bl-none"
        }`}
      >
        <p className="text-sm whitespace-pre-wrap break-words">
          {message.content}
        </p>
        {message.attachment && (
          <div className="mt-2 p-3 bg-[#2D3250]/50 backdrop-blur-sm rounded-lg flex items-center gap-3">
            <div className="w-12 h-12 bg-[#D97706] rounded-lg flex items-center justify-center">
              <FiImage className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {message.attachment.name}
              </p>
              <p className="text-xs text-gray-300">
                {message.attachment.type} - {message.attachment.size}
              </p>
            </div>
          </div>
        )}
        <div className="flex items-center gap-2 mt-1">
          <p className="text-white/80 text-xs">
            {formatTime(message.timestamp)}
          </p>
          {message.sender === "user" && (
            <span className="text-white/80">
              {message.read ? (
                <FiCheck className="w-3 h-3" />
              ) : (
                <FiClock className="w-3 h-3" />
              )}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
