"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MoroccanDivider } from "./moroccan-divider"

interface AboutSectionProps {
  language: "en" | "fr" | "ar"
}

const translations = {
  en: {
    title: "Our Heritage",
    subtitle: "A Journey Through Moroccan Culinary Tradition",
    story:
      "For generations, our family has been crafting authentic Moroccan pastries using time-honored recipes passed down through the centuries. Each delicate creation tells a story of Morocco's rich culinary heritage.",
    tradition: "Traditional Methods",
    traditionDesc: "We use only traditional techniques and authentic ingredients imported directly from Morocco.",
    quality: "Premium Ingredients",
    qualityDesc:
      "Every pastry is made with the finest almonds, honey, and spices sourced from trusted Moroccan suppliers.",
    craftsmanship: "Artisan Craftsmanship",
    craftsmanshipDesc: "Our master pastry chefs have trained in the traditional methods of Moroccan confectionery.",
    experience: "Years of Experience",
    experienceDesc: "Decades of expertise in creating the perfect balance of flavors and textures.",
  },
  fr: {
    title: "Notre Héritage",
    subtitle: "Un Voyage à Travers la Tradition Culinaire Marocaine",
    story:
      "Depuis des générations, Pâtisseries Les Jumeaux perpétue l’art de la confection des pâtisseries marocaines authentiques, en suivant des recettes ancestrales transmises à travers les siècles. Chaque création raffinée reflète le riche patrimoine culinaire du Maroc et raconte une histoire de tradition et de passion.",
    tradition: "Méthodes Traditionnelles",
    traditionDesc:
      "Nous utilisons uniquement des techniques traditionnelles et des ingrédients authentiques importés directement du Maroc.",
    quality: "Ingrédients Premium",
    qualityDesc:
      "Chaque pâtisserie est faite avec les meilleures amandes, miel et épices provenant de fournisseurs marocains de confiance.",
    craftsmanship: "Artisanat d'Art",
    craftsmanshipDesc: "Nos maîtres pâtissiers ont été formés aux méthodes traditionnelles de la confiserie marocaine.",
    experience: "Années d'Expérience",
    experienceDesc: "Des décennies d'expertise dans la création de l'équilibre parfait des saveurs et des textures.",
  },
  ar: {
    title: "تراثنا",
    subtitle: "رحلة عبر التقاليد الطهوية المغربية",
    story:
      "لأجيال، كانت عائلتنا تصنع الحلويات المغربية الأصيلة باستخدام وصفات تقليدية متوارثة عبر القرون. كل إبداع رقيق يحكي قصة التراث الطهوي الغني للمغرب.",
    tradition: "الطرق التقليدية",
    traditionDesc: "نستخدم فقط التقنيات التقليدية والمكونات الأصيلة المستوردة مباشرة من المغرب.",
    quality: "مكونات فاخرة",
    qualityDesc: "كل معجنة مصنوعة بأجود اللوز والعسل والتوابل من موردين مغاربة موثوقين.",
    craftsmanship: "الحرفية الفنية",
    craftsmanshipDesc: "تدرب أساتذة الحلويات لدينا على الطرق التقليدية للحلويات المغربية.",
    experience: "سنوات من الخبرة",
    experienceDesc: "عقود من الخبرة في خلق التوازن المثالي للنكهات والقوام.",
  },
}

export function AboutSection({ language }: AboutSectionProps) {
  const t = translations[language]
  const isRTL = language === "ar"

  return (
    <section id="about" className={`py-20 moroccan-section-light ${isRTL ? "rtl" : "ltr"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-great-vibes text-4xl md:text-5xl text-[#d0a84b] mb-4">{t.title}</h2>
          <p className="font-playfair text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <MoroccanDivider symbol="✦" className="mb-16" />

        {/* Story Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative">
            <div className="absolute inset-0 moroccan-geometric opacity-30"></div>
            <Card className="moroccan-card relative z-10 bg-[#f4ead7]/80 backdrop-blur-sm">
              <CardContent className="p-8 md:p-12">
                <p className="font-playfair text-lg md:text-xl leading-relaxed text-center text-foreground">
                  {t.story}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: t.tradition,
              description: t.traditionDesc,
              icon: "🏺",
              delay: "0ms",
            },
            {
              title: t.quality,
              description: t.qualityDesc,
              icon: "⭐",
              delay: "100ms",
            },
            {
              title: t.craftsmanship,
              description: t.craftsmanshipDesc,
              icon: "👨‍🍳",
              delay: "200ms",
            },
            {
              title: t.experience,
              description: t.experienceDesc,
              icon: "🏆",
              delay: "300ms",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="moroccan-card text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-background/80 backdrop-blur-sm"
              style={{ animationDelay: feature.delay }}
            >
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 float-animation">
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="font-playfair text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
