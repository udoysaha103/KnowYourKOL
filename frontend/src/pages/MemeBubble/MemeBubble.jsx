import React, { useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import styles from "./MemeBubble.module.css";
import Canvas from "../../Components/Canvas/Canvas";
const canvasStyle = {
  position: "absolute",
  top: 60,
  left: 0,
  zIndex: 1
};
const footerStyle = {
  position: "fixed",
  bottom: 0,
  width: "100%",
  zIndex: 100
};

const MemeBubble = () => {
  return (
    <>
      <Navbar />
      {/* <div className={styles.blur}></div> */}
      {/* <div className={styles.header}>Coming Soon!</div> */}
      <Canvas style={canvasStyle} />
      <Footer style={footerStyle} />
    </>
  );
};

export default MemeBubble;
