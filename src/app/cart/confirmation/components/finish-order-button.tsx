"use client";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCreateCheckoutSession } from "@/hooks/mutations/use-create-checkout-session";
import { useFinishOrder } from "@/hooks/mutations/use-finish-order";

const FinishOrderButton = () => {
  const finishOrderMutation = useFinishOrder();
  const createCheckoutSessionMutation = useCreateCheckoutSession();

  const handleFinishOrder = async () => {
    try {
      const { orderId } = await finishOrderMutation.mutateAsync();
      await createCheckoutSessionMutation.mutateAsync({ orderId });
    } catch (error) {
      toast.error("Erro ao processar pagamento. Tente novamente.");
      console.error("Checkout error:", error);
    }
  };

  const isLoading = finishOrderMutation.isPending || createCheckoutSessionMutation.isPending;

  return (
    <Button
      className="w-full rounded-full"
      size="lg"
      onClick={handleFinishOrder}
      disabled={isLoading}
    >
      {isLoading && (
        <Loader2 className="h-4 w-4 animate-spin" />
      )}
      Finalizar compra
    </Button>
  );
};

export default FinishOrderButton;
