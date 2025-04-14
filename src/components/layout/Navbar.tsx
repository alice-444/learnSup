"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiUser, FiBell } from "react-icons/fi";
import { NavItem, NavLinkProps, NavLinksProps } from "@/lib/types";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

const TABLET_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 1024;

const navItemsConnected: NavItem[] = [
  { name: "Home", minWidth: 640, path: "/home" },
  { name: "Dashboard", minWidth: 640, path: "/dashboard" },
  { name: "Messages", minWidth: 768, path: "/messages" },
  { name: "Planning", minWidth: 768, path: "/planning" },
  { name: "Relationship", minWidth: 1024, path: "/relationship" },
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

  const baseClassDesktop = "min-w-[70px] px-3 py-2 text-sm transition-colors";
  const baseClassTablet = "min-w-[60px] px-2 py-1 text-sm transition-colors";

  const activeClass = "text-red-500 font-medium";
  const inactiveClass = "text-gray-900 hover:text-red-400";

  return (
    <motion.div
      className="relative flex-shrink-0"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link
        href={item.path}
        onClick={onClick}
        className={`
          ${variant === "desktop" ? baseClassDesktop : baseClassTablet} 
          ${isActive ? activeClass : inactiveClass}
        `}
      >
        <span className="whitespace-nowrap">{item.name}</span>
      </Link>
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D90429]"
          layoutId="activeIndicator"
          transition={{ type: "spring", stiffness: 300 }}
        />
      )}
    </motion.div>
  );
};

const NavLinks = ({ items, variant, onClick }: NavLinksProps) => {
  return (
    <>
      {items.map((item) => (
        <NavLink
          key={item.path}
          item={item}
          variant={variant}
          onClick={onClick}
        />
      ))}
    </>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const windowWidth = useWindowWidth();

  const isTablet = useMemo(
    () => windowWidth >= TABLET_BREAKPOINT && windowWidth < DESKTOP_BREAKPOINT,
    [windowWidth]
  );

  const visibleItems = useMemo(
    () =>
      navItemsConnected.filter((item) =>
        isTablet
          ? item.minWidth <= TABLET_BREAKPOINT
          : item.minWidth <= windowWidth
      ),
    [windowWidth, isTablet]
  );

  return (
    <nav className="fixed top-0 w-full bg-[#EDF2F4]/70 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center flex-1">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo/logo2.png"
                alt="Logo"
                width={isTablet ? 120 : 160}
                height={isTablet ? 48 : 64}
                className="h-auto object-contain transition-all duration-300"
              />
            </Link>
          </div>

          {windowWidth >= TABLET_BREAKPOINT && (
            <div className="flex flex-1 justify-center">
              <div className="flex items-center gap-2 lg:gap-4">
                <SignedIn>
                  <NavLinks
                    items={visibleItems}
                    variant={isTablet ? "tablet" : "desktop"}
                  />
                </SignedIn>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 flex-1 justify-end">
            <SignedIn>
              <button className="p-2 text-gray-600 hover:text-[#EF233C]">
                <FiBell className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              {windowWidth >= 640 && <UserButton />}
            </SignedIn>

            {windowWidth < DESKTOP_BREAKPOINT && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600 hover:text-[#EF233C]"
              >
                {isMenuOpen ? (
                  <FiX className="h-6 w-6" />
                ) : (
                  <FiMenu className="h-6 w-6" />
                )}
              </button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-sm"
            >
              <div className="px-4 py-3 space-y-2">
                <SignedIn>
                  <NavLinks
                    items={navItemsConnected}
                    variant="mobile"
                    onClick={() => setIsMenuOpen(false)}
                  />
                </SignedIn>
                <div className="pt-3 border-t border-gray-200">
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="w-full flex items-center p-3 rounded-lg hover:bg-gray-100">
                        <FiUser className="h-5 w-5 mr-2" />
                        <span>Login</span>
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
