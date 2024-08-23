import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Authlayout from "@/_components/layouts/auth-layout";
import { InputGroup } from "@/_components/ui/Input";
import { InputGlow } from "@/_components/ui/Input/input-glow";
import { Label } from "@/_components/ui/Input/label";
import { Button } from "@/_components/ui/Button";
import { resetPasswordSchema } from "@/schemas/validation-schema";
import { Spinner } from "@/_components/ui/Spinner";
import axiosInstance from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";

export default function ResetPassword() {
  const [param] = useSearchParams();

  const token = param.get("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(resetPasswordSchema),
  });

  const handleResetPassword = async (e) => {
    console.log(e);
    try {
      await axiosInstance.post("/auth/reset-password", {
        new_password: e.password,
        token: token,
      });
      toast({
        title: "Your password has been reset ✨",
        description: `Lets try to login with your new password 🎉`,
      });
      navigate(`/auth/signin`);
    } catch (err) {
      setError("auth", {
        message: err?.response?.data?.errors || "Authentication failed",
      });
    }
  };

  return (
    <Authlayout
      error={errors?.auth?.message}
      onSubmit={handleSubmit(handleResetPassword)}
      title={"Input your new password 🔐"}
      description={
        "Make sure your password is strong, and dont forget it again"
      }
    >
      <InputGroup error={errors.password?.message}>
        <Label htmlFor="password">Password</Label>
        <InputGlow
          type="password"
          placeholder="Your new unbeatable password"
          id="password"
          {...register("password")}
        />
      </InputGroup>
      <InputGroup error={errors.confirm_password?.message}>
        <Label htmlFor="confirm_password">Confirm Password</Label>
        <InputGlow
          type="password"
          placeholder="Repeat your new password"
          id="confirm_password"
          {...register("confirm_password")}
        />
      </InputGroup>
      <div className="text-right text-blue-500">
        <Link to="/auth/forgot-password">Request forgot password?</Link>
      </div>
      <Button
        disabled={isSubmitting}
        className="w-full gap-2 rounded-full"
        size="lg"
        type="submit"
      >
        <Spinner size="small" show={isSubmitting} />
        Reset Password
      </Button>
    </Authlayout>
  );
}
