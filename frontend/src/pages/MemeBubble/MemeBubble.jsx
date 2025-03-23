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
  const testData = [
    {
      image: "https://cryptobubbles.net/backend/data/logos/1.png",
      name: "Bitcoin",
      content: "0%",
      mcap: 1673569384960,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/1027.png",
      name: "Ethereum",
      content: "+0.7%",
      mcap: 242773701751,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/825.png",
      name: "Tether",
      content: "0%",
      mcap: 143464246170,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/52.png",
      name: "XRP",
      content: "-0.4%",
      mcap: 138920981622,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/1839.png",
      name: "BNB",
      content: "-1.4%",
      mcap: 90514356335,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/5426.png",
      name: "Solana",
      content: "+0.3%",
      mcap: 67422491689,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/3408.png",
      name: "USDC",
      content: "0%",
      mcap: 59586051162,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/2010.png",
      name: "Cardano",
      content: "-0.7%",
      mcap: 25545426789,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/74.png",
      name: "Dogecoin",
      content: "+0.7%",
      mcap: 25354572832,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/1958.png",
      name: "TRON",
      content: "+1.3%",
      mcap: 22493971283,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/1975.png",
      name: "Chainlink",
      content: "+0.4%",
      mcap: 9144412546,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/11419.png",
      name: "Toncoin",
      content: "+2.1%",
      mcap: 9145822677,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/3957.png",
      name: "LEO Token",
      content: "-0.2%",
      mcap: 9026346659,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/512.png",
      name: "Stellar",
      content: "0%",
      mcap: 8522333854,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/5805.png",
      name: "Avalanche",
      content: "-0.3%",
      mcap: 8088058070,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/4642.png",
      name: "Hedera",
      content: "-1.1%",
      mcap: 7753201997,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/5994.png",
      name: "Shiba Inu",
      content: "+1.6%",
      mcap: 7633992743,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/20947.png",
      name: "Sui",
      content: "-0.2%",
      mcap: 7225889377,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/2.png",
      name: "Litecoin",
      content: "+0.3%",
      mcap: 6955193351,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/1740321130693.png",
      name: "Pi Network",
      content: "-1%",
      mcap: 6790921851,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/6636.png",
      name: "Polkadot",
      content: "-0.6%",
      mcap: 6770850184,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/6536.png",
      name: "MANTRA",
      content: "+5.4%",
      mcap: 6558494038,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/1831.png",
      name: "Bitcoin Cash",
      content: "-0.3%",
      mcap: 6424258890,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/11092.png",
      name: "Bitget Token",
      content: "+3.7%",
      mcap: 5855231471,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/29470.png",
      name: "Ethena USDe",
      content: "0%",
      mcap: 5387150989,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/1733841723256.png",
      name: "Hyperliquid",
      content: "-1.8%",
      mcap: 5360292308,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/7083.png",
      name: "Uniswap",
      content: "-1.3%",
      mcap: 4056951535,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/328.png",
      name: "Monero",
      content: "+0.7%",
      mcap: 3986308713,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/21794.png",
      name: "Aptos",
      content: "-2.8%",
      mcap: 3385601430,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/6535.png",
      name: "NEAR Protocol",
      content: "-0.2%",
      mcap: 3321805993,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/4943.png",
      name: "Dai",
      content: "0%",
      mcap: 3221291646,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/24478.png",
      name: "Pepe",
      content: "-0.8%",
      mcap: 3068951872,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/3897.png",
      name: "OKB",
      content: "-1.9%",
      mcap: 3065374185,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/4269.png",
      name: "Gate",
      content: "+0.4%",
      mcap: 2832980552,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/8916.png",
      name: "Internet Computer",
      content: "+0.7%",
      mcap: 2803088137,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/7278.png",
      name: "Aave",
      content: "+1.2%",
      mcap: 2789033146,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/1321.png",
      name: "Ethereum Classic",
      content: "-1%",
      mcap: 2682346431,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/27075.png",
      name: "Mantle",
      content: "-0.6%",
      mcap: 2632563481,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/21159.png",
      name: "Ondo",
      content: "-0.3%",
      mcap: 2632724937,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/26081.png",
      name: "First Digital USD",
      content: "0%",
      mcap: 2476809922,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/3635.png",
      name: "Cronos",
      content: "+1%",
      mcap: 2208044414,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/1737204658.png",
      name: "Official Trump",
      content: "-0.4%",
      mcap: 2193414223,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/3077.png",
      name: "VeChain",
      content: "-1.3%",
      mcap: 2179480817,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/22974.png",
      name: "Bittensor",
      content: "+0.6%",
      mcap: 2154814581,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/3794.png",
      name: "Cosmos",
      content: "+0.3%",
      mcap: 2127373452,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/20396.png",
      name: "Kaspa",
      content: "-1.1%",
      mcap: 2042454880,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/30171.png",
      name: "Ethena",
      content: "+2.2%",
      mcap: 1949965909,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/2280.png",
      name: "Filecoin",
      content: "-0.5%",
      mcap: 1945765493,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/22861.png",
      name: "Celestia",
      content: "+1.3%",
      mcap: 1852285817,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/28321.png",
      name: "Polygon",
      content: "+0.5%",
      mcap: 1833497594,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/5690.png",
      name: "Render",
      content: "+1.4%",
      mcap: 1734567553,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/22615.png",
      name: "Fasttoken",
      content: "-0.1%",
      mcap: 1726143737,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/11841.png",
      name: "Arbitrum",
      content: "+0.5%",
      mcap: 1715866202,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/1736781553327.png",
      name: "Sonic (prev. FTM)",
      content: "+1.2%",
      mcap: 1673154722,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/29160.png",
      name: "HTX DAO",
      content: "+0.6%",
      mcap: 1669792392,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/4030.png",
      name: "Algorand",
      content: "-0.6%",
      mcap: 1614204520,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/1739437269063.png",
      name: "Story",
      content: "-0.1%",
      mcap: 1482530388,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/29210.png",
      name: "Jupiter",
      content: "+2.3%",
      mcap: 1467378916,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/11840.png",
      name: "Optimism",
      content: "0%",
      mcap: 1406208441,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/2087.png",
      name: "KuCoin",
      content: "+0.7%",
      mcap: 1381372396,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/3773.png",
      name: "ASI Alliance",
      content: "-1.1%",
      mcap: 1340636768,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/2694.png",
      name: "NEXO",
      content: "+2%",
      mcap: 1162055458,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/2634.png",
      name: "XDC Network",
      content: "+0.1%",
      mcap: 1136344271,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/3155.png",
      name: "Quant",
      content: "-1%",
      mcap: 1118207677,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/1518.png",
      name: "Maker",
      content: "+0.2%",
      mcap: 1056140617,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/10603.png",
      name: "Immutable",
      content: "+0.8%",
      mcap: 1052384951,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/1733757460765.png",
      name: "Movement",
      content: "-2.7%",
      mcap: 1048551346,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/23095.png",
      name: "Bonk",
      content: "+1.9%",
      mcap: 990036424,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/13502.png",
      name: "Worldcoin",
      content: "-1%",
      mcap: 988014282,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/7226.png",
      name: "Injective",
      content: "+0.2%",
      mcap: 978928509,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/7326.png",
      name: "DeXe",
      content: "-5.8%",
      mcap: 971688333,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/4847.png",
      name: "Stacks",
      content: "+0.5%",
      mcap: 963703099,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/23149.png",
      name: "Sei",
      content: "-0.6%",
      mcap: 950625819,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/8000.png",
      name: "Lido DAO",
      content: "+1.9%",
      mcap: 939469629,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/6719.png",
      name: "The Graph",
      content: "+1.4%",
      mcap: 930668896,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/2416.png",
      name: "Theta Network",
      content: "-2%",
      mcap: 929673185,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/7950.png",
      name: "Flare",
      content: "-2.9%",
      mcap: 890276244,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/1765.png",
      name: "EOS",
      content: "+0.6%",
      mcap: 853108561,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/27772.png",
      name: "PayPal USD",
      content: "0%",
      mcap: 842729567,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/7186.png",
      name: "PancakeSwap",
      content: "-1.2%",
      mcap: 784731702,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/7080.png",
      name: "GALA",
      content: "0%",
      mcap: 759293512,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/5176.png",
      name: "Tether Gold",
      content: "+0.1%",
      mcap: 747775397,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/1738846989098.png",
      name: "Berachain",
      content: "-1.4%",
      mcap: 722292947,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/1742484841146.png",
      name: "Four",
      content: "+3%",
      mcap: 720044058,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/2011.png",
      name: "Tezos",
      content: "-2.5%",
      mcap: 715269493,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/6210.png",
      name: "The Sandbox",
      content: "-0.6%",
      mcap: 696666064,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/16086.png",
      name: "BitTorrent",
      content: "-0.1%",
      mcap: 682347099,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/3602.png",
      name: "Bitcoin SV",
      content: "+0.6%",
      mcap: 681568577,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/1720.png",
      name: "IOTA",
      content: "+0.4%",
      mcap: 680597314,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/28541.png",
      name: "Jito",
      content: "-1%",
      mcap: 659418414,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/4558.png",
      name: "Flow",
      content: "-1.2%",
      mcap: 654941011,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/4705.png",
      name: "PAX Gold",
      content: "+0.1%",
      mcap: 652276364,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/6538.png",
      name: "Curve DAO",
      content: "+5.7%",
      mcap: 644234581,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/32880.png",
      name: "Kaia",
      content: "-0.3%",
      mcap: 632222255,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/10804.png",
      name: "FLOKI",
      content: "+0.7%",
      mcap: 614860022,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/28177.png",
      name: "Pyth Network",
      content: "+4.3%",
      mcap: 597209330,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/5665.png",
      name: "Helium",
      content: "-0.8%",
      mcap: 592817629,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/-5000.png",
      name: "HEX",
      content: "-14.5%",
      mcap: 591496403,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/8425.png",
      name: "JasmyCoin",
      content: "-4.7%",
      mcap: 589269773,
    },
    {
      image: "https://cryptobubbles.net/backend/data/logos/4846.png",
      name: "Kava",
      content: "-3.8%",
      mcap: 580530344,
    },
  ];
  const [data, setData] = useState([]);
  const [duration, setDuration] = useState("7D");
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:5000/bubble/getBubblesData"
      );
      const jsonData = await response.json();
      const loadedImages = await Promise.all(jsonData.map((e) => loadImage(e)));
      setData(loadedImages);
    };
    const fetchInterval = setInterval(() => {
      fetchData();
    }, 60000); // 1 minute interval
    fetchData();
    return () => clearInterval(fetchInterval); // Cleanup the interval on component unmount
  }, []);

  return (
    <>
      <Navbar />
      {/* <div className={styles.blur}></div> */}
      {/* <div className={styles.header}>Coming Soon!</div> */}
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
