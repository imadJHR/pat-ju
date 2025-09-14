"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { CartDrawer } from "./cart-drawer"
import { MoroccanDivider } from "@/components/moroccan-divider"

// --- STEP 1: Centralized Category Data ---
const productCategoryTranslations = {
  traditional: { fr: "Douceurs Traditionnelles", en: "Traditional Sweets", ar: "حلويات تقليدية" },
  almond: { fr: "Pâtisseries aux Amandes", en: "Almond Pastries", ar: "معجنات اللوز" },
  layered: { fr: "Pâtisseries Feuilletées", en: "Layered Pastries", ar: "معجنات مطبقة" },
  date: { fr: "Pâtisseries aux Dattes", en: "Date Pastries", ar: "معجنات التمر" },
  filled: { fr: "Biscuits Fourrés", en: "Filled Cookies", ar: "بسكويت محشو" },
  phyllo: { fr: "Pâtisseries Phyllo", en: "Phyllo Pastries", ar: "معجنات الفيلو" },
}
type ProductCategoryKey = keyof typeof productCategoryTranslations;


// --- STEP 2: FIX - Define all keys explicitly for strong typing ---
// Define base navigation keys separately
const baseNavKeys = ["home", "products", "about", "contact", "blog", "cart", "orderNow"] as const;
type BaseNavKey = typeof baseNavKeys[number];

// Combine base keys and category keys into one comprehensive type
type TranslationKeys = BaseNavKey | ProductCategoryKey;

// --- FIX STARTS HERE ---

// Helper function to create a language-specific record of product categories
const createCategoryTranslations = (lang: "en" | "fr" | "ar"): Record<ProductCategoryKey, string> => {
  return Object.fromEntries(
    Object.entries(productCategoryTranslations).map(([key, value]) => [key, value[lang]])
  ) as Record<ProductCategoryKey, string>;
};

// Now, use this explicit type to define the translations object
const translations: Record<"en" | "fr" | "ar", Record<TranslationKeys, string>> = {
  en: {
    home: "Home", products: "Products", about: "About", contact: "Contact", blog: "Blog", cart: "Cart", orderNow: "Order Now",
    ...createCategoryTranslations("en")
  },
  fr: {
    home: "Accueil", products: "Produits", about: "À Propos", contact: "Contact", blog: "Blog", cart: "Panier", orderNow: "Commander",
    ...createCategoryTranslations("fr")
  },
  ar: {
    home: "الرئيسية", products: "المنتجات", about: "من نحن", contact: "اتصل بنا", blog: "المدونة", cart: "السلة", orderNow: "اطلب الآن",
    ...createCategoryTranslations("ar")
  },
}

// --- FIX ENDS HERE ---

// Define types for navigation items for better type safety
interface SubNavItem {
  key: TranslationKeys; // This now correctly uses the comprehensive type
  href: string;
}
interface NavItem {
  key: TranslationKeys; // This also uses the comprehensive type
  href: string;
  dropdown?: SubNavItem[];
}

// --- REFINED: Main Component Orchestrator ---
export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const language = "fr" as const // Language is hardcoded to French

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto'
    return () => { document.body.style.overflow = 'auto' }
  }, [isMobileMenuOpen])

  return (
    <>
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${isScrolled ? "bg-background/80 backdrop-blur-lg shadow-md border-border" : "bg-background/95 backdrop-blur border-transparent"}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-height duration-300 ${isScrolled ? 'h-16' : 'h-20'}`}>
            <Link href="/" className="flex-shrink-0">
              <h1 className="font-great-vibes text-3xl md:text-4xl text-[#d4b05d] font-bold cursor-pointer">
                Pâtisserie Les Jumeaux
              </h1>
            </Link>
            <DesktopNav language={language} pathname={pathname} />
            <div className="flex items-center gap-1">
              <NavActions language={language} />
              <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)} aria-label="Ouvrir le menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <MobileNav isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} language={language} pathname={pathname} />
      <CartDrawer language={language} />
    </>
  )
}

function DesktopNav({ language, pathname }: { language: "fr", pathname: string }) {
  const t = translations[language]

  const navItems: NavItem[] = [
    { key: "home", href: "/" },
    {
      key: "products", href: "/products",
      dropdown: Object.keys(productCategoryTranslations).map(catKey => ({
        key: catKey as ProductCategoryKey,
        href: `/products?category=${catKey}`
      }))
    },
    { key: "about", href: "/about" },
    { key: "blog", href: "/blog" },
    { key: "contact", href: "/contact" },
  ]

  return (
    <nav className="hidden md:flex items-center gap-x-6 lg:gap-x-8">
      {navItems.map((item) => (
        item.dropdown
          ? <ProductDropdown key={item.key} item={item} t={t} pathname={pathname} />
          : (
            <Link key={item.key} href={item.href} className={`relative group text-foreground hover:text-amber-500 transition-colors duration-200 font-medium text-sm ${(pathname === item.href) ? 'text-amber-500' : ''}`}>
              {t[item.key]}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-amber-500 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${(pathname === item.href) ? 'scale-x-100' : ''}`} />
            </Link>
          )
      ))}
    </nav>
  )
}

function ProductDropdown({ item, t, pathname }: { item: NavItem, t: typeof translations['fr'], pathname: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const isActive = pathname.startsWith(item.href);

  return (
    <motion.div onHoverStart={() => setIsOpen(true)} onHoverEnd={() => setIsOpen(false)} className="relative">
      <Link href={item.href} className={`relative group text-foreground hover:text-amber-500 transition-colors duration-200 font-medium text-sm flex items-center gap-1 ${isActive ? 'text-amber-500' : ''}`}>
        {t[item.key]} <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </Link>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }} className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-10">
            <div className="bg-background border rounded-lg shadow-lg w-56 p-2">
              {item.dropdown?.map((subItem: SubNavItem) => (
                <Link key={subItem.key} href={subItem.href} className="block w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors">
                  {t[subItem.key]}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function MobileNav({ isOpen, setIsOpen, language, pathname }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void, language: "fr", pathname: string }) {
  const t = translations[language];
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const navItems: NavItem[] = [
    { key: "home", href: "/" },
    {
      key: "products",
      href: "/products",
      dropdown: Object.keys(productCategoryTranslations).map(catKey => ({
        key: catKey as ProductCategoryKey,
        href: `/products?category=${catKey}`
      }))
    },
    { key: "about", href: "/about" },
    { key: "blog", href: "/blog" },
    { key: "contact", href: "/contact" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-[100] md:hidden" onClick={() => setIsOpen(false)}>
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", ease: "easeInOut" }} className="absolute inset-y-0 right-0 w-full max-w-sm bg-background shadow-lg flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-4 flex justify-between items-center border-b">
              <h2 className="font-playfair font-semibold">Menu</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Fermer le menu"><X className="h-6 w-6" /></Button>
            </div>
            <nav className="flex-grow p-6 flex flex-col gap-y-2">
              {navItems.map((item) => (
                item.dropdown ? (
                  <div key={item.key}>
                    <div className={`flex justify-between items-center text-lg font-medium p-3 rounded-md transition-colors ${pathname.startsWith(item.href) ? 'bg-muted text-amber-500' : 'hover:bg-muted'}`}>
                      <Link href={item.href} onClick={() => setIsOpen(false)} className="flex-grow">
                        {t[item.key as keyof typeof t]}
                      </Link>
                      <button onClick={() => setIsProductsOpen(!isProductsOpen)} className="p-2 -mr-2">
                        <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                    <AnimatePresence>
                      {isProductsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden ml-4 pl-4 border-l"
                        >
                          <div className="pt-2 flex flex-col gap-y-1">
                            {item.dropdown.map(subItem => (
                              <Link key={subItem.key} href={subItem.href} className="block p-2 rounded-md hover:bg-muted text-md" onClick={() => setIsOpen(false)}>
                                {t[subItem.key as keyof typeof t]}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link key={item.key} href={item.href} className={`text-lg font-medium p-3 rounded-md transition-colors ${pathname === item.href ? 'bg-muted text-amber-500' : 'hover:bg-muted'}`} onClick={() => setIsOpen(false)}>
                    {t[item.key as keyof typeof t]}
                  </Link>
                )
              ))}
            </nav>
            <div className="p-6 border-t">
              <Link href="/products" onClick={() => setIsOpen(false)}>
                <Button size="lg" className="w-full bg-amber-500 hover:bg-amber-500/90 text-primary-foreground">{t.orderNow}</Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// NavActions component remains the same
function NavActions({ language }: { language: "fr" }) {
  const { openCart, getItemCount } = useCart()
  const t = translations[language]

  return (
    <>
      <Button variant="ghost" size="icon" className="relative" onClick={openCart} aria-label="Ouvrir le panier">
        <ShoppingCart className="h-5 w-5" />
        <AnimatePresence>
          {getItemCount() > 0 && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} className="absolute -top-1 -right-1">
              <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full">{getItemCount()}</Badge>
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
      <div className="hidden md:block ml-2">
        <Link href="/products">
          <Button className="bg-[#d4b05d] hover:bg-amber-500/90 text-primary-foreground">{t.orderNow}</Button>
        </Link>
      </div>
    </>
  )
}