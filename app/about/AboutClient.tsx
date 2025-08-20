"use client"

import { MoroccanDivider } from "@/components/moroccan-divider"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button" // Assuming you use shadcn/ui
import { Gem, ScrollText, Sparkles, ArrowRight } from "lucide-react" // New icons for values

// --- ADDED: Reusable component for the "Values" section for cleaner code ---
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
      title: "Notre Histoire",
      subtitle: "Trois Générations de Passion Pâtissière",
      heritage: {
        title: "Un Héritage Familial Précieux",
        era1_year: "1952",
        era1_title: "La Fondation par Ahmed",
        era1_content: "Dans les ruelles parfumées de la médina de Fès, notre grand-père Ahmed allume le premier four, posant la première pierre d'un héritage de saveurs.",
        era2_year: "1985",
        era2_title: "La Transmission du Savoir",
        era2_content: "Son fils, Mustafa, reprend le flambeau. Il modernise l'atelier tout en préservant scrupuleusement les recettes et techniques ancestrales qui font notre renommée.",
        era3_year: "Aujourd'hui",
        era3_title: "L'Innovation dans la Tradition",
        era3_content: "La troisième génération, nous continuons de faire vivre cet art. Nous marions l'authenticité des goûts d'antan avec une créativité contemporaine.",
      },
      craftsmanship: {
        title: "Le Geste de l'Artisan",
        content: "Nos maîtres pâtissiers façonnent chaque création à la main. De la préparation de la pâte aux délicats motifs de décoration, chaque geste témoigne d'un savoir-faire unique et d'une passion inébranlable.",
      },
      ingredients: {
          title: "Le Secret de nos Ingrédients",
          content: "Nous sélectionnons uniquement les trésors de notre terroir : miel pur de l'Atlas, amandes de Tafilalet, et fleur d'oranger distillée traditionnellement.",
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
          title: "Goûtez à notre Histoire",
          content: "Chaque pâtisserie est un chapitre de notre livre de famille. Nous vous invitons à le découvrir.",
          button: "Découvrir nos Créations",
      },
      breadcrumb: { home: "Accueil", about: "À Propos" },
    },
    ar: {
        title: "قصتنا",
        subtitle: "ثلاثة أجيال من شغف الحلويات",
        heritage: {
            title: "تراث عائلي ثمين",
            era1_year: "1952",
            era1_title: "التأسيس على يد أحمد",
            era1_content: "في أزقة فاس العتيقة، أشعل جدنا أحمد الفرن الأول، واضعًا حجر الأساس لإرث من النكهات.",
            era2_year: "1985",
            era2_title: "نقل المعرفة",
            era2_content: "استلم ابنه مصطفى الشعلة. قام بتحديث الورشة مع الحفاظ بدقة على الوصفات الأصيلة التي صنعت شهرتنا.",
            era3_year: "اليوم",
            era3_title: "الابتكار في التقاليد",
            era3_content: "الجيل الثالث، نحن، نواصل إحياء هذا الفن. نمزج أصالة نكهات الماضي مع إبداع معاصر.",
        },
        craftsmanship: {
            title: "لمسة الحرفي",
            content: "أساتذة الحلويات لدينا يشكلون كل إبداع باليد. من تحضير العجين إلى الزخارف الدقيقة، كل حركة تشهد على مهارة فريدة وشغف لا يتزعزع.",
        },
        ingredients: {
            title: "سر مكوناتنا",
            content: "نختار فقط كنوز أرضنا: عسل الأطلس النقي، لوز تافيلالت، وماء الزهر المقطر تقليديًا.",
        },
        values: {
            title: "قيمنا الأساسية",
            quality: "جودة عالية",
            qualityDesc: "مكونات نبيلة لمذاق استثنائي.",
            tradition: "احترام التقاليد",
            traditionDesc: "وصفات أجداد تروي حكاية.",
            innovation: "الابتكار الإبداعي",
            innovationDesc: "إبداعات ملهمة تفاجئ الأذواق.",
        },
        cta: {
            title: "تذوقوا قصتنا",
            content: "كل حلوى هي فصل من كتاب عائلتنا. ندعوكم لاكتشافه.",
            button: "اكتشفوا إبداعاتنا",
        },
        breadcrumb: { home: "الرئيسية", about: "من نحن" },
    },
    en: {
        title: "Our Story",
        subtitle: "Three Generations of Pastry Passion",
        heritage: {
            title: "A Precious Family Heritage",
            era1_year: "1952",
            era1_title: "Foundation by Ahmed",
            era1_content: "In the fragrant alleys of the Fez medina, our grandfather Ahmed lit the first oven, laying the cornerstone of a legacy of flavors.",
            era2_year: "1985",
            era2_title: "Passing Down the Knowledge",
            era2_content: "His son, Mustafa, took up the torch. He modernized the workshop while scrupulously preserving the ancestral recipes that define our reputation.",
            era3_year: "Today",
            era3_title: "Innovation in Tradition",
            era3_content: "As the third generation, we continue to bring this art to life, blending the authenticity of old-world tastes with contemporary creativity.",
        },
        craftsmanship: {
            title: "The Artisan's Touch",
            content: "Our master pastry chefs shape each creation by hand. From preparing the dough to the delicate decorative patterns, each gesture testifies to unique know-how and an unwavering passion.",
        },
        ingredients: {
            title: "The Secret of Our Ingredients",
            content: "We select only the treasures of our land: pure Atlas honey, Tafilalet almonds, and traditionally distilled orange blossom water.",
        },
        values: {
            title: "Our Core Values",
            quality: "Premium Quality",
            qualityDesc: "Noble ingredients for an exceptional taste.",
            tradition: "Respect for Traditions",
            traditionDesc: "Ancestral recipes that tell a story.",
            innovation: "Creative Innovation",
            innovationDesc: "Inspired creations that surprise the palate.",
        },
        cta: {
            title: "Taste our Story",
            content: "Each pastry is a chapter in our family book. We invite you to discover it.",
            button: "Discover our Creations",
        },
        breadcrumb: { home: "Home", about: "About" },
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
                  className={`px-3 py-1 text-sm font-semibold rounded-full transition-all ${
                    language === lang
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
                 src="/images/moroccan-pastry-chef-hands.jpg" // IMPORTANT: Replace with a real, high-quality image
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

      {/* --- ADDED: Ingredients Showcase --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="font-playfair text-4xl text-stone-800 mb-4">{t.ingredients.title}</h2>
                <p className="font-poppins text-stone-600 leading-relaxed">{t.ingredients.content}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center group"><div className="relative aspect-square rounded-full overflow-hidden mb-4 shadow-lg"><Image src="/images/almonds.jpg" alt="Tafilalet almonds" fill sizes="33vw" className="object-cover group-hover:scale-105 transition-transform duration-300"/></div><h3 className="font-semibold text-stone-700">Amandes de Tafilalet</h3></div>
                <div className="text-center group"><div className="relative aspect-square rounded-full overflow-hidden mb-4 shadow-lg"><Image src="/images/honey.jpg" alt="Atlas mountain honey" fill sizes="33vw" className="object-cover group-hover:scale-105 transition-transform duration-300"/></div><h3 className="font-semibold text-stone-700">Miel de l'Atlas</h3></div>
                <div className="text-center group col-span-2 md:col-span-1"><div className="relative aspect-square rounded-full overflow-hidden mb-4 shadow-lg"><Image src="/images/orange-blossom.jpg" alt="Orange blossom water" fill sizes="33vw" className="object-cover group-hover:scale-105 transition-transform duration-300"/></div><h3 className="font-semibold text-stone-700">Fleur d'Oranger</h3></div>
            </div>
        </div>
      </section>
      
      {/* --- REFINED: Values Section with meaningful icons --- */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl text-stone-800">{t.values.title}</h2>
             <MoroccanDivider className="mx-auto mt-4"/>
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