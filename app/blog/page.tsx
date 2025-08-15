"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, User, Search, ArrowRight } from "lucide-react"
import Link from "next/link"
import { getAllBlogPosts } from "@/data/blog-posts"

export default function BlogPage() {
  const [language, setLanguage] = useState<"en" | "fr" | "ar">("fr")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const isRTL = language === "ar"
  const blogPosts = getAllBlogPosts()

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt[language].toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const translations = {
    en: {
      title: "Our Blog",
      subtitle: "Discover the secrets of Moroccan pastry and our culinary traditions",
      searchPlaceholder: "Search articles...",
      readMore: "Read More",
      by: "By",
      categories: "Categories",
      recentPosts: "Recent Posts",
      allCategories: "All Categories",
      recipes: "Recipes",
      traditions: "Traditions",
      tips: "Tips",
      news: "News",
    },
    fr: {
      title: "Notre Blog",
      subtitle: "Découvrez les secrets de la pâtisserie marocaine et nos traditions culinaires",
      searchPlaceholder: "Rechercher des articles...",
      readMore: "Lire Plus",
      by: "Par",
      categories: "Catégories",
      recentPosts: "Articles Récents",
      allCategories: "Toutes les Catégories",
      recipes: "Recettes",
      traditions: "Traditions",
      tips: "Conseils",
      news: "Actualités",
    },
    ar: {
      title: "مدونتنا",
      subtitle: "اكتشف أسرار الحلويات المغربية وتقاليدنا الطهوية",
      searchPlaceholder: "البحث في المقالات...",
      readMore: "اقرأ المزيد",
      by: "بواسطة",
      categories: "الفئات",
      recentPosts: "المقالات الحديثة",
      allCategories: "جميع الفئات",
      recipes: "الوصفات",
      traditions: "التقاليد",
      tips: "النصائح",
      news: "الأخبار",
    },
  }

  const t = translations[language]

  const categories = [
    { key: "all", label: t.allCategories },
    { key: "recipes", label: t.recipes },
    { key: "traditions", label: t.traditions },
    { key: "tips", label: t.tips },
    { key: "news", label: t.news },
  ]

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

      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-great-vibes text-5xl md:text-6xl text-primary mb-4">{t.title}</h1>
          <p className="font-playfair text-xl text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Categories */}
            <Card>
              <CardHeader>
                <h3 className="font-playfair text-lg font-semibold">{t.categories}</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category.key}
                    variant={selectedCategory === category.key ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category.key)}
                  >
                    {category.label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Recent Posts */}
            <Card>
              <CardHeader>
                <h3 className="font-playfair text-lg font-semibold">{t.recentPosts}</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {blogPosts.slice(0, 3).map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <div className="flex gap-3 hover:bg-muted/50 p-2 rounded-md transition-colors cursor-pointer">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title[language]}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-2 mb-1">{post.title[language]}</h4>
                        <p className="text-xs text-muted-foreground">{post.date}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="group hover:shadow-lg transition-shadow">
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title[language]}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                      {t[post.category as keyof typeof t] || post.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h2 className="font-playfair text-xl font-semibold mb-3 line-clamp-2">{post.title[language]}</h2>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt[language]}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
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
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="outline" className="group bg-transparent w-full">
                        {t.readMore}
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
