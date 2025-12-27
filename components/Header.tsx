"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const menuItems = [
  { label: "HOME", href: "/" },
  { label: "LEAGUES", href: "/register" },
  { label: "REGIONS", href: "#" },
  { label: "TOURNAMENTS", href: "#" },
  { label: "MEMBERS", href: "#" },
  { label: "SOCIAL", href: "#" },
  { label: "PERKS", href: "#" },
];

// Desktop nav - fewer items, more focused
const desktopNavItems = [
  { label: "LEAGUES", href: "/register" },
  { label: "REGIONS", href: "#" },
  { label: "TOURNAMENTS", href: "#" },
  { label: "ABOUT", href: "#" },
];

interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/users/me", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setAuthLoading(false);
      }
    };
    checkAuth();
  }, []);

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
        className={`fixed top-0 left-0 right-0 ${isMenuOpen ? "z-[110] bg-white" : "z-50 bg-white/95 backdrop-blur-sm shadow-sm"}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 lg:px-8 py-4">
          {/* LEFT SIDE - Logo */}
          <Link href="/" className="flex items-center gap-3">
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
          </Link>

          {/* CENTER - Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {desktopNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-display text-urban-dark text-sm tracking-wider hover:text-urban-red transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* RIGHT SIDE - Auth Button & Menu */}
          <div className="flex items-center gap-3">
            {/* Auth Button - Desktop */}
            {!authLoading && (
              <div className="hidden sm:block">
                {user ? (
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 border border-urban-dark text-urban-dark text-sm font-medium rounded-sm hover:bg-urban-dark hover:text-white transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                ) : (
                  <Link
                    href="/sign-in"
                    className="flex items-center gap-2 px-4 py-2 border border-urban-dark text-urban-dark text-sm font-medium rounded-sm hover:bg-urban-dark hover:text-white transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>
            )}

            {/* Auth Button - Mobile (icon only) */}
            {!isMenuOpen && !authLoading && (
              <div className="sm:hidden">
                {user ? (
                  <Link
                    href="/dashboard"
                    className="flex items-center justify-center w-10 h-10 border border-urban-dark text-urban-dark rounded-sm hover:bg-urban-dark hover:text-white transition-colors"
                    aria-label="Dashboard"
                  >
                    <User className="w-5 h-5" />
                  </Link>
                ) : (
                  <Link
                    href="/sign-in"
                    className="flex items-center justify-center w-10 h-10 border border-urban-dark text-urban-dark rounded-sm hover:bg-urban-dark hover:text-white transition-colors"
                    aria-label="Sign In"
                  >
                    <User className="w-5 h-5" />
                  </Link>
                )}
              </div>
            )}

            {/* Menu Button - Mobile & Tablet */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 border border-urban-dark text-urban-dark rounded-sm hover:bg-urban-dark hover:text-white transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X size={20} strokeWidth={2} />
              ) : (
                <Menu size={20} strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full Page Menu Overlay - Mobile & Tablet */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-white overflow-hidden pt-[72px] lg:hidden"
          >
            {/* Menu Items */}
            <nav className="flex flex-col items-center justify-center h-full w-full px-5">
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
                  className="w-full max-w-md"
                >
                  <div className="w-full h-px bg-urban-dark/10" />
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="font-display text-urban-dark text-2xl sm:text-3xl tracking-widest py-4 hover:text-urban-red transition-colors block text-center w-full"
                  >
                    {item.label}
                  </Link>
                  {index === menuItems.length - 1 && (
                    <div className="w-full h-px bg-urban-dark/10" />
                  )}
                </motion.div>
              ))}

              {/* Auth Link in Menu */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-8"
              >
                {user ? (
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="inline-flex items-center gap-2 px-8 py-3 border-2 border-urban-dark text-urban-dark font-display tracking-wider rounded-sm hover:bg-urban-dark hover:text-white transition-colors"
                  >
                    <User className="w-5 h-5" />
                    DASHBOARD
                  </Link>
                ) : (
                  <Link
                    href="/sign-in"
                    onClick={() => setIsMenuOpen(false)}
                    className="inline-flex items-center gap-2 px-8 py-3 border-2 border-urban-dark text-urban-dark font-display tracking-wider rounded-sm hover:bg-urban-dark hover:text-white transition-colors"
                  >
                    <User className="w-5 h-5" />
                    SIGN IN
                  </Link>
                )}
              </motion.div>
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
