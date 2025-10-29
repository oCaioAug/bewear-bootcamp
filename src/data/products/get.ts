import "server-only";

import { desc } from "drizzle-orm";

import { db } from "@/db";
import { productTable } from "@/db/schema";

// TODO: define ProductDto interface
// interface ProductDto {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   imageUrl: string;
//   category: string;
//   createdAt: Date;
// }

// TODO: implement ProductDto
export const getProductsWithVariants = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
      category: true,
    },
  });

  return products;
};

export const getNewlyCreatedProducts = async () => {
  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
      category: true,
    },
  });
  return newlyCreatedProducts;
};
