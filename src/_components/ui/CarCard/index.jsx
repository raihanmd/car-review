import { Link } from "react-router-dom";

export default function CarCard({ car }) {
  return (
    <Link to={`/car/${car.id}`}>
      <div
        key={car.id}
        className="flex w-[250px] flex-col items-center gap-5 rounded-md border px-2 py-2 pb-5"
      >
        <img
          src={car.image_url}
          alt={car.name}
          className="h-44 w-full rounded-md object-cover"
        />
        <p>{car.name}</p>
      </div>
    </Link>
  );
}
