"use server";

import { headers } from "next/headers";

import { getUserShippingAddresses } from "@/data/shipping-address/get";
import { auth } from "@/lib/auth";

export const getUserAddresses = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const addresses = await getUserShippingAddresses(session.user.id);

  return addresses;
};
