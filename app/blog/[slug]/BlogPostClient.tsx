"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image" // <-- Import the Next.js Image component
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import type { BlogPost } from "@/data/blog-posts"

interface BlogPostClientProps {
  post: BlogPost
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const [language, setLanguage] = useState<"en" | "fr" | "ar">("fr")
  const isRTL = language === "ar"

  const translations = {
    en: {
      backToBlog: "Back to Blog",
      by: "By",
      readTime: "read",
      shareArticle: "Share this article",
      relatedPosts: "Related Posts",
      categories: {
        recipes: "Recipes",
        traditions: "Traditions",
        tips: "Tips",
        news: "News",
      },
    },
    fr: {
      backToBlog: "Retour au Blog",
      by: "Par",
      readTime: "de lecture",
      shareArticle: "Partager cet article",
      relatedPosts: "Articles Connexes",
      categories: {
        recipes: "Recettes",
        traditions: "Traditions",
        tips: "Conseils",
        news: "Actualités",
      },
    },
    ar: {
      backToBlog: "العودة إلى المدونة",
      by: "بواسطة",
      readTime: "للقراءة",
      shareArticle: "شارك هذا المقال",
      relatedPosts: "مقالات ذات صلة",
      categories: {
        recipes: "الوصفات",
        traditions: "التقاليد",
        tips: "النصائح",
        news: "الأخبار",
      },
    },
  }

  const t = translations[language]

  return (
    <div className={`min-h-screen bg-background ${isRTL ? "rtl" : "ltr"}`}>
      <div className="container mx-auto px-4 py-8">
      {/* --- ADDED: Language Selector --- */}
      <div className="flex justify-end mb-4">
        <div className="flex gap-2 rounded-lg p-1 bg-muted">
          {(["fr", "en", "ar"] as const).map((lang) => (
            <Button
              key={lang}
              onClick={() => setLanguage(lang)}
              variant={language === lang ? "default" : "ghost"}
              size="sm"
              className={`transition-all ${language === lang ? 'bg-[#d4b05d] hover:bg-[#d4b05d]/90' : 'text-muted-foreground'}`}
            >
              {lang.toUpperCase()}
            </Button>
          ))}
        </div>
      </div>

        {/* Back Button */}
        <Link href="/blog">
          <Button variant="ghost" className="mb-6 group text-[#d4b05d] hover:text-[#d4b05d]/90">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            {t.backToBlog}
          </Button>
        </Link>

        <article className="max-w-4xl mx-auto w-full">
          {/* Header */}
          <header className="mb-8">
            <Badge className="mb-4 bg-[#d4b05d] text-white">
              {t.categories[post.category as keyof typeof t.categories] || post.category}
            </Badge>
            <h1 className="font-great-vibes text-3xl sm:text-4xl md:text-5xl text-[#d4b05d] mb-4">{post.title[language]}</h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="text-sm sm:text-base">
                  {t.by} {post.author}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm sm:text-base">{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm sm:text-base">
                  {post.readTime} {t.readTime}
                </span>
              </div>
            </div>
            <p className="font-playfair text-lg sm:text-xl text-muted-foreground leading-relaxed">{post.excerpt[language]}</p>
          </header>

          {/* --- MODIFIED: Featured Image --- */}
          <div className="relative mb-8 w-full h-48 sm:h-64 md:h-96 overflow-hidden rounded-lg shadow-lg">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title[language]}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none mb-8 font-poppins leading-relaxed prose-p:my-2 prose-h2:text-[#d4b05d] prose-h3:text-[#d4b05d]"
            dangerouslySetInnerHTML={{ __html: post.content[language] }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs sm:text-sm bg-[#e6d7c3] text-[#d4b05d]">
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Share Section */}
          <Card className="mb-8 bg-[#e6d7c3] border-none">
            <CardContent className="p-4 sm:p-6">
              <h3 className="font-playfair text-base sm:text-lg font-semibold mb-4 flex items-center gap-2 text-[#d4b05d]">
                <Share2 className="h-5 w-5" />
                {t.shareArticle}
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent border-[#d4b05d] text-[#d4b05d] hover:bg-[#d4b05d]/10 text-xs sm:text-sm">
                  <Facebook className="h-4 w-4" />
                  Facebook
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent border-[#d4b05d] text-[#d4b05d] hover:bg-[#d4b05d]/10 text-xs sm:text-sm">
                  <Twitter className="h-4 w-4" />
                  Twitter
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent border-[#d4b05d] text-[#d4b05d] hover:bg-[#d4b05d]/10 text-xs sm:text-sm">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Button>
              </div>
            </CardContent>
          </Card>
        </article>
      </div>
    </div>
  )
}