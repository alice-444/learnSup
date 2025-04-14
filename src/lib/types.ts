//Navbar
export interface NavItem {
  name: string;
  minWidth: number;
  path: string;
}

export interface NavLinkProps {
  item: NavItem;
  onClick?: () => void;
  variant?: "desktop" | "mobile" | "tablet";
}

export interface NavLinksProps {
  items: NavItem[];
  onClick?: () => void;
  variant: "desktop" | "mobile" | "tablet";
}

//page messages

export interface FileAttachment {
  id: number;
  name: string;
  type: string;
  size: string;
  url: string;
}

export interface Message {
  id: number;
  content: string;
  sender: "user" | "other";
  timestamp: Date;
  read?: boolean;
  attachment?: FileAttachment;
}

export interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  unread: number;
  avatar: string;
  online: boolean;
  typing?: boolean;
  messages: Message[];
}

export interface ChatMessageProps {
  message: Message;
  formatTime: (date: Date) => string;
}

export interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onClick: () => void;
}

export interface SidebarProps {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onSelectConversation: (conversation: Conversation) => void;
}

export interface FileAttachment {
  id: number;
  name: string;
  type: string;
  size: string;
  url: string;
}

export interface Message {
  id: number;
  content: string;
  sender: "user" | "other";
  timestamp: Date;
  read?: boolean;
  attachment?: FileAttachment;
}

export interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  unread: number;
  avatar: string;
  online: boolean;
  typing?: boolean;
  messages: Message[];
}
