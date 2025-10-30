import Link from "next/link";

import { categoryTable } from "@/db/schema";

import { Button } from "../ui/button";

interface CategorySelectorProps {
  categories: (typeof categoryTable.$inferSelect)[];
}

const CategorySelector = ({ categories }: CategorySelectorProps) => {
  return (
    <div className="rounded-3xl bg-[#F4EFFF] p-6 lg:p-8 lg:bg-transparent">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6 lg:gap-4">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="ghost"
            className="rounded-full bg-white text-xs font-semibold lg:text-sm lg:py-6 lg:text-muted-foreground"
          >
            <Link href={`/category/${category.slug}`}>{category.name}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
