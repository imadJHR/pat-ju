"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, User, Search, ArrowRight, X, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getAllBlogPosts } from "@/data/blog-posts"; // Assuming BlogPost type is exported

// Helper component for Skeleton loading state
const PostCardSkeleton = () => (
  <Card className="overflow-hidden">
    <div className="bg-muted h-48 w-full animate-pulse"></div>
    <CardContent className="p-6">
      <div className="bg-muted h-5 w-3/4 rounded-md mb-4 animate-pulse"></div>
      <div className="space-y-2">
        <div className="bg-muted h-4 w-full rounded-md animate-pulse"></div>
        <div className="bg-muted h-4 w-full rounded-md animate-pulse"></div>
        <div className="bg-muted h-4 w-2/3 rounded-md animate-pulse"></div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="bg-muted h-4 w-1/4 rounded-md animate-pulse"></div>
        <div className="bg-muted h-4 w-1/4 rounded-md animate-pulse"></div>
      </div>
      <div className="bg-muted h-10 w-full rounded-md mt-4 animate-pulse"></div>
    </CardContent>
  </Card>
);


export default function BlogPage() {
  const [language, setLanguage] = useState<"en" | "fr" | "ar">("fr");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true); // For loading state simulation
  const [currentPage, setCurrentPage] = useState(1);

  const isRTL = language === "ar";
  const allPosts = getAllBlogPosts();
  const POSTS_PER_PAGE = 6;

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500); // Simulate network delay
    return () => clearTimeout(timer);
  }, []);
  
  // Filtering Logic
  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch =
      post.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt[language].toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );
  
  // The first post from the full list is our featured post
  const featuredPost = allPosts.length > 0 ? allPosts[0] : null;

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
      noResultsTitle: "No Articles Found",
      noResultsDescription: "Try adjusting your search or filters to find what you're looking for.",
      clearFilters: "Clear Filters",
      featured: "Featured",
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
      noResultsTitle: "Aucun Article Trouvé",
      noResultsDescription: "Essayez de modifier votre recherche ou vos filtres pour trouver ce que vous cherchez.",
      clearFilters: "Effacer les Filtres",
      featured: "À la une",
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
      noResultsTitle: "لم يتم العثور على مقالات",
      noResultsDescription: "حاول تعديل بحثك أو عوامل التصفية للعثور على ما تبحث عنه.",
      clearFilters: "مسح الفلاتر",
      featured: "متميز",
    },
  };

  const t = translations[language];

  const categories = [
    { key: "all", label: t.allCategories },
    { key: "recipes", label: t.recipes },
    { key: "traditions", label: t.traditions },
    { key: "tips", label: t.tips },
    { key: "news", label: t.news },
  ];

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setCurrentPage(1);
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page on category change
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0); // Scroll to top on page change
    }
  };

  return (
    <div className={`min-h-screen bg-background ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-50/50 via-stone-50 to-amber-50/50 py-20">
        <div className="container mx-auto px-4 text-center">
          {/* Ensure you have `great-vibes` font configured in tailwind.config.js */}
          <h1 className="font-great-vibes text-5xl md:text-7xl text-[#d4b05d] mb-4">
            {t.title}
          </h1>
          {/* Ensure you have `playfair-display` font configured */}
          <p className="font-playfair text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-16">
        {/* Language & Search Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
            <div className="relative w-full md:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1); // Reset page on new search
                  }}
                  className="pl-10"
                />
            </div>
          <div className="flex gap-1 rounded-lg p-1 bg-muted">
            {(["fr", "en", "ar"] as const).map((lang) => (
              <Button
                key={lang}
                onClick={() => setLanguage(lang)}
                variant={language === lang ? "default" : "ghost"}
                size="sm"
                className={`transition-all ${
                  language === lang
                    ? "bg-[#d4b05d] hover:bg-[#d4b05d]/90 text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {lang.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>

        {/* --- ADDED: Featured Post --- */}
        {featuredPost && !searchQuery && selectedCategory === 'all' && currentPage === 1 && (
            <section className="mb-16">
                 <h2 className="text-3xl font-playfair font-bold mb-6 border-b-2 border-[#d4b05d] pb-2 inline-block">{t.featured}</h2>
                <Card className="grid md:grid-cols-2 overflow-hidden shadow-lg border border-transparent hover:border-amber-200 transition-all duration-300">
                    <div className="relative w-full min-h-[300px]">
                        <Image
                            src={featuredPost.image || "/placeholder.svg"}
                            alt={featuredPost.title[language]}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                        />
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                        <Badge className="bg-[#d4b05d] text-white w-fit mb-4">
                            {t[featuredPost.category as keyof typeof t] || featuredPost.category}
                        </Badge>
                        <h3 className="font-playfair text-3xl font-bold mb-3">
                            {featuredPost.title[language]}
                        </h3>
                        <p className="text-muted-foreground mb-6 line-clamp-3">
                            {featuredPost.excerpt[language]}
                        </p>
                         <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                            <div className="flex items-center gap-2"><User className="h-4 w-4" /><span>{t.by} {featuredPost.author}</span></div>
                            <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /><span>{featuredPost.date}</span></div>
                        </div>
                        <Link href={`/blog/${featuredPost.slug}`}>
                            <Button className="group bg-[#d4b05d] hover:bg-[#d4b05d]/90 text-white w-fit">
                                {t.readMore}
                                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </Card>
            </section>
        )}

        <div className="grid lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            {/* Categories */}
            <Card className="bg-transparent border-none shadow-none">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="font-playfair text-xl font-semibold border-b pb-2">{t.categories}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category.key}
                    variant={selectedCategory === category.key ? "default" : "ghost"}
                    className={`w-full justify-start text-base transition-all duration-200 ${
                      selectedCategory === category.key
                        ? "bg-[#d4b05d] hover:bg-[#d4b05d]/90 text-white"
                        : "text-muted-foreground hover:bg-amber-50/50 hover:text-foreground"
                    }`}
                    onClick={() => handleCategoryChange(category.key)}
                  >
                    {category.label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Recent Posts */}
            <Card className="bg-transparent border-none shadow-none">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="font-playfair text-xl font-semibold border-b pb-2">{t.recentPosts}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                {allPosts.slice(0, 3).map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
                    <div className="flex gap-4 items-center p-2 rounded-md transition-colors hover:bg-amber-50/50">
                      <div className="flex-shrink-0 w-16 h-16 relative rounded-md overflow-hidden">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title[language]}
                          fill
                          sizes="64px"
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm line-clamp-2 mb-1 group-hover:text-[#d4b05d] transition-colors">
                          {post.title[language]}
                        </h4>
                        <p className="text-xs text-muted-foreground">{post.date}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
             {isLoading ? (
                <div className="grid md:grid-cols-2 gap-8">
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                </div>
             ) : paginatedPosts.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 gap-8">
                  {paginatedPosts.map((post) => (
                    <Card key={post.id} className="group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden border-stone-200">
                      <div className="relative w-full h-52">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title[language]}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                         <Link href={`/blog/${post.slug}`} className="absolute inset-0 bg-black/20"></Link>
                        <Badge className="absolute top-4 left-4 bg-[#d4b05d] text-white z-10 pointer-events-none">
                          {t[post.category as keyof typeof t] || post.category}
                        </Badge>
                      </div>
                      <CardContent className="p-6 flex flex-col h-full">
                        <h2 className="font-playfair text-xl font-bold mb-3 line-clamp-2">
                          <Link href={`/blog/${post.slug}`} className="hover:text-[#d4b05d] transition-colors">
                           {post.title[language]}
                          </Link>
                        </h2>
                        <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">
                          {post.excerpt[language]}
                        </p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mt-auto pt-4 border-t">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" /><span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" /><span>{post.date}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {/* --- ADDED: Pagination Controls --- */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-12">
                    <Button variant="outline" size="icon" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium">Page {currentPage} of {totalPages}</span>
                     <Button variant="outline" size="icon" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
                // --- ADDED: No Results State ---
                <div className="flex flex-col items-center justify-center text-center col-span-full h-[400px] bg-stone-50/50 rounded-lg">
                    <BookOpen className="h-16 w-16 text-muted-foreground mb-4"/>
                    <h3 className="text-2xl font-playfair font-bold mb-2">{t.noResultsTitle}</h3>
                    <p className="text-muted-foreground mb-6 max-w-sm">{t.noResultsDescription}</p>
                    <Button onClick={handleClearFilters} className="bg-[#d4b05d] hover:bg-[#d4b05d]/90 text-white">
                        <X className="h-4 w-4 mr-2" />
                        {t.clearFilters}
                    </Button>
                </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}