import { Link } from "react-router-dom";

import { Button } from "@/_components/ui/Button";
import { useFetch } from "@/hooks/use-fetch";
import { useReviewDetailContext } from "@/contexts/review-detail-context";
import ReviewDetailAsideLoading from "./loading";
import ReviewDetailAsideLayout from "./layout";
import ReviewDetailAsideError from "./error";

export default function ReviewDetailAside() {
  const { review } = useReviewDetailContext();

  const {
    data: car,
    isFetching,
    error,
    refetch,
  } = useFetch(review?.car?.id ? `/cars/${review.car.id}` : null);

  if (isFetching || !review?.car?.id) return <ReviewDetailAsideLoading />;
  if (error) return <ReviewDetailAsideError refetch={refetch} />;

  return (
    <ReviewDetailAsideLayout>
      <div className="flex flex-col gap-3">
        <img
          draggable={false}
          src={car?.image_url}
          alt={car?.name}
          className="size-full h-36 rounded-md object-cover"
        />
        <div>
          <Button
            variant="link"
            asChild
            className="line-clamp-1 h-auto p-0 text-lg font-semibold"
          >
            <Link to={`/car/${car?.id}`}>
              {car?.brand_name} {car?.name}
            </Link>
          </Button>
          <p className="text-sm">Model: {car?.model} </p>
          <p className="text-sm">Tahun: {car?.year} </p>
        </div>
      </div>
    </ReviewDetailAsideLayout>
  );
}
