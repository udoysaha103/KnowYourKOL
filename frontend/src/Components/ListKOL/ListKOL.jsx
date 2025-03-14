import React, {useEffect, useRef} from "react";
import styles from "./ListKOL.module.css";
import Icon from "../Icon";
const truncateText = (text) => {
    if (text.length >= 10) {
        return text.slice(0, 3) + "..." + text.slice(-3);
    }
    return text;
};
const ListKOL = ({KOLlist}) => {
    const copyRefs= useRef([]);
    const copyText = (idx, text) => {
        console.log("clicked")
        navigator.clipboard.writeText(text);
        copyRefs[idx].current.innerText = "Copied!";
        setTimeout(() => {
            copyRefs[idx].current.innerText = text;
        }
        , 1000);
    };
return  <>
    <table>
      <thead>
        <tr>
          <th />
          <th>Wallet Address</th>
          <th>ROI</th>
          <th>PnL Total</th>
          <th>
            <Icon name="ThumbsUp" color="#3ebf3b" height="24px" />
            Cooker
          </th>
          <th>
            <Icon name="ThumbsDown" color="#d41e27" height="24px" />
            Farmer
          </th>
          <th>
            <Icon name="RateReview" color="#f8f8f8" height="24px" />
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        {KOLlist.map((kol, index) => (
          <tr key={index}>
            <td>
              <div className={styles.avatarContainer}>
                <img
                  className={styles.avatar}
                  src={kol.avatar}
                  alt="avatar"
                />
              </div>
              <div className={styles.nameContainer}>
                <div className={styles.name}>
                  {index + 1}. {kol.name}
                </div>
                <div className={styles.icon}>
                  <Icon name="Crown" color="#f8d568" height="24px" />
                </div>
              </div>
            </td>
            <td>
              <div className={styles.addrContainer} ref={e => copyRefs.current.push(e)}>
                {truncateText(kol.address)}&nbsp;
                <Icon name="Copy" color="#f8f8f8" height="24px" onClick={() => copyText(index, kol.address)}/>
              </div>
            </td>
            <td>
              <div className={styles.roiContainer}>{kol.roi}</div>
            </td>
            <td>
              <div className={styles.pnlContainer}>{kol.pnl}</div>
            </td>
            <td>
              <div className={styles.cookerContainer}>
                <Icon name="RocketLaunch" color="#f8f8f8" height="24px" /> &nbsp;
                {kol.cooker}
              </div>
            </td>
            <td>
              <div className={styles.farmerContainer}>
                <Icon name="Skull" color="#f8f8f8" height="21px" /> &nbsp;
                {kol.farmer}
              </div>
            </td>
            <td>
              <div className={styles.reviewContainer}>{kol.review}</div>
            </td>
            <td>
              <input
                className={styles.review}
                type="text"
                placeholder="Review"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
};

export default ListKOL;
