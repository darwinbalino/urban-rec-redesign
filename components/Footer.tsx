"use client";

import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Image from "next/image";

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

const quickLinks = ["Leagues", "Tournaments", "Membership", "FAQ", "Contact"];

export default function Footer() {
  return (
    <footer className="bg-urban-light pt-16 pb-8 px-6 relative">
      {/* Top decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-urban-red" />

      <div className="max-w-md mx-auto">
        {/* Logo and brand */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-urban-dark flex-shrink-0">
            <Image
              src="/logo.jpeg"
              alt="Urban Rec Logo"
              fill
              className="object-cover"
            />
          </div>
          <span className="font-display text-urban-dark text-3xl tracking-wider">
            URBAN REC
          </span>
        </div>

        {/* Tagline */}
        <p className="text-center text-urban-dark/60 text-sm mb-8">
          Vancouver&apos;s Premier Recreational Sports League
        </p>

        {/* Social links */}
        <div className="flex justify-center gap-4 mb-10">
          {socialLinks.map((social) => {
            const IconComponent = social.icon;
            return (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 rounded-full bg-urban-dark flex items-center justify-center text-urban-light hover:bg-urban-red transition-colors"
                aria-label={social.label}
              >
                <IconComponent size={18} />
              </motion.a>
            );
          })}
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-10">
          {quickLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-urban-dark/60 text-sm hover:text-urban-red transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Contact info */}
        <div className="space-y-3 mb-10">
          <a
            href="mailto:info@urbanrec.ca"
            className="flex items-center justify-center gap-2 text-urban-dark/60 text-sm hover:text-urban-red transition-colors"
          >
            <Mail size={16} />
            info@urbanrec.ca
          </a>
          <a
            href="tel:+16045551234"
            className="flex items-center justify-center gap-2 text-urban-dark/60 text-sm hover:text-urban-red transition-colors"
          >
            <Phone size={16} />
            (604) 555-1234
          </a>
          <p className="flex items-center justify-center gap-2 text-urban-dark/60 text-sm">
            <MapPin size={16} />
            Vancouver, BC, Canada
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-urban-dark/10 mb-6" />

        {/* Copyright */}
        <p className="text-center text-urban-dark/40 text-xs">
          © {new Date().getFullYear()} Urban Rec. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
