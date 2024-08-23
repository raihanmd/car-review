import { useCounter } from "usehooks-ts";

import { useFetch } from "@/hooks/use-fetch";
import { useAuthContext } from "@/contexts/auth-context";
import { useReviewDetailContext } from "@/contexts/review-detail-context";
import CommentPost from "@/_components/ui/CommentPost";
import CommentCard from "@/_components/ui/CommentCard";
import CommentListLayout from "./layout";
import CommentListLoading from "./loading";
import CommentListNotFound from "./not-found";
import CommentListError from "./error";

export default function CommentList() {
  const { review } = useReviewDetailContext();
  const { user } = useAuthContext();

  const { count, increment } = useCounter(0);

  const {
    data: comments,
    isFetching,
    error,
    refetch,
  } = useFetch(review?.id ? `/reviews/${review.id}/comments?r=${count}` : null);

  if (isFetching || !review?.id) return <CommentListLoading />;
  if (error?.response?.data?.errors === "Comments not found")
    return <CommentListNotFound onSuccessPost={increment} />;
  if (error) return <CommentListError refetch={refetch} />;

  return (
    <CommentListLayout>
      <div className="flex flex-col gap-5">
        {user && <CommentPost onSuccess={increment} />}
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            onSuccess={increment}
          />
        ))}
      </div>
    </CommentListLayout>
  );
}
