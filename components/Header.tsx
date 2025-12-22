"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const menuItems = [
  { label: "HOME", href: "#" },
  { label: "REGIONS", href: "#" },
  { label: "LEAGUES", href: "#" },
  { label: "TOURNAMENTS", href: "#" },
  { label: "MEMBERS", href: "#" },
  { label: "SOCIAL", href: "#" },
  { label: "PERKS", href: "#" },
  { label: "VANCOUVER", href: "#" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (isMenuOpen) {
      scrollYRef.current = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${scrollYRef.current}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      window.scrollTo(0, scrollYRef.current);
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Floating Header */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 ${
          isMenuOpen
            ? "z-[110] bg-white"
            : "z-50 bg-urban-light/95 backdrop-blur-sm"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4">
          {/* LEFT SIDE - Logo (always visible) */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-urban-dark flex-shrink-0">
              <Image
                src="/logo.jpeg"
                alt="Urban Rec Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="font-display text-urban-dark text-2xl tracking-wider">
              URBAN REC
            </span>
          </div>

          {/* RIGHT SIDE - Menu or Close Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 -mr-2 text-urban-dark hover:text-urban-red transition-colors flex items-center justify-center"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X size={28} strokeWidth={2} />
            ) : (
              <Menu size={28} strokeWidth={2} />
            )}
          </button>
        </div>
      </motion.header>

      {/* Full Page Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-white overflow-hidden pt-[72px]"
          >
            {/* Menu Items */}
            <nav className="flex flex-col items-center justify-center h-full w-full">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    delay: index * 0.05 + 0.1,
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="w-full"
                >
                  <div className="w-full h-px bg-urban-dark/10" />
                  <a
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="font-display text-urban-dark text-3xl sm:text-4xl tracking-widest py-4 hover:text-urban-red transition-colors block text-center w-full"
                  >
                    {item.label}
                  </a>
                  {index === menuItems.length - 1 && (
                    <div className="w-full h-px bg-urban-dark/10" />
                  )}
                </motion.div>
              ))}
            </nav>

            {/* Decorative element */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 w-16 h-1 bg-urban-red origin-center"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
