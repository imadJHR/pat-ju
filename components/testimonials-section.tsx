"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { MoroccanDivider } from "./moroccan-divider"

interface TestimonialsSectionProps {
  language: "en" | "fr" | "ar"
}

const translations = {
  en: {
    title: "What Our Customers Say",
    subtitle: "Testimonials from pastry lovers around the world",
    previous: "Previous",
    next: "Next",
  },
  fr: {
    title: "Ce Que Disent Nos Clients",
    subtitle: "Témoignages d'amateurs de pâtisseries du monde entier",
    previous: "Précédent",
    next: "Suivant",
  },
  ar: {
    title: "ما يقوله عملاؤنا",
    subtitle: "شهادات من محبي المعجنات حول العالم",
    previous: "السابق",
    next: "التالي",
  },
}

const testimonials = {
  en: [
    {
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      text: "The most authentic Moroccan pastries I've ever tasted outside of Morocco! The chebakia reminds me of my grandmother's recipe.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Ahmed Benali",
      location: "Paris, France",
      rating: 5,
      text: "Exceptional quality and taste. These pastries transport me back to the souks of Marrakech. Highly recommended!",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Maria Rodriguez",
      location: "Madrid, Spain",
      rating: 5,
      text: "The gazelle horns are absolutely divine! Perfect balance of sweetness and texture. Will definitely order again.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ],
  fr: [
    {
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      text: "Les pâtisseries marocaines les plus authentiques que j'aie jamais goûtées en dehors du Maroc ! La chebakia me rappelle la recette de ma grand-mère.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Ahmed Benali",
      location: "Paris, France",
      rating: 5,
      text: "Qualité et goût exceptionnels. Ces pâtisseries me transportent dans les souks de Marrakech. Hautement recommandé !",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Maria Rodriguez",
      location: "Madrid, Spain",
      rating: 5,
      text: "Les cornes de gazelle sont absolument divines ! Équilibre parfait entre douceur et texture. Je commanderai certainement à nouveau.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ],
  ar: [
    {
      name: "سارة جونسون",
      location: "نيويورك، الولايات المتحدة",
      rating: 5,
      text: "أكثر الحلويات المغربية أصالة التي تذوقتها خارج المغرب! الشباكية تذكرني بوصفة جدتي.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "أحمد بنعلي",
      location: "باريس، فرنسا",
      rating: 5,
      text: "جودة وطعم استثنائيان. هذه المعجنات تنقلني إلى أسواق مراكش. أنصح بها بشدة!",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "ماريا رودريغيز",
      location: "مدريد، إسبانيا",
      rating: 5,
      text: "قرون الغزال رائعة تماماً! توازن مثالي بين الحلاوة والقوام. سأطلب مرة أخرى بالتأكيد.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ],
}

export function TestimonialsSection({ language }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const t = translations[language]
  const reviews = testimonials[language]
  const isRTL = language === "ar"

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [reviews.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <section className={`py-20 moroccan-section-warm text-white ${isRTL ? "rtl" : "ltr"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-great-vibes text-4xl md:text-5xl text-white mb-4">{t.title}</h2>
          <p className="font-playfair text-lg md:text-xl text-white/90 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <MoroccanDivider symbol="❋" className="mb-16" />

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {reviews.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                    <CardContent className="p-8 md:p-12 text-center">
                      <Quote className="h-12 w-12 text-white/50 mx-auto mb-6" />

                      <p className="font-playfair text-lg md:text-xl leading-relaxed mb-8 italic">
                        &ldquo;{testimonial.text}&rdquo;
                      </p>

                      <div className="flex justify-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      <div className="flex items-center justify-center gap-4">
                        <div className="relative w-12 h-12 rounded-full border-2 border-white/30 overflow-hidden">
                          <Image
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <h4 className="font-semibold text-white">{testimonial.name}</h4>
                          <p className="text-white/70 text-sm">{testimonial.location}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              {t.previous}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              {t.next}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-white" : "bg-white/30"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}