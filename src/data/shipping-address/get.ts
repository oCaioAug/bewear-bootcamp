import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";

export const getUserShippingAddresses = async (userId: string) => {
  const shippingAddresses = await db.query.shippingAddressTable.findMany({
    where: eq(shippingAddressTable.userId, userId),
    orderBy: (address, { desc }) => [desc(address.createdAt)],
  });

  return shippingAddresses;
};

export const getShippingAddressByIdAndUserId = async (
  addressId: string,
  userId: string,
) => {
  const shippingAddress = await db.query.shippingAddressTable.findFirst({
    where: (shippingAddress, { eq, and }) =>
      and(
        eq(shippingAddress.id, addressId),
        eq(shippingAddress.userId, userId),
      ),
  });

  return shippingAddress;
};
