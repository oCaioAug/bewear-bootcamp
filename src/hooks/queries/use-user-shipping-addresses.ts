import { useQuery } from "@tanstack/react-query";

import { getUserShippingAddresses } from "@/actions/get-user-shipping-addresses";

export const getShippingAddressesQueryKey = () => ["shipping-addresses"];

export const useUserShippingAddresses = () => {
  return useQuery({
    queryKey: getShippingAddressesQueryKey(),
    queryFn: getUserShippingAddresses,
  });
};
