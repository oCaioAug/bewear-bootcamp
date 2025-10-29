import "server-only";

import { db } from "@/db";

export const getUserCart = async (userId: string) => {
  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, userId),
    with: {
      shippingAddress: true,
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });

  return cart;
};

export const getCartItem = async (cartId: string, productVariantId: string) => {
  const cartItem = await db.query.cartItemTable.findFirst({
    where: (cartItem, { eq, and }) =>
      and(
        eq(cartItem.cartId, cartId),
        eq(cartItem.productVariantId, productVariantId),
      ),
  });

  return cartItem;
};

export const getCartItemById = async (cartItemId: string) => {
  const cartItem = await db.query.cartItemTable.findFirst({
    where: (cartItem, { eq }) => eq(cartItem.id, cartItemId),
    with: {
      cart: true,
    },
  });

  return cartItem;
};
