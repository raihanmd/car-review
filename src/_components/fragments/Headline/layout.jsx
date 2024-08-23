export default function HeadlineLayout({ children }) {
  return (
    <div className="hidden size-full py-3 lg:block">
      <div className="grid h-[40vh] w-full grid-cols-3 gap-2">{children}</div>
    </div>
  );
}
