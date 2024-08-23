import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(
  ({ className, type, rightElement, ...props }, ref) => {
    return (
      <div className="relative flex w-full items-center">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:ring-4 focus:ring-ring focus-visible:outline focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-0 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
