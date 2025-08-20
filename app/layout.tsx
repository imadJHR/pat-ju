import type React from "react"
import type { Metadata } from "next"
// Import all required fonts from next/font/google
import { Poppins, Great_Vibes, Playfair_Display } from "next/font/google"
import "./globals.css"
import { NavigationWrapper } from "@/components/navigation-wrapper"
import { FooterWrapper } from "@/components/footer-wrapper"
import { BackToTopWrapper } from "@/components/back-to-top-wrapper"

// Configure Poppins (body font)
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

// Configure Great Vibes (display font)
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
  display: "swap",
})

// Configure Playfair Display (serif font)
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
})


export const metadata: Metadata = {
  title: "Pâtisserie Marocaine | Authentic Moroccan Pastries",
  description:
    "Discover the finest authentic Moroccan pastries crafted with traditional recipes and premium ingredients. Order online with cash on delivery.",
  keywords: "Moroccan pastries, pâtisserie marocaine, traditional sweets, baklava, chebakia, authentic desserts",
  authors: [{ name: "Pâtisserie Marocaine" }],
  generator: "v0.app",
  openGraph: {
    title: "Pâtisserie Marocaine | Authentic Moroccan Pastries",
    description:
      "Discover the finest authentic Moroccan pastries crafted with traditional recipes and premium ingredients.",
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_FR", "ar_MA"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // Add all font variables to the <html> tag
    <html lang="en" className={`${poppins.variable} ${greatVibes.variable} ${playfairDisplay.variable} antialiased`}>
      {/* The <head> tag is now clean. Next.js handles font loading automatically. */}
      <head />
      <body className="font-poppins">
        <NavigationWrapper />
        <div className="min-h-screen bg-background">{children}</div>
        <FooterWrapper />
        <BackToTopWrapper />
      </body>
    </html>
  )
}