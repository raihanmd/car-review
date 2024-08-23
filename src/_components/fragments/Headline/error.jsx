import ErrorDisplay from "@/_components/fragments/ErrorDisplay";
import HeadlineLayout from "./layout";

export default function HeadlineError({ refetch }) {
  return (
    <HeadlineLayout>
      <ErrorDisplay className="col-span-3" refetch={refetch} />
    </HeadlineLayout>
  );
}
