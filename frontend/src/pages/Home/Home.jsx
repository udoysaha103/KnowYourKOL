import "./Home.css";
import { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Link } from "react-router-dom";
import Star from "../../Components/Star/Star";
import ListKOL from "../../Components/ListKOL/ListKOL";
import Footer from "../../Components/Footer/Footer";

function Home() {
  document.title = "Know Your KOL";
  
  // copy the address to clipboard
  const truncateText = (text) => {
    if (text.length >= 10) {
      return text.slice(0, 3) + "..." + text.slice(-3);
    }
    return text;
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

  const copyAddress = (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(firstUser.walletAddress);
    document.getElementById("addr4cpy").innerHTML = "Copied!";
    setTimeout(() => {
      document.getElementById("addr4cpy").innerHTML = truncateText(firstUser.walletAddress);
    }, 1000);
  };
  const [KOLlist, setKOLlist] = useState(null);
  const [risingStars, setRisingStars] = useState(null);
  const [firstUser, setFirstUser] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/getKOL/getKOLoverall/1`)
      .then((response) => response.json())
      .then((data) => {
        setKOLlist(data);
        console.log(data[0]);
        setFirstUser(data[0]);
      });
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
        <Link id="King" to={"/profile/" + (firstUser && firstUser._id)}>
          <img src="/king.png" alt="KING" id="KingIcon" />
          <div id="KingImg" >
            <img src="/King_of_KOLs.gif" alt="KING OF KOLS" id="KingImgSvg"/>
            <img src={firstUser && firstUser.photoPath} alt="KING OF KOLS" id="avatar"/>
          </div>

          <div id="KingInfo">
            
            <div id="KingName">
              <div id="KingCrown"><img src="/king_crown.png" alt="King Crown" /></div>
              <div id="nameOfKing">{firstUser && firstUser.twitterName}</div>
            </div>
            {firstUser && firstUser.walletAddress !== "Hidden" ?
              (<p id="KingAddr" onClick={(e) => copyAddress(e)}>
                <span id="addr4cpy">{firstUser && truncateText(firstUser.walletAddress)}</span>
                <img src="content_copy.svg" alt="copy" />
              </p>) :
              (<p id="KingAddr">
                <span id="addr4cpy">{firstUser && firstUser.walletAddress}</span>
              </p>)
            }
            {firstUser && firstUser.verifiedByAdmin && <p id="verificationText">Verified KOL</p>}
          </div>

          <div className="KingStats">
            <p>
              ROI:{" "}
              <span className={firstUser && firstUser.ROI1D < 0 ? "negative" : ""}>{firstUser && (firstUser.ROI1D * 100).toFixed(2)}%</span>
            </p>
            <p>
              PnL:{" "}
              <span className={firstUser && firstUser.PnLtotal7D < 0 ? "negative" : ""}>{firstUser && formatSOL(firstUser.PnLtotal7D)} Sol</span>
            </p>
            <p>
              Balance:{" "}
              <span className={firstUser && firstUser.walletBalance < 0 ? "negative" : ""}>{firstUser && firstUser.walletBalance.toFixed(2)} Sol</span>
            </p>
          </div>

          <div className="KingStats KingStats2">
            <p>
              Upvotes: <strong>{firstUser && firstUser.cookerCount}</strong>
            </p>
            <p>
              Downvotes: <strong>{firstUser && firstUser.farmerCount}</strong>
            </p>
            <p>
              Reviews: <strong>{firstUser && firstUser.reviewCount}</strong>
            </p>
          </div>
        </Link>

        <div id="starContainer">
          <div id="starHeader" />
          <div id="starBody">
            {risingStars && risingStars.map((star, index) =><Star 
              key={index}
              pic_path={star.photoPath}
              name={star.twitterName}
              roi={(star.ROI1D * 100).toFixed(2) + "%"}
              pnl={formatSOL(star.PnLtotal1D) + " Sol"}
              id={star._id}
            />)}
          </div>
        </div>

        <ListKOL KOLlist={KOLlist} setKOLlist={setKOLlist}/>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
