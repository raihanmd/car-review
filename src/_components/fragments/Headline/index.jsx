import { HeadlineCard } from "@/_components/ui/HeadlineCard";
import { useFetch } from "@/hooks/use-fetch";
import HeadlineLoading from "./loading";
import HeadlineError from "./error";
import HeadlineLayout from "./layout";

export default function Headline() {
  const {
    data: reviews,
    isFetching,
    error,
    refetch,
  } = useFetch("/reviews", { params: { limit: 3 } });

  if (isFetching) return <HeadlineLoading />;

  if (error) return <HeadlineError refetch={refetch} />;

  return (
    <HeadlineLayout>
      <HeadlineCard review={reviews?.[0]} />
      <div className="col-span-1 grid h-[40vh] w-full gap-2 lg:grid-rows-2">
        <HeadlineCard tiny review={reviews?.[1]} />
        <HeadlineCard tiny review={reviews?.[2]} />
      </div>
    </HeadlineLayout>
  );
}
