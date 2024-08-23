import CarCard from "@/_components/ui/CarCard";
import { useFetch } from "@/hooks/use-fetch";

export default function CarList() {
  const {
    data: cars,
    isFething,
    error,
  } = useFetch("/cars", { limit: -1, page: 1 });

  if (isFething) return <div>Loading...</div>;

  if (error) return <div>Error</div>;

  return (
    <div className="flex flex-wrap items-center justify-center gap-5 py-5">
      {cars?.map((car) => (
        <CarCard car={car} />
      ))}
    </div>
  );
}
