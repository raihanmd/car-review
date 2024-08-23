import CommentList from "@/_components/fragments/CommentList";
import ReviewDetailAside from "@/_components/fragments/ReviewDetailAside";
import ReviewDetailPost from "@/_components/fragments/ReviewDetailPost";
import { ReviewDetailProvider } from "@/contexts/review-detail-context";
import { useFetch } from "@/hooks/use-fetch";
import { Navigate, useParams } from "react-router-dom";

export default function ReviewDetail() {
  const { id } = useParams();

  const { data: review, isFetching, error } = useFetch(`/reviews/${id}`);

  if (error) return <Navigate to="/not-found" replace />;

  return (
    <ReviewDetailProvider value={{ review, isFetching }}>
      <div className="my-container flex gap-5 py-5">
        <div className="flex w-full flex-col gap-5 xl:w-[80%]">
          <ReviewDetailPost />
          <CommentList />
        </div>
        <ReviewDetailAside />
      </div>
    </ReviewDetailProvider>
  );
}
