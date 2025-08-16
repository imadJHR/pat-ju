"use client"

import { MoroccanDivider } from "@/components/moroccan-divider"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPageClient() {
  const [language, setLanguage] = useState("fr")

  const translations = {
    fr: {
      title: "Notre Histoire",
      subtitle: "Trois Générations de Passion",
      heritage: {
        title: "Un Héritage Familial",
        content:
          "Depuis 1952, notre famille perpétue l'art de la pâtisserie marocaine traditionnelle. Fondée par notre grand-père Ahmed dans les ruelles de la médina de Fès, notre maison a su préserver les recettes ancestrales tout en s'adaptant aux goûts contemporains.",
      },
      tradition: {
        title: "Tradition & Authenticité",
        content:
          "Chaque pâtisserie est confectionnée selon les méthodes traditionnelles, avec des ingrédients soigneusement sélectionnés : miel de montagne, amandes de Tafilalet, fleur d'oranger de Nabeul, et épices rares du souk.",
      },
      craftsmanship: {
        title: "Savoir-Faire Artisanal",
        content:
          "Nos maîtres pâtissiers, formés dans le respect de la tradition, façonnent chaque création à la main. De la préparation de la pâte feuilletée aux délicats motifs de décoration, chaque geste témoigne d'un savoir-faire unique.",
      },
      mission: {
        title: "Notre Mission",
        content:
          "Faire découvrir au monde entier la richesse de la pâtisserie marocaine, en préservant son authenticité tout en innovant pour satisfaire les palais les plus exigeants.",
      },
      values: {
        title: "Nos Valeurs",
        quality: "Qualité Premium",
        qualityDesc: "Ingrédients nobles et processus artisanal",
        tradition: "Respect des Traditions",
        traditionDesc: "Recettes ancestrales préservées",
        innovation: "Innovation Créative",
        innovationDesc: "Nouvelles créations inspirées du patrimoine",
      },
      breadcrumb: {
        home: "Accueil",
        about: "À Propos",
      },
    },
    ar: {
      title: "قصتنا",
      subtitle: "ثلاثة أجيال من الشغف",
      heritage: {
        title: "تراث عائلي",
        content:
          "منذ عام 1952، تواصل عائلتنا فن الحلويات المغربية التقليدية. تأسست على يد جدنا أحمد في أزقة مدينة فاس العتيقة، واستطاعت دارنا الحفاظ على الوصفات الأصيلة مع التكيف مع الأذواق المعاصرة.",
      },
      tradition: {
        title: "التقليد والأصالة",
        content:
          "كل حلوى تُصنع وفقاً للطرق التقليدية، بمكونات مختارة بعناية: عسل الجبل، لوز تافيلالت، ماء الزهر من نابل، والتوابل النادرة من السوق.",
      },
      craftsmanship: {
        title: "الحرفية اليدوية",
        content:
          "أساتذة الحلويات لدينا، المدربون في احترام التقاليد، يشكلون كل إبداع باليد. من تحضير العجين المورق إلى الزخارف الدقيقة، كل حركة تشهد على مهارة فريدة.",
      },
      mission: {
        title: "مهمتنا",
        content: "تعريف العالم بثراء الحلويات المغربية، مع الحفاظ على أصالتها والابتكار لإرضاء أكثر الأذواق تطلباً.",
      },
      values: {
        title: "قيمنا",
        quality: "جودة عالية",
        qualityDesc: "مكونات نبيلة وعملية حرفية",
        tradition: "احترام التقاليد",
        traditionDesc: "وصفات أجدادنا محفوظة",
        innovation: "الابتكار الإبداعي",
        innovationDesc: "إبداعات جديدة مستوحاة من التراث",
      },
      breadcrumb: {
        home: "الرئيسية",
        about: "من نحن",
      },
    },
    en: {
      title: "Our Story",
      subtitle: "Three Generations of Passion",
      heritage: {
        title: "A Family Heritage",
        content:
          "Since 1952, our family has perpetuated the art of traditional Moroccan pastry. Founded by our grandfather Ahmed in the alleys of Fez medina, our house has preserved ancestral recipes while adapting to contemporary tastes.",
      },
      tradition: {
        title: "Tradition & Authenticity",
        content:
          "Each pastry is crafted according to traditional methods, with carefully selected ingredients: mountain honey, Tafilalet almonds, orange blossom from Nabeul, and rare spices from the souk.",
      },
      craftsmanship: {
        title: "Artisanal Craftsmanship",
        content:
          "Our master pastry chefs, trained in respect of tradition, shape each creation by hand. From preparing puff pastry to delicate decorative patterns, each gesture testifies to unique expertise.",
      },
      mission: {
        title: "Our Mission",
        content:
          "To introduce the world to the richness of Moroccan pastry, preserving its authenticity while innovating to satisfy the most demanding palates.",
      },
      values: {
        title: "Our Values",
        quality: "Premium Quality",
        qualityDesc: "Noble ingredients and artisanal process",
        tradition: "Respect for Traditions",
        traditionDesc: "Ancestral recipes preserved",
        innovation: "Creative Innovation",
        innovationDesc: "New creations inspired by heritage",
      },
      breadcrumb: {
        home: "Home",
        about: "About",
      },
    },
  }

  const t = translations[language as keyof typeof translations]

  return (
    <div className={`min-h-screen bg-gradient-to-b from-almond-50 to-white ${language === "ar" ? "rtl" : "ltr"}`}>
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        <nav className="flex items-center space-x-2 text-sm text-honey-600 mb-8">
          <Link href="/" className="hover:text-saffron-500 transition-colors">
            {t.breadcrumb.home}
          </Link>
          <span>/</span>
          <span className="text-saffron-600 font-medium">{t.breadcrumb.about}</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-great-vibes text-6xl md:text-7xl text-[#d4b05d] mb-4">{t.title}</h1>
          <p className="font-playfair text-2xl md:text-3xl text-[#d4b05d] mb-6">{t.subtitle}</p>
        </div>
      </section>

      <MoroccanDivider />

      {/* Heritage Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-8">
              <div>
                <h2 className="font-playfair text-3xl text-saffron-600 mb-4">{t.heritage.title}</h2>
                <p className="font-poppins text-gray-600 leading-relaxed">{t.heritage.content}</p>
              </div>

              <div>
                <h3 className="font-playfair text-2xl text-honey-700 mb-3">{t.tradition.title}</h3>
                <p className="font-poppins text-gray-600 leading-relaxed">{t.tradition.content}</p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="Traditional Moroccan pastry making"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-saffron-100 rounded-full moroccan-pattern opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      <MoroccanDivider />

      {/* Craftsmanship & Mission */}
      <section className="py-16 bg-gradient-to-r from-honey-50 to-saffron-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-8">
              <div>
                <h2 className="font-playfair text-3xl text-saffron-600 mb-4">{t.craftsmanship.title}</h2>
                <p className="font-poppins text-gray-600 leading-relaxed">{t.craftsmanship.content}</p>
              </div>
            </div>

            <div>
              <h2 className="font-playfair text-3xl text-honey-700 mb-4">{t.mission.title}</h2>
              <p className="font-poppins text-gray-600 leading-relaxed">{t.mission.content}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl text-saffron-600 mb-4">{t.values.title}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-saffron-500 rounded-full"></div>
              </div>
              <h3 className="font-playfair text-xl text-honey-700 mb-2">{t.values.quality}</h3>
              <p className="font-poppins text-gray-600 text-sm">{t.values.qualityDesc}</p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-honey-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-honey-500 rounded-full"></div>
              </div>
              <h3 className="font-playfair text-xl text-honey-700 mb-2">{t.values.tradition}</h3>
              <p className="font-poppins text-gray-600 text-sm">{t.values.traditionDesc}</p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-almond-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-almond-500 rounded-full"></div>
              </div>
              <h3 className="font-playfair text-xl text-honey-700 mb-2">{t.values.innovation}</h3>
              <p className="font-poppins text-gray-600 text-sm">{t.values.innovationDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Pâtisseries Marocaines Authentiques",
            description: "Famille de pâtissiers marocains depuis 1952",
            foundingDate: "1952",
            founder: {
              "@type": "Person",
              name: "Ahmed",
            },
            address: {
              "@type": "PostalAddress",
              addressCountry: "MA",
              addressLocality: "Fès",
            },
            specialty: "Pâtisseries marocaines traditionnelles",
          }),
        }}
      />
    </div>
  )
}
