import { cn } from "@/lib/utils";
import { Button } from "../../ui/Button";

export default function ErrorDisplay({ refetch, ...props }) {
  return (
    <div
      {...props}
      className={cn(
        "flex size-full flex-col items-center justify-center gap-2 rounded-md bg-primary/30 text-white",
        props.className,
      )}
    >
      <p>Oops, something went wrong..</p>
      <Button variant="destructive" onClick={refetch}>
        Try Again
      </Button>
    </div>
  );
}
