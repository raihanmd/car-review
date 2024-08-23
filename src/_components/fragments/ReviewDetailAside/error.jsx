import ReviewDetailAsideLayout from "./layout";
import ErrorDisplay from "../ErrorDisplay";

export default function ReviewDetailAsideError({ refetch }) {
  return (
    <ReviewDetailAsideLayout>
      <ErrorDisplay className="py-24 text-sm" refetch={refetch} />
    </ReviewDetailAsideLayout>
  );
}
