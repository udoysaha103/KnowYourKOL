import { useState, useEffect } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();
  const navigate = useNavigate();
  const handleLogin = async () => {
    await login(email, password);
  };
  const handleGoogleLogin = () => {
    window.open(`${import.meta.env.VITE_API_URL}/google/googleLogin`, "_self");
  };
  useEffect(() => {
    const handleKeyDown = async (e) => {
      if (e.key === "Enter") {
        handleLogin();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [email, password]);
  return (
    <>
      <div className={styles.logo}></div>
      <div className={styles.container}>
        <div className={styles.header}>Login to KnowYourKOL</div>
        <div className={styles.dividerHorizontal}></div>
        <br />
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className={styles.forgetLink}
            onClick={() => navigate("/forgetpassword")}
          >
            forget password?
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={styles.buttonFade}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
          <button className={styles.button} onClick={handleLogin}>
            {isLoading ? "Loading..." : "Login"}
          </button>
        </div>
        <div className={styles.error}>{error}</div>
        <div className={styles.text}>Or</div>
        <br />
        <button className={styles.googleButton} onClick={handleGoogleLogin}>
          <div className={styles.googleText}>Sign in with Google</div>
          <div className={styles.googleLogo}></div>
        </button>
      </div>
    </>
  );
};
export default Login;
