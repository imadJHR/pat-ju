import type React from "react"
import type { Metadata } from "next"
// Corrected: Import all fonts from next/font/google
import { Poppins, Great_Vibes, Playfair_Display } from "next/font/google"
import "./globals.css"
import { NavigationWrapper } from "@/components/navigation-wrapper"
import { FooterWrapper } from "@/components/footer-wrapper"
import { BackToTopWrapper } from "@/components/back-to-top-wrapper"

// Corrected: Set up all fonts using the recommended method
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair-display",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Pâtisserie Les Jumeaux | Pâtisserie Marocaine à Casablanca",
  description:
    "Découvrez les meilleures pâtisseries marocaines authentiques à Casablanca. Pâtisserie Les Jumeaux vous propose des recettes traditionnelles avec des ingrédients premium. Commandez en ligne et payez à la livraison.",
  keywords: "pâtisserie marocaine, Casablanca, gâteaux marocains, sucreries traditionnelles, baklava, chebakia, commande en ligne, paiement à la livraison",
  authors: [{ name: "Pâtisserie Les Jumeaux" }],
  generator: "Next.js",
  openGraph: {
    title: "Pâtisserie Les Jumeaux | Pâtisserie Marocaine Authentique",
    description:
      "Le meilleur de la pâtisserie marocaine traditionnelle, préparé avec passion à Casablanca.",
    type: "website",
    locale: "fr_MA",
    alternateLocale: ["en_US", "ar_MA"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // Corrected: Apply all font variables to the <html> tag
    <html lang="fr" className={`${poppins.variable} ${greatVibes.variable} ${playfairDisplay.variable} antialiased`}>
      {/*
        NOTE: The <head> tag with manual <link> and <style> tags has been removed.
        Next.js's `next/font` handles all font optimization automatically.
      */}
      <body className="font-poppins">
        <NavigationWrapper />
        <main className="min-h-screen bg-background">{children}</main>
        <FooterWrapper />
        <BackToTopWrapper />
      </body>
    </html>
  )
}