import "./Home.css";
import { useState, useEffect, useRef } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Link } from "react-router-dom";
import Star from "../../Components/Star/Star";
import ListKOL from "../../Components/ListKOL/ListKOL";
import Footer from "../../Components/Footer/Footer";
import { copyText } from "../../utils/textUtils";

function Home() {
  document.title = "Know Your KOL";

  // copy the address to clipboard
  const timeConvert = (duration) => {
    if (duration < 60) {
      return duration.toFixed(1) + "s";
    }
    if (duration < 3600) {
      return (duration / 60).toFixed(1) + "m";
    }
    if (duration < 86400) {
      return (duration / 3600).toFixed(1) + "h";
    }
    return (duration / 86400).toFixed(1) + "d";
  };
  const truncateText = (text) => {
    if (text.length >= 10) {
      return text.slice(0, 3) + "..." + text.slice(-3);
    }
    return text;
  };
  const truncateName = (text) => {
    if (text.length >= 10) {
      return text.slice(0, 9) + "...";
    }
    return text;
  };

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

  const [KOLlist, setKOLlist] = useState(null);
  const [risingStars, setRisingStars] = useState(null);
  const [firstUser, setFirstUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [kingImgLoading, setKingImgLaoading] = useState(true);
  const copyRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/getKOL/getKOLoverall/1`)
      .then((response) => response.json())
      .then((data) => {
        setKOLlist(data);
        setFirstUser(data[0]);
      });
    setLoading(false);
    fetch(`${import.meta.env.VITE_API_URL}/getKOL/getRisingStars`)
      .then((response) => response.json())
      .then((data) => {
        setRisingStars(data);
      });
  }, []);

  return (
    <div id="bodyWrapper">
      <Navbar />

      <div id="homeContent">
        <div id="banner">
          <Link
            id="King"
            to={"/profile/" + (firstUser && firstUser._id)}
            className={loading || kingImgLoading ? "loading" : ""}
          >
            {firstUser && (
              <>
                <img src="/king.png" alt="KING" id="KingIcon" />

                <div id="KingImg" className={!kingImgLoading ? "fire" : ""}>
                  {/* <img src="/King_of_KOLs.gif" alt="KING OF KOLS" id="KingImgSvg" /> */}
                  <img
                    src={firstUser.photoPath}
                    alt="KING OF KOLS"
                    id="avatar"
                    onLoad={() => setKingImgLaoading(false)}
                    onError={() => {
                      firstUser.photoPath = "/default_avatar.png";
                      setKingImgLaoading(false);
                    }}
                  />
                </div>

                <div id="KingInfo">
                  <div id="KingName">
                    <div id="KingCrown">
                      <img src="/king_crown.png" alt="King Crown" />
                    </div>
                    <div id="nameOfKing">
                      {truncateName(firstUser.twitterName)}
                    </div>
                  </div>
                  {firstUser.walletAddress !== "Hidden" ? (
                    <p
                      id="KingAddr"
                      onClick={(e) => {
                        e.preventDefault();
                        copyText(copyRef.current, firstUser.walletAddress);
                      }}
                    >
                      <span ref={copyRef}>
                        {truncateText(firstUser.walletAddress)}
                      </span>
                      <img src="content_copy.svg" alt="copy" />
                    </p>
                  ) : (
                    <p id="KingAddr">
                      <span id="addr4cpy">{firstUser.walletAddress}</span>
                    </p>
                  )}
                  {firstUser.verifiedByAdmin && (
                    <p id="verificationText">Verified KOL</p>
                  )}
                </div>

                <div className="KingStats">
                  {firstUser.ROI1D !== 0 && (
                    <p>
                      ROI:{" "}
                      <span className={firstUser.ROI1D < 0 ? "negative" : ""}>
                        {(firstUser.ROI1D * 100).toFixed(1)}%
                      </span>
                    </p>
                  )}
                  {firstUser.PnLtotal1D !== 0 && (
                    <p>
                      PnL:{" "}
                      <span
                        className={firstUser.PnLtotal7D < 0 ? "negative" : ""}
                      >
                        {formatSOL(firstUser.PnLtotal7D, 1)} Sol
                      </span>
                    </p>
                  )}
                  {firstUser.buy1D !== 0 && firstUser.sell1D !== 0 && (
                    <p>
                      TXs: <span>{firstUser.buy1D}</span>/
                      <span className="negative">{firstUser.sell1D}</span>
                    </p>
                  )}
                </div>

                <div className="KingStats KingStats2">
                  {firstUser.cookerCount !== undefined && (
                    <p>
                      Upvotes: <strong>{firstUser.cookerCount}</strong>
                    </p>
                  )}
                  {firstUser.reviewCount !== undefined && (
                    <p>
                      Reviews: <strong>{firstUser.reviewCount}</strong>
                    </p>
                  )}
                  {firstUser.avgHoldingDuration !== undefined && (
                    <p style={{ fontSize: "13px", display: "inline" }}>
                      Avg. Held:{" "}
                      <strong>
                        {timeConvert(firstUser.avgHoldingDuration)}
                      </strong>
                    </p>
                  )}
                </div>
              </>
            )}
          </Link>

          <div id="starContainer">
            <div id="starHeader" />
            <div id="starBody">
              {risingStars && (
                <>
                  <div className="starColumn">
                    {risingStars.slice(0, 2).map((star, index) => (
                      <Star
                        key={index}
                        pic_path={star.photoPath}
                        name={star.twitterName}
                        roi={star.ROI1D}
                        pnl={star.PnLtotal1D}
                        buy={star.buy1D}
                        sell={star.sell1D}
                        id={star._id}
                      />
                    ))}
                  </div>
                  <div className="starColumn">
                    {risingStars.slice(2, 4).map((star, index) => (
                      <Star
                        key={index}
                        pic_path={star.photoPath}
                        name={star.twitterName}
                        roi={star.ROI1D}
                        pnl={star.PnLtotal1D}
                        buy={star.buy1D}
                        sell={star.sell1D}
                        id={star._id}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <ListKOL KOLlist={KOLlist} setKOLlist={setKOLlist} />

        <Footer />
      </div>
    </div>
  );
}

export default Home;
