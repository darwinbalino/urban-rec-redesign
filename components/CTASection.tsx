"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
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
    <section ref={ref} className="bg-urban-light py-20 px-6">
      <motion.div
        className="max-w-md mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2
          variants={itemVariants}
          className="font-display text-urban-red text-4xl sm:text-5xl tracking-wider mb-5"
        >
          READY TO GET ACTIVE?
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-urban-dark/75 text-lg mb-10 leading-relaxed"
        >
          Join thousands of players in Vancouver&apos;s most exciting
          recreational sports leagues
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 px-8 bg-urban-dark text-urban-red font-display text-xl tracking-widest flex items-center justify-center gap-3 group hover:bg-urban-dark/90 active:bg-urban-dark"
          >
            JOIN A LEAGUE
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 px-8 bg-urban-dark text-urban-red font-display text-xl tracking-widest flex items-center justify-center gap-3 group hover:bg-urban-dark/90 active:bg-urban-dark"
          >
            FIND A SPORT
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
