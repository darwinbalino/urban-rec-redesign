"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Sarah Chen",
    sport: "Basketball",
    quote:
      "I joined Urban Rec three years ago not knowing anyone. Now I have a whole squad of friends I play with every week. Best decision ever!",
    image: "/basketballplayer.jpeg",
  },
  {
    name: "Marcus Williams",
    sport: "Volleyball",
    quote:
      "The organization is top-notch. Refs are always on time, courts are great, and the app makes scheduling a breeze.",
    image: "/volleyballplayer.jpeg",
  },
  {
    name: "Emily Rodriguez",
    sport: "Soccer",
    quote:
      "As someone who hadn't played since high school, I was nervous. But everyone is so welcoming - it's competitive but never intimidating.",
    image: "/soccerplayer.jpeg",
  },
  {
    name: "Jake Thompson",
    sport: "Dodgeball",
    quote:
      "Thursday nights are the highlight of my week now. Great games, cold beers after, and memories that last forever.",
    image: "/dodgeballplayer.jpeg",
  },
  {
    name: "Priya Patel",
    sport: "Ultimate Frisbee",
    quote:
      "Urban Rec helped me stay active after moving to Vancouver. The community here is unlike anything I've experienced.",
    image: "/frisbeeplayer.jpeg",
  },
  {
    name: "David Kim",
    sport: "Flag Football",
    quote:
      "Love the mix of skill levels on every team. Whether you're a former college athlete or a total beginner, you'll fit right in.",
    image: "/footballplayer.jpeg",
  },
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5500);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  return (
    <section ref={ref} className="bg-urban-dark py-20 px-6 overflow-hidden">
      <div className="max-w-md mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="font-display text-urban-light text-4xl sm:text-5xl tracking-wider mb-12 text-center"
        >
          WHAT OUR PLAYERS SAY
        </motion.h2>

        {/* Carousel Container */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <div className="relative min-h-[280px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="bg-urban-light p-6 rounded-sm shadow-lg"
              >
                {/* Quote icon */}
                <Quote
                  className="w-8 h-8 text-urban-red mb-4 opacity-60"
                  strokeWidth={1.5}
                />

                {/* Quote text */}
                <p className="text-urban-dark text-base leading-relaxed mb-6 italic">
                  &ldquo;{testimonials[currentIndex].quote}&rdquo;
                </p>

                {/* Author info */}
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden bg-urban-dark flex-shrink-0">
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-display text-urban-dark text-lg tracking-wide">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-urban-red text-sm font-medium">
                      {testimonials[currentIndex].sport}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center gap-6 mt-8">
            <button
              onClick={prevSlide}
              className="p-3 text-urban-light/50 hover:text-urban-light hover:bg-urban-light/10 rounded-full transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 text-urban-light/50 hover:text-urban-light hover:bg-urban-light/10 rounded-full transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Progress line indicators */}
          <div className="flex justify-center gap-2 mt-4" role="tablist">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-0.5 transition-all duration-400 ${
                  index === currentIndex
                    ? "w-7 bg-urban-red"
                    : "w-3 bg-urban-light/25 hover:bg-urban-light/40"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-selected={index === currentIndex}
                role="tab"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
