import Aside from "@/_components/fragments/Aside";
import Headline from "@/_components/fragments/Headline";
import ReviewList from "@/_components/fragments/ReviewList";

export default function Home() {
  return (
    <div className="my-container flex flex-col items-center justify-center">
      <Headline />
      <div className="my-container w-full py-5">
        <h1 className="text-3xl font-bold">Newest Reviews</h1>
        <div className="flex gap-5">
          <ReviewList />
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
