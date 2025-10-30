import { Separator } from "../../ui/separator";
import { Skeleton } from "../../ui/skeleton";

const CartBottomSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <Separator />
      <Skeleton className="h-6 w-full" />
      <Separator />
      <Skeleton className="h-6 w-full" />
      <Separator />
      <Skeleton className="h-6 w-full" />

      <Skeleton className="mt-5 h-10 w-full rounded-full px-6 has-[>svg]:px-4" />
    </div>
  );
};

export default CartBottomSkeleton;
