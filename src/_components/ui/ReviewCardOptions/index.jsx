import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { Button } from "../Button";
import { PencilLine, Settings, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import axiosInstance from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";

export default function ReviewCardOptions({ reviewId, onSuccessDelete }) {
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/reviews/${reviewId}`);
      toast({
        title: "Success delete a review ✨",
      });
      if (onSuccessDelete) onSuccessDelete();
    } catch (error) {
      toast({
        title: error?.response?.errors || "Something went wrong",
      });
    }
  };

  return (
    <div className="absolute left-0 top-0 z-[1] rounded-br-md bg-secondary p-1 sm:bottom-0 sm:top-auto sm:rounded-br-none sm:rounded-tr-md">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings size={20} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-28 p-0">
          <div className="grid divide-y">
            <Button
              variant="ghost"
              className="justify-start space-x-2 rounded-none rounded-b-md"
              asChild
            >
              <Link to={`/review/${reviewId}/edit`}>
                <PencilLine size={20} />
                <p>Edit</p>
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="justify-start space-x-2 rounded-none rounded-b-md hover:bg-destructive hover:text-white"
              onClick={handleDelete}
            >
              <Trash2 size={20} />
              <p>Hapus</p>
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
