import axiosInstance from "@/lib/axios";
import { useState, createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = (props) => {
  const [token, setToken] = useLocalStorage("token", null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const { data } = await axiosInstance.get("/users/current", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data?.payload);
      } catch (error) {
        setUser(null);
        setToken(null);
      }
    };

    fetchCurrentUser();
  }, [token, setToken, setUser]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
