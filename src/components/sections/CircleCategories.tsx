import { Link } from "react-router-dom";
import category1 from "@/assets/category-1.png";
import category2 from "@/assets/category-2.png";
import category3 from "@/assets/category-3.png";
import category4 from "@/assets/category-4.png";

const categories = [
  { name: "Ilkal Sarees", image: category1, href: "/products?category=ilkal" },
  { name: "Silk Sarees", image: category2, href: "/products?category=silk" },
  { name: "Cotton Sarees", image: category3, href: "/products?category=cotton" },
  { name: "Bridal Collection", image: category4, href: "/products?category=bridal" },
  { name: "Festive Wear", image: category1, href: "/products?category=festive" },
  { name: "Daily Wear", image: category2, href: "/products?category=daily" },
];

const StampCard = ({ category, index }: { category: typeof categories[0]; index: number }) => {
  return (
    <Link
      to={category.href}
      className="group block opacity-0 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative flex flex-col items-center">
        {/* Simple stamp image - no outer border */}
        <div className="relative overflow-hidden transition-transform duration-300 group-hover:scale-105">
          <img
            src={category.image}
            alt={category.name}
            className="w-24 h-32 md:w-28 md:h-36 object-contain"
          />
        </div>
        
        {/* Category Name */}
        <h3 className="mt-3 text-center text-xs md:text-sm font-medium text-foreground group-hover:text-maroon transition-colors">
          {category.name}
        </h3>
      </div>
    </Link>
  );
};

const CircleCategories = () => {
  return (
    <section className="py-12 px-4 bg-cream">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-2">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-sm">
            Explore our curated collections
          </p>
        </div>

        {/* Categories Grid - 6 items, smaller size */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 justify-items-center">
          {categories.map((category, index) => (
            <StampCard key={category.name} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CircleCategories;
