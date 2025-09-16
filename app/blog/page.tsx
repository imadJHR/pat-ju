// /app/blog/page.tsx

import type { Metadata } from "next"
import BlogPageClient from "./BlogPageClient"

export const metadata: Metadata = {
  title: "Blog Pâtisseries Les Jumeaux | Recettes & Tradition Marocaine",
  description:
    "Découvrez le blog de Pâtisseries Les Jumeaux : recettes marocaines, secrets de pâtisserie traditionnelle, conseils culinaires et histoires de notre héritage sucré.",
  keywords:
    "blog pâtisseries marocaines, recettes marocaines, Chebakia, cornes de gazelle, baklava, tradition culinaire, héritage marocain, gâteaux marocains, pâtisserie artisanale",
  openGraph: {
    title: "Blog Pâtisseries Les Jumeaux | Recettes & Tradition Marocaine",
    description:
      "Plongez dans l’univers des Pâtisseries Les Jumeaux : recettes, astuces et histoire des douceurs marocaines traditionnelles.",
    type: "website",
    locale: "fr_MA",
    url: "https://lesjumeaux.ma/blog",
    siteName: "Pâtisseries Les Jumeaux",
    images: [
      {
        url: "https://lesjumeaux.ma/images/blog-og.jpg",
        width: 1200,
        height: 630,
        alt: "Blog des Pâtisseries Les Jumeaux - Recettes et pâtisseries marocaines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Pâtisseries Les Jumeaux | Secrets de la Pâtisserie Marocaine",
    description:
      "Recettes authentiques, conseils de pâtisserie et histoires gourmandes des Pâtisseries Les Jumeaux à Casablanca.",
    images: ["https://www.patisserieslesjumeaux.ma/images/blog-twitter.jpg"],
  },
  alternates: {
    canonical: "https://lesjumeaux.ma/blog",
    
  },
}

export default function BlogPage() {
  return <BlogPageClient />
}
