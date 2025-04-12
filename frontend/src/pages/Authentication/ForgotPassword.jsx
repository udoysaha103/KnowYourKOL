import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Auth.module.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleReset = async () => {
    if (loading) return;
    if (!password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, token }),
    });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) {
      setError(data.error);
    }
    if (response.ok) {
      alert(
        "Password reset successfully. You can now login with your new password."
      );
      navigate("/login");
    }
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleReset();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [password, confirmPassword]);
  return (
    <>
      <div className={styles.logo}></div>
      <div className={styles.container}>
        <div className={styles.header}>Change Your Password</div>
        <div className={styles.dividerHorizontal}></div>
        <br />
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="password"
            placeholder="New Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={handleReset}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </div>
        <div className={styles.error}>{error}</div>
      </div>
    </>
  );
};

export default ForgotPassword;
