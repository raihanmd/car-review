import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormContainer from "@/_components/fragments/FormContainer";
import { InputGroup } from "@/_components/ui/Input";
import { Label } from "@/_components/ui/Input/label";
import {
  CAR_FUELS,
  CAR_MODELS,
  CAR_TRANSMISSIONS,
  carCreateSchema,
} from "@/schemas/validation-schema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/Select";
import { useFetch } from "@/hooks/use-fetch";
import { Button } from "@/_components/ui/Button";
import axiosInstance from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Spinner } from "@/_components/ui/Spinner";
import { Input } from "@/_components/ui/Input/input";
import { useState } from "react";
import { Textarea } from "@/_components/ui/Textarea";
import { cn } from "@/lib/utils";

export default function CreateCar() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [imageUrl, setImageUrl] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(carCreateSchema),
  });

  const { data: brands } = useFetch("/brands", {
    params: { limit: -1 },
  });

  const onSubmit = async (e) => {
    try {
      await axiosInstance.post("/cars", e);
      toast({
        title: "Success create car ✨",
      });
      navigate("/car");
    } catch (err) {
      setError("form", {
        message: err.response?.data?.errors || "Something went wrong",
      });
    }
  };

  return (
    <div className="my-container">
      <FormContainer
        onSubmit={handleSubmit(onSubmit)}
        title={"Create Car"}
        error={errors?.form?.message}
        className="mx-auto max-w-7xl py-5"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="col-span-1 space-y-5">
            <InputGroup error={errors.brand_id?.message}>
              <Label htmlFor="brand_id">Brand</Label>
              <Controller
                name="brand_id"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      field.onChange(+value);
                    }}
                    value={field.value}
                  >
                    <SelectTrigger id="brand_id">
                      <SelectValue placeholder="Select a brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Brands</SelectLabel>
                        {brands && brands.length > 0 ? (
                          brands.map((car) => (
                            <SelectItem key={car.id} value={car.id}>
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
            <InputGroup error={errors.model?.message}>
              <Label htmlFor="model">Model</Label>
              <Controller
                name="model"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="model">
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Models</SelectLabel>
                        {CAR_MODELS.map((model) => (
                          <SelectItem key={model} value={model}>
                            {model}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </InputGroup>
            <InputGroup error={errors.name?.message}>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                placeholder="Define a name"
                id="name"
                {...register("name")}
              />
            </InputGroup>
            <InputGroup error={errors.year?.message}>
              <Label htmlFor="year">Year</Label>
              <Input
                type="number"
                placeholder="Define a year"
                id="year"
                {...register("year", {
                  valueAsNumber: true,
                })}
              />
            </InputGroup>
            <InputGroup error={errors.width?.message}>
              <Label htmlFor="width">
                Width <span className="text-xs text-primary/40">(mm)</span>
              </Label>
              <Input
                type="number"
                placeholder="Define a width"
                id="width"
                {...register("width", {
                  valueAsNumber: true,
                })}
              />
            </InputGroup>
            <InputGroup error={errors.height?.message}>
              <Label htmlFor="height">
                Height <span className="text-xs text-primary/40">(mm)</span>
              </Label>
              <Input
                type="number"
                placeholder="Define a height"
                id="height"
                {...register("height", {
                  valueAsNumber: true,
                })}
              />
            </InputGroup>
            <InputGroup error={errors.length?.message}>
              <Label htmlFor="length">
                Length <span className="text-xs text-primary/40">(mm)</span>
              </Label>
              <Input
                type="number"
                placeholder="Define a length"
                id="length"
                {...register("length", {
                  valueAsNumber: true,
                })}
              />
            </InputGroup>
            <InputGroup error={errors.engine?.message}>
              <Label htmlFor="engine">Engine</Label>
              <Input
                type="text"
                placeholder="Define an engine"
                id="engine"
                {...register("engine")}
              />
            </InputGroup>
          </div>
          <div className="col-span-1 space-y-5">
            <InputGroup error={errors.torque?.message}>
              <Label htmlFor="torque">
                Torque <span className="text-xs text-primary/40">(rpm)</span>
              </Label>
              <Input
                type="number"
                placeholder="Define a torque"
                id="torque"
                {...register("torque", {
                  valueAsNumber: true,
                })}
              />
            </InputGroup>
            <InputGroup error={errors.transmission?.message}>
              <Label htmlFor="transmission">Transmission</Label>
              <Controller
                name="transmission"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="transmission">
                      <SelectValue placeholder="Select a transmission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Transmissions</SelectLabel>
                        {CAR_TRANSMISSIONS.map((transmission) => (
                          <SelectItem key={transmission} value={transmission}>
                            {transmission}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </InputGroup>
            <InputGroup error={errors.acceleration?.message}>
              <Label htmlFor="acceleration">
                Acceleration{" "}
                <span className="text-xs text-primary/40">(s)</span>
              </Label>
              <Input
                type="number"
                step="0.1"
                placeholder="Define an acceleration"
                id="acceleration"
                {...register("acceleration", {
                  valueAsNumber: true,
                })}
              />
            </InputGroup>
            <InputGroup error={errors.horse_power?.message}>
              <Label htmlFor="horse_power">
                Horse Power{" "}
                <span className="text-xs text-primary/40">(HP)</span>
              </Label>
              <Input
                type="number"
                placeholder="Define a horse power"
                id="horse_power"
                {...register("horse_power", {
                  valueAsNumber: true,
                })}
              />
            </InputGroup>
            <InputGroup error={errors.breaking_system_front?.message}>
              <Label htmlFor="breaking_system_front">
                Breaking System Front
              </Label>
              <Input
                type="text"
                placeholder="Define a horse power"
                id="breaking_system_front"
                {...register("breaking_system_front")}
              />
            </InputGroup>
            <InputGroup error={errors.breaking_system_back?.message}>
              <Label htmlFor="breaking_system_back">Breaking System Back</Label>
              <Input
                type="text"
                placeholder="Define a horse power"
                id="breaking_system_back"
                {...register("breaking_system_back")}
              />
            </InputGroup>
            <InputGroup error={errors.fuel?.message}>
              <Label htmlFor="fuel">Fuel</Label>
              <Controller
                name="fuel"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="fuel">
                      <SelectValue placeholder="Select a fuel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fuels</SelectLabel>
                        {CAR_FUELS.map((fuel) => (
                          <SelectItem key={fuel} value={fuel}>
                            {fuel}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </InputGroup>
            <InputGroup error={errors.image_url?.message}>
              <Label htmlFor="image_url">Image Url</Label>
              <Textarea
                placeholder="Insert image url"
                id="image_url"
                {...register("image_url")}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </InputGroup>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Thumbnail"
                onError={() =>
                  setError("image_url", {
                    type: "manual",
                    message: "Broken link thumbnail URL",
                  })
                }
                onLoad={() => clearErrors("image_url")}
                className={cn(
                  "h-[250px] w-full rounded-md bg-muted object-cover",
                  {
                    hidden: errors?.image_url?.message,
                  },
                )}
              />
            )}
          </div>
        </div>
        <Button
          disabled={isSubmitting}
          className="w-full md:w-auto"
          size="lg"
          type="submit"
        >
          <Spinner size="small" show={isSubmitting} />
          Create
        </Button>
      </FormContainer>
    </div>
  );
}
