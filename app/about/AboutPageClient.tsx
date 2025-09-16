"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button" // Assuming you use shadcn/ui
import { MoroccanDivider } from "@/components/moroccan-divider"
import { Gem, ScrollText, Sparkles, ArrowRight } from "lucide-react"

// --- Composant réutilisable ValueCard ---
const ValueCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
    <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 transform">
        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white ring-4 ring-amber-100 transition-all duration-300 group-hover:ring-amber-200">
            <Icon className="h-10 w-10 text-amber-600" />
        </div>
        <h3 className="font-playfair text-2xl text-stone-800 mb-2">{title}</h3>
        <p className="font-poppins text-stone-600">{description}</p>
    </div>
);

export default function AboutPageClient() {
  // Contenu en français directement dans un objet
  const content = {
    title: "Notre Histoire",
    subtitle: "Trois Générations de Passion Pâtissière",
    heritage: {
      title: "Un Héritage Familial Précieux",
      era1_year: "2008",
      era1_title: "La Fondation par mohammed",
      era1_content: "Dans les ruelles parfumées de la médina de Fès, notre grand-père Ahmed allume le premier four, posant la première pierre d'un héritage de saveurs.",
      era2_year: "1985",
      era2_title: "La Transmission du Savoir",
      era2_content: "Son fils, Mustafa, reprend le flambeau. Il modernise l'atelier tout en préservant scrupuleusement les recettes et techniques ancestrales qui font notre renommée.",
      era3_year: "Aujourd'hui",
      era3_title: "L'Innovation dans la Tradition",
      era3_content: "La troisième génération, nous continuons de faire vivre cet art. Nous marions l'authenticité des goûts d'antan avec une créativité contemporaine, pour vous offrir des émotions uniques.",
    },
    craftsmanship: {
      title: "Le Geste de l'Artisan",
      content: "Nos maîtres pâtissiers, formés dans le respect de la tradition, façonnent chaque création à la main. De la préparation de la pâte feuilletée aux délicats motifs de décoration, chaque geste témoigne d'un savoir-faire unique et d'une passion inébranlable.",
    },
    ingredients: {
        title: "Le Secret de nos Ingrédients",
        content: "Nous sélectionnons uniquement les trésors de notre terroir : miel pur de l'Atlas, amandes de Tafilalet baignées de soleil, et fleur d'oranger distillée traditionnellement.",
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
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* --- Section En-tête --- */}
      <header className="container mx-auto px-4 pt-8 pb-8">
        <div className="flex justify-between items-center">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-stone-500">
            <Link href="/" className="hover:text-amber-600 transition-colors">{content.breadcrumb.home}</Link>
            <span>/</span>
            <span className="font-medium text-amber-700">{content.breadcrumb.about}</span>
          </nav>
        </div>
      </header>

      {/* --- Section Héro --- */}
      <section className="container mx-auto px-4 pt-12 pb-20 text-center">
        <h1 className="font-great-vibes text-6xl md:text-8xl text-amber-600 mb-4">{content.title}</h1>
        <p className="font-playfair text-2xl md:text-3xl text-stone-600 max-w-3xl mx-auto">{content.subtitle}</p>
      </section>
      
      {/* --- Section Chronologie --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-center font-playfair text-4xl text-stone-800 mb-16">{content.heritage.title}</h2>
                <div className="relative space-y-16">
                    {/* La ligne verticale */}
                    <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-amber-200"></div>

                    {/* Élément 1 */}
                    <div className="relative flex items-start gap-8">
                        <div className="flex-shrink-0 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10">{/* 1 */}</div>
                        <div className="flex-1 pt-1">
                            <p className="font-bold text-amber-600 text-sm mb-1">{content.heritage.era1_year}</p>
                            <h3 className="font-playfair text-2xl font-semibold mb-2">{content.heritage.era1_title}</h3>
                            <p className="text-stone-600 leading-relaxed">{content.heritage.era1_content}</p>
                        </div>
                    </div>
                    {/* Élément 2 */}
                     <div className="relative flex items-start gap-8">
                        <div className="flex-shrink-0 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10">{/* 2 */}</div>
                        <div className="flex-1 pt-1">
                            <p className="font-bold text-amber-600 text-sm mb-1">{content.heritage.era2_year}</p>
                            <h3 className="font-playfair text-2xl font-semibold mb-2">{content.heritage.era2_title}</h3>
                            <p className="text-stone-600 leading-relaxed">{content.heritage.era2_content}</p>
                        </div>
                    </div>
                     {/* Élément 3 */}
                    <div className="relative flex items-start gap-8">
                        <div className="flex-shrink-0 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10">{/* 3 */}</div>
                        <div className="flex-1 pt-1">
                            <p className="font-bold text-amber-600 text-sm mb-1">{content.heritage.era3_year}</p>
                            <h3 className="font-playfair text-2xl font-semibold mb-2">{content.heritage.era3_title}</h3>
                            <p className="text-stone-600 leading-relaxed">{content.heritage.era3_content}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
      
      {/* --- Section Savoir-Faire --- */}
      <section className="py-24 bg-stone-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
             <div className="relative aspect-square lg:order-last">
              <Image
                src="/images/moroccan-pastry-chef-hands.jpg" // Remplacez par une image réelle
                alt="Artisan pâtissier façonnant des douceurs marocaines"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="rounded-2xl object-cover shadow-2xl"
              />
            </div>
            <div className="space-y-4 lg:order-first">
              <h2 className="font-playfair text-4xl text-stone-800">{content.craftsmanship.title}</h2>
              <MoroccanDivider />
              <p className="font-poppins text-stone-600 leading-relaxed text-lg">{content.craftsmanship.content}</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section Ingrédients --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="font-playfair text-4xl text-stone-800 mb-4">{content.ingredients.title}</h2>
                <p className="font-poppins text-stone-600 leading-relaxed">{content.ingredients.content}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center group"><div className="relative aspect-square rounded-full overflow-hidden mb-4 shadow-lg"><Image src="/images/almonds.jpg" alt="Amandes de Tafilalet" fill sizes="33vw" className="object-cover group-hover:scale-105 transition-transform duration-300"/></div><h3 className="font-semibold text-stone-700">Amandes de Tafilalet</h3></div>
                <div className="text-center group"><div className="relative aspect-square rounded-full overflow-hidden mb-4 shadow-lg"><Image src="/images/honey.jpg" alt="Miel de l'Atlas" fill sizes="33vw" className="object-cover group-hover:scale-105 transition-transform duration-300"/></div><h3 className="font-semibold text-stone-700">Miel de l&apos;Atlas</h3></div>
                <div className="text-center group col-span-2 md:col-span-1"><div className="relative aspect-square rounded-full overflow-hidden mb-4 shadow-lg"><Image src="/images/orange-blossom.jpg" alt="Eau de fleur d'oranger" fill sizes="33vw" className="object-cover group-hover:scale-105 transition-transform duration-300"/></div><h3 className="font-semibold text-stone-700">Fleur d&apos;Oranger</h3></div>
            </div>
        </div>
      </section>
      
      {/* --- Section Valeurs --- */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl text-stone-800">{content.values.title}</h2>
             <MoroccanDivider className="mx-auto mt-4"/>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <ValueCard icon={Gem} title={content.values.quality} description={content.values.qualityDesc} />
            <ValueCard icon={ScrollText} title={content.values.tradition} description={content.values.traditionDesc} />
            <ValueCard icon={Sparkles} title={content.values.innovation} description={content.values.innovationDesc} />
          </div>
        </div>
      </section>

      {/* --- Section Appel à l'Action (CTA) --- */}
      <section className="py-24 bg-amber-600 text-white">
        <div className="container mx-auto px-4 text-center">
            <h2 className="font-playfair text-4xl mb-4">{content.cta.title}</h2>
            <p className="font-poppins max-w-2xl mx-auto mb-8 opacity-90">{content.cta.content}</p>
            <Link href="/products">
                <Button size="lg" variant="secondary" className="bg-white text-amber-700 hover:bg-amber-50 text-lg group">
                    {content.cta.button}
                    <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
            </Link>
        </div>
      </section>
    </div>
  )
}