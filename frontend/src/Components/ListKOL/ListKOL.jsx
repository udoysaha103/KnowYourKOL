import React, { useEffect, useRef, useState } from "react";
import styles from "./ListKOL.module.css";
import Icon from "../Icon";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { copyElementText } from "../../utils/textUtils";

const ListKOL = ({ KOLlist, setKOLlist }) => {
  const copyRefs = useRef([]);
  const [duration, setDuration] = useState(1);
  const [sortMethod, setSortMethod] = useState("PnL");
  const [paginatedKOLlist, setPaginatedKOLlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100; // Number of items to display per page
  const Navigate = useNavigate();

  const paginate = (list, itemsPerPage) => {
    const paginatedList = [];
    for (let i = 0; i < list.length; i += itemsPerPage) {
      paginatedList.push(list.slice(i, i + itemsPerPage));
    }
    return paginatedList;
  };
  useEffect(() => {
    if (KOLlist && KOLlist.length > 0) {
      setPaginatedKOLlist(paginate(KOLlist, itemsPerPage));
    } else {
      setPaginatedKOLlist([]);
    }
  }, [KOLlist]);

  const handleDuration = (duration) => {
    setDuration(duration);
    if (sortMethod === "Sentiment") {
      setDuration(duration);
    } else if (sortMethod === "PnL") {
      fetch(`${import.meta.env.VITE_API_URL}/getKOL/getKOLpnl/${duration}`)
        .then((response) => response.json())
        .then((data) => {
          setKOLlist(data);
          console.log(paginatedKOLlist);
        });
    } else {
      fetch(`${import.meta.env.VITE_API_URL}/getKOL/getKOLoverall/${duration}`)
        .then((response) => response.json())
        .then((data) => {
          setKOLlist(data);
        });
    }
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
  };

  const truncateText = (text) => {
    if (text.length >= 10) {
      return text.slice(0, 3) + "..." + text.slice(-3);
    }
    return text;
  };

  const handleSort = (strategy) => {
    setSortMethod(strategy);

    if (strategy === "Overall") {
      fetch(`${import.meta.env.VITE_API_URL}/getKOL/getKOLoverall/${duration}`)
        .then((response) => response.json())
        .then((data) => {
          setKOLlist(data);
        });
    } else if (strategy === "PnL") {
      fetch(`${import.meta.env.VITE_API_URL}/getKOL/getKOLpnl/${duration}`)
        .then((response) => response.json())
        .then((data) => {
          setKOLlist(data);
        });
    } else if (strategy === "Sentiment") {
      fetch(`${import.meta.env.VITE_API_URL}/getKOL/getKOLsentiment`)
        .then((response) => response.json())
        .then((data) => {
          setKOLlist(data);
        });
    }
  };

  return (
    <div className={styles.InfoWrapper}>
      <div id={styles.options}>
        <div id={styles.sortBy}>
          <div>Ranking Based on:</div>
          <div id={styles.sortButton}>
            <Icon name="Sort" color="#f8f8f8" height="24px"></Icon>
          </div>
          <div
            className={`${styles.sortOverall} ${
              sortMethod === "Overall" ? styles.active : ""
            }`}
            onClick={() => handleSort("Overall")}
          >
            Overall
          </div>
          <div
            className={`${styles.sortPnL} ${
              sortMethod === "PnL" ? styles.active : ""
            }`}
            onClick={() => handleSort("PnL")}
          >
            PnL
          </div>
          <div
            className={`${styles.sortPnL} ${styles.sortSentiment} ${
              sortMethod === "Sentiment" ? styles.active : ""
            }`}
            onClick={() => handleSort("Sentiment")}
          >
            Follower's Sentiment
          </div>
        </div>
        <div id={styles.filter}>
          <div>Sort by &nbsp;</div>
          <div className={styles.filterButtons}>
            <div
              className={duration === 1 ? styles.active : ""}
              onClick={() => handleDuration(1)}
            >
              1D
            </div>
            <div
              className={duration === 7 ? styles.active : ""}
              onClick={() => handleDuration(7)}
            >
              7D
            </div>
            <div
              className={duration === 30 ? styles.active : ""}
              onClick={() => handleDuration(30)}
            >
              30D
            </div>
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
                <Icon
                  name="ThumbsUp"
                  color="#3ebf3b"
                  height="1.5em"
                  style={{ marginBottom: "0.25em" }}
                />
                &nbsp;Cooker
              </th>
              <th>
                <Icon name="ThumbsDown" color="#d41e27" height="1.5em" />
                &nbsp;Farmer
              </th>
              <th>
                <Icon name="RateReview" color="#f8f8f8" height="1.5em" />
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {paginatedKOLlist[currentPage - 1] &&
              paginatedKOLlist[currentPage - 1].map((kol, index) => (
                <tr key={index}>
                  <td
                    className={styles.nameField}
                    onClick={() => Navigate("/profile/" + kol._id)}
                  >
                    <div className={styles.avatarContainer}>
                      <img
                        className={`${styles.avatar} ${
                          styles[`avatar_${index}`]
                        }`}
                        src={kol.photoPath}
                        alt="avatar"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/profile-default.svg";
                        }}
                      />

                      <div className={styles.nameContainer}>
                        <div className={styles.name}>
                          <p style={{ textDecoration: "none" }}>
                            {index + 1}. {kol.twitterName.length > 9 ? kol.twitterName.slice(0, 9) + "..." : kol.twitterName}
                          </p>
                        </div>
                        <div className={styles.icon}>
                          {index === 0 ? (
                            <Icon name="Crown" color="#fcb434" height="1.5em" />
                          ) : index === 1 ? (
                            <Icon name="Crown" color="#c0c0c0" height="1.5em" />
                          ) : index === 2 ? (
                            <Icon name="Crown" color="#a77044" height="1.5em" />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className={styles.addrField}>
                    {kol.walletAddress !== "Hidden" ? (
                      <div
                        className={styles.addrContainer}
                        onClick={(e) => {
                          e.preventDefault();
                          copyElementText(
                            copyRefs.current[index],
                            kol.walletAddress
                          );
                        }}
                      >
                        <span ref={(e) => copyRefs.current.push(e)}>
                          {truncateText(kol.walletAddress)}&nbsp;
                        </span>
                        <Icon name="Copy" color="#f8f8f8" height="1em" width="auto" />
                      </div>
                    ) : (
                      <div
                        className={styles.addrContainer}
                        ref={(e) => copyRefs.current.push(e)}
                        style={{ cursor: "default" }}
                      >
                        <span id={index + "text"}>
                          {truncateText(kol.walletAddress)}&nbsp;
                        </span>
                      </div>
                    )}
                  </td>

                  <td className={styles.emptySpace}></td>

                  <td className={styles.roiField}>
                    <div
                      className={`${styles.roiContainer} ${
                        kol[`ROI${duration}D`] < 0 ? styles.negative : ""
                      }`}
                      style={{ padding: "10px" }}
                    >
                      {(kol[`ROI${duration}D`] * 100).toFixed(2)}%
                    </div>
                  </td>

                  <td className={styles.pnlField}>
                    <div
                      className={`${styles.pnlContainer} ${
                        kol[`PnLtotal${duration}D`] < 0 ? styles.negative : ""
                      }`}
                    >
                      {formatSOL(kol[`PnLtotal${duration}D`])} Sol
                    </div>
                  </td>

                  <td className={styles.emptySpace}></td>

                  <td className={styles.cookerField}>
                    <div className={styles.cookerContainer}>
                      <Icon name="RocketLaunch" color="#f8f8f8" height="1.5em" />{" "}
                      &nbsp;
                      {kol.cookerCount}
                    </div>
                  </td>

                  <td className={styles.farmerField}>
                    <div className={styles.farmerContainer}>
                      <Icon name="Skull" color="#f8f8f8" height="1.35em" /> &nbsp;
                      {kol.farmerCount}
                    </div>
                  </td>

                  <td className={styles.reviewField}>
                    <div className={styles.reviewContainer}>
                      {kol.reviewCount}
                    </div>
                  </td>

                  <td className={styles.reviewDomain}>
                    <button
                      className={styles.review}
                      onClick={() => Navigate("/profile/" + kol._id)}
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {paginatedKOLlist && paginatedKOLlist.length > 1 && (
        <div className={styles.pagination}>
          Page # &nbsp;
          {paginatedKOLlist && paginatedKOLlist.length > 1
            ? paginatedKOLlist.map((_, index) => (
                <div
                  key={index}
                  className={`${styles.pageNumber} ${
                    currentPage === index + 1 ? styles.active : ""
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </div>
              ))
            : ""}
        </div>
      )}
    </div>
  );
};

export default ListKOL;
