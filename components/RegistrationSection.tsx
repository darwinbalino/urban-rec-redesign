"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronDown, User, Users } from "lucide-react";
import { useRef, useState } from "react";

const sports = [
  "Basketball",
  "Volleyball",
  "Soccer (5v5)",
  "Softball",
  "Flag Football",
  "Dodgeball",
  "Ultimate Frisbee",
  "Kickball",
];

export default function RegistrationSection() {
  const [selectedSport, setSelectedSport] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <section ref={ref} className="bg-urban-dark py-20 px-6">
      <motion.div
        className="max-w-md mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2
          variants={itemVariants}
          className="font-display text-urban-red text-4xl sm:text-5xl tracking-wider mb-10 text-center"
        >
          JOIN A LEAGUE
        </motion.h2>

        {/* Custom Dropdown */}
        <motion.div variants={itemVariants} className="relative mb-6">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full py-4 px-5 bg-urban-light text-urban-dark flex items-center justify-between text-left rounded-sm"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
          >
            <span
              className={
                selectedSport
                  ? "text-urban-dark font-medium"
                  : "text-urban-dark/50"
              }
            >
              {selectedSport || "Select a sport"}
            </span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={20} />
            </motion.div>
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute z-20 w-full mt-1 bg-urban-light shadow-xl max-h-64 overflow-auto rounded-sm origin-top"
                role="listbox"
              >
                {sports.map((sport, index) => (
                  <li key={sport}>
                    <button
                      onClick={() => {
                        setSelectedSport(sport);
                        setIsOpen(false);
                      }}
                      className={`w-full py-3.5 px-5 text-left transition-colors ${
                        selectedSport === sport
                          ? "bg-urban-red text-white"
                          : "text-urban-dark hover:bg-urban-dark hover:text-urban-light"
                      } ${index === 0 ? "rounded-t-sm" : ""} ${
                        index === sports.length - 1 ? "rounded-b-sm" : ""
                      }`}
                      role="option"
                      aria-selected={selectedSport === sport}
                    >
                      {sport}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 px-8 bg-urban-red text-white font-display text-xl tracking-widest flex items-center justify-center gap-3 hover:bg-urban-red/90 active:bg-urban-red rounded-sm"
          >
            <Users size={20} />
            REGISTER TEAM
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 px-8 border-2 border-urban-light text-urban-light font-display text-xl tracking-widest flex items-center justify-center gap-3 hover:bg-urban-light hover:text-urban-dark active:bg-urban-light/90 rounded-sm"
          >
            <User size={20} />
            REGISTER INDIVIDUAL
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
