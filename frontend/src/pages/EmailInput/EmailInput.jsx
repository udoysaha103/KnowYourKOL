import React, { useState, useEffect } from "react";
import styles from "./EmailInput.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const handleGetEmail = async () => {
    if (sending) return;
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setSending(true);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/user/getPasswordResetMail/${email}`
    );
    setSending(false);
    const data = await response.json();
    if (!response.ok) {
      setError(data.error);
    }
    if (response.ok) {
      alert(
        "Email sent successfully. Please check your email to reset your password."
      );
    }
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleGetEmail();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [email]);
  return (
    <>
      <div className={styles.logo}></div>
      <div className={styles.container}>
        <div className={styles.header}>Input Your Email</div>
        <div className={styles.dividerHorizontal}></div>
        <br />
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={handleGetEmail}>
            {sending ? "Sending..." : "Send Email"}
          </button>
        </div>
        <div className={styles.error}>{error}</div>
      </div>
    </>
  );
};

export default ForgotPassword;
