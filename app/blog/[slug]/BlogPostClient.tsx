"use client"

import { useState } from "react"
import Link from "next/link"
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
      {/* Language Selector */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        {(["en", "fr", "ar"] as const).map((lang) => (
          <Button
            key={lang}
            variant={language === lang ? "default" : "outline"}
            size="sm"
            onClick={() => setLanguage(lang)}
            className="min-w-[50px]"
          >
            {lang.toUpperCase()}
          </Button>
        ))}
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/blog">
          <Button variant="ghost" className="mb-6 group">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            {t.backToBlog}
          </Button>
        </Link>

        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <Badge className="mb-4 bg-primary text-primary-foreground">
              {t.categories[post.category as keyof typeof t.categories] || post.category}
            </Badge>

            <h1 className="font-great-vibes text-4xl md:text-5xl text-primary mb-4">{post.title[language]}</h1>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>
                  {t.by} {post.author}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>
                  {post.readTime} {t.readTime}
                </span>
              </div>
            </div>

            <p className="font-playfair text-xl text-muted-foreground leading-relaxed">{post.excerpt[language]}</p>
          </header>

          {/* Featured Image */}
          <div className="mb-8">
            <img
              src={post.image || "/placeholder.svg"}
              alt={post.title[language]}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none mb-8 font-poppins leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content[language] }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Share Section */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="font-playfair text-lg font-semibold mb-4 flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                {t.shareArticle}
              </h3>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                  <Facebook className="h-4 w-4" />
                  Facebook
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                  <Twitter className="h-4 w-4" />
                  Twitter
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
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
