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
    phone: "+1 (555) 123-4567",
    email: "info@patisseriemarocaine.com",
    address: "123 Pastry Street, Culinary District, NY 10001",
    followUs: "Follow Us",
    newsletter: "Newsletter",
    newsletterText: "Subscribe to receive updates about new pastries and special offers",
    subscribe: "Subscribe",
    copyright: "© 2024 Pâtisserie Marocaine. All rights reserved.",
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
    phone: "+1 (555) 123-4567",
    email: "info@patisseriemarocaine.com",
    address: "123 Rue des Pâtisseries, Quartier Culinaire, NY 10001",
    followUs: "Suivez-Nous",
    newsletter: "Newsletter",
    newsletterText: "Abonnez-vous pour recevoir des mises à jour sur les nouvelles pâtisseries et offres spéciales",
    subscribe: "S'abonner",
    copyright: "© 2024 Pâtisserie Marocaine. Tous droits réservés.",
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
    phone: "+1 (555) 123-4567",
    email: "info@patisseriemarocaine.com",
    address: "123 شارع المعجنات، الحي الطهوي، نيويورك 10001",
    followUs: "تابعنا",
    newsletter: "النشرة الإخبارية",
    newsletterText: "اشترك لتلقي التحديثات حول المعجنات الجديدة والعروض الخاصة",
    subscribe: "اشتراك",
    copyright: "© 2024 حلويات مغربية. جميع الحقوق محفوظة.",
    privacy: "سياسة الخصوصية",
    terms: "شروط الخدمة",
  },
}

export function Footer({ language }: FooterProps) {
  const t = translations[language]
  const isRTL = language === "ar"

  return (
   <footer className={`bg-[#342923] text-white py-16 ${isRTL ? "rtl" : "ltr"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        {/* The grid is responsive: 1 column on small screens, 2 on medium, and 4 on large */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-3xl text-[#d0a84b] mb-4">patisserie les jumeaux</h3>
            <p className="text-white/80 mb-6 leading-relaxed">{t.tagline}</p>
            <div className="moroccan-stars opacity-20 h-16"></div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans text-lg font-semibold mb-4 text-[#d0a84b]">{t.quickLinks}</h4>
            <ul className="space-y-2">
              {[
                { key: "home", href: "#home" },
                { key: "products", href: "#products" },
                { key: "about", href: "#about" },
                { key: "blog", href: "#blog" },
                { key: "contact", href: "#contact" },
              ].map((link) => (
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
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#d0a84b] flex-shrink-0" />
                <span className="text-white/80">{t.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#d0a84b] flex-shrink-0" />
                <span className="text-white/80">{t.email}</span>
              </div>
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
                className="w-10 h-10 bg-[#d0a84b]/20 rounded-full flex items-center justify-center hover:bg-[#d0a84b] hover:text-[#342923] transition-colors duration-200"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#d0a84b]/20 rounded-full flex items-center justify-center hover:bg-[#d0a84b] hover:text-[#342923] transition-colors duration-200"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#d0a84b]/20 rounded-full flex items-center justify-center hover:bg-[#d0a84b] hover:text-[#342923] transition-colors duration-200"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
            <p className="text-white/80 text-sm mb-3">{t.newsletterText}</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#d0a84b]"
              />
              <button className="px-4 py-2 bg-[#d0a84b] text-[#342923] rounded-md hover:bg-[#d0a84b]/90 transition-colors duration-200">
                {t.subscribe}
              </button>
            </div>
          </div>
        </div>

        <MoroccanDivider className="my-8" />

        {/* Bottom Footer */}
        {/* The layout is responsive: column on small screens, row on medium and up */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <p>{t.copyright}</p>
          <div className="flex gap-6">
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
