import { Skeleton } from "@/_components/ui/Skeleton";
import ReviewListLayout from "./layout";

export default function ReviewLoading({ page, totalPages, handlePageChange }) {
  return (
    <ReviewListLayout
      page={page}
      totalPages={totalPages}
      handlePageChange={handlePageChange}
      className={"w-full"}
    >
      {Array(5)
        .fill(null)
        .map((_, index) => (
          <Skeleton key={index} className="flex h-52 gap-5 rounded-md" />
        ))}
    </ReviewListLayout>
  );
}
