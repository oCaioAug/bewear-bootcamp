import { useMutation, useQueryClient } from "@tanstack/react-query";

import { finishOrder } from "@/actions/finish-order";

import { getUseCartQueryKey } from "../queries/use-cart";

export const getUseFinishOrderKey = () => ["finish-order"] as const;

export const useFinishOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getUseFinishOrderKey(),
    mutationFn: async () => {
      return await finishOrder();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
    },
  });
};
