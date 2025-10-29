"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { getUserCart } from "@/data/cart/get";
import { getShippingAddressByIdAndUserId } from "@/data/shipping-address/get";
import { db } from "@/db";
import { cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import {
  UpdateCartShippingAddressSchema,
  updateCartShippingAddressSchema,
} from "./schema";

export const updateCartShippingAddress = async (
  data: UpdateCartShippingAddressSchema,
) => {
  updateCartShippingAddressSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const shippingAddress = await getShippingAddressByIdAndUserId(
    data.shippingAddressId,
    session.user.id,
  );

  if (!shippingAddress) {
    throw new Error("Shipping address not found or unauthorized");
  }

  // Buscar o carrinho do usuário
  const cart = await getUserCart(session.user.id);

  if (!cart) {
    throw new Error("Carrinho não encontrado");
  }

  // Atualizar o carrinho com o endereço de entrega
  const [updatedCart] = await db
    .update(cartTable)
    .set({
      shippingAddressId: data.shippingAddressId,
    })
    .where(eq(cartTable.id, cart.id))
    .returning();

  return updatedCart;
};
