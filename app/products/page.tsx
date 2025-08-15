import type { Metadata } from "next"
import ProductsClient from "./ProductsClient"

export const metadata: Metadata = {
  title: "Pâtisseries Marocaines Authentiques | Boutique en Ligne",
  description:
    "Découvrez notre collection exclusive de pâtisseries marocaines traditionnelles. Chebakia, cornes de gazelle, baklava et plus encore. Livraison partout au Maroc.",
  keywords:
    "pâtisseries marocaines, chebakia, cornes de gazelle, baklava, makroudh, gâteaux traditionnels, livraison Maroc",
  openGraph: {
    title: "Pâtisseries Marocaines Authentiques",
    description: "Collection exclusive de pâtisseries traditionnelles marocaines",
    type: "website",
    locale: "fr_MA",
    alternateLocale: ["ar_MA", "en_US"],
  },
  alternates: {
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
