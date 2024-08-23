import ReviewPostLayout from "./layout";
import { Skeleton } from "@/_components/ui/Skeleton";

export default function ReviewPostLoading() {
  const skeletonWidths = ["w-1/12", "w-3/12", "w-6/12", "w-2/12"];

  return (
    <ReviewPostLayout>
      <div className="space-y-2">
        <Skeleton className="h-12" />
        <Skeleton className="h-12" />
      </div>
      <div className="flex gap-5">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-32" />
      </div>
      <Skeleton className="h-[300px] w-full rounded-md object-cover lg:h-[500px]" />
      <div className="flex flex-col gap-2">
        {Array(5)
          .fill(null)
          .map((_, rowIndex) => {
            const shift = rowIndex % skeletonWidths.length;
            const shiftedSkeletons = [
              ...skeletonWidths.slice(shift),
              ...skeletonWidths.slice(0, shift),
            ];
            return (
              <div key={rowIndex} className="flex gap-2">
                {shiftedSkeletons.map((widthClass, index) => (
                  <Skeleton key={index} className={`h-5 ${widthClass}`} />
                ))}
              </div>
            );
          })}
      </div>
    </ReviewPostLayout>
  );
}
