"use client"
import { MoroccanDivider } from "@/components/moroccan-divider"
import { QuickViewModal } from "@/components/quick-view-modal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect, useMemo } from "react"
import { useCart } from "@/hooks/use-cart"
import { products } from "@/data/products"
import { Search, Filter, ChevronDown, X, Star } from "lucide-react"
import { ProductCard } from "@/components/product-card" // Fixed import to use named export instead of default export

export default function ProductsClient() {
  const [language, setLanguage] = useState<"en" | "fr" | "ar">("fr")
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 500])
  const [showInStock, setShowInStock] = useState(false)
  const [showOutOfStock, setShowOutOfStock] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showBestseller, setShowBestseller] = useState(false)
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState("default")
  const [showFilters, setShowFilters] = useState(false)
  const { addItem } = useCart()

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as "en" | "fr" | "ar"
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }

    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail.language)
    }

    window.addEventListener("languageChange", handleLanguageChange as EventListener)
    return () => window.removeEventListener("languageChange", handleLanguageChange as EventListener)
  }, [])

  const handleAddToCart = (productId: string, quantity = 1) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product, language)
      }
    }
  }

  const handleQuickView = (productId: string) => {
    setSelectedProductId(productId)
    setIsQuickViewOpen(true)
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setPriceRange([0, 500])
    setShowInStock(false)
    setShowOutOfStock(false)
    setShowNew(false)
    setShowBestseller(false)
    setMinRating(0)
    setSortBy("default")
  }

  const translations = {
    fr: {
      title: "Nos Pâtisseries",
      subtitle: "Collection Authentique",
      description:
        "Découvrez notre sélection raffinée de pâtisseries marocaines traditionnelles, préparées avec des ingrédients de première qualité et selon des recettes ancestrales transmises de génération en génération.",
      breadcrumb: {
        home: "Accueil",
        products: "Produits",
      },
      filters: {
        title: "Filtres",
        search: "Rechercher des produits...",
        category: "Catégorie",
        priceRange: "Gamme de prix",
        availability: "Disponibilité",
        inStock: "En stock",
        outOfStock: "Rupture de stock",
        special: "Spécial",
        new: "Nouveau",
        bestseller: "Bestseller",
        rating: "Note minimum",
        sortBy: "Trier par",
        clearAll: "Effacer tout",
        showFilters: "Afficher les filtres",
        hideFilters: "Masquer les filtres",
      },
      categories: {
        all: "Tous les Produits",
        traditional: "Douceurs Traditionnelles",
        almond: "Pâtisseries aux Amandes",
        layered: "Pâtisseries Feuilletées",
        date: "Pâtisseries aux Dattes",
        filled: "Biscuits Fourrés",
        phyllo: "Pâtisseries Phyllo",
      },
      sorting: {
        default: "Par défaut",
        priceLowHigh: "Prix: Croissant",
        priceHighLow: "Prix: Décroissant",
        rating: "Note",
        name: "Nom",
        newest: "Plus récent",
      },
      results: "Affichage de {count} produits",
      noResults: "Aucun produit trouvé avec ces filtres.",
    },
    ar: {
      title: "حلوياتنا",
      subtitle: "مجموعة أصيلة",
      description:
        "اكتشف مجموعتنا المختارة من الحلويات المغربية التقليدية، المحضرة بمكونات عالية الجودة ووفقاً لوصفات أجدادنا المتوارثة عبر الأجيال.",
      breadcrumb: {
        home: "الرئيسية",
        products: "المنتجات",
      },
      filters: {
        title: "المرشحات",
        search: "البحث عن المنتجات...",
        category: "الفئة",
        priceRange: "نطاق السعر",
        availability: "التوفر",
        inStock: "متوفر",
        outOfStock: "غير متوفر",
        special: "خاص",
        new: "جديد",
        bestseller: "الأكثر مبيعاً",
        rating: "أقل تقييم",
        sortBy: "ترتيب حسب",
        clearAll: "مسح الكل",
        showFilters: "إظهار المرشحات",
        hideFilters: "إخفاء المرشحات",
      },
      categories: {
        all: "جميع المنتجات",
        traditional: "حلويات تقليدية",
        almond: "معجنات اللوز",
        layered: "معجنات مطبقة",
        date: "معجنات التمر",
        filled: "بسكويت محشو",
        phyllo: "معجنات الفيلو",
      },
      sorting: {
        default: "افتراضي",
        priceLowHigh: "السعر: تصاعدي",
        priceHighLow: "السعر: تنازلي",
        rating: "التقييم",
        name: "الاسم",
        newest: "الأحدث",
      },
      results: "عرض {count} منتج",
      noResults: "لم يتم العثور على منتجات بهذه المرشحات.",
    },
    en: {
      title: "Our Pastries",
      subtitle: "Authentic Collection",
      description:
        "Discover our refined selection of traditional Moroccan pastries, prepared with premium ingredients and according to ancestral recipes passed down through generations.",
      breadcrumb: {
        home: "Home",
        products: "Products",
      },
      filters: {
        title: "Filters",
        search: "Search products...",
        category: "Category",
        priceRange: "Price Range",
        availability: "Availability",
        inStock: "In Stock",
        outOfStock: "Out of Stock",
        special: "Special",
        new: "New",
        bestseller: "Bestseller",
        rating: "Minimum Rating",
        sortBy: "Sort By",
        clearAll: "Clear All",
        showFilters: "Show Filters",
        hideFilters: "Hide Filters",
      },
      categories: {
        all: "All Products",
        traditional: "Traditional Sweets",
        almond: "Almond Pastries",
        layered: "Layered Pastries",
        date: "Date Pastries",
        filled: "Filled Cookies",
        phyllo: "Phyllo Pastries",
      },
      sorting: {
        default: "Default",
        priceLowHigh: "Price: Low to High",
        priceHighLow: "Price: High to Low",
        rating: "Rating",
        name: "Name",
        newest: "Newest",
      },
      results: "Showing {count} products",
      noResults: "No products found with these filters.",
    },
  }

  const t = translations[language]
  const isRTL = language === "ar"

  const filteredAndSortedProducts = useMemo(() => {
    console.log("[v0] Starting product filtering with", products.length, "total products")
    console.log("[v0] Current filters:", {
      searchQuery,
      selectedCategory,
      priceRange,
      showInStock,
      showOutOfStock,
      showNew,
      showBestseller,
      minRating,
    })

    const filtered = products.filter((product) => {
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase()
        const nameMatch = product.name[language].toLowerCase().includes(searchLower)
        const descMatch = product.description[language].toLowerCase().includes(searchLower)
        const categoryMatch = product.category[language].toLowerCase().includes(searchLower)
        if (!nameMatch && !descMatch && !categoryMatch) {
          console.log("[v0] Product filtered out by search:", product.name[language])
          return false
        }
      }

      // Category filter
      if (selectedCategory !== "all") {
        const productCategoryEn = product.category.en.toLowerCase()
        const selectedCategoryLower = selectedCategory.toLowerCase()

        const categoryMatches = {
          traditional: productCategoryEn.includes("traditional"),
          almond: productCategoryEn.includes("almond"),
          layered: productCategoryEn.includes("layered"),
          date: productCategoryEn.includes("date"),
          filled: productCategoryEn.includes("filled"),
          phyllo: productCategoryEn.includes("phyllo"),
        }

        if (!categoryMatches[selectedCategoryLower]) {
          console.log("[v0] Product filtered out by category:", product.name[language], "Category:", productCategoryEn)
          return false
        }
      }

      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        console.log(
          "[v0] Product filtered out by price:",
          product.name[language],
          "Price:",
          product.price,
          "Range:",
          priceRange,
        )
        return false
      }

      // Availability filters
      if (showInStock && !product.inStock) return false
      if (showOutOfStock && product.inStock) return false

      // Special filters
      if (showNew && !product.isNew) return false
      if (showBestseller && !product.isBestseller) return false

      // Rating filter
      if (product.rating < minRating) return false

      return true
    })

    console.log("[v0] Filtered products count:", filtered.length)

    // Sorting
    switch (sortBy) {
      case "priceLowHigh":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "priceHighLow":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "name":
        filtered.sort((a, b) => a.name[language].localeCompare(b.name[language]))
        break
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      default:
        // Keep original order
        break
    }

    return filtered
  }, [
    searchQuery,
    selectedCategory,
    priceRange,
    showInStock,
    showOutOfStock,
    showNew,
    showBestseller,
    minRating,
    sortBy,
    language,
  ])

  const selectedProduct = selectedProductId ? products.find((p) => p.id === selectedProductId) : null

  return (
    <div className={`min-h-screen bg-gradient-to-b from-almond-50 to-white ${isRTL ? "rtl" : "ltr"}`}>
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        <nav className={`flex items-center space-x-2 text-sm text-honey-600 mb-8 ${isRTL ? "space-x-reverse" : ""}`}>
          <a href="/" className="hover:text-saffron-500 transition-colors">
            {t.breadcrumb.home}
          </a>
          <span>/</span>
          <span className="text-saffron-600 font-medium">{t.breadcrumb.products}</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-great-vibes text-6xl md:text-7xl text-saffron-600 mb-4">{t.title}</h1>
          <p className="font-playfair text-2xl md:text-3xl text-honey-700 mb-6">{t.subtitle}</p>
          <p className="font-poppins text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">{t.description}</p>
        </div>
      </section>

      <MoroccanDivider />

      {/* Filters and Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  {showFilters ? t.filters.hideFilters : t.filters.showFilters}
                  <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                </Button>
              </div>

              {/* Filters Panel */}
              <div className={`lg:block ${showFilters ? "block" : "hidden"}`}>
                <Card>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-playfair">{t.filters.title}</CardTitle>
                      <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs">
                        <X className="h-3 w-3 mr-1" />
                        {t.filters.clearAll}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Search */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">{t.filters.search}</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder={t.filters.search}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">{t.filters.category}</Label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{t.categories.all}</SelectItem>
                          <SelectItem value="traditional">{t.categories.traditional}</SelectItem>
                          <SelectItem value="almond">{t.categories.almond}</SelectItem>
                          <SelectItem value="layered">{t.categories.layered}</SelectItem>
                          <SelectItem value="date">{t.categories.date}</SelectItem>
                          <SelectItem value="filled">{t.categories.filled}</SelectItem>
                          <SelectItem value="phyllo">{t.categories.phyllo}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Price Range */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        {t.filters.priceRange}: {priceRange[0]} MAD - {priceRange[1]} MAD
                      </Label>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={500}
                        min={0}
                        step={5}
                        className="mt-2"
                      />
                    </div>

                    {/* Availability */}
                    <div>
                      <Label className="text-sm font-medium mb-3 block">{t.filters.availability}</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="inStock" checked={showInStock} onCheckedChange={setShowInStock} />
                          <Label htmlFor="inStock" className="text-sm">
                            {t.filters.inStock}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="outOfStock" checked={showOutOfStock} onCheckedChange={setShowOutOfStock} />
                          <Label htmlFor="outOfStock" className="text-sm">
                            {t.filters.outOfStock}
                          </Label>
                        </div>
                      </div>
                    </div>

                    {/* Special Filters */}
                    <div>
                      <Label className="text-sm font-medium mb-3 block">{t.filters.special}</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="new" checked={showNew} onCheckedChange={setShowNew} />
                          <Label htmlFor="new" className="text-sm">
                            {t.filters.new}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="bestseller" checked={showBestseller} onCheckedChange={setShowBestseller} />
                          <Label htmlFor="bestseller" className="text-sm">
                            {t.filters.bestseller}
                          </Label>
                        </div>
                      </div>
                    </div>

                    {/* Rating Filter */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        {t.filters.rating}: {minRating > 0 ? `${minRating}+` : "Toutes"}
                      </Label>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <Button
                            key={rating}
                            variant="ghost"
                            size="sm"
                            onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                            className={`p-1 ${minRating >= rating ? "text-yellow-500" : "text-gray-300"}`}
                          >
                            <Star className="h-4 w-4 fill-current" />
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Products Section */}
            <div className="lg:w-3/4">
              {/* Sort and Results */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <Badge variant="secondary" className="text-sm">
                  {t.results.replace("{count}", filteredAndSortedProducts.length.toString())}
                </Badge>
                <div className="flex items-center gap-2">
                  <Label className="text-sm font-medium">{t.filters.sortBy}:</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">{t.sorting.default}</SelectItem>
                      <SelectItem value="priceLowHigh">{t.sorting.priceLowHigh}</SelectItem>
                      <SelectItem value="priceHighLow">{t.sorting.priceHighLow}</SelectItem>
                      <SelectItem value="rating">{t.sorting.rating}</SelectItem>
                      <SelectItem value="name">{t.sorting.name}</SelectItem>
                      <SelectItem value="newest">{t.sorting.newest}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Products Grid */}
              {filteredAndSortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredAndSortedProducts.map((product, index) => (
                    <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                      <ProductCard
                        product={product}
                        language={language}
                        onAddToCart={handleAddToCart}
                        onQuickView={handleQuickView}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">{t.noResults}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          language={language}
          isOpen={isQuickViewOpen}
          onClose={() => {
            setIsQuickViewOpen(false)
            setSelectedProductId(null)
          }}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: "Pâtisseries Marocaines Authentiques",
            description: "Boutique en ligne de pâtisseries marocaines traditionnelles",
            url: "https://yoursite.com/products",
            address: {
              "@type": "PostalAddress",
              addressCountry: "MA",
              addressLocality: "Casablanca",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Pâtisseries Marocaines",
              itemListElement: filteredAndSortedProducts.map((product) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Product",
                  name: product.name[language],
                  category: product.category[language],
                  offers: {
                    "@type": "Offer",
                    price: product.price,
                    priceCurrency: "MAD",
                    availability: product.inStock ? "InStock" : "OutOfStock",
                  },
                },
              })),
            },
          }),
        }}
      />

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
