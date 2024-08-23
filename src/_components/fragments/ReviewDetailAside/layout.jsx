import Aside from "../Aside";

export default function ReviewDetailAsideLayout({ children }) {
  return (
    <Aside className="xl:block xl:w-[20%]" title={"Mobil Terkait"}>
      {children}
    </Aside>
  );
}
