"use server";

import { headers } from "next/headers";

import { getUserCart } from "@/data/cart/get";
import { db } from "@/db";
import { cartTable } from "@/db/schema";
import { calculateCartTotalInCents } from "@/helpers/cart";
import { auth } from "@/lib/auth";

export const getCart = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  const cart = await getUserCart(session.user.id);

  if (!cart) {
    const [newCart] = await db
      .insert(cartTable)
      .values({
        userId: session.user.id,
      })
      .returning();
    return {
      ...newCart,
      items: [],
      totalPriceInCents: 0,
      shippingAddress: null,
    };
  }

  return {
    ...cart,
    totalPriceInCents: calculateCartTotalInCents(cart),
  };
};
