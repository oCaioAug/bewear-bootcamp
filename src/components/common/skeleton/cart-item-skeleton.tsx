import { Skeleton } from "@/components/ui/skeleton";

const CartItemSkeleton = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Imagem */}
        <Skeleton className="h-[78px] w-[78px] rounded-lg" />

        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-12" />

          <div className="flex w-[100px] items-center justify-between rounded-lg border p-1">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-3 w-4" />
            <Skeleton className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-center gap-1">
        <Skeleton className="h-9 w-9 rounded-md" />

        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
};

export default CartItemSkeleton;
