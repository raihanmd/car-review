import { cn } from "@/lib/utils";

const InputGroup = ({ className, children, error }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export { InputGroup };
