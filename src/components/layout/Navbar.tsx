"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiUser, FiBell } from "react-icons/fi";
import { NavItem, NavLinkProps, NavLinksProps } from "@/lib/types";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

const navItemsConnected: NavItem[] = [
  { name: "Home", minWidth: 768, path: "/home" },
  { name: "Dashboard", minWidth: 768, path: "/dashboard" },
  { name: "Messages", minWidth: 768, path: "/messages" },
  { name: "Planning", minWidth: 768, path: "/planning" },
  { name: "Relationship", minWidth: 768, path: "/relationship" },
];

function useWindowWidth(): number {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowWidth;
}

const NavLink = ({ item, onClick, variant = "desktop" }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === item.path;

  const baseClassDesktop =
    "min-w-[80px] flex items-center justify-center w-full px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm md:text-base transition-colors";
  const activeClassDesktop = "text-red-500 font-medium";
  const inactiveClassDesktop = "text-gray-900 hover:text-red-400";

  const baseClassMobile =
    "w-full flex items-center px-4 py-3 rounded-lg transition-colors";
  const activeClassMobile = "bg-red-600/10 text-[#D90429]";
  const inactiveClassMobile = "text-gray-700 hover:bg-gray-200";

  const baseClass = variant === "desktop" ? baseClassDesktop : baseClassMobile;
  const activeClass =
    variant === "desktop" ? activeClassDesktop : activeClassMobile;
  const inactiveClass =
    variant === "desktop" ? inactiveClassDesktop : inactiveClassMobile;

  return (
    <motion.div
      className="relative flex-shrink-0"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link
        href={item.path}
        onClick={onClick}
        className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
      >
        <span
          className={
            variant === "desktop" ? "whitespace-nowrap" : "text-lg sm:text-base"
          }
        >
          {item.name}
        </span>
      </Link>
      {variant === "desktop" && isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D90429]"
          layoutId="activeIndicator"
          transition={{ type: "spring", stiffness: 300 }}
        />
      )}
    </motion.div>
  );
};

const NavLinks = ({ items, onClick, variant }: NavLinksProps) => (
  <>
    {items.map((item) => (
      <NavLink
        key={item.name}
        item={item}
        onClick={onClick}
        variant={variant}
      />
    ))}
  </>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const windowWidth = useWindowWidth();

  const visibleItemsConnectedDesktop = useMemo(
    () => navItemsConnected.filter((item) => windowWidth >= item.minWidth),
    [windowWidth]
  );
  const visibleItemsConnectedMobile = navItemsConnected;

  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-[#EDF2F4]/70 backdrop-blur-md border-[#EDF2F4] z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/logo/logo2.png"
                alt="Logo"
                width={160}
                height={64}
                priority
                className="h-24 w-auto object-contain"
              />
            </Link>
          </div>

          <div className="hidden md:flex flex-1 justify-center overflow-hidden">
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-5">
              <SignedIn>
                <NavLinks
                  items={visibleItemsConnectedDesktop}
                  onClick={handleLinkClick}
                  variant="desktop"
                />
              </SignedIn>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <SignedIn>
              <button className="p-2 text-gray-600 hover:text-[#EF233C]">
                <FiBell className="h-6 w-6" />
              </button>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="hidden sm:flex items-center text-[#D90429] hover:text-[#EF233C] cursor-pointer">
                  <span className="text-lg sm:text-base">Account</span>
                </button>
              </SignInButton>
            </SignedOut>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-[#EF233C]"
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pb-4 space-y-1">
                <SignedIn>
                  <NavLinks
                    items={visibleItemsConnectedMobile}
                    onClick={handleLinkClick}
                    variant="mobile"
                  />
                </SignedIn>
                <div className="pt-4 border-t border-gray-200">
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="w-full flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-200">
                        <FiUser className="h-5 w-5 mr-3" />
                        <span className="text-lg sm:text-base">Login</span>
                      </button>
                    </SignInButton>
                  </SignedOut>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
