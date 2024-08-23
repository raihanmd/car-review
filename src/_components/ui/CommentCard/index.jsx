import { formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../Card";
import { useAuthContext } from "@/contexts/auth-context";
import { Button } from "../Button";
import { PencilLine, Settings, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import axiosInstance from "@/lib/axios";
import { useState } from "react";
import { Spinner } from "../Spinner";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../Dialog";
import { Textarea } from "../Textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentUpdateSchema } from "@/schemas/validation-schema";
import { InputGroup } from "../Input";
import { Link } from "react-router-dom";

export default function CommentCard({ comment, onSuccess }) {
  const { user } = useAuthContext();

  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting: isUpdating },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(commentUpdateSchema),
  });

  const handleUpdate = async (e) => {
    try {
      await axiosInstance.patch(`/comments/${comment?.id}`, {
        content: e.content,
      });
      toast({
        title: "Success update a comment ✨",
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError("form", {
        message: err.response?.data?.errors || "Something went wrong",
      });
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await axiosInstance.delete(`/comments/${comment.id}`);
      toast({
        title: "Success delete a comment ✨",
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        title: "Something went wrong ✨",
        description: error?.response?.data?.errors || "Something went wrong",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Button
                variant="link"
                className="h-auto p-0 text-lg font-semibold"
                asChild
              >
                <Link to={`/user/${comment?.user?.id}`}>
                  {comment?.user?.username}
                </Link>
              </Button>
              {comment?.user?.username === user?.username && (
                <p className="text-xs font-normal text-primary/60">(You)</p>
              )}
            </div>
            <p className="text-base font-normal text-primary/60">
              {formatDate(comment.created_at)}
            </p>
          </div>
          {comment?.user?.username === user?.username ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Settings size={20} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-28 p-0">
                <div className="grid divide-y">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        disabled={isSubmitting}
                        variant="ghost"
                        className="w-full justify-start space-x-2 rounded-none"
                      >
                        <PencilLine size={20} />
                        <p>Edit</p>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Comment</DialogTitle>
                        <DialogDescription>
                          Make changes to your comment here. Click save when
                          you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        onSubmit={handleSubmit(handleUpdate)}
                        autoComplete="off"
                      >
                        {errors?.form && (
                          <p className="mb-2 text-red-500">
                            {errors.form.message}
                          </p>
                        )}
                        <InputGroup error={errors.content?.message}>
                          <Textarea
                            placeholder="Edit your comment here"
                            defaultValue={comment.content}
                            {...register("content")}
                          />
                        </InputGroup>
                        <DialogFooter className="pt-5">
                          <Button
                            disabled={isUpdating}
                            type="submit"
                            className="gap-2"
                          >
                            <Spinner size="small" show={isUpdating} />
                            Save changes
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button
                    onClick={handleDelete}
                    disabled={isSubmitting}
                    variant="ghost"
                    className="justify-start space-x-2 rounded-none rounded-b-md hover:bg-destructive hover:text-white"
                  >
                    {isSubmitting ? (
                      <Spinner size="small" className="text-primary" />
                    ) : (
                      <Trash2 size={20} />
                    )}
                    <p className="transition-none">Hapus</p>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ) : null}
        </CardTitle>
      </CardHeader>
      <CardContent>{comment.content}</CardContent>
    </Card>
  );
}
