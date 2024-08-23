import { Link } from "react-router-dom";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { CarTaxiFront, LogOut, PenLine, Search, User } from "lucide-react";

import { Button } from "@/_components/ui/Button";
import { useThemeContext } from "@/contexts/theme-context";
import { Input } from "@/_components/ui/Input/input";
import { MyNavigationMenu } from "./NavigationMenu";
import { useAuthContext } from "@/contexts/auth-context";
import { UserAvatar } from "@/_components/ui/Avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/_components/ui/Popover";
import { useLocalStorage } from "usehooks-ts";

export default function Navbar() {
  const [, setToken] = useLocalStorage("token", null);

  const { theme, toggleTheme } = useThemeContext();
  const { user } = useAuthContext();

  return (
    <nav className="sticky inset-x-0 top-0 z-[15] bg-background">
      <div className="border-b py-5">
        <div className="flex items-center justify-between gap-5 px-2 lg:px-10">
          <Link to={"/"} className="text-lg lg:text-3xl">
            Car Review.
          </Link>
          <div className="w-full md:max-w-lg">
            <Input
              type="text"
              placeholder="Search reviews..."
              rightElement={
                <Button
                  variant="ghost"
                  className="rounded-l-none px-3 text-muted-foreground hover:bg-transparent"
                >
                  <Search size={20} />
                </Button>
              }
            />
          </div>
          <div className="flex items-center justify-center gap-3">
            {user ? (
              <Popover>
                <PopoverTrigger>
                  <UserAvatar username={user.username} />
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <div className="grid divide-y">
                    {AVATAR_MENU.map((item) => (
                      <Button
                        key={item.label}
                        variant="ghost"
                        className="justify-start space-x-2 rounded-none"
                        asChild
                      >
                        <Link to={item.href}>
                          <item.icon size={20} />
                          <p>{item.label}</p>
                        </Link>
                      </Button>
                    ))}
                    {user.role === "ADMIN" && (
                      <Button
                        variant="ghost"
                        className="justify-start space-x-2 rounded-none"
                        asChild
                      >
                        <Link to={"/car/create"}>
                          <CarTaxiFront size={20} />
                          <p>Create Car</p>
                        </Link>
                      </Button>
                    )}
                    <Button
                      onClick={() => setToken(null)}
                      variant="ghost"
                      className="justify-start space-x-2 rounded-none rounded-b-md hover:bg-destructive hover:text-white"
                    >
                      <LogOut size={20} />
                      <p>Signout</p>
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <Button asChild>
                <Link
                  className="bg-primary hover:bg-primary/80"
                  to={"/auth/signin"}
                >
                  Signin
                </Link>
              </Button>
            )}

            <DarkModeSwitch
              checked={theme === "dark"}
              onChange={toggleTheme}
              size={25}
            />
          </div>
        </div>
      </div>

      <div className="border-b px-2 py-1 lg:px-10">
        <MyNavigationMenu />
      </div>
    </nav>
  );
}

const AVATAR_MENU = [
  {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    label: "Create Review",
    href: "/review/create",
    icon: PenLine,
  },
];
