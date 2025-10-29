import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { orderTable } from "@/db/schema";

export const getUserOrders = async (userId: string) => {
  const orders = await db.query.orderTable.findMany({
    where: eq(orderTable.userId, userId),
    with: {
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

  return orders;
};

export const getOrderById = async (orderId: string) => {
  const order = await db.query.orderTable.findFirst({
    where: (order, { eq }) => eq(order.id, orderId),
  });

  return order;
};

export const getOrderItems = async (orderId: string) => {
  const orderItems = await db.query.orderItemTable.findMany({
    where: (orderItem, { eq }) => eq(orderItem.orderId, orderId),
    with: {
      productVariant: {
        with: {
          product: true,
        },
      },
    },
  });

  return orderItems;
};
