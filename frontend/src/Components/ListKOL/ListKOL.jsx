import React, {useRef, useState} from "react";
import styles from "./ListKOL.module.css";
import Icon from "../Icon";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ListKOL = ({KOLlist, setKOLlist}) => {
    const copyRefs= useRef([]);
    const [duration, setDuration] = useState(1);
    const [sortMethod, setSortMethod] = useState("Overall");

    const Navigate = useNavigate();

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

  const formatSOL = (sol) => {
    let sign = "";
    if (sol >= 0) {
      sign = "+";
    }

    if (Math.abs(sol) < 1000) {
      return sign + sol.toFixed(2);
    } else if (Math.abs(sol) < 1000000) {
      return sign + (sol / 1000).toFixed(2) + "k";
    } else {
      return sign + (sol / 1000000).toFixed(2) + "M";
    }
  }

  const truncateText = (text) => {
    if (text.length >= 10) {
        return text.slice(0, 3) + "..." + text.slice(-3);
    }
    return text;
  };

  const handleSort = (strategy) => {
    setSortMethod(strategy);

    if (strategy === "Overall") {
      fetch("http://localhost:5000/getKOL/getKOLoverall")
        .then((response) => response.json())
        .then((data) => {
          setKOLlist(data);
        });
    }
    else if (strategy === "PnL") {
      fetch("http://localhost:5000/getKOL/getKOLpnl")
        .then((response) => response.json())
        .then((data) => {
          setKOLlist(data);
        });
    }
    else if (strategy === "Sentiment") {
      fetch("http://localhost:5000/getKOL/getKOLsentiment")
        .then((response) => response.json())
        .then((data) => {
          setKOLlist(data);
        });
    }

  };

  return(
  <div className={styles.InfoWrapper}>
    <div id={styles.options}>
      <div id={styles.sortBy}>
        <div>Ranking Based on:</div>
        <div id={styles.sortButton}><Icon name="Sort" color="#f8f8f8" height="24px"></Icon></div>
        <div className={styles.sortOverall} id={sortMethod === "Overall" ? styles.activeDuration : ""} onClick={() => handleSort("Overall")}>Overall</div>
        <div className={styles.sortPnL} id={sortMethod === "PnL" ? styles.activeDuration : ""} onClick={() => handleSort("PnL")}>PnL</div>
        <div className={styles.sortPnL} id={sortMethod === "Sentiment" ? styles.activeDuration : ""} onClick={() => handleSort("Sentiment")}>Follower's Seniment</div>
      </div>
      <div id={styles.filter}>
        <div>PnL</div>
        <div className={styles.filterButtons}>
          <div id={(duration === 1 ? styles.activeDuration : "")} onClick={() => setDuration(1)}>1D</div>
          <div id={duration === 7 ? styles.activeDuration : ""} onClick={() => setDuration(7)}>7D</div>
          <div id={duration === 30 ? styles.activeDuration : ""} onClick={() => setDuration(30)}>30D</div>
        </div>
      </div>
    </div>
    <div className={styles.tableWrapper}>
      <table>
        <thead>
          <tr>
            <th />
            <th>Wallet Address</th>
            <th className={styles.emptySpace}>&nbsp;</th>
            <th>ROI</th>
            <th>PnL Total</th>
            <th className={styles.emptySpace}>&nbsp;</th>
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
          {KOLlist && KOLlist.map((kol, index) => (
            <tr key={index}>
                <td className={styles.nameField} onClick={() => Navigate("/profile/"+kol._id)}>
                  <div className={styles.avatarContainer} >
                    <img
                      className={styles.avatar}
                      src={kol.photoPath}
                      alt="avatar"
                    />
                    <div className={styles.nameContainer}>
                      <div className={styles.name}>
                        <p style={{textDecoration: "none"}}>{index + 1}.{kol.twitterName}</p>
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
                  </div>
                </td>

              <td>
                <div className={styles.addrContainer} ref={e => copyRefs.current.push(e)} onClick={(e) => copyText(e, index, kol.walletAddress)}>
                  <span id={index+"text"}>{truncateText(kol.walletAddress)}&nbsp;</span>
                  <Icon name="Copy" color="#f8f8f8" height="24px"/>
                </div>
              </td>

              <td className="emptySpace"></td>

              <td>
                <div className={styles.roiContainer} style={{padding:"10px"}}>{((duration === 1 ? kol.ROI1D : (duration === 7 ? kol.ROI7D : (duration === 30 ? kol.ROI30D : "")))*100).toFixed(2)}%</div>
              </td>
              <td>
                <div className={styles.pnlContainer}>{formatSOL(duration === 1 ? kol.PnLtotal1D : (duration === 7 ? kol.PnLtotal7D : (duration === 30 ? kol.PnLtotal30D : "")))} Sol</div>
              </td>
              <td className="emptySpace"></td>
              <td>
                <div className={styles.cookerContainer}>
                  <Icon name="RocketLaunch" color="#f8f8f8" height="24px" /> &nbsp;
                  {kol.cookerCount}
                </div>
              </td>
              <td>
                <div className={styles.farmerContainer}>
                  <Icon name="Skull" color="#f8f8f8" height="21px" /> &nbsp;
                  {kol.farmerCount}
                </div>
              </td>
              <td>
                <div className={styles.reviewContainer}>{kol.cookerCount+kol.farmerCount}</div>
              </td>
              <td>
                <button className={styles.review} onClick={() => Navigate("/profile/"+kol._id)}>
                  Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>)
};

export default ListKOL;
