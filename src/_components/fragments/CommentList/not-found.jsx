import CommentPost from "@/_components/ui/CommentPost";
import CommentListLayout from "./layout";
import { useAuthContext } from "@/contexts/auth-context";
import { Card, CardHeader } from "@/_components/ui/Card";

export default function CommentListNotFound({ onSuccessPost }) {
  const { user } = useAuthContext();

  return (
    <CommentListLayout>
      <div className="flex flex-col gap-5">
        {user && <CommentPost onSuccess={onSuccessPost} />}
        <Card>
          <CardHeader>
            <p className="text-center">Comment not found</p>
          </CardHeader>
        </Card>
      </div>
    </CommentListLayout>
  );
}
