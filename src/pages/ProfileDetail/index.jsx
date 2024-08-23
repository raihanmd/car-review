import Aside from "@/_components/fragments/Aside";
import ReviewList from "@/_components/fragments/ReviewList";
import { UserAvatar } from "@/_components/ui/Avatar";
import { useFetch } from "@/hooks/use-fetch";
import { Navigate, useParams } from "react-router-dom";

export default function ProfileDetail() {
  const { id } = useParams();

  const { data: profile, isFetching, error } = useFetch(`/users/profile/${id}`);

  if (isFetching) return <div>Loading...</div>;
  if (error) return <Navigate to="/not-found" replace />;

  return (
    <div className="my-container py-10">
      <div className="flex gap-5 rounded-md border bg-background p-8">
        <UserAvatar username={profile?.username} className="size-24 text-3xl" />
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">
            {profile?.full_name || profile?.username}
            {profile?.role === "ADMIN" && (
              <span className="text-sm font-normal text-primary/50">
                {" "}
                (Admin)
              </span>
            )}
          </h1>
          <p className="text-sm">{profile?.bio || "No bio"}</p>
        </div>
      </div>
      <div className="w-full space-y-5 py-5">
        <h1 className="text-3xl font-bold">
          Postingan Terbaru dari{" "}
          <span className="text-primary/50">
            {profile?.full_name || profile?.username}
          </span>
        </h1>
        <div className="flex gap-5">
          <ReviewList userId={id} />
          <Aside className="lg:block lg:w-[30%]" title={"Mobil Rekomendasi"}>
            <p className="flex size-full items-center justify-center text-primary/50">
              Coming soon...
            </p>
          </Aside>
        </div>
      </div>
    </div>
  );
}
