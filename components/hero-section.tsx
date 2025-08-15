"use client";

import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  language: "en" | "fr" | "ar";
}

const translations = {
  en: {
    headline: "Authentic Moroccan Pastries",
    tagline:
      "Crafted with love using traditional recipes passed down through generations",
    orderNow: "Order Now",
    discover: "Discover Our Pastries",
    freshDaily: "Fresh Daily",
    traditional: "Traditional Recipes",
    premium: "Premium Ingredients",
  },
  fr: {
    headline: "Pâtisseries Marocaines Authentiques",
    tagline:
      "Préparées avec amour selon des recettes traditionnelles transmises de génération en génération",
    orderNow: "Commander Maintenant",
    discover: "Découvrir Nos Pâtisseries",
    freshDaily: "Frais Quotidiennement",
    traditional: "Recettes Traditionnelles",
    premium: "Ingrédients Premium",
  },
  ar: {
    headline: "حلويات مغربية أصيلة",
    tagline: "مصنوعة بحب باستخدام وصفات تقليدية متوارثة عبر الأجيال",
    orderNow: "اطلب الآن",
    discover: "اكتشف حلوياتنا",
    freshDaily: "طازجة يومياً",
    traditional: "وصفات تقليدية",
    premium: "مكونات فاخرة",
  },
};

export function HeroSection({ language }: HeroSectionProps) {
  const t = translations[language];
  const isRTL = language === "ar";

  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
        isRTL ? "rtl" : "ltr"
      }`}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/placeholder.svg?height=1080&width=1920"
          alt="Moroccan Pastries"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
      </div>

      {/* Moroccan Pattern Overlay */}
      <div className="absolute inset-0 moroccan-pattern opacity-20 z-10"></div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-great-vibes text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 drop-shadow-lg">
            {t.headline}
          </h1>

          <p className="font-playfair text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t.tagline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className=" bg-[#d0a84b] hover:bg-[#d0a84b]/90 text-primary-foreground px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {t.orderNow}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-foreground px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-transparent"
            >
              {t.discover}
            </Button>
          </div>

          {/*  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                <span className="text-2xl">🥐</span>
              </div>
              <p className="text-white font-medium">{t.freshDaily}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                <span className="text-2xl">📜</span>
              </div>
              <p className="text-white font-medium">{t.traditional}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                <span className="text-2xl">⭐</span>
              </div>
              <p className="text-white font-medium">{t.premium}</p>
            </div>
          </div> */}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
