import { useMutation, useQueryClient } from "@tanstack/react-query";

import { decreaseCartProductQuantity } from "@/actions/decrease-cart-product-quantity";

export const getDecreaseCartQuantityMutationKey = (cartItemId: string) => ["decrease-cart-product-quantity", cartItemId];

export const useDecreaseCartQuantity = (cartItemId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getDecreaseCartQuantityMutationKey(cartItemId),
    mutationFn: async () => decreaseCartProductQuantity({ cartItemId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
