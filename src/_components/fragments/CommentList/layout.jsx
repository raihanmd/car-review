export default function CommentListLayout({ children }) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-2xl font-semibold">Komentar</h2>
      {children}
    </div>
  );
}
