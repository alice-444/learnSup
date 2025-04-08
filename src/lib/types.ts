//Navbar
export interface NavItem {
  name: string;
  minWidth: number;
  path: string;
}

export interface NavLinkProps {
  item: NavItem;
  onClick?: () => void;
  variant?: "desktop" | "mobile";
}

export interface NavLinksProps {
  items: NavItem[];
  onClick?: () => void;
  variant: "desktop" | "mobile";
}
