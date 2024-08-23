import ErrorDisplay from "../ErrorDisplay";

export default function ReviewListError({ refetch }) {
  return <ErrorDisplay className="mt-5 w-full py-24" refetch={refetch} />;
}
