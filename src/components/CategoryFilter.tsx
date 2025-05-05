
import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/kefalonia-data";
import gsap from "gsap";

interface CategoryFilterProps {
  activeCategories: string[];
  onCategoryToggle: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategories,
  onCategoryToggle,
}) => {
  const filterRef = useRef<HTMLDivElement>(null);

  // Animation for filter appearance
  useEffect(() => {
    if (!filterRef.current) return;

    gsap.from(filterRef.current.children, {
      opacity: 0,
      y: 10,
      stagger: 0.05,
      duration: 0.5,
      ease: "power3.out",
      delay: 0.5,
    });
  }, []);

  return (
    <div 
      ref={filterRef}
      className="flex flex-wrap gap-2 justify-center mb-4"
    >
      {categories.map((category) => (
        <Button
          key={category.name}
          onClick={() => onCategoryToggle(category.name)}
          variant="outline"
          size="sm"
          className={`
            category-button
            ${
              activeCategories.includes(category.name)
                ? "category-button-active"
                : "category-button-inactive"
            }
          `}
          style={{
            backgroundColor: activeCategories.includes(category.name) 
              ? category.color 
              : undefined,
            borderColor: category.color,
            color: activeCategories.includes(category.name) 
              ? '#fff' 
              : category.color
          }}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
