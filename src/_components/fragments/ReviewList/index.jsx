import ReviewCard from "@/_components/ui/ReviewCard";
import { useFetch } from "@/hooks/use-fetch";
import { useCounter } from "usehooks-ts";
import { useSearchParams } from "react-router-dom";
import ReviewLoading from "./loading";
import ReviewError from "./error";
import ReviewListNotFound from "./not-found";
import ReviewListLayout from "./layout";

export default function ReviewList({ userId, className, withOptions = false }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { count, increment } = useCounter(0);
  const page = parseInt(searchParams.get("page")) || 1;

  const url = userId
    ? `/users/${userId}/reviews?r=${count}`
    : `/reviews?r=${count}`;

  const {
    data: reviews,
    pagination,
    isFetching,
    error,
    refetch,
  } = useFetch(url, {
    params: {
      page,
      limit: 5,
    },
  });

  const handlePageChange = (newPage) => {
    if (newPage !== page) {
      increment();
      setSearchParams({ page: newPage.toString() });
    }
  };

  if (isFetching)
    return (
      <ReviewLoading
        page={page}
        totalPages={pagination?.total_pages || 1}
        handlePageChange={handlePageChange}
      />
    );

  if (error) return <ReviewError refetch={refetch} />;

  if (!reviews || reviews.length === 0) {
    return (
      <ReviewListNotFound
        page={page}
        totalPages={pagination?.total_pages || 1}
        handlePageChange={handlePageChange}
        className={className}
      />
    );
  }

  return (
    <ReviewListLayout
      className={className}
      page={page}
      totalPages={pagination.total_pages}
      handlePageChange={handlePageChange}
    >
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          withOptions={withOptions}
          onSuccessDelete={increment}
        />
      ))}
    </ReviewListLayout>
  );
}
