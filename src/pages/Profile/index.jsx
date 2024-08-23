import UserProfileInformation from "@/_components/fragments/UserProfileInformation";
import UserProfileReviews from "@/_components/fragments/UserProfileReviews";
import { Separator } from "@/_components/ui/Separator";
import { useAuthContext } from "@/contexts/auth-context";
import { useFetch } from "@/hooks/use-fetch";
import { useCounter } from "usehooks-ts";

export default function Profile() {
  const { user } = useAuthContext();
  const { count, increment } = useCounter(0);

  const {
    data: profile,
    isFetching,
    error,
  } = useFetch(user?.id ? `/users/profile/${user?.id}?r=${count}` : null);

  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="my-container py-10">
      <UserProfileInformation onSuccess={increment} profile={profile} />
      <Separator className="my-5" />
      <UserProfileReviews />
    </div>
  );
}
