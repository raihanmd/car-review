import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Authlayout from "@/_components/layouts/auth-layout";
import { InputGroup } from "@/_components/ui/Input";
import { InputGlow } from "@/_components/ui/Input/input-glow";
import { Label } from "@/_components/ui/Input/label";
import { Button } from "@/_components/ui/Button";
import { signupSchema } from "@/schemas/validation-schema";
import { Spinner } from "@/_components/ui/Spinner";
import axiosInstance from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";

export default function Signup() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(signupSchema),
  });

  const handleSignUp = async (e) => {
    try {
      await axiosInstance.post("/auth/register", e);
      toast({
        title: "Signup success ✨",
        description: `Lets start your journey now 🎉`,
      });
      navigate("/auth/signin");
    } catch (err) {
      setError("auth", {
        message: err.response?.data?.errors || "Signup failed",
      });
    }
  };

  return (
    <Authlayout
      error={errors?.auth?.message}
      onSubmit={handleSubmit(handleSignUp)}
      title={"Lets start your journey ✨"}
      description={
        "Lets get you all set up so you can verify your account in just a few clicks"
      }
    >
      <InputGroup error={errors.username?.message}>
        <Label htmlFor="username">Username</Label>
        <InputGlow
          type="text"
          placeholder="Your epic username"
          id="username"
          {...register("username")}
        />
      </InputGroup>
      <InputGroup error={errors.email?.message}>
        <Label htmlFor="email">Email</Label>
        <InputGlow
          type="text"
          placeholder="Your awesome email"
          id="email"
          {...register("email")}
        />
      </InputGroup>
      <InputGroup error={errors.password?.message}>
        <Label htmlFor="password">Password</Label>
        <InputGlow
          type="password"
          placeholder="Your unbeatable password"
          id="password"
          {...register("password")}
        />
      </InputGroup>
      <InputGroup error={errors.confirm_password?.message}>
        <Label htmlFor="confirm_password">Confirm Password</Label>
        <InputGlow
          type="password"
          placeholder="Repeat your password"
          id="confirm_password"
          {...register("confirm_password")}
        />
      </InputGroup>
      <div className="space-y-5 py-5">
        <Button
          disabled={isSubmitting}
          className="w-full gap-3 rounded-full"
          size="lg"
          type="submit"
        >
          <Spinner size="small" show={isSubmitting} />
          Sign Up
        </Button>
        <div>
          <p className="text-center">
            Already have an account?{" "}
            <Link className="text-blue-500" to="/auth/signin">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </Authlayout>
  );
}
