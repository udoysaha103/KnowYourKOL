import React from "react";
import styles from "./AddKOL.module.css";
import Navbar from "../../Components/Navbar/Navbar";

const AddKOL = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>KOL Application Form</div>
        <div className={styles.header2}>
          <div>Bio</div>
          <div className={styles.dividerHorizontal}></div>
        </div>
        <div className={styles.key}>Twitter Name</div>
        <input
          className={styles.input}
          placeholder="Type your answer..."
        ></input>

        <div className={styles.info}>*Required</div>
      </div>
    </>
  );
};

export default AddKOL;
