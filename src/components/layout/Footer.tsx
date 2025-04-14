"use client";

import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { name: "Home", href: "/" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Mentions legales", href: "/legal" },
        { name: "Privacy policy", href: "/privacy" },
        { name: "CGU", href: "/terms" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Support", href: "/support" },
        { name: "FAQ", href: "/faq" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <FaInstagram />, href: "#", label: "Instagram" },
    { icon: <FaTiktok />, href: "#", label: "TikTok" },
    { icon: <FaLinkedin />, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-gray-700 text-white mt-auto relative">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/logo/logo2.png"
                alt="Logo"
                width={160}
                height={64}
                className="h-28 w-auto mr-2"
              />
            </Link>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
              ducimus!
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-2">
              <h4 className="text-lg font-semibold">{section.title}</h4>
              <nav>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          ))}

          <div className="space-y-2">
            <h4 className="text-lg font-semibold">Social networks</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {currentYear} LearnSup. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
