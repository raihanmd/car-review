import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Authlayout from "@/_components/layouts/auth-layout";
import { InputGroup } from "@/_components/ui/Input";
import { InputGlow } from "@/_components/ui/Input/input-glow";
import { Label } from "@/_components/ui/Input/label";
import { Button } from "@/_components/ui/Button";
import { forgotPasswordSchema } from "@/schemas/validation-schema";
import { Spinner } from "@/_components/ui/Spinner";
import axiosInstance from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(forgotPasswordSchema),
  });

  const handleForgotPassword = async (e) => {
    try {
      const { data } = await axiosInstance.post("/auth/forgot-password", e);
      toast({
        title: "Forgot password reqested ✨",
        description: `Now lets create your new password, make sure dont forget it again 😊`,
      });
      navigate(`/auth/reset-password?token=${data?.payload?.token}`);
    } catch (err) {
      setError("auth", {
        message: err?.response.data?.errors || "Authentication failed",
      });
      setError("email", { message: err?.response?.data?.errors });
      setError("username", { message: err?.response?.data?.errors });
    }
  };

  return (
    <Authlayout
      error={errors?.auth?.message}
      onSubmit={handleSubmit(handleForgotPassword)}
      title={"Reset password 🔑"}
      description={
        "Enter your email and username we will send you to the page then reset your password"
      }
    >
      <InputGroup error={errors.email?.message}>
        <Label htmlFor="email">Email</Label>
        <InputGlow
          type="text"
          placeholder="Your email"
          id="email"
          {...register("email")}
        />
      </InputGroup>
      <InputGroup error={errors.username?.message}>
        <Label htmlFor="username">Username</Label>
        <InputGlow
          type="text"
          placeholder="Your username"
          id="username"
          {...register("username")}
        />
      </InputGroup>
      <div className="space-y-5 py-5">
        <Button
          disabled={isSubmitting}
          className="w-full gap-2 rounded-full"
          size="lg"
          type="submit"
        >
          <Spinner size="small" show={isSubmitting} />
          Confirm
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
