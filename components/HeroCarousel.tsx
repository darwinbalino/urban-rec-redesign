"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const sports = [
  { name: "Volleyball", image: "/volleyball.jpg" },
  { name: "Kickball", image: "/kickball.jpg" },
  { name: "Hockey", image: "/hockey.jpg" },
  { name: "Flagfoot Ball", image: "/flagfootball.jpg" },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);

  const minSwipeDistance = 50;

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % sports.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + sports.length) % sports.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 4500);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <section
      className="relative w-full h-[calc(75vh-240px)] min-h-[210px] max-h-[410px] overflow-hidden mt-[72px]"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      aria-label="Sports carousel"
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "tween", duration: 0.5, ease: [0.4, 0, 0.2, 1] },
            opacity: { duration: 0.3 },
          }}
          className="absolute inset-0"
        >
          {/* Image with gradient overlay */}
          <div className="relative w-full h-full">
            <Image
              src={sports[currentIndex].image}
              alt={`${sports[currentIndex].name} league`}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 gradient-overlay" />
          </div>

          {/* Text overlay */}
          <div className="absolute inset-0 flex items-end justify-center pb-20 px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="text-center"
            >
              <h1 className="font-display text-white text-5xl sm:text-6xl tracking-wider leading-tight drop-shadow-lg">
                COED {sports[currentIndex].name.toUpperCase()}
                <br />
                <span className="text-urban-red">LEAGUES</span>
              </h1>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress line indicators - subtle */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3"
        role="tablist"
      >
        {sports.map((sport, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-0.5 transition-all duration-500 ease-out ${
              index === currentIndex
                ? "w-10 bg-white"
                : "w-5 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to ${sport.name} slide`}
            aria-selected={index === currentIndex}
            role="tab"
          />
        ))}
      </div>
    </section>
  );
}
