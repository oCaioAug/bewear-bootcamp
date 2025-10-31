import { useMutation } from "@tanstack/react-query";

import { createCheckoutSession } from "@/actions/create-checkout-session";

export const getCreateCheckoutSessionMutationKey = () => [
  "create-checkout-session",
];

export const useCreateCheckoutSession = () => {
  return useMutation({
    mutationKey: getCreateCheckoutSessionMutationKey(),
    mutationFn: createCheckoutSession,
  });
};
