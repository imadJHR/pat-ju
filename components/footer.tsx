"use client"

import { MoroccanDivider } from "./moroccan-divider"
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react"

interface FooterProps {
  language: "en" | "fr" | "ar"
}

const translations = {
  en: {
    tagline: "Authentic Moroccan Pastries Since 1985",
    quickLinks: "Quick Links",
    home: "Home",
    products: "Products",
    about: "About",
    contact: "Contact",
    blog: "Blog",
    contactInfo: "Contact Information",
    phone: "+212 6 12 34 56 78",
    email: "contact@patisserielesjumeaux.ma",
    address: "25 Avenue des Jumeaux, Casablanca, Morocco",
    followUs: "Follow Us",
    newsletter: "Newsletter",
    newsletterText: "Subscribe to receive updates about new pastries and special offers.",
    emailPlaceholder: "Your email address",
    subscribe: "Subscribe",
    copyright: `© ${new Date().getFullYear()} Pâtisserie Les Jumeaux. All rights reserved.`,
    privacy: "Privacy Policy",
    terms: "Terms of Service",
  },
  fr: {
    tagline: "Pâtisseries Marocaines Authentiques Depuis 1985",
    quickLinks: "Liens Rapides",
    home: "Accueil",
    products: "Produits",
    about: "À Propos",
    contact: "Contact",
    blog: "Blog",
    contactInfo: "Informations de Contact",
    phone: "+212 6 12 34 56 78",
    email: "contact@patisserielesjumeaux.ma",
    address: "25 Avenue des Jumeaux, Casablanca, Maroc",
    followUs: "Suivez-Nous",
    newsletter: "Newsletter",
    newsletterText: "Abonnez-vous pour recevoir des mises à jour sur les nouvelles pâtisseries et offres spéciales.",
    emailPlaceholder: "Votre adresse e-mail",
    subscribe: "S'abonner",
    copyright: `© ${new Date().getFullYear()} Pâtisserie Les Jumeaux. Tous droits réservés.`,
    privacy: "Politique de Confidentialité",
    terms: "Conditions d'Utilisation",
  },
  ar: {
    tagline: "حلويات مغربية أصيلة منذ 1985",
    quickLinks: "روابط سريعة",
    home: "الرئيسية",
    products: "المنتجات",
    about: "من نحن",
    contact: "اتصل بنا",
    blog: "المدونة",
    contactInfo: "معلومات الاتصال",
    phone: "78 56 34 12 6 212+",
    email: "contact@patisserielesjumeaux.ma",
    address: "25 شارع التوأم، الدار البيضاء، المغرب",
    followUs: "تابعنا",
    newsletter: "النشرة الإخبارية",
    newsletterText: "اشترك لتلقي التحديثات حول المعجنات الجديدة والعروض الخاصة.",
    emailPlaceholder: "بريدك الإلكتروني",
    subscribe: "اشتراك",
    copyright: `© ${new Date().getFullYear()} حلويات التوأم. جميع الحقوق محفوظة.`,
    privacy: "سياسة الخصوصية",
    terms: "شروط الخدمة",
  },
}

// Define a type for a single translation set to ensure consistency
type TranslationSet = typeof translations['en'];
// Define a type for the keys that are used in the quick links
type QuickLinkKey = "home" | "products" | "about" | "blog" | "contact";


export function Footer({ language }: FooterProps) {
  const t: TranslationSet = translations[language]
  const isRTL = language === "ar"

  // Define the links with the specific key type
  const quickLinks: { key: QuickLinkKey; href: string }[] = [
    { key: "home", href: "#home" },
    { key: "products", href: "#products" },
    { key: "about", href: "#about" },
    { key: "blog", href: "#blog" },
    { key: "contact", href: "#contact" },
  ];

  return (
    <footer className={`bg-[#342923] text-white py-12 md:py-16 ${isRTL ? "rtl" : "ltr"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#d0a84b] mb-4">Pâtisserie Les Jumeaux</h3>
            <p className="text-white/80 mb-6 leading-relaxed">{t.tagline}</p>
            {/* The Moroccan stars element can be styled for responsiveness as needed */}
            <div className="moroccan-stars opacity-20 h-16"></div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans text-lg font-semibold mb-4 text-[#d0a84b]">{t.quickLinks}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a href={link.href} className="text-white/80 hover:text-[#d0a84b] transition-colors duration-200">
                    {t[link.key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-sans text-lg font-semibold mb-4 text-[#d0a84b]">{t.contactInfo}</h4>
            <div className="space-y-3">
              <a href={`tel:${t.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 group">
                <Phone className="h-4 w-4 text-[#d0a84b] flex-shrink-0" />
                <span className="text-white/80 group-hover:text-[#d0a84b] transition-colors">{t.phone}</span>
              </a>
              <a href={`mailto:${t.email}`} className="flex items-center gap-3 group">
                <Mail className="h-4 w-4 text-[#d0a84b] flex-shrink-0" />
                <span className="text-white/80 group-hover:text-[#d0a84b] transition-colors">{t.email}</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#d0a84b] flex-shrink-0 mt-1" />
                <span className="text-white/80">{t.address}</span>
              </div>
            </div>
          </div>

          {/* Social Media & Newsletter */}
          <div>
            <h4 className="font-sans text-lg font-semibold mb-4 text-[#d0a84b]">{t.followUs}</h4>
            <div className="flex gap-4 mb-6">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 bg-[#d0a84b]/20 rounded-full flex items-center justify-center hover:bg-[#d0a84b] hover:text-[#342923] transition-colors duration-200"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 bg-[#d0a84b]/20 rounded-full flex items-center justify-center hover:bg-[#d0a84b] hover:text-[#342923] transition-colors duration-200"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 bg-[#d0a84b]/20 rounded-full flex items-center justify-center hover:bg-[#d0a84b] hover:text-[#342923] transition-colors duration-200"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
            <p className="text-white/80 text-sm mb-3">{t.newsletterText}</p>
            {/* Responsive newsletter form */}
            <form className="flex flex-col sm:flex-row gap-2">
              <label htmlFor="email-newsletter" className="sr-only">
                {t.emailPlaceholder}
              </label>
              <input
                id="email-newsletter"
                type="email"
                placeholder={t.emailPlaceholder}
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#d0a84b]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#d0a84b] text-[#342923] rounded-md font-semibold hover:bg-[#d0a84b]/90 transition-colors duration-200"
              >
                {t.subscribe}
              </button>
            </form>
          </div>
        </div>

        <MoroccanDivider className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <p className="text-center md:text-left">{t.copyright}</p>
          <div className="flex gap-4 sm:gap-6">
            <a href="#" className="hover:text-[#d0a84b] transition-colors duration-200">
              {t.privacy}
            </a>
            <a href="#" className="hover:text-[#d0a84b] transition-colors duration-200">
              {t.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}