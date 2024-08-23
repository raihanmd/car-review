import { useAuthContext } from "@/contexts/auth-context";
import ReviewList from "../ReviewList";

export default function UserProfileReviews() {
  const { user } = useAuthContext();

  return (
    <div className="w-full py-5">
      <h1 className="text-3xl font-bold">Your Reviews</h1>
      <div className="flex gap-5">
        <ReviewList userId={user.id} withOptions className="lg:w-full" />
      </div>
    </div>
  );
}
