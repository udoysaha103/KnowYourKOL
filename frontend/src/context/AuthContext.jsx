import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext({ user: null, dispatch: () => {} });

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/user/getVerificationStatus`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email }),
          }
        );
        const json = await response.json();
        if (response.ok) {
          return json.verificationStatus;
        } else {
          console.log(json.error);
          return false;
        }
      } catch (error) {
        console.log("Error in fetching verification status", error);
        return false;
      }
    };
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      fetchStatus().then((verificationStatus) => {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, verificationStatus })
        );
        dispatch({ type: "LOGIN", payload: { ...user, verificationStatus } });
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
