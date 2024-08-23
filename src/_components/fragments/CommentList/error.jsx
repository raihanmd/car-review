import ErrorDisplay from "../ErrorDisplay";
import CommentListLayout from "./layout";

export default function CommentListError({ refetch }) {
  return (
    <CommentListLayout>
      <ErrorDisplay className="py-24" refetch={refetch} />
    </CommentListLayout>
  );
}
