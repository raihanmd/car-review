import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
} from "@/_components/ui/Pagination";
import { cn } from "@/lib/utils";

export default function ReviewListNotFound({
  page,
  handlePageChange,
  className,
}) {
  return (
    <div
      className={cn("flex w-full flex-col gap-5 py-5 lg:w-[70%]", className)}
    >
      <div className="my-5 flex h-32 w-full items-center justify-center rounded-md border">
        <p>Review not found</p>
      </div>
      <Pagination className="justify-start">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={cn("cursor-pointer", {
                hidden: page === 1,
              })}
              onClick={() => handlePageChange(1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
