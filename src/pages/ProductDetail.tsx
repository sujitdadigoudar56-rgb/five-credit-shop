import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Heart, Star, Minus, Plus, ShoppingBag, Zap, Truck, RotateCcw, Shield, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TopUtilityHeader from "@/components/layout/TopUtilityHeader";
import MainHeader from "@/components/layout/MainHeader";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Sample product data
  const product = {
    id: id || "1",
    name: "Authentic Ilkal Saree – Teni Pallu",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    price: 2999,
    originalPrice: 4499,
    rating: 4.6,
    reviews: 128,
    badge: "GI Certified",
    inStock: true,
    color: "Maroon Red",
    borderType: "Teni Pallu (Top Border)",
    blousePiece: true,
    deliveryDays: "5-7",
    description: `This exquisite Ilkal saree showcases the rich heritage of Karnataka's handloom tradition. 
    Crafted by skilled artisans, it features the distinctive Teni Pallu design with intricate kasuti work.
    The saree is made from premium quality cotton-silk blend, ensuring comfort and elegance.`,
    careInstructions: [
      "Hand wash recommended",
      "Use mild detergent",
      "Dry in shade",
      "Iron on medium heat",
    ],
  };

  const handleAddToCart = () => {
    // Get existing cart or create new
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = existingCart.find((item: { id: string }) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity = Math.min(existingItem.quantity + quantity, 5);
    } else {
      existingCart.push({ ...product, quantity });
    }
    
    localStorage.setItem("cart", JSON.stringify(existingCart));
    
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    // Add to cart first
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = existingCart.find((item: { id: string }) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity = Math.min(existingItem.quantity + quantity, 5);
    } else {
      existingCart.push({ ...product, quantity });
    }
    
    localStorage.setItem("cart", JSON.stringify(existingCart));
    
    // Check if logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login", { state: { returnTo: "/checkout" } });
    } else {
      navigate("/checkout");
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
          <Link to="/products" className="hover:text-gold">Sarees</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-secondary">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-gold"
                      : "border-transparent hover:border-border"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="space-y-6">
            {/* Badge */}
            {product.badge && (
              <Badge className="bg-green-600 text-white">{product.badge}</Badge>
            )}

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-gold text-gold"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="font-medium">{product.rating}</span>
              <Link to="#reviews" className="text-gold hover:underline text-sm">
                View all {product.reviews} reviews
              </Link>
            </div>

            {/* Price */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-foreground">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    MRP ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-green-600 font-medium">
                  You save ₹{(product.originalPrice - product.price).toLocaleString()} (
                  {Math.round(
                    ((product.originalPrice - product.price) / product.originalPrice) * 100
                  )}
                  % off)
                </p>
              )}
              <p className="text-xs text-muted-foreground">Inclusive of all taxes</p>
            </div>

            {/* Product Attributes */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-border/50">
              <div>
                <p className="text-sm text-muted-foreground">Color</p>
                <p className="font-medium">{product.color}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Border Type</p>
                <p className="font-medium">{product.borderType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Blouse Piece</p>
                <p className="font-medium">{product.blousePiece ? "Yes" : "No"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Availability</p>
                <p className={`font-medium ${product.inStock ? "text-green-600" : "text-destructive"}`}>
                  {product.inStock ? "✔ In Stock" : "Out of Stock"}
                </p>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Truck className="h-4 w-4" />
              <span>Delivered in {product.deliveryDays} working days</span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-secondary transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(5, quantity + 1))}
                  className="p-2 hover:bg-secondary transition-colors"
                  disabled={quantity >= 5}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="text-xs text-muted-foreground">(Max: 5)</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleAddToCart}
                variant="outline"
                className="flex-1 h-12 gap-2 border-gold text-gold hover:bg-gold hover:text-foreground"
                disabled={!product.inStock}
              >
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                onClick={handleBuyNow}
                className="flex-1 h-12 gap-2 bg-gold hover:bg-gold/90 text-foreground"
                disabled={!product.inStock}
              >
                <Zap className="h-5 w-5" />
                Buy Now
              </Button>
            </div>

            {/* Wishlist Button */}
            <Button
              variant="ghost"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="w-full gap-2"
            >
              <Heart
                className={`h-5 w-5 ${
                  isWishlisted ? "fill-destructive text-destructive" : ""
                }`}
              />
              {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
            </Button>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-5 w-5 text-gold" />
                <span>Free shipping above ₹999</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <RotateCcw className="h-5 w-5 text-gold" />
                <span>7-day return policy</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-5 w-5 text-gold" />
                <span>GI certified product</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-5 w-5 text-gold" />
                <span>Cash on delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-display font-semibold">About the Saree</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-display font-semibold">Care Instructions</h2>
            <ul className="space-y-2">
              {product.careInstructions.map((instruction, index) => (
                <li key={index} className="flex items-center gap-2 text-muted-foreground">
                  <Check className="h-4 w-4 text-green-600" />
                  {instruction}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
