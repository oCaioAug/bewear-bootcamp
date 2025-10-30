import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserCart } from "@/data/cart/get";
import { calculateCartTotalInCents } from "@/helpers/cart";
import { auth } from "@/lib/auth";

import CartSummary from "../components/cart-summary";
import { formatAddress } from "../helpers/address";
import FinishOrderButton from "./components/finish-order-button";

const ConfirmationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) {
    redirect("/");
  }

  const cart = await getUserCart(session.user.id);

  if (!cart || cart.items.length === 0) {
    redirect("/");
  }

  const cartTotalInCents = calculateCartTotalInCents(cart);

  if (!cart.shippingAddress) {
    redirect("/cart/identification");
  }

  return (
    <div>
      <Header />
      <div className="space-y-4 px-5 lg:flex lg:justify-between lg:gap-6 ">
        <Card className="lg:h-full lg:w-4/7 lg:p-8">
          <CardHeader>
            <CardTitle>Identificação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Card>
              <CardContent>
                <p className="text-sm">{formatAddress(cart.shippingAddress)}</p>
              </CardContent>
            </Card>
            <FinishOrderButton />
          </CardContent>
        </Card>

        <div className="lg:w-3/7">
          <CartSummary
            subtotalInCents={cartTotalInCents}
            totalInCents={cartTotalInCents}
            products={cart.items.map((item) => ({
              id: item.productVariant.id,
              name: item.productVariant.product.name,
              variantName: item.productVariant.name,
              quantity: item.quantity,
              priceInCents: item.productVariant.priceInCents,
              imageUrl: item.productVariant.imageUrl,
            }))}
          />
        </div>
      </div>

      <div className="mt-12 absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default ConfirmationPage;
