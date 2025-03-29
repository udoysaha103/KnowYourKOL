import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import styles from "./MemeBubble.module.css";
import Canvas from "../../Components/Canvas/Canvas";
import { formatAge } from "../../utils/timeConvert";
import { formatMcap } from "../../utils/priceFormat";
const digit = 1;
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
        priceChange30D: e.priceChange30D,
        ...e,
      });
    i.src = e.photoURL;
  });
const MemeBubble = () => {
  const [data, setData] = useState([]);
  const [duration, setDuration] = useState("24H");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/bubble/getBubblesData`);
      const jsonData = await response.json();
      const loadedImages = await Promise.all(jsonData.map((e) => loadImage(e)));
      setData(loadedImages);
      setLoading(false);
    };
    fetchData();
    const fetchDataInterval = setInterval(() => {
      fetchData();
    }, 60000);
    return () => clearInterval(fetchDataInterval);
  }, []);
  document.title = "Meme Bubbles";
  return (<>
    <div className={styles.container}>
      <Navbar />
      {loading && <div className={styles.msg}>Loading...</div>}
      {data.length === 0 && !loading && (
        <div className={styles.msg}>
          No data available now, refresh this page after some time.
        </div>
      )}
      <div/>
      <div
        className={styles.timerCompleted}
      />
      <div className={styles.selectorContainer}>
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
        <div
          className={`${styles.selector} ${
            duration === "30D" && styles.selected
          }`}
          onClick={() => setDuration("30D")}
        >
          30D
        </div>
      </div>
      <Canvas
        data={data.map((e) => {
          return {
            image: e.image,
            name: e.name,
            content: e[`priceChange${duration}`],
            mcap: e.mcap,
          };
        })}
      />

      <table className={styles.bubbleInfo}>
        <thead>
          <tr>
            <th className={styles.bubbleInfoHeader}>Rank #</th>
            <th className={styles.bubbleInfoHeader}>Name</th>
            <th className={styles.bubbleInfoHeader}>Price</th>
            <th className={styles.bubbleInfoHeader}>Mcap</th>
            <th className={styles.bubbleInfoHeader}>FDV</th>
            <th className={styles.bubbleInfoHeader}>Age</th>
            <th className={styles.bubbleInfoHeader}>1H</th>
            <th className={styles.bubbleInfoHeader}>6H</th>
            <th className={styles.bubbleInfoHeader}>1D</th>
            <th className={styles.bubbleInfoHeader}>7D</th>
            <th className={styles.bubbleInfoHeader}>30D</th>
            <th className={`${styles.bubbleInfoHeader} ${styles.link}`}>Links</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, i) => (
            <tr key={i}>
              <td className={styles.bubbleInfoCell}>{i + 1}</td>
              <td className={styles.bubbleInfoCell}>{e.name}</td>
              <td className={styles.bubbleInfoCell}>{e.currentPrice}</td>
              <td className={styles.bubbleInfoCell}>{formatMcap(e.mcap)}</td>
              <td className={styles.bubbleInfoCell}>{formatMcap(e.FDV)}</td>
              <td className={styles.bubbleInfoCell}>{formatAge(e.createdAt)}</td>
              <td className={styles.bubbleInfoCell}>
                {e.priceChange1H.toFixed(digit)}%
              </td>
              <td className={styles.bubbleInfoCell}>{e.priceChange6H.toFixed(digit)}%</td>
              <td className={styles.bubbleInfoCell}>
                {e.priceChange24H.toFixed(digit)}%
              </td>
              <td className={styles.bubbleInfoCell}>
                {e.priceChange7D.toFixed(digit)}%
              </td>
              <td className={styles.bubbleInfoCell}>
                {e.priceChange30D.toFixed(digit)}%
              </td>
              <td className={styles.bubbleInfoCell}>
                <a href={`https://dexscreener.com/solana/${e.pairAddress}`} target="_blank">
                  <img src="/dex.svg" />
                </a>
                <a href={`https://axiom.trade/t/${e.coinAddress}/@kykol`} target="_blank">
                  <img src="/axiom.svg" />
                </a>
                <a href={`https://neo.bullx.io/terminal?chainId=1399811149&address=${e.coinAddress}`} target="_blank">
                  <img src="/bullX.svg" />
                </a>
                <a href={`https://gmgn.ai/sol/token/${e.coinAddress}`} target="_blank">
                  <img src="/gmgn.svg" />
                </a>
                <a href={`https://photon-sol.tinyastro.io/en/lp/${e.pairAddress}`} target="_blank">
                  <img src="/photon.svg" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer/>
    </div>
      </>
  );
};

export default MemeBubble;
