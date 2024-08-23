import { Link } from "react-router-dom";

import { Button } from "@/_components/ui/Button";
import { formatDate } from "@/lib/utils";
import { useReviewDetailContext } from "@/contexts/review-detail-context";
import ReviewPostLayout from "./layout";
import ReviewPostLoading from "./loading";

export default function ReviewDetailPost() {
  const { review, isFetching } = useReviewDetailContext();

  if (isFetching) return <ReviewPostLoading />;

  return (
    <ReviewPostLayout>
      <h1 className="text-3xl font-bold md:text-4xl">{review.title}</h1>
      <div className="flex gap-5">
        <Button variant="link" className="h-auto p-0">
          <Link to={`/user/${review.user.id}`}>{review.user.username}</Link>
        </Button>
        <p>{formatDate(review.created_at)}</p>
      </div>
      <img
        draggable={false}
        src={review.image_url}
        alt={review.title}
        className="h-[300px] w-full rounded-md object-cover lg:h-[500px]"
      />
      <p className="md:text-lg">{review.content}</p>
    </ReviewPostLayout>
  );
}
