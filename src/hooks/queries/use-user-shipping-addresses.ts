import { useQuery } from "@tanstack/react-query";

import { getUserShippingAddresses } from "@/actions/get-user-shipping-addresses";
import { shippingAddressTable } from "@/db/schema";

export const getShippingAddressesQueryKey = () => ["shipping-addresses"];

export const useUserShippingAddresses = (params?: {
  initialData: (typeof shippingAddressTable.$inferSelect)[];
}) => {
  return useQuery({
    queryKey: getShippingAddressesQueryKey(),
    queryFn: getUserShippingAddresses,
    initialData: params?.initialData,
  });
};
