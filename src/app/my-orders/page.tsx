import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Header from "@/components/common/header";
import { getUserOrders } from "@/data/orders/get";
import { auth } from "@/lib/auth";

import Orders from "./components/orders";

const MyOrdersPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const orders = await getUserOrders(session.user.id);

  return (
    <>
      <Header />

      <div className="px-5">
        <Orders
          orders={orders.map((order) => ({
            id: order.id,
            totalPriceInCents: order.totalPriceInCents,
            status: order.status,
            createdAt: order.createdAt,
            items: order.items.map((item) => ({
              id: item.id,
              imageUrl: item.productVariant.imageUrl,
              productName: item.productVariant.name,
              productVariantName: item.productVariant.name,
              priceInCents: item.priceInCents,
              quantity: item.quantity,
            })),
          }))}
        />
      </div>
    </>
  );
};

export default MyOrdersPage;
