import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/_components/ui/Pagination";
import { cn } from "@/lib/utils";

export default function ReviewListLayout({
  className,
  children,
  page,
  totalPages,
  handlePageChange,
}) {
  return (
    <div className={cn("flex flex-col gap-5 py-5 lg:w-[70%]", className)}>
      {children}
      <Pagination className="justify-start">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={cn("cursor-pointer", {
                hidden: page === 1,
              })}
              onClick={() => handlePageChange(page - 1)}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className={cn("cursor-pointer", {
                hidden: page === totalPages,
              })}
              onClick={() => handlePageChange(page + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
