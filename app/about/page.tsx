import type { Metadata } from "next"
import AboutClient from "./AboutClient"

export const metadata: Metadata = {
  title: "À Propos | Notre Histoire et Tradition Pâtissière Marocaine",
  description:
    "Découvrez l'histoire de notre famille et notre passion pour les pâtisseries marocaines traditionnelles. Trois générations d'expertise et de savoir-faire artisanal.",
  keywords:
    "histoire pâtisserie marocaine, tradition familiale, artisan pâtissier, savoir-faire marocain, héritage culinaire",
  openGraph: {
    title: "Notre Histoire - Pâtisseries Marocaines Authentiques",
    description: "Trois générations de passion pour les pâtisseries marocaines traditionnelles",
    type: "website",
    locale: "fr_MA",
  },
}

export default function AboutPage() {
  return <AboutClient />
}
