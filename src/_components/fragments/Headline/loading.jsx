import { Skeleton } from "@/_components/ui/Skeleton";
import HeadlineLayout from "./layout";

export default function HeadlineLoading() {
  return (
    <HeadlineLayout>
      <Skeleton className="col-span-1 size-full h-[20vh] overflow-hidden rounded-lg lg:col-span-2 lg:h-auto" />
      <div className="col-span-1 grid h-[40vh] w-full gap-2 lg:grid-rows-2">
        <Skeleton className="col-span-1 size-full h-[20vh] overflow-hidden rounded-lg lg:col-span-2 lg:h-auto" />
        <Skeleton className="col-span-1 size-full h-[20vh] overflow-hidden rounded-lg lg:col-span-2 lg:h-auto" />
      </div>
    </HeadlineLayout>
  );
}
