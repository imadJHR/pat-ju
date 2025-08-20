"use client";
import type React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const [language, setLanguage] = useState<"en" | "fr" | "ar">("fr");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const isRTL = language === "ar";

  const translations = {
    en: {
      title: "Contact Us",
      subtitle:
        "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      subject: "Subject",
      message: "Message",
      send: "Send Message",
      address: "Address",
      hours: "Opening Hours",
      mondayFriday: "Monday - Friday",
      saturday: "Saturday",
      sunday: "Sunday",
      closed: "Closed",
      getInTouch: "Get in Touch",
      visitUs: "Visit Our Store",
      storeDescription:
        "Visit our beautiful store in the heart of Casablanca to experience our pastries firsthand.",
      namePlaceholder: "Enter your full name",
      emailPlaceholder: "Enter your email address",
      phonePlaceholder: "Enter your phone number",
      subjectPlaceholder: "What is this about?",
      messagePlaceholder: "Tell us how we can help you...",
    },
    fr: {
      title: "Contactez-Nous",
      subtitle:
        "Nous aimerions avoir de vos nouvelles. Envoyez-nous un message et nous vous répondrons dès que possible.",
      name: "Nom Complet",
      email: "Adresse Email",
      phone: "Numéro de Téléphone",
      subject: "Sujet",
      message: "Message",
      send: "Envoyer le Message",
      address: "Adresse",
      hours: "Heures d'Ouverture",
      mondayFriday: "Lundi - Vendredi",
      saturday: "Samedi",
      sunday: "Dimanche",
      closed: "Fermé",
      getInTouch: "Contactez-Nous",
      visitUs: "Visitez Notre Magasin",
      storeDescription:
        "Visitez notre magnifique magasin au cœur de Casablanca pour découvrir nos pâtisseries de première main.",
      namePlaceholder: "Entrez votre nom complet",
      emailPlaceholder: "Entrez votre adresse email",
      phonePlaceholder: "Entrez votre numéro de téléphone",
      subjectPlaceholder: "De quoi s'agit-il ?",
      messagePlaceholder: "Dites-nous comment nous pouvons vous aider...",
    },
    ar: {
      title: "اتصل بنا",
      subtitle: "نحن نحب أن نسمع منك. أرسل لنا رسالة وسنرد في أقرب وقت ممكن.",
      name: "الاسم الكامل",
      email: "عنوان البريد الإلكتروني",
      phone: "رقم الهاتف",
      subject: "الموضوع",
      message: "الرسالة",
      send: "إرسال الرسالة",
      address: "العنوان",
      hours: "ساعات العمل",
      mondayFriday: "الاثنين - الجمعة",
      saturday: "السبت",
      sunday: "الأحد",
      closed: "مغلق",
      getInTouch: "تواصل معنا",
      visitUs: "زر متجرنا",
      storeDescription:
        "زر متجرنا الجميل في قلب الدار البيضاء لتجربة حلوياتنا بنفسك.",
      namePlaceholder: "أدخل اسمك الكامل",
      emailPlaceholder: "أدخل عنوان بريدك الإلكتروني",
      phonePlaceholder: "أدخل رقم هاتفك",
      subjectPlaceholder: "ما هو الموضوع؟",
      messagePlaceholder: "أخبرنا كيف يمكننا مساعدتك...",
    },
  };

  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to a server
    console.log("Form submitted:", formData);
    alert("Message sent successfully!"); // Simple feedback for the user
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className={`min-h-screen bg-background ${isRTL ? "rtl" : "ltr"}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#d4b05d]/10 via-accent/10 to-[#d4b05d]/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-great-vibes text-5xl md:text-6xl text-[#d4b05d] mb-4">
            {t.title}
          </h1>
          <p className="font-playfair text-xl text-[#777079] max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
      {/* --- ADDED: Language Selector --- */}
      <div className="flex justify-end mb-8">
        <div className="flex gap-1 rounded-lg p-1 bg-muted">
          {(["fr", "en", "ar"] as const).map((lang) => (
            <Button
              key={lang}
              onClick={() => setLanguage(lang)}
              variant={language === lang ? "default" : "ghost"}
              size="sm"
              className={`transition-all ${
                language === lang
                  ? "bg-[#d4b05d] hover:bg-[#d4b05d]/90"
                  : "text-muted-foreground"
              }`}
            >
              {lang.toUpperCase()}
            </Button>
          ))}
        </div>
      </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-[#e6d7c3] border-none">
            <CardHeader>
              <CardTitle className="font-playfair text-2xl text-black">
                {t.getInTouch}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-black">
                      {t.name}
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t.namePlaceholder}
                      required
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-black">
                      {t.email}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t.emailPlaceholder}
                      required
                    	className="bg-white"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-black">
                      {t.phone}
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={t.phonePlaceholder}
                      className="bg-white"
                    />
    _               </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-black">
                      {t.subject}
                    </Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder={t.subjectPlaceholder}
                      required
                      className="bg-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-black">
                    {t.message}
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t.messagePlaceholder}
                    rows={6}
                    required
                    className="bg-white"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#d4b05d] hover:bg-[#d4b05d]/90 text-white py-6 text-lg"
                >
                  <Send className="h-5 w-5 mr-2" />
                  {t.send}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="bg-[#e6d7c3] border-none">
              <CardHeader>
                <CardTitle className="font-playfair text-2xl text-black">
                  {t.visitUs}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">{t.storeDescription}</p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#d4b05d] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1 text-black">{t.address}</h4>
                      <p className="text-muted-foreground">
                        123 Rue Mohammed V<br />
                        Casablanca 20000
                        <br />
                        Maroc
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-[#d4b05d] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1 text-black">Téléphone</h4>
                      <p className="text-muted-foreground">+212 522 123 456</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-[#d4b05d] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1 text-black">Email</h4>
                      <p className="text-muted-foreground">
                        contact@patisseriemarocaine.ma
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-[#d4b05d] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1 text-black">{t.hours}</h4>
                      <div className="text-muted-foreground space-y-1">
                        <p>{t.mondayFriday}: 8:00 - 20:00</p>
                      	<p>{t.saturday}: 9:00 - 21:00</p>
                      	<p>{t.sunday}: 10:00 - 18:00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="bg-[#e6d7c3] border-none">
              <CardContent className="p-0">
                <div className="h-64 bg-[#d4b05d]/20 rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-12 w-12 mx-auto mb-2 text-[#d4b05d]" />
                    <p className="text-[#d4b05d] font-semibold">Carte Interactive</p>
                    <p className="text-sm text-[#d4b05d]/80">123 Rue Mohammed V, Casablanca</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}