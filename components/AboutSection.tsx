"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="bg-urban-dark py-20 px-6 relative overflow-hidden"
    >
      {/* Subtle decorative corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <div className="absolute top-4 right-4 w-full h-full border-t-2 border-r-2 border-urban-light" />
      </div>

      <motion.div
        className="max-w-md mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2
          variants={itemVariants}
          className="font-display text-urban-light text-4xl sm:text-5xl tracking-wider mb-10 text-center"
        >
          ABOUT URBAN REC
        </motion.h2>

        <div className="space-y-6 text-urban-light/85 leading-relaxed text-[15px] sm:text-base">
          <motion.p variants={itemVariants}>
            Urban Rec is Vancouver&apos;s premier recreational sports league,
            bringing together thousands of active adults who share a passion for
            sports, fitness, and community. Since our founding, we&apos;ve
            created an inclusive environment where players of all skill levels
            can compete, connect, and have fun.
          </motion.p>

          <motion.p variants={itemVariants}>
            Whether you&apos;re looking to stay active, meet new people, or
            rediscover your competitive spirit, Urban Rec offers a diverse range
            of sports leagues throughout the year. Our professionally organized
            leagues take the hassle out of recreational sports, providing
            everything from venue coordination to certified referees and
            convenient online scheduling.
          </motion.p>

          <motion.p variants={itemVariants}>
            What sets Urban Rec apart is our vibrant community. Beyond the
            games, we host social events, tournaments, and post-game gatherings
            that turn teammates into lifelong friends. Join us and experience
            why thousands of Vancouverites choose Urban Rec as their go-to for
            active recreation and social connection.
          </motion.p>
        </div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="w-20 h-1 bg-urban-red mx-auto mt-12 origin-center"
        />
      </motion.div>
    </section>
  );
}
