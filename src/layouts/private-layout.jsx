import { useAuthContext } from "@/contexts/auth-context";
import { Navigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

export default function PrivateLayout({ children, role }) {
  const { user } = useAuthContext();
  const [token] = useLocalStorage("token", null);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (user && role) {
    if (user?.role !== role.toUpperCase()) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
