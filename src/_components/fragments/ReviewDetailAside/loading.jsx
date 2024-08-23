import { Skeleton } from "@/_components/ui/Skeleton";
import ReviewDetailAsideLayout from "./layout";

export default function ReviewDetailAsideLoading() {
  return (
    <ReviewDetailAsideLayout>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-36" />
        <div className="space-y-1">
          <Skeleton className="h-7" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
        </div>
      </div>
    </ReviewDetailAsideLayout>
  );
}
