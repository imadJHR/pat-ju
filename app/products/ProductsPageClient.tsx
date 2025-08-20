"use client";

import { MoroccanDivider } from "@/components/moroccan-divider";
// FIX: Removed the non-existent 'ProductShowcaseProps' from the import
import { ProductShowcase } from "@/components/product-showcase";
import { QuickViewModal } from "@/components/quick-view-modal";
import { products } from "@/data/products";
import { useCart } from "@/hooks/use-cart";
import Link from "next/link";
import { useState, useEffect } from "react";

// Define the language type for clarity
type Language = "en" | "fr" | "ar";

export default function ProductsPageClient() {
  const [language, setLanguage] = useState<Language>("fr");
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const { addItem } = useCart();

  // Effect to manage language persistence in localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && ["en", "fr", "ar"].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    // Dispatch a global event in case other components (like a header) need to update
    window.dispatchEvent(new CustomEvent("languageChange", { detail: { language: newLanguage } }));
  };

  // Define the handler functions with explicit types, since we can't import the props type
  const handleAddToCart = (productId: string, quantity = 1) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product, language);
      }
    }
  };

  const handleQuickView = (productId: string) => {
    setSelectedProductId(productId);
    setIsQuickViewOpen(true);
  };
  
  const translations = {
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

  const t = translations[language];
  const selectedProduct = selectedProductId ? products.find((p) => p.id === selectedProductId) : null;

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-almond-50 to-white ${
        language === "ar" ? "rtl" : "ltr"
      }`}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* ===== LANGUAGE SWITCHER ===== */}
      <div className="container mx-auto px-4 pt-8 text-right">
        <div className="inline-flex space-x-2 rounded-md bg-white p-1 shadow-sm">
          {(["en", "fr", "ar"] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                language === lang
                  ? "bg-saffron-500 text-white"
                  : "text-gray-600 hover:bg-almond-100"
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 pt-12 pb-8">
        <nav className={`flex items-center space-x-2 text-sm text-honey-600 mb-8 ${language === 'ar' ? 'space-x-reverse' : ''}`}>
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
        <ProductShowcase
          language={language}
          onAddToCart={handleAddToCart}
          onQuickView={handleQuickView}
        />
      </section>

      {/* Render the QuickViewModal when a product is selected */}
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          language={language}
          isOpen={isQuickViewOpen}
          onClose={() => {
            setIsQuickViewOpen(false);
            setSelectedProductId(null);
          }}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: "Pâtisseries Marocaines Authentiques",
            description: "Boutique en ligne de pâtisseries marocaines traditionnelles",
            url: "https://yoursite.com/products", // Replace with your actual URL
            address: {
              "@type": "PostalAddress",
              addressCountry: "MA",
              addressLocality: "Casablanca",
            },
          }),
        }}
      />
    </div>
  );
}