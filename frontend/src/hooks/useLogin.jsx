import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const json = await response.json();
      setIsLoading(false);
      if (response.ok) {
        // save the user to local storage
        localStorage.setItem("user", JSON.stringify(json));
        // update the auth context
        dispatch({ type: "LOGIN", payload: json });
      } else {
        setError(json.error);
      }
    } catch (error) {
      setError("Something went wrong, please try again later");
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
