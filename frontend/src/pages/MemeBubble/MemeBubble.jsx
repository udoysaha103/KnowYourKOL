import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import styles from "./MemeBubble.module.css";
import Canvas from "../../Components/Canvas/Canvas";
const topGap = 66;
const canvasStyle = {
  position: "absolute",
  top: topGap,
  left: 0,
  zIndex: 1,
};
const footerStyle = {
  position: "fixed",
  bottom: 0,
  width: "100%",
  zIndex: 100,
};
const timerStyle = {
  position: "absolute",
  top: topGap - 4,
  width: "100%",
  height: "4px",
  backgroundColor: "#c2c2c2",
  borderRadius: "2px",
};

const selectorStyle = {
  top: topGap,
};
const loadImage = (e) =>
  new Promise((r) => {
    let i = new Image();
    i.onload = () =>
      r({
        image: i,
        mcap: e.mCap,
        name: e.bubbleName,
        priceChange7D: e.priceChange7D,
        priceChange24H: e.priceChange24H,
        priceChange1H: e.priceChange1H,
      });
    i.src = e.photoURL;
  });
const MemeBubble = () => {
  const [data, setData] = useState([]);
  const [duration, setDuration] = useState("7D");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/bubble/getBubblesData`
      );
      const jsonData = await response.json();
      const loadedImages = await Promise.all(jsonData.map((e) => loadImage(e)));
      setData(loadedImages);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      {loading && <div className={styles.loading}>Loading...</div>}
      <div style={timerStyle} />
      <div
        style={{ position: "absolute", top: topGap - 4 }}
        className={styles.timerCompleted}
      />
      <div className={styles.selectorContainer} style={selectorStyle}>
        <div
          className={`${styles.selector} ${
            duration === "1H" && styles.selected
          }`}
          onClick={() => setDuration("1H")}
        >
          1H
        </div>
        <div
          className={`${styles.selector} ${
            duration === "24H" && styles.selected
          }`}
          onClick={() => setDuration("24H")}
        >
          1D
        </div>
        <div
          className={`${styles.selector} ${
            duration === "7D" && styles.selected
          }`}
          onClick={() => setDuration("7D")}
        >
          7D
        </div>
      </div>
      <Canvas
        style={canvasStyle}
        topGap={topGap}
        data={data.map((e) => {
          return {
            image: e.image,
            name: e.name,
            content: e[`priceChange${duration}`],
            mcap: e.mcap,
          };
        })}
      />
      <Footer style={footerStyle} />
    </>
  );
};

export default MemeBubble;
