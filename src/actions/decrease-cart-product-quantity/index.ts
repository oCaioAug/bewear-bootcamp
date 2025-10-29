"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { getCartItemById } from "@/data/cart/get";
import { db } from "@/db";
import { cartItemTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import {
  DecreaseCartProductQuantitySchema,
  decreaseCartProductQuantitySchema,
} from "./schema";

export const decreaseCartProductQuantity = async (
  data: DecreaseCartProductQuantitySchema,
) => {
  decreaseCartProductQuantitySchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const cartItem = await getCartItemById(data.cartItemId);

  if (!cartItem) {
    throw new Error("Product variant not found in cart.");
  }

  const cartDoesNotBelongToUser = cartItem.cart.userId !== session.user.id;
  if (cartDoesNotBelongToUser) {
    throw new Error("Unauthorized");
  }

  if (cartItem.quantity === 1) {
    await db.delete(cartItemTable).where(eq(cartItemTable.id, cartItem.id));
    return;
  }

  await db
    .update(cartItemTable)
    .set({ quantity: cartItem.quantity - 1 })
    .where(eq(cartItemTable.id, cartItem.id));
};
