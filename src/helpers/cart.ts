import type { getUserCart } from "@/data/cart/get";

type Cart = NonNullable<Awaited<ReturnType<typeof getUserCart>>>;

export const calculateCartTotalInCents = (cart: Cart): number => {
  return cart.items.reduce((total: number, item) => {
    return total + item.productVariant.priceInCents * item.quantity;
  }, 0);
};

export const calculateCartSubtotalInCents = (cart: Cart): number => {
  return calculateCartTotalInCents(cart);
};

export const calculateCartItemTotalInCents = (
  priceInCents: number,
  quantity: number,
): number => {
  return priceInCents * quantity;
};
