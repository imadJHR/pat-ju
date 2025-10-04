"use client"

import { MoroccanDivider } from "@/components/moroccan-divider"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import logo from "@/public/logo.png"
import { Button } from "@/components/ui/button" // Assuming you use shadcn/ui
import { Gem, ScrollText, Sparkles, ArrowRight } from "lucide-react" // New icons for values
const ValueCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
    <div className="w-20 h-20 bg-amber-100/50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white ring-4 ring-amber-100 transition-all duration-300 group-hover:bg-amber-100 group-hover:ring-amber-200">
      <Icon className="h-10 w-10 text-amber-600" />
    </div>
    <h3 className="font-playfair text-2xl text-stone-800 mb-2">{title}</h3>
    <p className="font-poppins text-stone-600">{description}</p>
  </div>
);


export default function AboutClient() {
  const [language, setLanguage] = useState<"fr" | "ar" | "en">("fr")

  // --- REFINED: Expanded translations for the new timeline and sections ---
  const translations = {
    fr: {
      title: "Les Jumeaux", // Changed from "Notre Histoire"
      subtitle: "L'Excellence Pâtissière et Boulangère à Casablanca", // New subtitle based on profile
      heritage: {
        title: "Notre Histoire : Tradition et Expansion", // Adjusted title
        era1_year: "1952", // Keeping a historical start (generic 'foundation' narrative)
        era1_title: "Les Racines de la Maison",
        era1_content: "La première pierre de notre héritage est posée, guidée par une passion pour les saveurs authentiques du Maroc.", // Generalized content
        era2_year: "1985",
        era2_title: "Transmission et Évolution",
        era2_content: "La seconde génération reprend le flambeau, modernisant l'artisanat pour répondre à l'attrait croissant de Casablanca pour la qualité.", // Focus on Casablanca's context
        era3_year: "Aujourd'hui",
        era3_title: "Pâtisserie Les Jumeaux : Multiple Adresses",
        era3_content: "Nous servons nos clients depuis nos multiples adresses à **Casablanca** (Florida, Moustakbal, Ain sebaa), assurant la même excellence dans la **Pâtisserie, la Boulangerie et la Viennoiserie**.", // Directly incorporates the locations and product/service
      },
      craftsmanship: {
        title: "Le Geste de l'Artisan",
        content: "Nos maîtres boulangers et pâtissiers façonnent chaque création à la main. De la préparation de la pâte aux délicats motifs de décoration, chaque geste témoigne d'un savoir-faire unique et d'une passion inébranlable.", // Added 'boulangers' to match the profile
      },
      ingredients: {
        title: "Le Secret de nos Ingrédients",
        content: "Nous sélectionnons uniquement les trésors de notre terroir : miel pur de l'Atlas, amandes de Tafilalet, et fleur d'oranger distillée traditionnellement. C'est notre engagement envers la **Qualité Premium**.",
      },
      values: {
        title: "Nos Valeurs Fondamentales",
        quality: "Qualité Premium",
        qualityDesc: "Des ingrédients nobles pour un goût d'exception.",
        tradition: "Respect des Traditions",
        traditionDesc: "Des recettes ancestrales qui racontent une histoire.",
        innovation: "Innovation Créative",
        innovationDesc: "Des créations inspirées qui surprennent les palais.",
      },
      cta: {
        title: "Visitez l'une de nos adresses à Casablanca",
        content: "Chaque pâtisserie est un chapitre de notre livre de famille. Nous vous invitons à le découvrir.",
        button: "Découvrir nos Créations",
      },
      breadcrumb: { home: "Accueil", about: "À Propos" },
    },
    ar: {
      title: "التوأم", // Les Jumeaux
      subtitle: "التميز في الحلويات والمخبوزات بالدار البيضاء",
      heritage: {
        title: "قصتنا: تقليد وتوسع",
        era1_year: "1952",
        era1_title: "جذور الدار",
        era1_content: "وُضِعت اللبنة الأولى لإرثنا، مدفوعة بشغف النكهات الأصيلة للمغرب.",
        era2_year: "1985",
        era2_title: "التوارث والتطور",
        era2_content: "تولت الجيل الثاني المشعل، مجددًا الحرفية لتلبية الإقبال المتزايد في الدار البيضاء على الجودة.",
        era3_year: "اليوم",
        era3_title: "حلويات التوأم: عدة فروع",
        era3_content: "نخدم زبائننا من خلال عدة فروع في **الدار البيضاء** (فلوريدا، المستقبل، عين السبع)، مع الحفاظ على نفس التميز في **الحلويات، المخبوزات والڤيونواظري**.",
      },
      craftsmanship: {
        title: "حرفة الصانع",
        content: "يصنع خبراؤنا من الخبازين والحلوانيين كل إبداع يدويًا. من إعداد العجين إلى أدق الزخارف، يشهد كل تفصيل على خبرة فريدة وشغف لا يتزعزع.",
      },
      ingredients: {
        title: "سر مكوّناتنا",
        content: "نختار فقط كنوز تراثنا: عسل الأطلس النقي، لوز تافيلالت، وزهر البرتقال المقطر تقليديًا. إنه التزامنا تجاه **الجودة الممتازة**.",
      },
      values: {
        title: "قيمنا الأساسية",
        quality: "جودة ممتازة",
        qualityDesc: "مكوّنات نبيلة لنكهة استثنائية.",
        tradition: "احترام التقاليد",
        traditionDesc: "وصفات عريقة تحكي قصة.",
        innovation: "ابتكار إبداعي",
        innovationDesc: "إبداعات ملهمة تفاجئ الأذواق.",
      },
      cta: {
        title: "زوروا أحد فروعنا في الدار البيضاء",
        content: "كل محل حلويات هو فصل من كتاب عائلتنا. ندعوكم لاكتشافه.",
        button: "اكتشف إبداعاتنا",
      },
      breadcrumb: { home: "الرئيسية", about: "من نحن" },
    }
    ,
    en: {
      title: "Les Jumeaux", // Keeping the brand name
      subtitle: "Pastry and Bakery Excellence in Casablanca",
      heritage: {
        title: "Our Story: Tradition and Growth",
        era1_year: "1952",
        era1_title: "The Roots of the House",
        era1_content: "The foundation of our heritage was laid, driven by a passion for Morocco’s authentic flavors.",
        era2_year: "1985",
        era2_title: "Transmission and Evolution",
        era2_content: "The second generation took over, modernizing the craft to meet Casablanca’s growing demand for quality.",
        era3_year: "Today",
        era3_title: "Les Jumeaux Pastry: Multiple Locations",
        era3_content: "We proudly serve our customers from multiple locations in **Casablanca** (Florida, Moustakbal, Ain Sebaa), delivering the same excellence in **Pastry, Bakery, and Viennoiserie**.",
      },
      craftsmanship: {
        title: "The Artisan’s Touch",
        content: "Our master bakers and pastry chefs craft every creation by hand. From dough preparation to delicate decorative details, each gesture reflects unique expertise and unwavering passion.",
      },
      ingredients: {
        title: "The Secret of Our Ingredients",
        content: "We carefully select treasures from our land: pure Atlas honey, Tafilalet almonds, and traditionally distilled orange blossom. This is our commitment to **Premium Quality**.",
      },
      values: {
        title: "Our Core Values",
        quality: "Premium Quality",
        qualityDesc: "Noble ingredients for an exceptional taste.",
        tradition: "Respect for Traditions",
        traditionDesc: "Ancestral recipes that tell a story.",
        innovation: "Creative Innovation",
        innovationDesc: "Inspired creations that delight every palate.",
      },
      cta: {
        title: "Visit One of Our Locations in Casablanca",
        content: "Each pastry shop is a chapter in our family book. We invite you to discover it.",
        button: "Discover Our Creations",
      },
      breadcrumb: { home: "Home", about: "About Us" },
    }

  }

  const t = translations[language]

  return (
    <div className={`min-h-screen bg-stone-50 ${language === "ar" ? "rtl" : "ltr"}`} dir={language === "ar" ? "rtl" : "ltr"}>
      {/* --- REFINED: Header Section --- */}
      <header className="container mx-auto px-4 pt-8 pb-8">
        <div className="flex justify-between items-center">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-stone-500">
            <Link href="/" className="hover:text-amber-600 transition-colors">{t.breadcrumb.home}</Link>
            <span className="rtl:hidden">/</span><span className="ltr:hidden">\</span>
            <span className="font-medium text-amber-700">{t.breadcrumb.about}</span>
          </nav>
          <div className="flex gap-1 rounded-full p-1 bg-stone-200/50">
            {(["fr", "en", "ar"] as const).map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1 text-sm font-semibold rounded-full transition-all ${language === lang
                  ? "bg-white text-amber-700 shadow-sm"
                  : "text-stone-600 hover:text-amber-700"
                  }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-12 pb-20 text-center">
        <h1 className="font-great-vibes text-6xl md:text-8xl text-amber-600 mb-4">{t.title}</h1>
        <p className="font-playfair text-2xl md:text-3xl text-stone-600 max-w-3xl mx-auto">{t.subtitle}</p>
      </section>

      {/* --- ADDED: Visual Timeline Section --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center font-playfair text-4xl text-stone-800 mb-16">{t.heritage.title}</h2>
            <div className="relative space-y-16 after:absolute after:inset-y-0 after:w-0.5 after:bg-amber-200 after:left-5 rtl:after:right-5 rtl:after:left-auto">
              {/* Timeline Item 1 */}
              <div className="relative flex items-start gap-8">
                <div className="flex-shrink-0 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center font-bold text-white shadow-lg z-10">1</div>
                <div className="flex-1 pt-1">
                  <p className="font-bold text-amber-600 text-sm mb-1">{t.heritage.era1_year}</p>
                  <h3 className="font-playfair text-2xl font-semibold mb-2">{t.heritage.era1_title}</h3>
                  <p className="text-stone-600 leading-relaxed">{t.heritage.era1_content}</p>
                </div>
              </div>
              {/* Timeline Item 2 */}
              <div className="relative flex items-start gap-8">
                <div className="flex-shrink-0 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center font-bold text-white shadow-lg z-10">2</div>
                <div className="flex-1 pt-1">
                  <p className="font-bold text-amber-600 text-sm mb-1">{t.heritage.era2_year}</p>
                  <h3 className="font-playfair text-2xl font-semibold mb-2">{t.heritage.era2_title}</h3>
                  <p className="text-stone-600 leading-relaxed">{t.heritage.era2_content}</p>
                </div>
              </div>
              {/* Timeline Item 3 */}
              <div className="relative flex items-start gap-8">
                <div className="flex-shrink-0 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center font-bold text-white shadow-lg z-10">3</div>
                <div className="flex-1 pt-1">
                  <p className="font-bold text-amber-600 text-sm mb-1">{t.heritage.era3_year}</p>
                  <h3 className="font-playfair text-2xl font-semibold mb-2">{t.heritage.era3_title}</h3>
                  <p className="text-stone-600 leading-relaxed">{t.heritage.era3_content}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- REFINED: Craftsmanship Section with alternating layout --- */}
      <section className="py-24 bg-stone-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
            <div className="relative aspect-[4/5] lg:order-last">
              <Image
                src={logo} // IMPORTANT: Replace with a real, high-quality image
                alt="Artisan pastry chef crafting Moroccan sweets"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="rounded-2xl object-cover shadow-2xl"
              />
            </div>
            <div className="space-y-4 lg:order-first">
              <h2 className="font-playfair text-4xl text-stone-800">{t.craftsmanship.title}</h2>
              <MoroccanDivider />
              <p className="font-poppins text-stone-600 leading-relaxed text-lg">{t.craftsmanship.content}</p>
            </div>
          </div>
        </div>
      </section>



      {/* --- REFINED: Values Section with meaningful icons --- */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl text-stone-800">{t.values.title}</h2>
            <MoroccanDivider className="mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <ValueCard icon={Gem} title={t.values.quality} description={t.values.qualityDesc} />
            <ValueCard icon={ScrollText} title={t.values.tradition} description={t.values.traditionDesc} />
            <ValueCard icon={Sparkles} title={t.values.innovation} description={t.values.innovationDesc} />
          </div>
        </div>
      </section>

      {/* --- ADDED: Call to Action (CTA) Section --- */}
      <section className="py-24 bg-amber-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-4xl mb-4">{t.cta.title}</h2>
          <p className="font-poppins max-w-2xl mx-auto mb-8 opacity-90">{t.cta.content}</p>
          <Link href="/products">
            <Button size="lg" variant="secondary" className="bg-white text-amber-700 hover:bg-amber-50 text-lg group">
              {t.cta.button}
              <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1 rtl:mr-2 rtl:ml-0 rtl:group-hover:-translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}