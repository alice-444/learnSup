"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: "Accueil", href: "/" },
    { name: "Dashboard", href: "/" },
    { name: "Ateliers", href: "/" },
    { name: "Messages", href: "/" },
    { name: "Profil", href: "/" },
  ];

  const legalLinks = [
    {
      name: "Conditions d'utilisation générales",
      href: "/conditions",
    },
    {
      name: "Mentions légales",
      href: "/legal-mentions",
    },
    {
      name: "Politique de confidentialité et gestion des cookies",
      href: "/privacy",
    },
  ];

  const socialLinks = [
    {
      icon: (
        <FaInstagram className="w-5 h-5 text-[var(--secondary-blue)] group-hover:text-white transition-all duration-150" />
      ),
      href: "#",
      label: "Instagram",
    },
    {
      icon: (
        <FaTiktok className="w-5 h-5 text-[var(--secondary-blue)] group-hover:text-white transition-all duration-150" />
      ),
      href: "#",
      label: "TikTok",
    },
    {
      icon: (
        <FaLinkedin className="w-5 h-5 text-[var(--secondary-blue)] group-hover:text-white transition-all duration-150" />
      ),
      href: "#",
      label: "LinkedIn",
    },
  ];

  const linkVariants = {
    initial: { y: 0 },
    hover: {
      y: -1,
      color: "var(--secondary-blue)",
      transition: {
        duration: 0.15,
        ease: "easeOut",
      },
    },
  };

  const socialVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.08,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
        mass: 0.8,
        velocity: 2,
      },
    },
  };

  return (
    <footer className="bg-[#101113] text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="flex items-center space-x-2">
              <Link href="/">
                <Image
                  src="/logo/logo2.png"
                  alt="LearnSup"
                  width={220}
                  height={124}
                  className="h-auto object-contain transition-all duration-300"
                />
              </Link>
            </div>
            <div className="flex gap-3 sm:space-y-4">
              {socialLinks.map((social, i) => (
                <motion.div
                  key={i}
                  initial="initial"
                  whileHover="hover"
                  variants={socialVariants}
                >
                  <Link
                    href={social.href}
                    aria-label={social.label}
                    className="group bg-[var(--secondary-white)] hover:bg-[var(--secondary-blue)] rounded-full p-1.5 transition-all duration-150 ease-out block"
                  >
                    {social.icon}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <nav aria-label="Navigation principale" className="mt-4 md:mt-0">
            <ul className="flex-nowrap flex space-y-4 gap-4 text-sm">
              {navigationLinks.map((link) => (
                <motion.li
                  key={link.name}
                  initial="initial"
                  whileHover="hover"
                  variants={linkVariants}
                  className="relative overflow-hidden"
                >
                  <Link
                    href={link.href}
                    className="transition-all duration-150 ease-out block"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="h-px bg-gray-700" />

        <div className="py-6 space-y-2 text-center md:text-left text-xs md:text-sm">
          {legalLinks.map((link) => (
            <motion.div
              key={link.name}
              initial="initial"
              whileHover="hover"
              variants={linkVariants}
              className="relative overflow-hidden"
            >
              <Link
                href={link.href}
                className="block transition-all duration-150 ease-out"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="py-3 text-center text-xs">
          © {currentYear} LearnSup - Tous droits réservés
        </div>
      </div>
    </footer>
  );
};

export default Footer;
