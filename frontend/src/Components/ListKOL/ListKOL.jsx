import React, {useRef} from "react";
import styles from "./ListKOL.module.css";
import Icon from "../Icon";
import { Link } from "react-router-dom";


const ListKOL = ({KOLlist}) => {
    const copyRefs= useRef([]);

    const copyText = (event, idx, text) => {
      event.preventDefault();
      navigator.clipboard.writeText(text);
      console.log(copyRefs[idx]);
      // copyRefs[idx].current.innerText = "Copied!";
      document.getElementById(idx+"text").innerText = "Copied!";
      setTimeout(() => {
          // copyRefs[idx].current.innerText = text;
          document.getElementById(idx+"text").innerText = truncateText(text);
      }
      , 1000);
    };

    const truncateText = (text) => {
      if (text.length >= 10) {
          return text.slice(0, 3) + "..." + text.slice(-3);
      }
      return text;
  };

  return(
  <div className="InfoWrapper">
    <div className="container">
      <table>
        <thead>
          <tr>
            <th />
            <th>Wallet Address</th>
            <th className="emptySpace">&nbsp;</th>
            <th>ROI</th>
            <th>PnL Total</th>
            <th className="emptySpace">&nbsp;</th>
            <th>
              <Icon name="ThumbsUp" color="#3ebf3b" height="24px" />
              &nbsp;Cooker
            </th>
            <th>
              <Icon name="ThumbsDown" color="#d41e27" height="24px" />
              &nbsp;Farmer
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
              <Link to="" style={{textDecoration: "none"}}>
                <td className={styles.nameField}>
                  <div className={styles.avatarContainer}>
                    <img
                      className={styles.avatar}
                      src={kol.avatar}
                      alt="avatar"
                    />
                  </div>
                  <div className={styles.nameContainer}>
                    <div className={styles.name}>
                      <p style={{textDecoration: "none"}}>{index + 1}.{kol.name}</p>
                    </div>
                    <div className={styles.icon}>
                      {(index === 0) ? (
                        <Icon name="Crown" color="#fcb434" height="24px" />
                      ) : (index === 1) ? (
                        <Icon name="Crown" color="#c0c0c0" height="24px" />
                      ) : (index === 2) ? (
                        <Icon name="Crown" color="#a77044" height="24px" />
                      ) : null}
                    </div>
                  </div>
                </td>
              </Link>

              <td>
                <div className={styles.addrContainer} ref={e => copyRefs.current.push(e)} onClick={(e) => copyText(e, index, kol.address)}>
                  <span id={index+"text"}>{truncateText(kol.address)}&nbsp;</span>
                  <Icon name="Copy" color="#f8f8f8" height="24px"/>
                </div>
              </td>
              <td className="emptySpace"></td>
              <td>
                <div className={styles.roiContainer}>{kol.roi}</div>
              </td>
              <td>
                <div className={styles.pnlContainer}>{kol.pnl}</div>
              </td>
              <td className="emptySpace"></td>
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
                <Link to="" className={styles.review}>
                  Review
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>)
};

export default ListKOL;
