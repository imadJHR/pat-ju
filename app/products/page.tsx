import type { Metadata } from "next"
import ProductsClient from "./ProductsClient"

export const metadata: Metadata = {
  title: "Pâtisseries Les Jumeaux Casablanca | Produits Marocains Traditionnels",
  description:
    "Découvrez la collection exclusive de Pâtisseries Les Jumeaux à Casablanca : Chebakia, cornes de gazelle, baklava, makroudh et autres gâteaux marocains traditionnels. Livraison rapide partout au Maroc.",
  keywords:
    "pâtisseries marocaines, pâtisseries Casablanca, Chebakia, cornes de gazelle, baklava, makroudh, gâteaux marocains, gâteaux traditionnels, pâtisserie marocaine en ligne, livraison pâtisseries Maroc",
  openGraph: {
    title: "Pâtisseries Les Jumeaux | Pâtisseries Marocaines Authentiques",
    description:
      "Savourez l'authenticité des pâtisseries marocaines avec Les Jumeaux à Casablanca. Chebakia, cornes de gazelle, baklava et bien plus. Livraison au Maroc.",
    type: "website",
    locale: "fr_MA",
    alternateLocale: ["ar_MA", "en_US"],
    url: "https://lesjumeaux.ma/products",
    siteName: "Pâtisseries Les Jumeaux",
    images: [
      {
        url: "https://lesjumeaux.ma/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pâtisseries marocaines Les Jumeaux - Chebakia, cornes de gazelle, baklava",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pâtisseries Les Jumeaux | Produits Marocains Authentiques",
    description:
      "Découvrez les meilleures pâtisseries marocaines à Casablanca : Chebakia, cornes de gazelle, baklava, makroudh et plus. Livraison partout au Maroc.",
    images: ["https://lesjumeaux.ma/images/twitter-card.jpg"],
  },
  alternates: {
    canonical: "https://lesjumeaux.ma/products",
    languages: {
      fr: "/fr/products",
      ar: "/ar/products",
      en: "/en/products",
    },
  },
}

export default function ProductsPage() {
  return <ProductsClient />
}
