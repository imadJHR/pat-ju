"use client";

import { ProductShowcase } from "@/components/product-showcase";
import { MoroccanDivider } from "@/components/moroccan-divider";
import { useState } from "react";
import Link from "next/link";

export default function ProductsPageClient() {
  const [language, setLanguage] = useState("fr");

  const translations = {
    // ... your translations object remains the same
    fr: {
      title: "Nos Pâtisseries",
      subtitle: "Collection Authentique",
      description: "Découvrez notre sélection raffinée de pâtisseries marocaines traditionnelles, préparées avec des ingrédients de première qualité et selon des recettes ancestrales transmises de génération en génération.",
      breadcrumb: {
        home: "Accueil",
        products: "Produits",
      },
    },
    ar: {
      title: "حلوياتنا",
      subtitle: "مجموعة أصيلة",
      description: "اكتشف مجموعتنا المختارة من الحلويات المغربية التقليدية، المحضرة بمكونات عالية الجودة ووفقاً لوصفات أجدادنا المتوارثة عبر الأجيال.",
      breadcrumb: {
        home: "الرئيسية",
        products: "المنتجات",
      },
    },
    en: {
      title: "Our Pastries",
      subtitle: "Authentic Collection",
      description: "Discover our refined selection of traditional Moroccan pastries, prepared with premium ingredients and according to ancestral recipes passed down through generations.",
      breadcrumb: {
        home: "Home",
        products: "Products",
      },
    },
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-almond-50 to-white ${
        language === "ar" ? "rtl" : "ltr"
      }`}
      // Add dir attribute for better accessibility and layout handling
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* ===== START: LANGUAGE SWITCHER ===== */}
      <div className="container mx-auto px-4 pt-8 text-right">
        <div className="inline-flex space-x-2 rounded-md bg-white p-1 shadow-sm">
          <button
            onClick={() => setLanguage("en")}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              language === "en"
                ? "bg-saffron-500 text-white"
                : "text-gray-600 hover:bg-almond-100"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage("fr")}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              language === "fr"
                ? "bg-saffron-500 text-white"
                : "text-gray-600 hover:bg-almond-100"
            }`}
          >
            FR
          </button>
          <button
            onClick={() => setLanguage("ar")}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              language === "ar"
                ? "bg-saffron-500 text-white"
                : "text-gray-600 hover:bg-almond-100"
            }`}
          >
            AR
          </button>
        </div>
      </div>
      {/* ===== END: LANGUAGE SWITCHER ===== */}

      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 pt-12 pb-8"> {/* Adjusted pt-24 to pt-12 */}
        {/* ... rest of your component is the same */}
        <nav className="flex items-center space-x-2 text-sm text-honey-600 mb-8">
          <Link href="/" className="hover:text-saffron-500 transition-colors">
            {t.breadcrumb.home}
          </Link>
          <span>/</span>
          <span className="text-saffron-600 font-medium">
            {t.breadcrumb.products}
          </span>
        </nav>
      </div>

      {/* ... the rest of your JSX remains unchanged */}
      {/* Hero Section */}
      <section className="container mx-auto px-4 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-great-vibes text-6xl md:text-7xl text-saffron-600 mb-4">
            {t.title}
          </h1>
          <p className="font-playfair text-2xl md:text-3xl text-honey-700 mb-6">
            {t.subtitle}
          </p>
          <p className="font-poppins text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {t.description}
          </p>
        </div>
      </section>

      <MoroccanDivider />

      {/* Products Showcase */}
      <section className="py-16">
        <ProductShowcase/>
      </section>

      {/* SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: "Pâtisseries Marocaines Authentiques",
            description: "Boutique en ligne de pâtisseries marocaines traditionnelles",
            url: "https://yoursite.com/products",
            address: {
              "@type": "PostalAddress",
              addressCountry: "MA",
              addressLocality: "Casablanca",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Pâtisseries Marocaines",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "Chebakia",
                    category: "Pâtisserie Marocaine",
                  },
                },
              ],
            },
          }),
        }}
      />
    </div>
  );
}