import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalStorage } from "usehooks-ts";

import Authlayout from "@/_components/layouts/auth-layout";
import { InputGroup } from "@/_components/ui/Input";
import { InputGlow } from "@/_components/ui/Input/input-glow";
import { Label } from "@/_components/ui/Input/label";
import { Button } from "@/_components/ui/Button";
import { signinSchema } from "@/schemas/validation-schema";
import { Spinner } from "@/_components/ui/Spinner";
import axiosInstance from "@/lib/axios";
import { useAuthContext } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";

export default function Signin() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { setUser } = useAuthContext();
  const [, setToken] = useLocalStorage("token", null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(signinSchema),
  });

  const handleSignIn = async (e) => {
    try {
      const { data } = await axiosInstance.post("/auth/login", e);
      setToken(data?.payload?.token);
      setUser({
        username: data?.payload?.username,
        email: data?.payload?.email,
        role: data?.payload?.role,
      });
      toast({
        title: "Signin success ✨",
        description: `Welcome back ${data?.payload?.username} 👋`,
      });
      navigate("/");
    } catch (err) {
      setError("auth", {
        message: err?.response.data?.errors || "Authentication failed",
      });
      setError("email", { message: err?.response?.data?.errors });
      setError("password", { message: err?.response?.data?.errors });
    }
  };

  return (
    <Authlayout
      error={errors?.auth?.message}
      onSubmit={handleSubmit(handleSignIn)}
      title={"Welcome Back 👋"}
      description={
        "Today is a new day. It's your day. You shape it. You own it. You're going to have a great day.."
      }
    >
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
          placeholder="••••••••"
          id="password"
          {...register("password")}
        />
      </InputGroup>
      <div className="text-right text-blue-500">
        <Link to="/auth/forgot-password">Forgot Password?</Link>
      </div>
      <Button
        disabled={isSubmitting}
        className="w-full gap-2 rounded-full"
        size="lg"
        type="submit"
      >
        <Spinner size="small" show={isSubmitting} />
        Sign In
      </Button>
      <div>
        <p className="text-center">
          Don't have an account?{" "}
          <Link className="text-blue-500" to="/auth/signup">
            Sign Up
          </Link>
        </p>
      </div>
    </Authlayout>
  );
}
