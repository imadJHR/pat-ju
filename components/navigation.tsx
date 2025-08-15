"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
// NEW: Framer Motion imports for animation
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ShoppingCart, Menu, X, Globe, Sun, Moon } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { CartDrawer } from "./cart-drawer"

interface NavigationProps {
  language: "en" | "fr" | "ar"
  onLanguageChange: (lang: "en" | "fr" | "ar") => void
  isDarkMode: boolean
  onThemeToggle: () => void
}

const translations = {
  en: {
    home: "Home",
    products: "Products",
    about: "About",
    contact: "Contact",
    blog: "Blog",
    cart: "Cart",
    orderNow: "Order Now",
    language: "Language",
  },
  fr: {
    home: "Accueil",
    products: "Produits",
    about: "À Propos",
    contact: "Contact",
    blog: "Blog",
    cart: "Panier",
    orderNow: "Commander",
    language: "Langue",
  },
  ar: {
    home: "الرئيسية",
    products: "المنتجات",
    about: "من نحن",
    contact: "اتصل بنا",
    blog: "المدونة",
    cart: "السلة",
    orderNow: "اطلب الآن",
    language: "اللغة",
  },
}

export function Navigation({ language, onLanguageChange, isDarkMode, onThemeToggle }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // NEW: State to track scroll position for header animation
  const [isScrolled, setIsScrolled] = useState(false)
  
  const { openCart, getItemCount } = useCart()
  const t = translations[language]
  const isRTL = language === "ar"
  const pathname = usePathname()

  // NEW: Effect for header scroll animation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
  }, [pathname])

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMobileMenuOpen])


  const navItems = [
    { key: "home", href: "/" },
    { key: "products", href: "/products" },
    { key: "about", href: "/about" },
    { key: "blog", href: "/blog" },
    { key: "contact", href: "/contact" },
  ]

  // NEW: Animation variants for the mobile menu container
  const mobileMenuVariants = {
    hidden: {
      x: isRTL ? "100%" : "-100%",
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeIn"
      }
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeOut"
      }
    },
  }

  // NEW: Animation variants for the list and items inside mobile menu
  const navListVariants = {
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  }

  const navItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12
      }
    },
  }

  return (
    <>
      <header
        // CHANGED: Added classes for scroll animation
        className={`sticky top-0 z-50 w-full transition-all duration-300 border-b border-border 
        ${isScrolled ? "bg-background/80 backdrop-blur-lg shadow-md" : "bg-background/95 backdrop-blur"}
        ${isRTL ? "rtl" : "ltr"}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* CHANGED: Added height transition for header shrink effect */}
          <div className={`flex items-center justify-between transition-height duration-300 ${isScrolled ? 'h-14' : 'h-16'}`}>
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <motion.h1 
                  className="font-great-vibes text-2xl md:text-3xl text-[#d0a84b] font-bold cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  patisserie les jumeaux
                </motion.h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="relative group text-foreground hover:text-primary  transition-colors duration-200 font-medium"
                >
                  {t[item.key as keyof typeof t]}
                  {/* NEW: Animated underline for desktop links */}
                  <span className={`absolute bottom-[-4px] left-0 h-0.5 bg-[#d0a84b]  w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center ${pathname === item.href ? 'scale-x-100' : ''}`} />
                </Link>
              ))}
            </nav>

            {/* Right side controls */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Language Selector */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
               {/* <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-8 h-8">
                      <Globe className="h-4 w-4" />
                      <span className="sr-only">{t.language}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onLanguageChange("en")}>English</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onLanguageChange("fr")}>Français</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onLanguageChange("ar")}>العربية</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu> */}
              </motion.div>

              {/* Theme Toggle */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" className="w-8 h-8" onClick={onThemeToggle}>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={isDarkMode ? "moon" : "sun"}
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </motion.div>
                  </AnimatePresence>
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </motion.div>

              {/* Cart */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" className="relative w-8 h-8" onClick={openCart}>
                  <ShoppingCart className="h-5 w-5" />
                  {getItemCount() > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full"
                    >
                      {getItemCount()}
                    </Badge>
                  )}
                  <span className="sr-only">{t.cart}</span>
                </Button>
              </motion.div>

              {/* CTA Button */}
              <div className="hidden md:block ml-2">
                <Link href="/products">
                  <Button className="bg-[#d0a84b] hover:bg-[#d0a84b]/90 text-primary-foreground">
                    {t.orderNow}
                  </Button>
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden ml-2">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-controls="mobile-menu"
                    aria-expanded={isMobileMenuOpen}
                  >
                    <AnimatePresence mode="wait">
                      {isMobileMenuOpen ? (
                         <motion.div key="close" initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: 90, scale: 0 }}>
                           <X className="h-5 w-5" />
                         </motion.div>
                      ) : (
                        <motion.div key="open" initial={{ rotate: 90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: -90, scale: 0 }}>
                           <Menu className="h-5 w-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <span className="sr-only">Open main menu</span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Mobile Navigation Menu --- */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              className="md:hidden fixed inset-x-0 top-14 h-[calc(100vh-3.5rem)] bg-background/95 backdrop-blur-lg z-40" // CHANGED: top value to match scrolled header
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={mobileMenuVariants}
            >
              <div className="container h-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <motion.nav 
                  className="flex flex-col space-y-4"
                  variants={navListVariants}
                >
                  {navItems.map((item) => (
                    <motion.div key={item.key} variants={navItemVariants}>
                      <Link
                        href={item.href}
                        className="block text-center text-lg font-medium text-foreground hover:text-primary hover:bg-muted rounded-md py-3 transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {t[item.key as keyof typeof t]}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div className="pt-6" variants={navItemVariants}>
                    <Link href="/products" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full bg-[#d0a84b] hover:bg-[#d0a84b]/90 text-primary-foreground text-lg py-6">
                            {t.orderNow}
                        </Button>
                    </Link>
                  </motion.div>
                </motion.nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <CartDrawer language={language} />
    </>
  )
}