import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@/hooks/use-toast";
import { commentCreateSchema } from "@/schemas/validation-schema";
import { useReviewDetailContext } from "@/contexts/review-detail-context";
import { Textarea } from "../Textarea";
import { Button } from "../Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../Card";
import { InputGroup } from "../Input";
import { Spinner } from "../Spinner";
import axiosInstance from "@/lib/axios";

export default function CommentPost({ onSuccess }) {
  const { review } = useReviewDetailContext();

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(commentCreateSchema),
  });

  const onSubmit = async (e) => {
    try {
      await axiosInstance.post("/comments", {
        review_id: review.id,
        content: e.content,
      });
      toast({
        title: "Success post a comment ✨",
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError("form", {
        message: err.response?.data?.errors || "Something went wrong",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-normal">Add comment</CardTitle>
        </CardHeader>
        <CardContent>
          {errors.form && (
            <p className="mb-2 text-red-500">{errors.form.message}</p>
          )}
          <InputGroup error={errors.content?.message}>
            <Textarea
              placeholder="Write a comment..."
              {...register("content")}
            />
          </InputGroup>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button disabled={isSubmitting} type="submit" className="gap-2">
            <Spinner size="small" show={isSubmitting} />
            Post
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
