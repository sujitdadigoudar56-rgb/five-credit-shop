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
  // Different border colors for variety
  const borderColors = [
    "#3d6b4f", // Dark green
    "#5a4a3a", // Brown
    "#3d3d3d", // Dark gray
    "#3d6b4f", // Dark green
    "#5a4a3a", // Brown
    "#3d3d3d", // Dark gray
  ];

  return (
    <Link
      to={category.href}
      className="group block opacity-0 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative flex flex-col items-center">
        {/* Stamp-style container with zigzag border */}
        <div 
          className="relative p-2 transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundColor: borderColors[index] }}
        >
          {/* Inner content with zigzag effect using SVG filter */}
          <div className="relative bg-cream p-2">
            {/* Zigzag border effect using repeating pattern */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  linear-gradient(135deg, ${borderColors[index]} 25%, transparent 25%) -8px 0,
                  linear-gradient(225deg, ${borderColors[index]} 25%, transparent 25%) -8px 0,
                  linear-gradient(315deg, ${borderColors[index]} 25%, transparent 25%),
                  linear-gradient(45deg, ${borderColors[index]} 25%, transparent 25%)
                `,
                backgroundSize: '16px 16px',
                backgroundPosition: '0 0, 8px 0, 8px -8px, 0px 8px'
              }}
            />
            
            {/* Image container */}
            <div className="relative overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full aspect-[3/4] object-contain transition-transform duration-500 group-hover:scale-102"
              />
            </div>
          </div>
        </div>
        
        {/* Category Name */}
        <h3 className="mt-4 text-center text-sm font-medium text-foreground group-hover:text-maroon transition-colors">
          {category.name}
        </h3>
      </div>
    </Link>
  );
};

const CircleCategories = () => {
  return (
    <section className="py-16 px-4 bg-cream">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-3">
            Shop by Category
          </h2>
          <p className="text-muted-foreground">
            Explore our curated collections
          </p>
        </div>

        {/* Categories Grid - 6 items */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <StampCard key={category.name} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CircleCategories;
