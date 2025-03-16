import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Profile from "./pages/Profile/Profile";
import AddKOL from "./pages/AddKOL/AddKOL";
import FAQ from "./pages/FAQ/FAQ";
import TermsOfUse from "./pages/TermsOfUse/TermsOfUse";
import PrivacyPolicies from "./pages/PrivacyPolicies/PrivacyPolicies";

import { useAuthContext } from "./hooks/useAuthContext";
import { useGoogleLogin } from "./hooks/useGoogleLogin";
import Cookies from "js-cookie";
import "./App.css";

const App = () => {
  const { user } = useAuthContext();
  const { googleLogin, isLoading, error } = useGoogleLogin();
  useEffect(() => {
    if (Cookies.get("session") && Cookies.get("session.sig")) {
      googleLogin();
    }
  }, []);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        ></Route>
        <Route
          path="/profile/:id"
          element={<Profile />}
        ></Route>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        ></Route>
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <SignUp />}
        ></Route>
        <Route
          path="/add-kol"
          element={<AddKOL />}
        ></Route>
        <Route
          path="/FAQ"
          element={<FAQ />}
        ></Route>
        <Route
          path="/termsOfUse"
          element={<TermsOfUse />}
        ></Route>
        <Route
          path="/privacyPolicies"
          element={<PrivacyPolicies />}
        ></Route>
      </Routes>
    </>
  );
};

export default App;
