import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useGoogleLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const googleLogin = async () => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/google/login`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      // update loading state
      setIsLoading(false);
    }
  };

  return { googleLogin, isLoading, error };
};