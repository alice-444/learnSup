"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FiSend,
  FiPaperclip,
  FiCheck,
  FiClock,
  FiSearch,
  FiSmile,
  FiImage,
  FiChevronLeft,
  FiChevronRight,
  FiVideo,
  FiMoreVertical,
} from "react-icons/fi";
import { Conversation, Message } from "@/lib/types";

const mockConversations: Conversation[] = [
  {
    id: 1,
    name: "Johan Stirling",
    lastMessage: "Est en train d'écrire...",
    unread: 1,
    avatar: "/avatars/johan.jpg",
    online: true,
    typing: true,
    messages: [
      {
        id: 1,
        content: "Salut ! Comment vas-tu ?",
        sender: "other",
        timestamp: new Date(2024, 2, 15, 10, 30),
        read: true,
      },
    ],
  },
  {
    id: 2,
    name: "Kalina Aufrey",
    lastMessage: "Top ! Merci beaucoup Maxime, à toi aussi :)",
    unread: 0,
    avatar: "/avatars/kalina.jpg",
    online: false,
    messages: [
      {
        id: 1,
        content:
          "Salut Kalina, j'espère que tu vas bien. Comme convenu, je t'envoie mon devoir d'infographie, même s'il n'est pas encore fini.",
        sender: "user",
        timestamp: new Date(2024, 2, 15, 14, 30),
        read: true,
      },
      {
        id: 2,
        content:
          "Hello Maxime, je vais bien merci et toi ? Il n'y a aucun souci ;)",
        sender: "other",
        timestamp: new Date(2024, 2, 15, 14, 35),
        read: true,
      },
      {
        id: 3,
        content:
          "Voilà le fichier, n'hésite pas à me dire ce que tu en penses. Bonne journée à toi !",
        sender: "user",
        timestamp: new Date(2024, 2, 15, 14, 40),
        read: true,
        attachment: {
          id: 1,
          name: "Infographie - 13 Mars 2025",
          type: "PDF",
          size: "3,5Mo",
          url: "/files/infographie.pdf",
        },
      },
    ],
  },
  {
    id: 3,
    name: "Marie Antoinette",
    lastMessage: "Je t'envoie mes cours ce soir",
    unread: 0,
    avatar: "/avatars/marie.jpg",
    online: true,
    messages: [],
  },
];

const Messages = () => {
  const [conversations, setConversations] =
    useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<
    number | null
  >(2);
  const [messageInput, setMessageInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversations]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: Date.now(),
      content: messageInput,
      sender: "user",
      timestamp: new Date(),
      read: false,
    };

    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.id === selectedConversation
          ? {
              ...conv,
              lastMessage: messageInput,
              messages: [...conv.messages, newMessage],
            }
          : conv
      )
    );

    setMessageInput("");

    setTimeout(() => {
      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.id === selectedConversation
            ? {
                ...conv,
                messages: conv.messages.map((msg) =>
                  msg.id === newMessage.id ? { ...msg, read: true } : msg
                ),
              }
            : conv
        )
      );
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  const shouldShowDate = (messages: Message[], index: number) => {
    if (index === 0) return true;
    const currentDate = new Date(messages[index].timestamp);
    const previousDate = new Date(messages[index - 1].timestamp);
    return currentDate.toDateString() !== previousDate.toDateString();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1B2559]">
      <div className="flex-1 flex relative">
        <motion.aside
          initial={false}
          animate={{
            width: isSidebarOpen ? "350px" : "0px",
            opacity: isSidebarOpen ? 1 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className="h-full bg-white/5 backdrop-blur-md border-r border-white/10 overflow-hidden flex-shrink-0"
        >
          <div className="w-[350px] h-full">
            <div className="p-0">
              <div className="px-4 pt-4">
                <h1 className="text-2xl font-semibold text-white mb-6">
                  Discussions
                </h1>
              </div>
              <div className="px-4 mb-6">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Rechercher une discussion"
                    className="w-full bg-white/5 border-0 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full"
                  />
                  <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
              </div>
              <div className="px-4 mb-4">
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    className={`flex-1 text-sm rounded-full px-4 py-2 h-auto ${
                      true ? "bg-white/10 text-white" : "text-gray-400"
                    }`}
                  >
                    Tout
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex-1 text-sm text-gray-400 rounded-full px-4 py-2 h-auto hover:bg-white/5 hover:text-white"
                  >
                    Non lues
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex-1 text-sm text-gray-400 rounded-full px-4 py-2 h-auto hover:bg-white/5 hover:text-white"
                  >
                    Favoris
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex-1 text-sm text-gray-400 rounded-full px-4 py-2 h-auto hover:bg-white/5 hover:text-white"
                  >
                    Groupes
                  </Button>
                </div>
              </div>
              <div className="space-y-0 max-h-[calc(100vh-12rem)] overflow-y-auto custom-scrollbar">
                {conversations.map((conversation) => (
                  <motion.div
                    key={conversation.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div
                      className={`px-4 py-3 cursor-pointer transition-all flex items-center gap-3 ${
                        selectedConversation === conversation.id
                          ? "bg-white/10"
                          : "hover:bg-white/5"
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
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-white truncate">
                            {conversation.name}
                          </h3>
                          {conversation.messages.length > 0 && (
                            <span className="text-xs text-gray-400">
                              {formatTime(conversation.messages[conversation.messages.length - 1].timestamp)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-gray-300 truncate flex-1">
                            {conversation.typing ? (
                              <span className="text-blue-400">
                                Est en train d&apos;écrire...
                              </span>
                            ) : (
                              conversation.lastMessage
                            )}
                          </p>
                          {conversation.unread > 0 && (
                            <div className="ml-2 w-5 h-5 bg-[#D90429] rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-xs text-white font-medium">
                                {conversation.unread}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.aside>

        <motion.button
          initial={false}
          animate={{
            left: isSidebarOpen ? "330px" : "10px",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-1/2 -translate-y-1/2 z-20 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 hover:text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg border border-white/10"
        >
          {isSidebarOpen ? (
            <FiChevronLeft className="h-4 w-4" />
          ) : (
            <FiChevronRight className="h-4 w-4" />
          )}
        </motion.button>

        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              <div className="p-4 bg-white/5 backdrop-blur-md border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        conversations.find((c) => c.id === selectedConversation)
                          ?.avatar
                      }
                      alt="Avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="font-semibold text-white">
                        {
                          conversations.find((c) => c.id === selectedConversation)
                            ?.name
                        }
                      </h2>
                      <p className="text-sm text-gray-400">
                        {conversations.find((c) => c.id === selectedConversation)
                          ?.online
                          ? "En ligne"
                          : "Hors ligne"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white hover:bg-white/10"
                    >
                      <FiVideo className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white hover:bg-white/10"
                    >
                      <FiMoreVertical className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {conversations
                  .find((c) => c.id === selectedConversation)
                  ?.messages.map((message, index, messages) => (
                    <AnimatePresence key={message.id}>
                      <>
                        {shouldShowDate(messages, index) && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-center my-4"
                          >
                            <span className="text-xs text-gray-400 bg-[#2D3250]/50 backdrop-blur-sm px-3 py-1 rounded-full">
                              {formatDate(message.timestamp)}
                            </span>
                          </motion.div>
                        )}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${
                            message.sender === "user"
                              ? "justify-end"
                              : "justify-start"
                          } items-end gap-2`}
                        >
                          {message.sender !== "user" && (
                            <img
                              src={
                                conversations.find(
                                  (c) => c.id === selectedConversation
                                )?.avatar
                              }
                              alt="Avatar"
                              className="w-6 h-6 rounded-full object-cover"
                            />
                          )}
                          <div
                            className={`group relative max-w-[85%] md:max-w-[70%] rounded-2xl p-3 ${
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
                                    {message.attachment.type} -{" "}
                                    {message.attachment.size}
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
                          {message.sender === "user" && (
                            <img
                              src="/avatars/user.jpg"
                              alt="User Avatar"
                              className="w-6 h-6 rounded-full object-cover"
                            />
                          )}
                        </motion.div>
                      </>
                    </AnimatePresence>
                  ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 bg-[#2D3250]/70 backdrop-blur-md border-t border-gray-200/20">
                <div className="flex gap-2 items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white hover:bg-white/10"
                  >
                    <FiPaperclip className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white hover:bg-white/10"
                  >
                    <FiImage className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white hover:bg-white/10"
                  >
                    <FiSmile className="h-5 w-5" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Taper un message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="w-full bg-white/10 border-0 text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-white/20 rounded-full"
                    />
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className="bg-[#D97706] hover:bg-[#D97706]/90 text-white rounded-full"
                  >
                    <FiSend className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Envoyer</span>
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center bg-[#2D3250]/50 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-lg font-medium text-white mb-2">
                  Aucune conversation sélectionnée
                </h3>
                <p className="text-gray-400">
                  Sélectionnez une conversation pour commencer à discuter
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
