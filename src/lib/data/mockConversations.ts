import { Conversation } from "@/lib/types";

export const mockConversations: Conversation[] = [
  {
    id: 1,
    name: "Johan Stirling",
    lastMessage: "Est en train d'écrire...",
    unread: 1,
    avatar: "/profils/zoe.png",
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
    avatar: "/profils/zoe.png",
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
    avatar: "/profils/sarah.png",
    online: true,
    messages: [],
  },
];
