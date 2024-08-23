import { cn } from "@/lib/utils";

export default function Aside({ children, title, ...props }) {
  return (
    <div
      className={cn(
        "sticky top-40 hidden h-full rounded-lg border border-border px-2 py-5",
        props.className,
      )}
    >
      <h2 className="px-2 pb-3 text-xl font-semibold">{title}</h2>
      {children}
    </div>
  );
}
