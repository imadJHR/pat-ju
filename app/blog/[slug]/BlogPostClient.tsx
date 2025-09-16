"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin,
  Bookmark,
  BookmarkCheck
} from "lucide-react"
import type { BlogPost } from "@/data/blog-posts"

interface BlogPostClientProps {
  post: BlogPost
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const [language, setLanguage] = useState<"en" | "fr" | "ar">("fr")
  const [isBookmarked, setIsBookmarked] = useState(false)
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

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(post.title[language])
    
    let shareUrl = ""
    switch(platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        break
    }
    
    window.open(shareUrl, "_blank", "width=600,height=400")
  }

  return (
    <div className={`min-h-screen bg-background ${isRTL ? "rtl" : "ltr"}`}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Language Selector */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/blog">
            <Button 
              variant="ghost" 
              className="group text-[#d4b05d] hover:text-[#d4b05d]/90 hover:bg-[#d4b05d]/10 transition-all duration-300 rounded-full px-4"
            >
              <ArrowLeft className={`h-4 w-4 ${isRTL ? "ml-2 rotate-180" : "mr-2"} group-hover:-translate-x-1 transition-transform`} />
              {t.backToBlog}
            </Button>
          </Link>
          
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="rounded-full hover:bg-[#d4b05d]/10 text-[#d4b05d]"
              aria-label={isBookmarked ? "Remove bookmark" : "Bookmark article"}
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-5 w-5 fill-[#d4b05d]" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}
            </Button>
            
            <div className="flex gap-1 rounded-full p-1 bg-muted border">
              {(["fr", "en", "ar"] as const).map((lang) => (
                <Button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  variant={language === lang ? "default" : "ghost"}
                  size="sm"
                  className={`rounded-full transition-all text-xs ${
                    language === lang 
                      ? 'bg-[#d4b05d] hover:bg-[#d4b05d]/90 text-white shadow' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {lang.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <article className="max-w-4xl mx-auto w-full">
          {/* Header */}
          <header className="mb-10">
            <Badge className="mb-4 bg-[#d4b05d] text-white px-3 py-1 text-sm font-medium">
              {t.categories[post.category as keyof typeof t.categories] || post.category}
            </Badge>
            
            <h1 className="font-great-vibes text-4xl sm:text-5xl md:text-6xl text-[#d4b05d] mb-6 leading-tight">
              {post.title[language]}
            </h1>
            
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
            
            <div className="border-l-4 border-[#d4b05d] pl-4">
              <p className="font-playfair text-lg sm:text-xl text-muted-foreground leading-relaxed italic">
                {post.excerpt[language]}
              </p>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative mb-10 w-full h-64 sm:h-80 md:h-[28rem] overflow-hidden rounded-xl shadow-lg">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title[language]}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              priority
            />
          </div>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none mb-10 font-poppins leading-relaxed 
                      prose-p:my-5 prose-p:text-foreground/90
                      prose-h2:text-[#d4b05d] prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-2xl sm:prose-h2:text-3xl
                      prose-h3:text-[#d4b05d] prose-h3:mt-8 prose-h3:mb-3
                      prose-ul:my-5 prose-li:marker:text-[#d4b05d]
                      prose-blockquote:border-l-[#d4b05d] prose-blockquote:bg-muted/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r
                      prose-a:text-[#d4b05d] prose-a:underline hover:prose-a:no-underline"
            dangerouslySetInnerHTML={{ __html: post.content[language] }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {post.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="text-xs sm:text-sm bg-[#e6d7c3] text-[#d4b05d] hover:bg-[#d4b05d] hover:text-white transition-colors cursor-pointer"
              >
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Share Section */}
          <Card className="mb-10 bg-gradient-to-r from-[#f8f2e6] to-[#e6d7c3] border-none shadow-md">
            <CardContent className="p-6">
              <h3 className="font-playfair text-lg font-semibold mb-4 flex items-center gap-3 text-[#d4b05d]">
                <Share2 className="h-5 w-5" />
                {t.shareArticle}
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2 bg-white border-[#d4b05d] text-[#d4b05d] hover:bg-[#d4b05d] hover:text-white transition-all duration-300 rounded-full px-4 text-sm shadow-sm"
                  onClick={() => handleShare("facebook")}
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2 bg-white border-[#d4b05d] text-[#d4b05d] hover:bg-[#d4b05d] hover:text-white transition-all duration-300 rounded-full px-4 text-sm shadow-sm"
                  onClick={() => handleShare("twitter")}
                >
                  <Twitter className="h-4 w-4" />
                  Twitter
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2 bg-white border-[#d4b05d] text-[#d4b05d] hover:bg-[#d4b05d] hover:text-white transition-all duration-300 rounded-full px-4 text-sm shadow-sm"
                  onClick={() => handleShare("linkedin")}
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Author Bio Section */}
          <Card className="mb-10 bg-muted/30 border-none">
            <CardContent className="p-6 flex flex-col sm:flex-row items-start gap-6">
              <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/placeholder-avatar.jpg" // Replace with actual author image
                  alt={post.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">About {post.author}</h3>
                <p className="text-muted-foreground">
                  Culinary expert with over 10 years of experience in traditional cuisine. 
                  Passionate about preserving and sharing authentic recipes and cooking techniques.
                </p>
              </div>
            </CardContent>
          </Card>
        </article>
      </div>
    </div>
  )
}