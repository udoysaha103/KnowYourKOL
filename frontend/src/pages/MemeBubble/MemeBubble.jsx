import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import styles from "./MemeBubble.module.css";
import Canvas from "../../Components/Canvas/Canvas";
const canvasStyle = {
  position: "absolute",
  top: 60,
  left: 0,
  zIndex: 1,
};
const footerStyle = {
  position: "fixed",
  bottom: 0,
  width: "100%",
  zIndex: 100,
};

const loadImage = (url) =>
  new Promise((r) => {
    let i = new Image();
    i.onload = () => r(i);
    i.src = url;
  });
const MemeBubble = () => {
  const imgLinks = [
    "https://cryptobubbles.net/backend/data/logos/1.png",
    "https://cryptobubbles.net/backend/data/logos/1027.png",
    "https://cryptobubbles.net/backend/data/logos/825.png",
    "https://cryptobubbles.net/backend/data/logos/52.png",
    "https://cryptobubbles.net/backend/data/logos/1839.png",
    "https://cryptobubbles.net/backend/data/logos/5426.png",
    "https://cryptobubbles.net/backend/data/logos/3408.png",
    "https://cryptobubbles.net/backend/data/logos/2010.png",
    "https://cryptobubbles.net/backend/data/logos/74.png",
    "https://cryptobubbles.net/backend/data/logos/1958.png",
    "https://cryptobubbles.net/backend/data/logos/1975.png",
    "https://cryptobubbles.net/backend/data/logos/3957.png",
    "https://cryptobubbles.net/backend/data/logos/11419.png",
    "https://cryptobubbles.net/backend/data/logos/512.png",
    "https://cryptobubbles.net/backend/data/logos/5805.png",
    "https://cryptobubbles.net/backend/data/logos/4642.png",
    "https://cryptobubbles.net/backend/data/logos/5994.png",
    "https://cryptobubbles.net/backend/data/logos/20947.png",
    "https://cryptobubbles.net/backend/data/logos/2.png",
    "https://cryptobubbles.net/backend/data/logos/6636.png",
    "https://cryptobubbles.net/backend/data/logos/1740321130693.png",
    "https://cryptobubbles.net/backend/data/logos/1831.png",
    "https://cryptobubbles.net/backend/data/logos/6536.png",
    "https://cryptobubbles.net/backend/data/logos/11092.png",
    "https://cryptobubbles.net/backend/data/logos/29470.png",
    "https://cryptobubbles.net/backend/data/logos/1733841723256.png",
    "https://cryptobubbles.net/backend/data/logos/7083.png",
    "https://cryptobubbles.net/backend/data/logos/328.png",
    "https://cryptobubbles.net/backend/data/logos/21794.png",
    "https://cryptobubbles.net/backend/data/logos/6535.png",
    "https://cryptobubbles.net/backend/data/logos/4943.png",
    "https://cryptobubbles.net/backend/data/logos/3897.png",
    "https://cryptobubbles.net/backend/data/logos/24478.png",
    "https://cryptobubbles.net/backend/data/logos/4269.png",
    "https://cryptobubbles.net/backend/data/logos/8916.png",
    "https://cryptobubbles.net/backend/data/logos/7278.png",
    "https://cryptobubbles.net/backend/data/logos/1321.png",
    "https://cryptobubbles.net/backend/data/logos/21159.png",
    "https://cryptobubbles.net/backend/data/logos/27075.png",
    "https://cryptobubbles.net/backend/data/logos/26081.png",
    "https://cryptobubbles.net/backend/data/logos/3635.png",
    "https://cryptobubbles.net/backend/data/logos/3794.png",
    "https://cryptobubbles.net/backend/data/logos/1737204658.png",
    "https://cryptobubbles.net/backend/data/logos/3077.png",
    "https://cryptobubbles.net/backend/data/logos/22974.png",
    "https://cryptobubbles.net/backend/data/logos/20396.png",
    "https://cryptobubbles.net/backend/data/logos/2280.png",
    "https://cryptobubbles.net/backend/data/logos/30171.png",
    "https://cryptobubbles.net/backend/data/logos/22861.png",
    "https://cryptobubbles.net/backend/data/logos/28321.png",
    "https://cryptobubbles.net/backend/data/logos/5690.png",
    "https://cryptobubbles.net/backend/data/logos/22615.png",
    "https://cryptobubbles.net/backend/data/logos/11841.png",
    "https://cryptobubbles.net/backend/data/logos/29160.png",
    "https://cryptobubbles.net/backend/data/logos/1736781553327.png",
    "https://cryptobubbles.net/backend/data/logos/4030.png",
    "https://cryptobubbles.net/backend/data/logos/1739437269063.png",
    "https://cryptobubbles.net/backend/data/logos/29210.png",
    "https://cryptobubbles.net/backend/data/logos/11840.png",
    "https://cryptobubbles.net/backend/data/logos/2087.png",
    "https://cryptobubbles.net/backend/data/logos/3773.png",
    "https://cryptobubbles.net/backend/data/logos/2694.png",
    "https://cryptobubbles.net/backend/data/logos/2634.png",
    "https://cryptobubbles.net/backend/data/logos/3155.png",
    "https://cryptobubbles.net/backend/data/logos/10603.png",
    "https://cryptobubbles.net/backend/data/logos/1733757460765.png",
    "https://cryptobubbles.net/backend/data/logos/1518.png",
    "https://cryptobubbles.net/backend/data/logos/7326.png",
    "https://cryptobubbles.net/backend/data/logos/13502.png",
    "https://cryptobubbles.net/backend/data/logos/7226.png",
    "https://cryptobubbles.net/backend/data/logos/23095.png",
    "https://cryptobubbles.net/backend/data/logos/4847.png",
    "https://cryptobubbles.net/backend/data/logos/23149.png",
    "https://cryptobubbles.net/backend/data/logos/2416.png",
    "https://cryptobubbles.net/backend/data/logos/6719.png",
    "https://cryptobubbles.net/backend/data/logos/8000.png",
    "https://cryptobubbles.net/backend/data/logos/7950.png",
    "https://cryptobubbles.net/backend/data/logos/1765.png",
    "https://cryptobubbles.net/backend/data/logos/27772.png",
    "https://cryptobubbles.net/backend/data/logos/7186.png",
    "https://cryptobubbles.net/backend/data/logos/7080.png",
    "https://cryptobubbles.net/backend/data/logos/5176.png",
    "https://cryptobubbles.net/backend/data/logos/1738846989098.png",
    "https://cryptobubbles.net/backend/data/logos/2011.png",
    "https://cryptobubbles.net/backend/data/logos/6210.png",
    "https://cryptobubbles.net/backend/data/logos/1742484841146.png",
    "https://cryptobubbles.net/backend/data/logos/3602.png",
    "https://cryptobubbles.net/backend/data/logos/16086.png",
    "https://cryptobubbles.net/backend/data/logos/1720.png",
    "https://cryptobubbles.net/backend/data/logos/-5000.png",
    "https://cryptobubbles.net/backend/data/logos/28541.png",
    "https://cryptobubbles.net/backend/data/logos/4558.png",
    "https://cryptobubbles.net/backend/data/logos/4705.png",
    "https://cryptobubbles.net/backend/data/logos/6538.png",
    "https://cryptobubbles.net/backend/data/logos/32880.png",
    "https://cryptobubbles.net/backend/data/logos/10804.png",
    "https://cryptobubbles.net/backend/data/logos/8425.png",
    "https://cryptobubbles.net/backend/data/logos/4846.png",
    "https://cryptobubbles.net/backend/data/logos/28177.png",
    "https://cryptobubbles.net/backend/data/logos/5665.png",
  ];
  const [images, setImages] = useState([]);
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages = await Promise.all(
        imgLinks.map((link) => loadImage(link))
      );
      setImages(loadedImages);
    };
    loadImages();
  }
  , []);

  return (
    <>
      <Navbar />
      {/* <div className={styles.blur}></div> */}
      {/* <div className={styles.header}>Coming Soon!</div> */}
      <Canvas style={canvasStyle} data={images} />
      <Footer style={footerStyle} />
    </>
  );
};

export default MemeBubble;
