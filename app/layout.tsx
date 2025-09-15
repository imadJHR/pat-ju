import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { NavigationWrapper } from "@/components/navigation-wrapper"
import { FooterWrapper } from "@/components/footer-wrapper"
import { BackToTopWrapper } from "@/components/back-to-top-wrapper"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Pâtisserie Marocaine | Authentic Moroccan Pastries",
  description:
    "Discover the finest authentic Moroccan pastries crafted with traditional recipes and premium ingredients. Order online with cash on delivery.",
  keywords: "Moroccan pastries, pâtisserie marocaine, traditional sweets, baklava, chebakia, authentic desserts",
  authors: [{ name: "Pâtisserie Marocaine" }],
  creator: "Pâtisserie Marocaine",
  publisher: "Pâtisserie Marocaine",
  metadataBase: new URL("https://www./lesjumeaux.ma"),
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
    <html lang="en" className={`${poppins.variable} antialiased`}>
      <head>
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        
        <style>{`
html {
  font-family: ${poppins.style.fontFamily};
  --font-poppins: ${poppins.variable};
}
        `}</style>
      </head>
      <body className="font-poppins">
        <NavigationWrapper />
        <div className="min-h-screen bg-background">{children}</div>
        <FooterWrapper />
        <BackToTopWrapper />
      </body>
    </html>
  )
}
