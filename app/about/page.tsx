import type { Metadata } from "next"
import AboutClient from "./AboutClient"

export const metadata: Metadata = {
  title: "À Propos de Pâtisseries Les Jumeaux | Tradition & Authenticité Marocaine",
  description:
    "Depuis Casablanca, Pâtisseries Les Jumeaux perpétue un héritage culinaire marocain depuis trois générations. Découvrez notre histoire, notre passion et notre savoir-faire artisanal unique en pâtisserie marocaine traditionnelle.",
  keywords:
    "pâtisseries Les Jumeaux Casablanca, histoire pâtisserie marocaine, tradition familiale, artisan pâtissier marocain, savoir-faire marocain, héritage culinaire, pâtisseries marocaines authentiques",
  openGraph: {
    title: "À Propos - L'Histoire des Pâtisseries Les Jumeaux",
    description:
      "Trois générations de passion et d'expertise en pâtisserie marocaine traditionnelle à Casablanca. Découvrez l'authenticité des Pâtisseries Les Jumeaux.",
    type: "website",
    locale: "fr_MA",
    url: "https://lesjumeaux.ma/about",
    siteName: "Pâtisseries Les Jumeaux",
    images: [
      {
        url: "https://lesjumeaux.ma/images/about-og.jpg",
        width: 1200,
        height: 630,
        alt: "Pâtisseries Les Jumeaux - Tradition familiale marocaine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "À Propos de Pâtisseries Les Jumeaux | Héritage & Authenticité",
    description:
      "Découvrez l’histoire et le savoir-faire de Pâtisseries Les Jumeaux à Casablanca. Trois générations de passion pour les pâtisseries marocaines traditionnelles.",
    images: ["https://lesjumeaux.ma/images/about-twitter.jpg"],
  },
  alternates: {
    canonical: "https://lesjumeaux.ma/about",
  },
}

export default function AboutPage() {
  return <AboutClient />
}
