import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createShippingAddress } from "@/actions/create-shipping-address";
import { getShippingAddressesQueryKey } from "@/hooks/queries/use-user-shipping-addresses";

export const getCreateShippingAddressMutationKey = () => [
  "create-shipping-address",
];

export const useCreateShippingAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getCreateShippingAddressMutationKey(),
    mutationFn: createShippingAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getShippingAddressesQueryKey(),
      });
    },
  });
};
