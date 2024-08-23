import CarList from "@/_components/fragments/CarList";

export default function Car() {
  return (
    <div className="my-container py-10">
      <h1 className="text-3xl font-bold">List of cars</h1>
      <CarList />
    </div>
  );
}
