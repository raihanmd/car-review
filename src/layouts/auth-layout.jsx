import { Navigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

export default function AuthLayout({ children }) {
  const [token] = useLocalStorage("token", null);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
