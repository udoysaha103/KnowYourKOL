import React, { useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Canvas from "../../Components/Canvas/Canvas";
const canvasStyle = {
  position: "absolute",
  top: 80,
  left: 0,
};
const footerStyle = {
  position: "fixed",
  bottom: 0,
  width: "100%",
};

const MemeBubble = () => {
  return (
    <>
      <Navbar />
      <Canvas style={canvasStyle}/>
      <Footer style={footerStyle}/>
    </>
  );
};

export default MemeBubble;
