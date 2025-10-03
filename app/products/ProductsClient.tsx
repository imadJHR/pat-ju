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
import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import { useCart } from "@/hooks/use-cart"
import { products } from "@/data/products"
import { Search, Filter, ChevronDown, X, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import Link from "next/link"
import React from "react"
import { useSearchParams } from "next/navigation";
import type { Product } from "@/types/product"

// --- Constants ---
const PRODUCTS_PER_PAGE = 12;
const LOCAL_STORAGE_PAGE_KEY = 'productsCurrentPage';

// --- Category Mapping ---
const categoryMapping = {
  all: "all",
  patisseries: "patisseries",
  boulangerie: "boulangerie",
  viennoiserie: "viennoiserie",
  beldi: "beldi",
  sale: "sale",
} as const;

// --- Translations ---
const translations = {
    fr: {
        title: "Nos Pâtisseries",
        subtitle: "Collection Authentique",
        description: "Découvrez notre sélection raffinée de pâtisseries marocaines traditionnelles, préparées avec des ingrédients de première qualité et selon des recettes ancestrales transmises de génération en génération.",
        breadcrumb: { home: "Accueil", products: "Produits" },
        filters: { title: "Filtres", search: "Rechercher des produits...", category: "Catégorie", priceRange: "Gamme de prix", availability: "Disponibilité", inStock: "En stock", outOfStock: "Rupture de stock", special: "Spécial", new: "Nouveau", bestseller: "Bestseller", rating: "Note minimum", allRatings: "Toutes", sortBy: "Trier par", clearAll: "Effacer tout", showFilters: "Afficher les filtres", hideFilters: "Masquer les filtres" },
        categories: { all: "Tous les Produits", patisseries: "Pâtisseries", boulangerie: "Boulangerie", viennoiserie: "Viennoiserie", beldi: "Beldi", sale: "Salé" },
        sorting: { default: "Par défaut", priceLowHigh: "Prix: Croissant", priceHighLow: "Prix: Décroissant", rating: "Note", name: "Nom", newest: "Plus récent" },
        results: "Affichage de {count} produits",
        noResults: "Aucun produit trouvé.",
        pagination: { previous: "Précédent", next: "Suivant", page: "Page" },
    },
    ar: {
        title: "حلوياتنا",
        subtitle: "مجموعة أصيلة",
        description: "اكتشف مجموعتنا المختارة من الحلويات المغربية التقليدية، المحضرة بمكونات عالية الجودة ووفقاً لوصفات أجدادنا المتوارثة عبر الأجيال.",
        breadcrumb: { home: "الرئيسية", products: "المنتجات" },
        filters: { title: "المرشحات", search: "البحث عن المنتجات...", category: "الفئة", priceRange: "نطاق السعر", availability: "التوفر", inStock: "متوفر", outOfStock: "غير متوفر", special: "خاص", new: "جديد", bestseller: "الأكثر مبيعاً", rating: "أقل تقييم", allRatings: "الكل", sortBy: "ترتيب حسب", clearAll: "مسح الكل", showFilters: "إظهار المرشحات", hideFilters: "إخفاء المرشحات" },
        categories: { all: "جميع المنتجات", patisseries: "حلويات", boulangerie: "مخبوزات", viennoiserie: "معجنات", beldi: "بلدي", sale: "مالح" },
        sorting: { default: "افتراضي", priceLowHigh: "السعر: تصاعدي", priceHighLow: "السعر: تنازلي", rating: "التقييم", name: "الاسم", newest: "الأحدث" },
        results: "عرض {count} منتج",
        noResults: "لم يتم العثور على منتجات.",
        pagination: { previous: "السابق", next: "التالي", page: "صفحة" },
    },
    en: {
        title: "Our Pastries",
        subtitle: "Authentic Collection",
        description: "Discover our refined selection of traditional Moroccan pastries, prepared with premium ingredients and according to ancestral recipes passed down through generations.",
        breadcrumb: { home: "Home", products: "Products" },
        filters: { title: "Filters", search: "Search products...", category: "Category", priceRange: "Price Range", availability: "Availability", inStock: "In Stock", outOfStock: "Out of Stock", special: "Special", new: "New", bestseller: "Bestseller", rating: "Minimum Rating", allRatings: "All", sortBy: "Sort By", clearAll: "Clear All", showFilters: "Show Filters", hideFilters: "Hide Filters" },
        categories: { all: "All Products", patisseries: "Pastries", boulangerie: "Bakery", viennoiserie: "Viennoiserie", beldi: "Traditional", sale: "Savory" },
        sorting: { default: "Default", priceLowHigh: "Price: Low to High", priceHighLow: "Price: High to Low", rating: "Rating", name: "Name", newest: "Newest" },
        results: "Showing {count} products",
        noResults: "No products found.",
        pagination: { previous: "Previous", next: "Next", page: "Page" },
    },
};

export default function ProductsClient() {
    const searchParams = useSearchParams();

    // --- State Management ---
    const [language, setLanguage] = useState<"en" | "fr" | "ar">("fr");
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [priceRange, setPriceRange] = useState([0, 500]);
    const [showInStock, setShowInStock] = useState(false);
    const [showOutOfStock, setShowOutOfStock] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showBestseller, setShowBestseller] = useState(false);
    const [minRating, setMinRating] = useState(0);
    const [sortBy, setSortBy] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);
    
    const { addItem } = useCart();
    const isInitialMount = useRef(true);

    // --- Effects ---
    useEffect(() => {
        const categoryFromUrl = searchParams.get('category');
        const validCategories = Object.keys(categoryMapping);
        if (categoryFromUrl && validCategories.includes(categoryFromUrl)) {
            setSelectedCategory(categoryFromUrl);
        }
    }, [searchParams]);

    useEffect(() => {
        const savedLanguage = localStorage.getItem("language") as "en" | "fr" | "ar";
        if (savedLanguage) setLanguage(savedLanguage);
        
        const handleLanguageChange = (event: CustomEvent) => {
            if (event.detail?.language) {
                setLanguage(event.detail.language);
            }
        };
        window.addEventListener("languageChange", handleLanguageChange as EventListener);
        return () => window.removeEventListener("languageChange", handleLanguageChange as EventListener);
    }, []);
    
    // This effect runs once on component mount to load the saved page number.
    useEffect(() => {
        const savedPage = localStorage.getItem(LOCAL_STORAGE_PAGE_KEY);
        if (savedPage) {
            try {
                const parsedPage = JSON.parse(savedPage);
                // Ensure the parsed value is a valid number before setting state
                if (typeof parsedPage === 'number') {
                    setCurrentPage(parsedPage);
                }
            } catch (e) {
                console.error("Failed to parse saved page from localStorage", e);
            }
        }
    }, []); // The empty dependency array [] ensures this runs only once.
    
    // This effect runs whenever 'currentPage' changes to save it to localStorage.
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_PAGE_KEY, JSON.stringify(currentPage));
    }, [currentPage]);
    
    // This effect resets the page to 1 whenever any filter is changed.
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            setCurrentPage(1);
        }
    }, [searchQuery, selectedCategory, priceRange, showInStock, showOutOfStock, showNew, showBestseller, minRating, sortBy]);

    // --- Memoized Calculations ---
    const t = translations[language];
    const isRTL = language === "ar";

    const filteredAndSortedProducts = useMemo(() => {
        const filtered = products.filter((product) => {
            if (searchQuery) {
                const searchLower = searchQuery.toLowerCase();
                const nameMatch = product.name[language]?.toLowerCase().includes(searchLower);
                const descriptionMatch = product.description[language]?.toLowerCase().includes(searchLower);
                const categoryMatch = product.category?.[language]?.toLowerCase().includes(searchLower);
                if (!nameMatch && !descriptionMatch && !categoryMatch) return false;
            }
            if (selectedCategory !== "all") {
                if (!product.category) return false;
                const categoryKey = Object.entries(t.categories).find(
                    ([, value]) => value === product.category[language]
                )?.[0];
                if (categoryKey !== selectedCategory) return false;
            }
            if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
            if (showInStock && !product.inStock) return false;
            if (showOutOfStock && product.inStock) return false;
            if (showNew && !product.isNew) return false;
            if (showBestseller && !product.isBestseller) return false;
            if (product.rating < minRating) return false;
            return true;
        });

        const sorted = [...filtered];
        switch (sortBy) {
            case "priceLowHigh": sorted.sort((a, b) => a.price - b.price); break;
            case "priceHighLow": sorted.sort((a, b) => b.price - a.price); break;
            case "rating": sorted.sort((a, b) => b.rating - a.rating); break;
            case "name": sorted.sort((a, b) => a.name[language].localeCompare(b.name[language])); break;
            case "newest": sorted.sort((a, b) => Number(b.isNew ?? 0) - Number(a.isNew ?? 0)); break;
            default: break;
        }
        return sorted;
    }, [language, selectedCategory, searchQuery, priceRange, showInStock, showOutOfStock, showNew, showBestseller, minRating, sortBy, t.categories]);

    const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE);
    const currentProducts = filteredAndSortedProducts.slice(
        (currentPage - 1) * PRODUCTS_PER_PAGE,
        currentPage * PRODUCTS_PER_PAGE
    );

    const selectedProduct = selectedProductId ? products.find((p) => p.id === selectedProductId) : null;

    // --- Handlers ---
    const handleAddToCart = useCallback((productId: string, quantityInKg?: number) => {
        const product = products.find((p) => p.id === productId);
        if (product) addItem(product, quantityInKg);
    }, [addItem]);

    const handleQuickView = useCallback((productId: string) => {
        setSelectedProductId(productId);
        setIsQuickViewOpen(true);
    }, []);

    const clearAllFilters = useCallback(() => {
        setSearchQuery("");
        setSelectedCategory("all");
        setPriceRange([0, 500]);
        setShowInStock(false);
        setShowOutOfStock(false);
        setShowNew(false);
        setShowBestseller(false);
        setMinRating(0);
        setSortBy("default");
        setCurrentPage(1);
    }, []);

    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    return (
        <div className={`min-h-screen bg-gray-50 ${isRTL ? "rtl font-cairo" : "ltr font-poppins"}`}>
            <div className="container mx-auto px-4 pt-20 md:pt-24 pb-8">
                <nav className={`flex items-center space-x-2 text-sm text-gray-600 mb-8 ${isRTL ? "space-x-reverse" : ""}`}>
                    <Link href="/" className="hover:text-[#d4b05d] transition-colors">{t.breadcrumb.home}</Link>
                    <span>/</span>
                    <span className="text-[#d4b05d] font-medium">{t.breadcrumb.products}</span>
                </nav>
            </div>

            <section className="container mx-auto px-4 pb-12 md:pb-16">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="font-great-vibes text-5xl sm:text-6xl md:text-7xl text-[#d4b05d]">{t.title}</h1>
                    <p className="font-playfair text-xl sm:text-2xl md:text-3xl text-[#d4b05d]">{t.subtitle}</p>
                    <MoroccanDivider />
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mt-4">{t.description}</p>
                </div>
            </section>
            
            <section className="py-12 md:py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
                        <aside className="lg:w-1/4">
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

                            <div className={`lg:block lg:sticky lg:top-24 ${showFilters ? "block" : "hidden"}`}>
                                <Card className="bg-[#f4ead5] border-none shadow-sm">
                                    <CardHeader className="pb-4">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-lg font-playfair text-[#d4b05d]">{t.filters.title}</CardTitle>
                                            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs text-[#d4b05d] hover:bg-[#d4b05d]/10">
                                                <X className="h-3 w-3 mr-1" />
                                                {t.filters.clearAll}
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div>
                                            <Label className="text-sm font-medium mb-2 block text-[#d4b05d]">{t.filters.search}</Label>
                                            <div className="relative">
                                                <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400`} />
                                                <Input placeholder={t.filters.search} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`${isRTL ? 'pr-10' : 'pl-10'} border-[#d4b05d] focus:ring-[#d4b05d]`} />
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <Label className="text-sm font-medium mb-2 block text-[#d4b05d]">{t.filters.category}</Label>
                                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                                <SelectTrigger className="border-[#d4b05d] text-[#d4b05d] focus:ring-[#d4b05d]"><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                  {Object.entries(t.categories).map(([key, value]) => (
                                                      <SelectItem key={key} value={key}>{value}</SelectItem>
                                                  ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label className="text-sm font-medium mb-2 block text-[#d4b05d]">{t.filters.priceRange}: {priceRange[0]} MAD - {priceRange[1]} MAD</Label>
                                            <Slider value={priceRange} onValueChange={setPriceRange} max={500} step={5} style={{ "--slider-thumb-color": "#d4b05d", "--slider-track-color": "#d4b05d" } as React.CSSProperties} />
                                        </div>
                                        
                                        <div>
                                            <Label className="text-sm font-medium mb-3 block text-[#d4b05d]">{t.filters.availability}</Label>
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox id="inStock" checked={showInStock} onCheckedChange={(checked) => setShowInStock(!!checked)} />
                                                    <Label htmlFor="inStock" className="text-sm text-[#d4b05d]">{t.filters.inStock}</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox id="outOfStock" checked={showOutOfStock} onCheckedChange={(checked) => setShowOutOfStock(!!checked)} />
                                                    <Label htmlFor="outOfStock" className="text-sm text-[#d4b05d]">{t.filters.outOfStock}</Label>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <Label className="text-sm font-medium mb-3 block text-[#d4b05d]">{t.filters.special}</Label>
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox id="new" checked={showNew} onCheckedChange={(checked) => setShowNew(!!checked)} />
                                                    <Label htmlFor="new" className="text-sm text-[#d4b05d]">{t.filters.new}</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox id="bestseller" checked={showBestseller} onCheckedChange={(checked) => setShowBestseller(!!checked)} />
                                                    <Label htmlFor="bestseller" className="text-sm text-[#d4b05d]">{t.filters.bestseller}</Label>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <Label className="text-sm font-medium mb-2 block text-[#d4b05d]">{t.filters.rating}: {minRating > 0 ? `${minRating}+` : t.filters.allRatings}</Label>
                                            <div className="flex items-center space-x-1">
                                                {[1, 2, 3, 4, 5].map((rating) => (
                                                    <Button key={rating} variant="ghost" size="icon" onClick={() => setMinRating(minRating === rating ? 0 : rating)} className={`p-1 h-auto w-auto hover:bg-transparent ${minRating >= rating ? "text-yellow-400" : "text-gray-300"}`}>
                                                        <Star className="h-5 w-5 fill-current" />
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </aside>

                        <main className="lg:w-3/4">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <Badge variant="secondary" className="text-sm bg-[#d4b05d] text-white">
                                    {t.results.replace("{count}", filteredAndSortedProducts.length.toString())}
                                </Badge>
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <Label className="text-sm font-medium shrink-0 text-[#d4b05d]">{t.filters.sortBy}:</Label>
                                    <Select value={sortBy} onValueChange={setSortBy}>
                                        <SelectTrigger className="w-full sm:w-48 border-[#d4b05d] text-[#d4b05d] focus:ring-[#d4b05d]"><SelectValue /></SelectTrigger>
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

                            {currentProducts.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                                        {currentProducts.map((product, index) => (
                                            <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                                                <ProductCard product={product} language={language} onAddToCart={handleAddToCart} onQuickView={handleQuickView} isPriority={index < 4} />
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {totalPages > 1 && (
                                      <div className="flex justify-center items-center mt-12 space-x-2">
                                          <Button variant="outline" size="icon" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} aria-label={t.pagination.previous}>
                                              <ChevronLeft className={`h-4 w-4 ${isRTL ? 'transform rotate-180' : ''}`} />
                                          </Button>
                                          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                                              <Button key={pageNumber} variant={currentPage === pageNumber ? 'default' : 'outline'} size="icon" onClick={() => handlePageChange(pageNumber)} className={currentPage === pageNumber ? 'bg-[#d4b05d] hover:bg-[#c8a14a] border-[#d4b05d]' : ''} aria-label={`${t.pagination.page} ${pageNumber}`} aria-current={currentPage === pageNumber ? 'page' : undefined}>
                                                  {pageNumber}
                                              </Button>
                                          ))}
                                          <Button variant="outline" size="icon" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} aria-label={t.pagination.next}>
                                              <ChevronRight className={`h-4 w-4 ${isRTL ? 'transform rotate-180' : ''}`} />
                                          </Button>
                                      </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-muted-foreground text-lg text-[#d4b05d]">{t.noResults}</p>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </section>

            {selectedProduct && (
                <QuickViewModal product={selectedProduct} language={language} isOpen={isQuickViewOpen} onClose={() => { setIsQuickViewOpen(false); setSelectedProductId(null); }} onAddToCart={handleAddToCart} />
            )}

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        name: t.title,
                        description: t.description,
                        url: `https://yoursite.com/products?lang=${language}`,
                        numberOfItems: filteredAndSortedProducts.length,
                        itemListElement: currentProducts.map((product, index) => ({
                            "@type": "ListItem",
                            position: (currentPage - 1) * PRODUCTS_PER_PAGE + index + 1,
                            item: {
                                "@type": "Product",
                                name: product.name[language],
                                category: product.category?.[language] || "Uncategorized",
                                image: product.images[0],
                                url: `https://yoursite.com/products/${product.id}?lang=${language}`,
                                offers: {
                                    "@type": "Offer",
                                    price: product.price,
                                    priceCurrency: "MAD",
                                    availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
                                },
                                aggregateRating: {
                                  "@type": "AggregateRating",
                                  ratingValue: product.rating,
                                  reviewCount: product.reviewCount
                                }
                            },
                        })),
                    }),
                }}
            />

            <style jsx>{`
              @keyframes fade-in-up {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .animate-fade-in-up {
                animation: fade-in-up 0.5s ease-out forwards;
                opacity: 0;
              }
            `}</style>
        </div>
    );
}