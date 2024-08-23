import { Link } from "react-router-dom";

import { cn, isNew } from "@/lib/utils";
import { Badge } from "../Badge";

const HeadlineCard = ({ review, tiny }) => {
  return (
    <Link
      to={`/review/${review?.id}`}
      className="group relative col-span-1 size-full h-[180px] overflow-hidden rounded-lg lg:col-span-2 lg:h-auto"
      key={review?.id}
    >
      <img
        draggable={false}
        src={review?.image_url}
        alt="mobil"
        className="size-full bg-primary/30 object-cover"
      />
      {isNew(review?.created_at) && (
        <Badge
          className={cn(
            "absolute left-5 top-5 mb-2 mr-auto bg-green-600 hover:bg-green-500",
            {
              "lg:left-3 lg:top-3": tiny,
            },
          )}
        >
          Baru
        </Badge>
      )}
      <div
        className={cn(
          "absolute bottom-0 flex h-1/3 w-full flex-col justify-center bg-gradient-to-t from-black via-black/60 to-transparent p-3 text-white transition-all group-hover:h-2/5 xl:p-2 2xl:p-5",
          {
            "lg:p-3 xl:p-3 2xl:p-3": tiny,
          },
        )}
      >
        <h2
          className={cn(
            "line-clamp-1 text-2xl font-bold group-hover:text-green-500 lg:line-clamp-2",
            {
              "lg:line-clamp-1 lg:text-lg": tiny,
            },
          )}
        >
          {review?.title}
        </h2>
        <p
          className={cn(
            "hidden truncate text-sm text-white/70 transition-all group-hover:block md:text-base",
            {
              "lg:text-xs": tiny,
            },
          )}
        >
          {review?.content}
        </p>
      </div>
    </Link>
  );
};

export { HeadlineCard };
