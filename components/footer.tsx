"use client"

import { MoroccanDivider } from "./moroccan-divider"
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react"


// L'interface de props n'est plus nécessaire si 'language' est la seule prop
// export interface FooterProps {}

// Les liens sont maintenant définis avec leur texte directement en français
const quickLinks = [
  { label: "Accueil", href: "/home" },
  { label: "Produits", href: "/products" },
  { label: "À Propos", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const contactInfo = {
    phone: "+212 0668-121425",
    email: "csaidoussaid@gmail.com",
    address: "Lot. Elfath 2 - N° 115 - Florida Sidi Maarouf, Casablanca, Morocco",
  };

  const copyrightText = `© ${new Date().getFullYear()} Pâtisserie Les Jumeaux. Tous droits réservés.`;

  return (
    <footer className="bg-[#342923] text-white py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contenu principal du pied de page */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-12">
          {/* Section Marque */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#d0a84b] mb-4">Pâtisserie Les Jumeaux</h3>
          
            <p className="text-white/80 mb-6 leading-relaxed">Pâtisseries Marocaines Authentiques Depuis 2008</p>
            <div className="moroccan-stars opacity-20 h-16"></div>
          </div>

          {/* Liens Rapides */}
          <div>
            <h4 className="font-sans text-lg font-semibold mb-4 text-[#d0a84b]">Liens Rapides</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/80 hover:text-[#d0a84b] transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations de Contact */}
          <div>
            <h4 className="font-sans text-lg font-semibold mb-4 text-[#d0a84b]">Informations de Contact</h4>
            <div className="space-y-3">
              <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 group">
                <Phone className="h-4 w-4 text-[#d0a84b] flex-shrink-0" />
                <span className="text-white/80 group-hover:text-[#d0a84b] transition-colors">{contactInfo.phone}</span>
              </a>
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 group">
                <Mail className="h-4 w-4 text-[#d0a84b] flex-shrink-0" />
                <span className="text-white/80 group-hover:text-[#d0a84b] transition-colors">{contactInfo.email}</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#d0a84b] flex-shrink-0 mt-1" />
                <span className="text-white/80">{contactInfo.address}</span>
              </div>
            </div>
          </div>

          {/* Réseaux Sociaux & Newsletter */}
          <div>
            <h4 className="font-sans text-lg font-semibold mb-4 text-[#d0a84b]">Suivez-Nous</h4>
            <div className="flex gap-4 mb-6">
              <a
                href="https://web.facebook.com/profile.php?id=100063708753218"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#d0a84b]/20 rounded-full flex items-center justify-center hover:bg-[#d0a84b] hover:text-[#342923] transition-colors duration-200"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/patisserielesjumeaux/"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#d0a84b]/20 rounded-full flex items-center justify-center hover:bg-[#d0a84b] hover:text-[#342923] transition-colors duration-200"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <p className="text-white/80 text-sm mb-3">Abonnez-vous pour recevoir des mises à jour sur les nouvelles pâtisseries et offres spéciales.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <label htmlFor="email-newsletter" className="sr-only">
                Votre adresse e-mail
              </label>
              <input
                id="email-newsletter"
                type="email"
                placeholder="Votre adresse e-mail"
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#d0a84b]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#d0a84b] text-[#342923] rounded-md font-semibold hover:bg-[#d0a84b]/90 transition-colors duration-200"
              >
                S&apos;abonner
              </button>
            </form>
          </div>
        </div>

        <MoroccanDivider className="my-8" />

        {/* Pied de page inférieur */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <p className="text-center md:text-left">{copyrightText}</p>
          <div className="flex gap-4 sm:gap-6">
            <a href="/privacy-policy" className="hover:text-[#d0a84b] transition-colors duration-200">
              Politique de Confidentialité
            </a>
            <a href="/terms-of-service" className="hover:text-[#d0a84b] transition-colors duration-200">
              Conditions d&apos;Utilisation
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}