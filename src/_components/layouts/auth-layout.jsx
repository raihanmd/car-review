import { useThemeContext } from "@/contexts/theme-context";
import GridBackground from "../ui/GridBackground";
import { cn } from "@/lib/utils";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { Link } from "react-router-dom";
import FormContainer from "../fragments/FormContainer";

export default function Authlayout({
  children,
  onSubmit,
  title,
  description,
  error,
}) {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div className="relative grid min-h-[100dvh] w-full flex-col place-items-center overflow-hidden bg-background px-5 lg:grid-cols-2 lg:px-0">
      <GridBackground
        width={70}
        height={70}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]",
        )}
      />
      <Link
        to={"/"}
        className="fixed left-0 top-0 z-[2] rounded-br-xl bg-background/40 p-5 text-2xl backdrop-blur"
      >
        Car Review.
      </Link>
      <div className="relative flex size-full items-center justify-center py-20">
        <FormContainer
          onSubmit={onSubmit}
          title={title}
          description={description}
          error={error}
        >
          {children}
        </FormContainer>
        <div className="absolute bottom-0 py-5 text-center">
          @ {new Date().getFullYear()} All Rights Reserved
        </div>
      </div>
      <div className="relative z-[2] hidden h-screen w-full p-10 lg:block">
        <img
          draggable={false}
          src="/images/auth.webp"
          className="size-full rounded-xl object-cover"
          alt="login"
        />
      </div>
      <div className="fixed right-0 top-0 z-[3] rounded-bl-[2rem] bg-green-600 p-5 lg:bottom-0 lg:top-auto lg:rounded-bl-none lg:rounded-tl-[2rem] lg:p-10">
        <DarkModeSwitch
          checked={theme === "dark"}
          onChange={toggleTheme}
          size={32}
          sunColor="#fff"
        />
      </div>
    </div>
  );
}
