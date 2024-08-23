import { Alert, AlertDescription, AlertTitle } from "@/_components/ui/Alert";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

export default function FormContainer({
  onSubmit,
  error,
  title,
  description,
  children,
  ...props
}) {
  return (
    <form
      onSubmit={onSubmit}
      autoComplete="off"
      className={cn(
        "z-[1] flex w-full max-w-md flex-col gap-10",
        props.className,
      )}
    >
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="w-full space-y-5">
        {title && <h1 className="text-3xl font-semibold">{title}</h1>}
        {description && <p>{description}</p>}
      </div>
      <div className="w-full space-y-5">{children}</div>
    </form>
  );
}
