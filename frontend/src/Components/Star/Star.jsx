import React from "react";
import styles from "./Star.module.css";
import { useNavigate } from "react-router-dom";

const Star = ({ pic_path, name, roi, pnl, id }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.card} onClick={() => navigate(`/profile/${id}`)}>
      <div>
        <img className={styles.circle} src={pic_path} alt={name} />
      </div>
      <div className={styles.name}>
        <p>{name}</p>
      </div>
      <div className={styles.footer}>
        <div>
          <p className={styles.key}>ROI</p>
          <p
            className={`${styles.value} ${
              roi[0] === "-" ? styles.negative : ""
            }`}
          >
            {roi}
          </p>
        </div>
        <div>
          <p className={styles.key}>PnL</p>
          <p
            className={`${styles.value} ${
              pnl[0] === "-" ? styles.negative : ""
            }`}
          >
            {pnl}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Star;
