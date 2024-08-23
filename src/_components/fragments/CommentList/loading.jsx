import { Skeleton } from "@/_components/ui/Skeleton";
import CommentListLayout from "./layout";

export default function CommentListLoading() {
  return (
    <CommentListLayout>
      <div className="flex flex-col gap-5">
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <Skeleton key={index} className="flex h-32 gap-5 rounded-md" />
          ))}
      </div>
    </CommentListLayout>
  );
}
