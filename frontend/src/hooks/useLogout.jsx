import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import Cookie from "js-cookie";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);

  const logout = async () => {
    setError(null);
    try {
      localStorage.removeItem("user");
      Cookie.remove("session");
      Cookie.remove("session.sig");
      dispatch({ type: "LOGOUT" });
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  return { logout, error };
};
