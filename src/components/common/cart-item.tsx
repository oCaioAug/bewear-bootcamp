"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MinusIcon, PlusIcon, Trash2Icon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { removeProductFromCart } from "@/actions/remove-cart-product";
import { formatCentsToBRL } from "@/helpers/money";

import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

const CartItem = ({
  id,
  productName,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) => {
  const queryClient = useQueryClient();

  const removeProductFromCartMutation = useMutation({
    mutationKey: ["remove-cart-item"],
    mutationFn: async () => removeProductFromCart({ cartItemId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const handleDeleteClick = () => {
    removeProductFromCartMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Produto removido do carrinho.");
      },
      onError: () => {
        toast.error("Erro ao remover produto do carrinho.");
      },
    });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="items-center-gap-4 flex">
          <Image
            src={productVariantImageUrl}
            alt={productVariantName}
            width={78}
            height={78}
            className="rounded-lg"
          />

          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">{productName}</p>
            <p className="text-muted-foreground text-xs font-medium">
              {productVariantName}
            </p>
            <p className="text-xs font-semibold">
              {formatCentsToBRL(productVariantPriceInCents)}
            </p>

            <div className="flex w-[100px] items-center justify-between rounded-lg border p-1">
              <Button className="h-4 w-4" variant="ghost" onClick={() => {}}>
                <MinusIcon size={12} />
              </Button>
              <p className="text-xs font-medium">{quantity}</p>
              <Button className="h-4 w-4" variant="ghost" onClick={() => {}}>
                <PlusIcon size={12} />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end justify-center gap-1">
          <Button variant="outline" size="icon" onClick={handleDeleteClick}>
            <TrashIcon />
          </Button>

          <p className="text-sm font-bold">
            {formatCentsToBRL(productVariantPriceInCents * quantity)}
          </p>
        </div>
      </div>
    </>
  );
};

export default CartItem;
