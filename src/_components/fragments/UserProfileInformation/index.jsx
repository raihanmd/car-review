import { Button } from "@/_components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/_components/ui/Dialog";
import { InputGroup } from "@/_components/ui/Input";
import { Input } from "@/_components/ui/Input/input";
import { Label } from "@/_components/ui/Input/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/_components/ui/Popover";
import ProfileCard from "@/_components/ui/ProfileCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/Select";
import { Separator } from "@/_components/ui/Separator";
import { Spinner } from "@/_components/ui/Spinner";
import { Textarea } from "@/_components/ui/Textarea";
import { useAuthContext } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import axiosInstance from "@/lib/axios";
import { capitalize } from "@/lib/utils";
import { profileUpdateSchema } from "@/schemas/validation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilLine, Settings } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

export default function UserProfileInformation({ onSuccess, profile }) {
  const { user } = useAuthContext();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(profileUpdateSchema),
  });

  const handleUpdate = async (e) => {
    try {
      const processedData = Object.fromEntries(
        Object.entries(e).map(([key, value]) => [
          key,
          value === "" ? null : value,
        ]),
      );
      await axiosInstance.patch(`/users/profile`, {
        ...processedData,
        age: processedData.age === 0 ? null : processedData.age,
      });
      toast({
        title: "Profile updated ✨",
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      console.log(err);
      setError("form", {
        message: err.response?.data?.errors || "Something went wrong",
      });
    }
  };

  const profileEntries = Object.entries(profile).filter(
    ([key]) => !["id", "username", "role"].includes(key),
  );

  return (
    <>
      <div className="flex w-full justify-between gap-5">
        <ProfileCard user={user} />
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
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <form
                    onSubmit={handleSubmit(handleUpdate)}
                    autoComplete="off"
                    className="flex flex-col gap-5"
                  >
                    {errors?.form && (
                      <p className="mb-2 text-red-500">{errors.form.message}</p>
                    )}
                    <InputGroup error={errors.username?.message}>
                      <Label htmlFor="username">Username</Label>
                      <Input
                        type="text"
                        placeholder="Your epic username"
                        id="username"
                        defaultValue={profile?.username}
                        {...register("username")}
                      />
                    </InputGroup>
                    <InputGroup error={errors.email?.message}>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="email"
                        placeholder="Your epic email"
                        id="email"
                        defaultValue={profile?.email}
                        {...register("email")}
                      />
                    </InputGroup>
                    <InputGroup error={errors.full_name?.message}>
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input
                        type="text"
                        placeholder="Your epic full name"
                        id="full_name"
                        defaultValue={profile?.full_name}
                        {...register("full_name")}
                      />
                    </InputGroup>
                    <InputGroup error={errors.bio?.message}>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        placeholder="Your epic bio"
                        id="bio"
                        defaultValue={profile?.bio}
                        {...register("bio")}
                      />
                    </InputGroup>
                    <InputGroup error={errors.age?.message}>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        type="number"
                        placeholder="Your age"
                        id="age"
                        defaultValue={profile?.age || 0}
                        {...register("age", { valueAsNumber: true })}
                      />
                    </InputGroup>
                    <InputGroup error={errors.gender?.message}>
                      <Label htmlFor="gender">Gender</Label>
                      <Controller
                        name="gender"
                        control={control}
                        defaultValue={profile?.gender || ""}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger id="gender">
                              <SelectValue placeholder="Select a gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Gender</SelectLabel>
                                <SelectItem value="MALE">MALE</SelectItem>
                                <SelectItem value="FEMALE">FEMALE</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </InputGroup>
                    <DialogFooter className="pt-5">
                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        className="gap-2"
                      >
                        <Spinner size="small" show={isSubmitting} />
                        Save changes
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Separator className="my-5" />
      <div className="flex flex-col gap-2">
        {profileEntries.map(([key, value]) => (
          <div key={key} className="flex">
            <p className="w-32 font-semibold">{capitalize(key)}</p>
            <p>{value || "N/A"}</p>
          </div>
        ))}
      </div>
    </>
  );
}
