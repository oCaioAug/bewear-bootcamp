"use client";

import { ShoppingBag, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { formatCentsToBRL } from "@/helpers/money";
import { useCart } from "@/hooks/queries/use-cart";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartItem from "./cart-item";
import CartBottomSkeleton from "./skeleton/cart-bottom-skeleton";
import CartItemSkeleton from "./skeleton/cart-item-skeleton";

const Cart = () => {
  const { data: cart, isPending } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingBag color="#656565" />
        </Button>
      </SheetTrigger>

      <SheetContent className="w-[330px] rounded-l-3xl lg:m-5 lg:h-auto lg:w-[600px] lg:rounded-3xl">
        <SheetHeader>
          <SheetTitle>
            <ShoppingBag className="mr-2 mb-1 inline" color="#656565" />
            Meu Carrinho
          </SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col px-5 pb-5">
          <div className="flex h-full max-h-full flex-col overflow-hidden">
            <ScrollArea className="h-full w-full">
              <div className="flex h-full flex-col gap-8">
                {isPending
                  ? Array.from({ length: 3 }).map((_, index) => (
                      <CartItemSkeleton key={index} />
                    ))
                  : cart?.items.map((item) => (
                      <CartItem
                        key={item.id}
                        id={item.id}
                        productVariantId={item.productVariant.id}
                        productName={item.productVariant.product.name}
                        productVariantName={item.productVariant.name}
                        productVariantImageUrl={item.productVariant.imageUrl}
                        productVariantPriceInCents={
                          item.productVariant.priceInCents
                        }
                        quantity={item.quantity}
                      />
                    ))}
              </div>

              {!isPending && cart?.items && cart?.items.length <= 0 && (
                <div className="absolute flex h-full max-h-full w-full flex-col items-center justify-center gap-4 pb-6">
                  <ShoppingCartIcon strokeWidth={1} size={128} />
                  <div className="flex flex-col gap-2 items-center justify-center">
                    <h3 className="text-xl font-semibold">
                      Seu carrinho está vazio
                    </h3>
                    <p className="text-muted-foreground text-sm ">
                      Os produtos que você deseja estão te esperando!
                    </p>
                  </div>
                </div>
              )}
            </ScrollArea>
          </div>

          {!isPending && cart?.items && cart?.items.length > 0 && (
            <div className="flex flex-col gap-4">
              <Separator />

              <div className="flex items-center justify-between text-xs font-medium">
                <p>Subtotal:</p>
                <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-xs font-medium">
                <p>Entrega:</p>
                <p>Grátis</p>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-xs font-medium">
                <p>Total:</p>
                <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
              </div>

              <Button className="mt-5 rounded-full" size="lg" asChild>
                <Link href="/cart/identification">Finalizar Compra</Link>
              </Button>
            </div>
          )}
          {isPending && <CartBottomSkeleton />}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
