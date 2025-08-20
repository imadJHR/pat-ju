"use client";
import type React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Send, Loader2, CheckCircle2, MessageSquarePlus } from "lucide-react";

// --- ADDED: Helper component for info items for cleaner code ---
const InfoItem = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
    <div className="flex items-start gap-4 p-4 rounded-lg transition-colors hover:bg-amber-50/50">
        <div className="flex-shrink-0 w-12 h-12 bg-[#d4b05d]/10 text-[#d4b05d] rounded-full flex items-center justify-center">
            <Icon className="h-6 w-6" />
        </div>
        <div>
            <h3 className="text-lg font-semibold font-playfair">{title}</h3>
            <div className="text-muted-foreground">{children}</div>
        </div>
    </div>
);

// --- ADDED: Helper component for form status messages ---
const FormStatusMessage = ({ title, description, onReset }: { title: string, description: string, onReset: () => void }) => (
    <div className="flex flex-col items-center justify-center text-center p-8 h-full">
        <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
        <h3 className="text-2xl font-playfair font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6">{description}</p>
        <Button onClick={onReset} variant="outline" className="group">
            <MessageSquarePlus className="h-4 w-4 mr-2 transition-transform group-hover:rotate-12" />
            Send Another Message
        </Button>
    </div>
);


export default function ContactPage() {
  const [language, setLanguage] = useState<"en" | "fr" | "ar">("fr");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  // --- ADDED: Form submission state for better UX ---
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  
  const isRTL = language === "ar";

  const translations = {
    en: {
      title: "Contact Us",
      subtitle: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
      name: "Full Name", email: "Email Address", phone: "Phone Number (Optional)", subject: "Subject", message: "Message", send: "Send Message",
      address: "Address", hours: "Opening Hours",
      mondayFriday: "Monday - Friday", saturday: "Saturday", sunday: "Sunday",
      getInTouch: "Get in Touch",
      namePlaceholder: "e.g., Fatima Zahra", emailPlaceholder: "e.g., f.zahra@example.com", phonePlaceholder: "e.g., +212 600 123456", subjectPlaceholder: "Inquiry about an order", messagePlaceholder: "Tell us how we can help you...",
      formSuccessTitle: "Message Sent!", formSuccessDesc: "Thank you for reaching out. We will get back to you shortly.", sending: "Sending...",
    },
    fr: {
      title: "Contactez-Nous",
      subtitle: "Nous aimerions avoir de vos nouvelles. Envoyez-nous un message et nous vous répondrons dès que possible.",
      name: "Nom Complet", email: "Adresse E-mail", phone: "Numéro de Téléphone (Optionnel)", subject: "Sujet", message: "Message", send: "Envoyer le Message",
      address: "Adresse", hours: "Heures d'Ouverture",
      mondayFriday: "Lundi - Vendredi", saturday: "Samedi", sunday: "Dimanche",
      getInTouch: "Laissez-nous un Message",
      namePlaceholder: "ex: Fatima Zahra", emailPlaceholder: "ex: f.zahra@example.com", phonePlaceholder: "ex: +212 600 123456", subjectPlaceholder: "Question sur une commande", messagePlaceholder: "Dites-nous comment nous pouvons vous aider...",
      formSuccessTitle: "Message Envoyé !", formSuccessDesc: "Merci de nous avoir contactés. Nous reviendrons vers vous très prochainement.", sending: "Envoi en cours...",
    },
    ar: {
      title: "اتصل بنا",
      subtitle: "يسعدنا أن نسمع منك. أرسل لنا رسالة وسنرد عليك في أقرب وقت ممكن.",
      name: "الاسم الكامل", email: "البريد الإلكتروني", phone: "رقم الهاتف (اختياري)", subject: "الموضوع", message: "الرسالة", send: "إرسال الرسالة",
      address: "العنوان", hours: "ساعات العمل",
      mondayFriday: "الاثنين - الجمعة", saturday: "السبت", sunday: "الأحد",
      getInTouch: "اترك لنا رسالة",
      namePlaceholder: "مثال: فاطمة الزهراء", emailPlaceholder: "مثال: f.zahra@example.com", phonePlaceholder: "مثال: +212 600 123456", subjectPlaceholder: "استفسار بخصوص طلب", messagePlaceholder: "أخبرنا كيف يمكننا مساعدتك...",
      formSuccessTitle: "تم إرسال الرسالة!", formSuccessDesc: "شكراً لتواصلك معنا. سنقوم بالرد عليك في أقرب وقت ممكن.", sending: "جار الإرسال...",
    },
  };

  const t = translations[language];
  
  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setSubmissionStatus("idle");
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus("submitting");
    console.log("Form submitted:", formData);

    // Simulate API call
    setTimeout(() => {
      setSubmissionStatus("success");
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className={`min-h-screen bg-stone-50 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-50/50 via-stone-50 to-amber-50/50 py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="font-great-vibes text-5xl md:text-7xl text-[#d4b05d] mb-4">{t.title}</h1>
          <p className="font-playfair text-xl text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 sm:py-24">
        {/* Language Selector */}
        <div className="flex justify-end mb-12">
          <div className="flex gap-1 rounded-lg p-1 bg-muted">
            {(["fr", "en", "ar"] as const).map((lang) => (
              <Button key={lang} onClick={() => setLanguage(lang)} variant={language === lang ? "default" : "ghost"} size="sm"
                className={`transition-all ${language === lang ? "bg-[#d4b05d] hover:bg-[#d4b05d]/90 text-primary-foreground" : "text-muted-foreground"}`}
              >
                {lang.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>

        {/* --- MODIFIED: Quick Info Section --- */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <InfoItem icon={MapPin} title={t.address}>
                <p>123 Rue Mohammed V<br/>Casablanca, Maroc</p>
            </InfoItem>
            <InfoItem icon={Phone} title="Téléphone">
                <a href="tel:+212522123456" className="hover:text-[#d4b05d] transition-colors">+212 522 123 456</a>
            </InfoItem>
            <InfoItem icon={Mail} title="Email">
                <a href="mailto:contact@patisseriemarocaine.ma" className="hover:text-[#d4b05d] transition-colors">contact@patisseriemarocaine.ma</a>
            </InfoItem>
        </section>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* --- MODIFIED: Contact Form with improved styling and states --- */}
          <Card className="lg:col-span-3 shadow-lg border-stone-200">
            <CardHeader>
              <CardTitle className="font-playfair text-3xl">{t.getInTouch}</CardTitle>
            </CardHeader>
            <CardContent className="min-h-[600px]">
              {submissionStatus === "success" ? (
                  <FormStatusMessage title={t.formSuccessTitle} description={t.formSuccessDesc} onReset={resetForm} />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2"><Label htmlFor="name">{t.name}</Label><Input id="name" value={formData.name} onChange={handleInputChange} placeholder={t.namePlaceholder} required /></div>
                    <div className="space-y-2"><Label htmlFor="email">{t.email}</Label><Input id="email" type="email" value={formData.email} onChange={handleInputChange} placeholder={t.emailPlaceholder} required /></div>
                  </div>
                   <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2"><Label htmlFor="phone">{t.phone}</Label><Input id="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder={t.phonePlaceholder} /></div>
                    <div className="space-y-2"><Label htmlFor="subject">{t.subject}</Label><Input id="subject" value={formData.subject} onChange={handleInputChange} placeholder={t.subjectPlaceholder} required /></div>
                  </div>
                  <div className="space-y-2"><Label htmlFor="message">{t.message}</Label><Textarea id="message" value={formData.message} onChange={handleInputChange} placeholder={t.messagePlaceholder} rows={6} required /></div>
                  <Button type="submit" size="lg" className="w-full bg-[#d4b05d] hover:bg-[#d4b05d]/90 text-lg group" disabled={submissionStatus === "submitting"}>
                    {submissionStatus === "submitting" ? (
                      <> <Loader2 className="h-5 w-5 mr-2 animate-spin" /> {t.sending} </>
                    ) : (
                      <> <Send className="h-5 w-5 mr-2 transition-transform group-hover:translate-x-1" /> {t.send} </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* --- MODIFIED: Map & Hours --- */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="overflow-hidden shadow-lg border-stone-200">
               {/* --- ADDED: Interactive Google Map --- */}
               {/* Replace this iframe with your own Google Maps embed code */}
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3324.032609598285!2d-7.619024984796358!3d33.5786196807374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d2ed4a9b695b%3A0x5a7d3a0e6b5f4c5e!2sPlace%20Mohammed%20V!5e0!3m2!1sen!2sma!4v1663412345678"
                    width="100%"
                    height="350"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location of our store in Casablanca"
                ></iframe>
            </Card>
            <Card className="shadow-lg border-stone-200">
                <CardHeader>
                    <CardTitle className="font-playfair text-2xl flex items-center gap-3"><Clock className="h-6 w-6 text-[#d4b05d]"/> {t.hours}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-2">
                   <div className="flex justify-between border-b pb-2"><p>{t.mondayFriday}</p><p className="font-medium text-foreground">8:00 - 20:00</p></div>
                   <div className="flex justify-between border-b pb-2"><p>{t.saturday}</p><p className="font-medium text-foreground">9:00 - 21:00</p></div>
                   <div className="flex justify-between"><p>{t.sunday}</p><p className="font-medium text-foreground">10:00 - 18:00</p></div>
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}