"use client";

import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MdOutlineLanguage } from "react-icons/md";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavItem, NavLinkProps, NavLinksProps } from "@/lib/types";
import {
  FiUser,
  FiBell,
  FiHome,
  FiBook,
  FiGrid,
  FiMessageSquare,
} from "react-icons/fi";

const TABLET_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 1024;

const navItemsConnected: NavItem[] = [
  {
    name: "Accueil",
    minWidth: 640,
    path: "/",
    icon: <FiHome className="w-5 h-5" />,
  },
  {
    name: "Ateliers",
    minWidth: 640,
    path: "/ateliers",
    icon: <FiBook className="w-5 h-5" />,
  },
  {
    name: "Dashboard",
    minWidth: 768,
    path: "/dashboard",
    icon: <FiGrid className="w-5 h-5" />,
  },
  {
    name: "Messages",
    minWidth: 768,
    path: "/messages",
    icon: <FiMessageSquare className="w-5 h-5" />,
  },
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
    "px-4 py-2 text-sm font-medium transition-colors relative";
  const baseClassTablet =
    "px-3 py-1.5 text-sm font-medium transition-colors relative";
  const baseClassMobile =
    "w-full px-4 py-3.5 flex items-center gap-3 text-[15px] font-medium transition-all rounded-xl hover:bg-white/35";

  const activeClass = "text-white";
  const inactiveClass = "text-white/80 hover:text-white";

  return (
    <motion.div
      className="relative flex-shrink-0"
      whileHover={{ scale: variant === "mobile" ? 1 : 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Link
        href={item.path}
        onClick={onClick}
        className={`
          ${
            variant === "desktop"
              ? baseClassDesktop
              : variant === "tablet"
              ? baseClassTablet
              : baseClassMobile
          }
          ${isActive ? activeClass : inactiveClass}
        `}
      >
        {variant === "mobile" && (
          <>
            {item.icon}
            <span>{item.name}</span>
            {isActive && (
              <motion.div
                className="absolute inset-0 bg-white/10 rounded-xl"
                layoutId="activeBackgroundMobile"
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
              />
            )}
          </>
        )}
        {variant !== "mobile" && (
          <>
            <span className="relative z-10">{item.name}</span>
            {isActive && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                layoutId="activeIndicator"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
              />
            )}
          </>
        )}
      </Link>
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
  const { user } = useUser();

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
    <nav className="fixed top-0 w-full bg-[var(--primary-blue)] z-50">
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
                priority
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

          <div className="flex items-center gap-4 flex-1 justify-end">
            <SignedIn>
              <motion.button
                className="p-2 text-white/80 hover:text-white transition-colors relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiBell className="h-5 w-5 sm:h-6 sm:w-6" />
                <motion.div
                  className="absolute inset-0 bg-white/35 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                />
              </motion.button>
              {windowWidth >= 640 && (
                <>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox:
                          "w-8 h-8 hover:scale-105 transition-transform",
                      },
                    }}
                  />
                  <motion.div
                    className="flex items-center text-white gap-1 px-3 py-1.5 rounded-full relative group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <span className="text-sm font-medium">
                      {user?.firstName || "Guest"}
                    </span>
                    <span className="text-xs text-white/80">•</span>
                    <span className="text-sm text-white/80">Étudiant(e)</span>
                    <motion.div
                      className="absolute inset-0 bg-white/35 rounded-full"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    />
                  </motion.div>
                  <motion.button
                    className="p-2 text-white/80 hover:text-white transition-colors flex items-center gap-1 relative group rounded-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MdOutlineLanguage className="h-5 w-5" />
                    <span className="text-sm">FR</span>
                    <motion.div
                      className="absolute inset-0 bg-white/35 rounded-full"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    />
                  </motion.button>
                </>
              )}
            </SignedIn>

            {windowWidth < DESKTOP_BREAKPOINT && (
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative p-2 text-white/80 hover:text-white transition-colors group rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/10 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                />
                <div className="relative h-6 w-6">
                  <motion.span
                    className="absolute top-[6px] left-[4px] right-[4px] h-[2px] bg-current rounded-full origin-center"
                    animate={
                      isMenuOpen
                        ? {
                            rotate: 45,
                            y: 6,
                          }
                        : {
                            rotate: 0,
                            y: 0,
                          }
                    }
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="absolute top-[13px] left-[4px] right-[4px] h-[2px] bg-current rounded-full"
                    animate={
                      isMenuOpen
                        ? {
                            opacity: 0,
                            x: -8,
                          }
                        : {
                            opacity: 1,
                            x: 0,
                          }
                    }
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="absolute top-[20px] left-[4px] right-[4px] h-[2px] bg-current rounded-full origin-center"
                    animate={
                      isMenuOpen
                        ? {
                            rotate: -45,
                            y: -6,
                          }
                        : {
                            rotate: 0,
                            y: 0,
                          }
                    }
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </motion.button>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, clipPath: "inset(0 50% 0 50%)" }}
              animate={{
                opacity: 1,
                clipPath: "inset(0 0 0 0)",
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8,
                },
              }}
              exit={{
                opacity: 0,
                clipPath: "inset(0 50% 0 50%)",
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8,
                },
              }}
              className="md:hidden fixed top-16 left-0 right-0 bg-gradient-to-b from-[var(--primary-blue)] via-[var(--primary-blue)]/98 to-[var(--primary-blue)]/95 backdrop-blur-md border-b border-white/30 shadow-2xl"
            >
              <motion.div
                className="max-w-8xl mx-auto"
                initial="closed"
                animate="open"
                variants={{
                  open: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.1,
                    },
                  },
                  closed: {
                    transition: {
                      staggerChildren: 0.03,
                      staggerDirection: -1,
                    },
                  },
                }}
              >
                <div className="px-4 sm:px-6 py-4">
                  <SignedIn>
                    <div className="space-y-1.5">
                      {navItemsConnected.map((item) => (
                        <motion.div
                          key={item.path}
                          variants={{
                            open: {
                              x: 0,
                              opacity: 1,
                              transition: {
                                type: "spring",
                                stiffness: 400,
                                damping: 30,
                              },
                            },
                            closed: {
                              x: -20,
                              opacity: 0,
                              transition: {
                                type: "spring",
                                stiffness: 400,
                                damping: 30,
                              },
                            },
                          }}
                          className="w-full relative"
                        >
                          <NavLink
                            item={item}
                            variant="mobile"
                            onClick={() => setIsMenuOpen(false)}
                          />
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      variants={{
                        open: {
                          y: 0,
                          opacity: 1,
                          transition: {
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          },
                        },
                        closed: {
                          y: 20,
                          opacity: 0,
                          transition: {
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          },
                        },
                      }}
                      className="mt-6 pt-6 border-t border-white/35"
                    >
                      <motion.div
                        className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white/30 backdrop-blur-sm"
                        whileHover={{ scale: 1.02 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        }}
                      >
                        <UserButton
                          appearance={{
                            elements: {
                              avatarBox: "w-10 h-10",
                            },
                          }}
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-white">
                            {user?.firstName || "Guest"}
                          </span>
                          <span className="text-xs text-white/70">
                            Étudiant(e)
                          </span>
                        </div>
                      </motion.div>

                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <motion.button
                          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/40 transition-all"
                          whileHover={{ scale: 1.02, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <FiBell className="h-5 w-5" />
                          <span className="text-sm font-medium">
                            Notifications
                          </span>
                        </motion.button>
                        <motion.button
                          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/40 transition-all"
                          whileHover={{ scale: 1.02, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <MdOutlineLanguage className="h-5 w-5" />
                          <span className="text-sm font-medium">FR</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  </SignedIn>

                  <SignedOut>
                    <SignInButton mode="modal">
                      <motion.button
                        className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/30 transition-all"
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FiUser className="h-5 w-5" />
                        <span className="text-sm font-medium">
                          Se connecter
                        </span>
                      </motion.button>
                    </SignInButton>
                  </SignedOut>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
