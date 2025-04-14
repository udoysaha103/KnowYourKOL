import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSSOLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const ssoLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/sso/login`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const json = await response.json();
      setIsLoading(false);

      if (response.ok) {
        // save the user to local storage
        localStorage.setItem("user", JSON.stringify(json));

        // update the auth context
        dispatch({ type: "LOGIN", payload: json });

        return false;
      } else {
        setError(json.error);
        return true;
      }
    } catch (err) {
      setIsLoading(false);
      setError("An unexpected error occurred", err);
      return true;
    }
  };

  return { ssoLogin, isLoading, error };
};
