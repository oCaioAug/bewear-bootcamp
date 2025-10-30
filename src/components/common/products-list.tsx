"use client";

import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

import { productTable, productVariantTable } from "@/db/schema";

import ProductItem from "./product-item";

interface ProductListProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

const ProductList = ({ title, products }: ProductListProps) => {
  return (
    <div className="space-y-6">
      {/* Header com título e link "Ver todos" */}
      <div className="flex items-center justify-between px-5">
        <h2 className="font-semibold lg:text-xl">{title}</h2>
        <Link
          href="/products"
          className="text-muted-foreground hover:text-foreground hidden items-center gap-1 text-sm transition-colors lg:flex"
        >
          Ver todos
          <ChevronRightIcon size={16} />
        </Link>
      </div>

      {/* Layout mobile - scroll horizontal */}
      <div className="flex w-full gap-4 overflow-x-auto px-5 lg:hidden [&::-webkit-scrollbar]:hidden">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} textContainerClassName="lg:max-w-[200px]"/>
        ))}
      </div>

      {/* Layout desktop - scroll horizontal */}
      <div className="hidden w-full gap-6 overflow-x-auto px-5 lg:flex [&::-webkit-scrollbar]:hidden">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
