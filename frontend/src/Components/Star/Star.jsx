import React from "react";
import styles from "./Star.module.css";
import { useNavigate } from "react-router-dom";

const Star = ({ pic_path, name, roi, pnl, id, buy, sell }) => {
  const navigate = useNavigate();
  const formatSOL = (sol, digit) => {
    let sign = "";
    if (sol >= 0) {
      sign = "+";
    }

    if (Math.abs(sol) < 1000) {
      return sign + sol.toFixed(digit);
    } else if (Math.abs(sol) < 1000000) {
      return sign + (sol / 1000).toFixed(digit) + "k";
    } else {
      return sign + (sol / 1000000).toFixed(digit) + "M";
    }
  };
  return (
    <div className={styles.container}>
      <div className={`${styles.column} ${styles.imageContainer}`}>
        <img
          className={styles.image}
          src={pic_path}
          alt={name}
          onClick={() => navigate(`/star/${id}`)}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/profile-default.svg";
          }}
        />
      </div>
      <div className={styles.column}>
        <div id={styles.name}>{name}</div>
        <div>
          ROI: <span className={roi >= 0 ? styles.green : styles.red }>{(roi*100).toFixed(2)}%</span>
        </div>
        <div>
          PnL: <span className={pnl >= 0 ? styles.green : styles.red}>{formatSOL(pnl)} Sol</span>
        </div>
        <div>
          TXs: <span className={styles.green}>{buy}</span>/
          <span className={styles.red}>{sell}</span>
        </div>
      </div>
    </div>
  );
};

export default Star;
