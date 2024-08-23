import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormContainer from "@/_components/fragments/FormContainer";
import { InputGroup } from "@/_components/ui/Input";
import { Label } from "@/_components/ui/Input/label";
import { reviewUpdateSchema } from "@/schemas/validation-schema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/Select";
import { Textarea } from "@/_components/ui/Textarea";
import { useFetch } from "@/hooks/use-fetch";
import { Button } from "@/_components/ui/Button";
import { cn } from "@/lib/utils";
import axiosInstance from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { Spinner } from "@/_components/ui/Spinner";

export default function EditReview() {
  const { id } = useParams();

  if (!id) {
    return <Navigate to="/" replace />;
  }

  const navigate = useNavigate();
  const { toast } = useToast();

  const [carImageUrl, setCarImageUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const {
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(reviewUpdateSchema),
    defaultValues: {
      car_id: "",
      title: "",
      content: "",
      image_url: "",
    },
  });

  const {
    data: review,
    isLoading: isReviewLoading,
    error,
  } = useFetch(`/reviews/${id}`);

  const { data: cars, isLoading: isCarsLoading } = useFetch("/cars", {
    params: { limit: -1 },
  });

  useEffect(() => {
    if (review && cars) {
      setThumbnailUrl(review?.image_url);
      const car = cars.find((car) => car.id === review?.car?.id);
      if (car) {
        setCarImageUrl(car.image_url);
      }
      reset({
        car_id: review?.car?.id,
        title: review?.title,
        content: review?.content,
        image_url: review?.image_url,
      });
    }
  }, [review, cars, reset]);

  const onSubmit = async (e) => {
    try {
      await axiosInstance.patch(`/reviews/${id}`, e);
      toast({
        title: "Success edit review ✨",
      });
      navigate("/");
    } catch (err) {
      setError("form", {
        message: err.response?.data?.errors || "Something went wrong",
      });
    }
  };

  if (error) {
    return <Navigate to="/not-found" replace />;
  }

  if (isReviewLoading || isCarsLoading) {
    return <div>Loading...</div>;
  }

  if (!review || !cars) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="my-container">
      <FormContainer
        onSubmit={handleSubmit(onSubmit)}
        title={"Edit Review"}
        error={errors?.form?.message}
        className="mx-auto py-5"
      >
        {review?.car?.id && (
          <InputGroup error={errors.car_id?.message}>
            <Label htmlFor="car_id">Car</Label>
            <Controller
              name="car_id"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => {
                    field.onChange(Number(value));
                    const selectedCar = cars.find(
                      (car) => car.id === Number(value),
                    );
                    if (selectedCar) {
                      setCarImageUrl(selectedCar.image_url);
                    }
                  }}
                  value={field.value?.toString()}
                >
                  <SelectTrigger id="car_id">
                    <SelectValue placeholder="Select a car" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Cars</SelectLabel>
                      {cars && cars.length > 0 ? (
                        cars.map((car) => (
                          <SelectItem key={car.id} value={car.id.toString()}>
                            {car.brand_name} {car.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="0" disabled>
                          Loading ...
                        </SelectItem>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </InputGroup>
        )}
        {carImageUrl && (
          <img
            draggable={false}
            src={carImageUrl}
            alt="selected car"
            className="h-[250px] w-full rounded-md bg-muted object-cover"
          />
        )}
        <InputGroup error={errors.title?.message}>
          <Label htmlFor="title">Title</Label>
          <Textarea
            placeholder="Insert a title"
            id="title"
            defaultValue={review?.title}
            {...register("title")}
          />
        </InputGroup>
        <InputGroup error={errors.content?.message}>
          <Label htmlFor="content">Content</Label>
          <Textarea
            placeholder="Insert content"
            id="content"
            defaultValue={review?.content}
            {...register("content")}
          />
        </InputGroup>
        <InputGroup error={errors.image_url?.message}>
          <Label htmlFor="image_url">Thumbnail Url</Label>
          <Textarea
            placeholder="Insert image url for thumbnail"
            id="image_url"
            defaultValue={review?.image_url}
            {...register("image_url")}
            onChange={(e) => setThumbnailUrl(e.target.value)}
          />
        </InputGroup>
        {thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt="Thumbnail"
            onError={() =>
              setError("image_url", {
                type: "manual",
                message: "Broken link thumbnail URL",
              })
            }
            onLoad={() => clearErrors("image_url")}
            className={cn("h-[250px] w-full rounded-md bg-muted object-cover", {
              hidden: errors?.image_url?.message,
            })}
          />
        )}
        <Button
          disabled={isSubmitting}
          className="w-full gap-3"
          size="lg"
          type="submit"
        >
          <Spinner size="small" show={isSubmitting} />
          Save
        </Button>
      </FormContainer>
    </div>
  );
}
