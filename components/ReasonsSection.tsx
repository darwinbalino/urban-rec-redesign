"use client";

import { motion, useInView } from "framer-motion";
import { Calendar, Heart, Shield, Trophy, Users } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const reasons = [
  {
    icon: Heart,
    title: "Stay Active & Healthy",
    description:
      "Regular games keep you fit and energized while having fun. Our leagues make exercise feel like play, not work.",
  },
  {
    icon: Users,
    title: "Build Lasting Friendships",
    description:
      "Meet amazing people who share your interests. Many of our players say their teammates have become their closest friends.",
  },
  {
    icon: Trophy,
    title: "Competitive Yet Inclusive",
    description:
      "Play at your level with fair matchups and supportive teammates. Whether you're rusty or ready to compete, there's a place for you.",
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description:
      "Multiple seasons and time slots throughout the year. We work around your busy life with convenient game times.",
  },
  {
    icon: Shield,
    title: "Professional Organization",
    description:
      "We handle everything - venues, refs, equipment, and scheduling. You just show up and play.",
  },
];

export default function ReasonsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <section ref={ref} className="bg-urban-light py-20 px-6">
      <div className="max-w-md mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="font-display text-urban-dark text-4xl sm:text-5xl tracking-wider mb-12 text-center"
        >
          TOP 5 REASONS TO JOIN
        </motion.h2>

        <motion.div
          className="space-y-7"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon;
            return (
              <motion.div
                key={reason.title}
                variants={itemVariants}
                className="flex gap-5 group"
              >
                {/* Icon with logo background */}
                <div className="flex-shrink-0 relative">
                  <div className="w-14 h-14 rounded-full bg-urban-dark flex items-center justify-center overflow-hidden relative group-hover:scale-105 transition-transform duration-300">
                    {/* Logo as subtle background */}
                    <Image
                      src="/logo.jpeg"
                      alt=""
                      fill
                      className="object-cover opacity-20"
                      aria-hidden="true"
                    />
                    <IconComponent
                      className="w-6 h-6 text-urban-red relative z-10"
                      strokeWidth={2}
                    />
                  </div>
                  {/* Number badge */}
                  <span className="font-display absolute -top-1 -right-1 w-6 h-6 rounded-full bg-urban-red text-white text-sm flex items-center justify-center shadow-md">
                    {index + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <h3 className="font-display text-urban-dark text-xl tracking-wide mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-urban-dark/65 text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
