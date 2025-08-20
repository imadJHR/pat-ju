"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react" // Simplified imports
import { useCart } from "@/hooks/use-cart"
import { CartDrawer } from "./cart-drawer"
import { MoroccanDivider } from "@/components/moroccan-divider" // Assuming this exists

// Translations object (kept for French text)
const translations = {
    en: { home: "Home", products: "Products", about: "About", contact: "Contact", blog: "Blog", cart: "Cart", orderNow: "Order Now", traditional: "Traditional", celebration: "Celebration", assortments: "Assortments" },
    fr: { home: "Accueil", products: "Produits", about: "À Propos", contact: "Contact", blog: "Blog", cart: "Panier", orderNow: "Commander", traditional: "Traditionnels", celebration: "Célébration", assortments: "Assortiments" },
    ar: { home: "الرئيسية", products: "المنتجات", about: "من نحن", contact: "اتصل بنا", blog: "المدونة", cart: "السلة", orderNow: "اطلب الآن", traditional: "تقليدية", celebration: "احتفالات", assortments: "تشكيلات" },
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
    // Close mobile menu on page change
    if (isMobileMenuOpen) setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    // Prevent scrolling when mobile menu is open
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto'
    return () => { document.body.style.overflow = 'auto' }
  }, [isMobileMenuOpen])

  return (
    <>
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${isScrolled ? "bg-background/80 backdrop-blur-lg shadow-md border-border" : "bg-background/95 backdrop-blur border-transparent"}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-height duration-300 ${isScrolled ? 'h-16' : 'h-20'}`}>
            <Link href="/" className="flex-shrink-0">
                <h1 className="font-great-vibes text-3xl md:text-4xl text-amber-500 font-bold cursor-pointer">
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
      <MobileNav isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} language={language} pathname={pathname}/>
      <CartDrawer language={language} />
    </>
  )
}

function DesktopNav({ language, pathname }: { language: "fr", pathname: string }) {
    const t = translations[language]
    const navItems = [
        { key: "home", href: "/" },
        { key: "products", href: "/products", dropdown: [
            { key: "traditional", href: "/products/traditional" },
            { key: "celebration", href: "/products/celebration" },
            { key: "assortments", href: "/products/assortments" },
        ]},
        { key: "about", href: "/about" },
        { key: "blog", href: "/blog" },
        { key: "contact", href: "/contact" },
    ]

    return (
        <nav className="hidden md:flex items-center gap-x-6 lg:gap-x-8">
            {navItems.map((item) => (
                item.dropdown ? <ProductDropdown key={item.key} item={item} t={t} /> : (
                <Link key={item.key} href={item.href} className={`relative group text-foreground hover:text-amber-500 transition-colors duration-200 font-medium text-sm ${(pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))) ? 'text-amber-500' : ''}`}>
                    {t[item.key as keyof typeof t]}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-amber-500 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${(pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))) ? 'scale-x-100' : ''}`} />
                </Link>
            )))}
        </nav>
    )
}

function ProductDropdown({ item, t }: { item: any, t: any }) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <motion.div onHoverStart={() => setIsOpen(true)} onHoverEnd={() => setIsOpen(false)} className="relative">
            <Link href={item.href} className="relative group text-foreground hover:text-amber-500 transition-colors duration-200 font-medium text-sm flex items-center gap-1">
                {t[item.key]} <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
            </Link>
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }} className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                        <div className="bg-background border rounded-lg shadow-lg w-48 p-2">
                            {item.dropdown.map((subItem: any) => (
                                <Link key={subItem.key} href={subItem.href} className="block px-3 py-2 text-sm rounded-md hover:bg-muted">
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

function NavActions({ language }: { language: "fr" }) {
    const { openCart, getItemCount } = useCart()
    const t = translations[language]

    return (
        <>
            {/* Cart Button */}
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

            {/* Order Now Button */}
            <div className="hidden md:block ml-2">
                <Link href="/products">
                    <Button className="bg-amber-500 hover:bg-amber-500/90 text-primary-foreground">{t.orderNow}</Button>
                </Link>
            </div>
        </>
    )
}

function MobileNav({ isOpen, setIsOpen, language, pathname }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void, language: "fr", pathname: string }) {
    const t = translations[language]
    const navItems = [{ key: "home", href: "/" }, { key: "products", href: "/products" }, { key: "about", href: "/about" }, { key: "blog", href: "/blog" }, { key: "contact", href: "/contact" }]

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={() => setIsOpen(false)}>
                    <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", ease: "easeInOut" }} className="absolute inset-y-0 right-0 w-full max-w-sm bg-background shadow-lg flex flex-col" onClick={e => e.stopPropagation()}>
                        <div className="p-4 flex justify-between items-center border-b">
                            <h2 className="font-playfair font-semibold">Menu</h2>
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Fermer le menu"><X className="h-6 w-6" /></Button>
                        </div>
                        <nav className="flex-grow p-6 flex flex-col gap-y-4">
                            {navItems.map((item) => (
                                <Link key={item.key} href={item.href} className={`text-lg font-medium p-3 rounded-md transition-colors ${pathname === item.href ? 'bg-muted text-amber-500' : 'hover:bg-muted'}`} onClick={() => setIsOpen(false)}>
                                    {t[item.key as keyof typeof t]}
                                </Link>
                            ))}
                        </nav>
                        <div className="p-6 border-t">
                            <Link href="/products" onClick={() => setIsOpen(false)}>
                                <Button size="lg" className="w-full bg-amber-500 hover:bg-amber-500/90 text-primary-foreground">{t.orderNow}</Button>
                            </Link>
                            <MoroccanDivider className="my-6" />
                            <div className="flex justify-center gap-x-4">
                               {/* Only shows the cart icon on mobile */}
                               <NavActions language={language} />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}