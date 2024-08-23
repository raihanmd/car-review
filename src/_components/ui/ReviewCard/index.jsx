import { formatDate, isNew } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Badge } from "../Badge";
import { Button } from "../Button";
import ReviewCardOptions from "../ReviewCardOptions";

export default function ReviewCard({ review, withOptions, onSuccessDelete }) {
  return (
    <div className="relative w-full">
      {withOptions && (
        <ReviewCardOptions
          reviewId={review.id}
          onSuccessDelete={onSuccessDelete}
        />
      )}
      <Link
        to={`/review/${review.id}`}
        className="group relative flex h-[420px] w-full flex-col gap-3 sm:h-52 sm:flex-row"
      >
        {isNew(review.created_at) && (
          <Badge
            className={
              "absolute left-3 top-3 mr-auto mt-2 bg-green-600 hover:bg-green-500"
            }
          >
            Baru
          </Badge>
        )}
        <img
          src={review.image_url}
          alt={review.title}
          className="h-[200px] w-full min-w-[350px] rounded-md object-cover sm:h-auto sm:w-[320px]"
        />
        <div className="flex h-full w-full flex-col justify-between sm:h-auto">
          <div className="flex flex-grow flex-col gap-1">
            <h2 className="line-clamp-2 text-xl font-semibold group-hover:text-green-600 sm:text-2xl">
              {review.title}
            </h2>
            <p className="line-clamp-2 text-sm">{review.content}</p>
          </div>
          <div className="flex justify-between">
            <Button variant="link" className="h-auto p-0" asChild>
              <Link to={`/user/${review.user.id}`}>{review.user.username}</Link>
            </Button>
            <p>{formatDate(review.created_at)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
