"use client";

import { ProductShowcase } from "@/components/product-showcase";
import { MoroccanDivider } from "@/components/moroccan-divider";
import { useState } from "react";
import Link from "next/link";

export default function ProductsPageClient() {
  const [language, setLanguage] = useState("fr");

  const translations = {
    fr: {
      title: "Nos Pâtisseries",
      subtitle: "Collection Authentique",
      description:
        "Découvrez notre sélection raffinée de pâtisseries marocaines traditionnelles, préparées avec des ingrédients de première qualité et selon des recettes ancestrales transmises de génération en génération.",
      breadcrumb: {
        home: "Accueil",
        products: "Produits",
      },
    },
    ar: {
      title: "حلوياتنا",
      subtitle: "مجموعة أصيلة",
      description:
        "اكتشف مجموعتنا المختارة من الحلويات المغربية التقليدية، المحضرة بمكونات عالية الجودة ووفقاً لوصفات أجدادنا المتوارثة عبر الأجيال.",
      breadcrumb: {
        home: "الرئيسية",
        products: "المنتجات",
      },
    },
    en: {
      title: "Our Pastries",
      subtitle: "Authentic Collection",
      description:
        "Discover our refined selection of traditional Moroccan pastries, prepared with premium ingredients and according to ancestral recipes passed down through generations.",
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
    >
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 pt-24 pb-8">
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
            description:
              "Boutique en ligne de pâtisseries marocaines traditionnelles",
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
