//Navbar
export interface NavItem {
  name: string;
  minWidth: number;
  path: string;
  icon?: React.ReactNode;
}

export interface NavLinkProps {
  item: NavItem;
  onClick?: () => void;
  variant?: "desktop" | "tablet" | "mobile";
}

export interface NavLinksProps {
  items: NavItem[];
  variant?: "desktop" | "tablet" | "mobile";
  onClick?: () => void;
}

export interface IconButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
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

//search page

export interface Tutor {
  id: number;
  name: string;
  level: string;
  status: string;
  ateliersGiven: number;
  rating: number;
  evaluations: number;
  avatar: string;
  online?: boolean;
  atelier: {
    title: string;
    time: string;
    participants: number;
    isOnline?: boolean;
  };
}

export interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  totalResults: number;
}

export interface SearchFiltersProps {
  selectedFilters: {
    today: boolean;
    level: string;
    subject: string;
    rating: boolean;
  };
  onFilterChange: (
    key: keyof SearchFiltersProps["selectedFilters"],
    value: boolean | string
  ) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export interface TutorListProps {
  tutors: Tutor[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export interface TutorCardProps {
  tutor: Tutor;
}

