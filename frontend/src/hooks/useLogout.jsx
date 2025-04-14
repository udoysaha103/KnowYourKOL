import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import Cookie from "js-cookie";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);

  const logout = async () => {
    setError(null);
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/sso/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      localStorage.removeItem("user");
      Cookie.remove("session", { domain: ".knowyourkol.io" });
      Cookie.remove("session.sig", { domain: ".knowyourkol.io" });
      dispatch({ type: "LOGOUT" });
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  return { logout, error };
};
