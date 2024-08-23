import NProgress from "nprogress";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { AuthProvider } from "@/contexts/auth-context";
import { ThemeProvider } from "@/contexts/theme-context";
import { Toaster } from "@/_components/ui/Toast/toaster";

NProgress.configure({ showSpinner: false });

export default function RootLayout() {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    NProgress.done();

    return () => {
      NProgress.done();
    };
  }, [location]);

  return (
    <AuthProvider>
      <ThemeProvider>
        <Outlet />
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  );
}
