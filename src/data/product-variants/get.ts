import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";

// TODO: define ProductVariantDto

export const getProductVariants = async () => {
  const variants = await db.query.productVariantTable.findMany({
    with: {
      product: {
        with: {
          category: true,
        },
      },
    },
  });

  return variants;
};

export const getProductVariantBySlug = async (slug: string) => {
  const variant = await db.query.productVariantTable.findFirst({
    where: (variant, { eq }) => eq(variant.slug, slug),
    with: {
      product: {
        with: {
          category: true,
        },
      },
    },
  });

  return variant;
};

export const getProductVariantByCategoryId = async (categoryId: string) => {
  const products = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, categoryId),
    with: {
      variants: true,
    },
  });

  return products;
};

export const getProductVariantWithProduct = async (slug: string) => {
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });

  return productVariant;
};

export const getProductVariantById = async (id: string) => {
  const productVariant = await db.query.productVariantTable.findFirst({
    where: (productVariant, { eq }) =>
      eq(productVariant.id, id),
  });

  return productVariant;
};
