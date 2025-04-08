"use client";

import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX, FiUser } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useCallback } from "react";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

const navItems = [
  { name: "Home", minWidth: 640, path: "/" },
  { name: "Title", minWidth: 768, path: "/" },
  { name: "Title", minWidth: 768, path: "/" },
];

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
}

const Navbar = () => {
  const [activeTab, setActiveTab] = useState(navItems[0].name);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const windowWidth = useWindowWidth();

  const visibleItems = useMemo(
    () => navItems.filter((item) => windowWidth >= item.minWidth),
    [windowWidth]
  );

  const handleTabClick = useCallback(
    (name: string) => {
      setActiveTab(name);
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    },
    [isMenuOpen]
  );

  return (
    <nav className="fixed top-0 w-full bg-[#EDF2F4]/70 backdrop-blur-md border-[#EDF2F4] z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={160}
              height={64}
              priority
              className="h-16 w-auto object-contain"
            />
          </div>

          <div className="hidden md:flex flex-1 justify-center overflow-hidden">
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-5">
              {visibleItems.map((item) => (
                <motion.div
                  key={item.name}
                  className="relative flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={item.path}
                    onClick={() => setActiveTab(item.name)}
                    className={`min-w-[80px] flex items-center justify-center w-full px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm md:text-base transition-colors ${
                      activeTab === item.name
                        ? "text-red-500 font-medium"
                        : "text-gray-900 hover:text-red-400"
                    }`}
                  >
                    <span className="whitespace-nowrap">{item.name}</span>
                  </Link>
                  {activeTab === item.name && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D90429]"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <SignedIn>
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
                {navItems.map((item) => (
                  <Link href={item.path} passHref key={item.name}>
                    <motion.a
                      onClick={() => handleTabClick(item.name)}
                      whileTap={{ scale: 0.97 }}
                      className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                        activeTab === item.name
                          ? "bg-red-600/10 text-[#D90429]"
                          : "text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <span className="text-lg sm:text-base">{item.name}</span>
                    </motion.a>
                  </Link>
                ))}
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
