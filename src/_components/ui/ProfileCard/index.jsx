import { UserAvatar } from "../Avatar";

export default function ProfileCard({ user }) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row">
      <UserAvatar username={user?.username} className="h-32 w-32 text-6xl" />
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold sm:text-3xl md:text-4xl">
          {user?.username}
        </h1>
        <p>{user?.email}</p>
      </div>
    </div>
  );
}
