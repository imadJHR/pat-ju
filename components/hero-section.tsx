// components/hero-section.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import a1 from "../public/a1.jpg";
import a2 from "../public/a2.jpg";
import a3 from "../public/a3.jpg";

interface HeroSectionProps {
  language: "fr"; // Set to French only
}

const translations = {
  fr: {
    headline: "L'Art de la Pâtisserie Marocaine",
    tagline:
      "Découvrez des saveurs authentiques, préparées avec amour selon des recettes traditionnelles transmises de génération en génération.",
    orderNow: "Découvrir Nos Produits",
    discover: "Notre Histoire",
  },
};

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9, rotate: -5 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export function HeroSection({ language }: HeroSectionProps) {
  const t = translations[language];

  return (
    <section id="home" className="min-h-screen w-full bg-background">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-screen px-4 sm:px-6 lg:px-8 py-20 lg:py-0">
        {/* Left Side: Content */}
        <motion.div
          className="flex flex-col justify-center text-center lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="font-great-vibes text-5xl sm:text-6xl md:text-7xl text-amber-500 mb-4"
            variants={itemVariants}
          >
            {t.headline}
          </motion.h1>

          <motion.p
            className="font-playfair text-lg sm:text-xl text-foreground/80 mb-8 max-w-lg mx-auto lg:mx-0"
            variants={itemVariants}
          >
            {t.tagline}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            variants={itemVariants}
          >
            <Link href="/products">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-500/90 text-primary-foreground px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
              >
                {t.orderNow}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="ghost"
                size="lg"
                className="text-amber-500 hover:text-amber-500/90 hover:bg-amber-500/10 px-8 py-3 text-lg font-semibold transition-colors duration-300 w-full sm:w-auto"
              >
                {t.discover}
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Side: Image Grid */}
        <div className="relative h-[300px] sm:h-[450px] lg:h-[600px] w-full">
          <motion.div
            custom={1}
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="absolute top-0 left-0 w-2/3 h-2/5 sm:h-1/2 rounded-xl shadow-2xl overflow-hidden transform -rotate-6"
          >
            <Image
              src={a1}
              alt="Assortment of Moroccan Pastries"
              fill
              className="object-cover"
              priority
              placeholder="blur"
            />
          </motion.div>
          <motion.div
            custom={2}
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="absolute bottom-0 left-1/4 w-3/5 h-1/2 sm:h-3/5 rounded-xl shadow-2xl overflow-hidden z-10 transform rotate-3"
          >
            <Image
              src={a2}
              alt="Close-up of Kaab el Ghazal"
              fill
              className="object-cover"
              placeholder="blur"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
