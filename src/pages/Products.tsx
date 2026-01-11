import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Heart, Star, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TopUtilityHeader from "@/components/layout/TopUtilityHeader";
import MainHeader from "@/components/layout/MainHeader";
import Footer from "@/components/layout/Footer";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  badge?: "Best Seller" | "New Arrival" | "GI Certified";
  inStock: boolean;
}

const Products = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "All Sarees";
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Sample products data
  const products: Product[] = [
    {
      id: "1",
      name: "Ilkal Saree – Teni Pallu Red",
      image: "/placeholder.svg",
      price: 2999,
      originalPrice: 4499,
      rating: 4.6,
      reviews: 128,
      badge: "Best Seller",
      inStock: true,
    },
    {
      id: "2",
      name: "Traditional Kasuti Work Saree",
      image: "/placeholder.svg",
      price: 3499,
      originalPrice: 5999,
      rating: 4.8,
      reviews: 89,
      badge: "GI Certified",
      inStock: true,
    },
    {
      id: "3",
      name: "Handwoven Silk Ilkal Saree",
      image: "/placeholder.svg",
      price: 4299,
      rating: 4.5,
      reviews: 56,
      badge: "New Arrival",
      inStock: true,
    },
    {
      id: "4",
      name: "Cotton Ilkal Saree – Blue",
      image: "/placeholder.svg",
      price: 1999,
      originalPrice: 2999,
      rating: 4.4,
      reviews: 234,
      inStock: true,
    },
    {
      id: "5",
      name: "Festive Maroon Ilkal Saree",
      image: "/placeholder.svg",
      price: 3799,
      originalPrice: 5499,
      rating: 4.7,
      reviews: 167,
      badge: "Best Seller",
      inStock: true,
    },
    {
      id: "6",
      name: "Pure Silk Teni Border Saree",
      image: "/placeholder.svg",
      price: 5499,
      rating: 4.9,
      reviews: 45,
      badge: "GI Certified",
      inStock: false,
    },
  ];

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Best Seller":
        return "bg-gold text-foreground";
      case "New Arrival":
        return "bg-primary text-primary-foreground";
      case "GI Certified":
        return "bg-green-600 text-white";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <TopUtilityHeader />
      <MainHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-gold">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{category}</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-2">
            {category}
          </h1>
          <p className="text-muted-foreground">
            Handwoven authentic Ilkal sarees with traditional craftsmanship
          </p>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-border/50">
          <div className="flex items-center gap-4">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" className="gap-2">
              Sort by
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            {products.length} products found
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-card rounded-xl overflow-hidden border border-border/50 shadow-soft hover:shadow-elevated transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Badge */}
                {product.badge && (
                  <Badge
                    className={`absolute top-3 left-3 ${getBadgeColor(product.badge)}`}
                  >
                    {product.badge}
                  </Badge>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      wishlist.includes(product.id)
                        ? "fill-destructive text-destructive"
                        : "text-foreground/70"
                    }`}
                  />
                </button>

                {/* Out of Stock Overlay */}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-medium px-4 py-2 bg-black/70 rounded-lg">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-medium text-foreground mb-2 line-clamp-2 group-hover:text-gold transition-colors">
                    {product.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 fill-gold text-gold" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">
                    ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-foreground">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-xs text-green-600 font-medium">
                        {Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100
                        )}
                        % off
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
