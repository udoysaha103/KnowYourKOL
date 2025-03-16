import "./Home.css";
import { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Link } from "react-router-dom";
import Star from "../../Components/Star/Star";
import ListKOL from "../../Components/ListKOL/ListKOL";
import Footer from "../../Components/Footer/Footer";

function Home() {
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
  const [firstUser, setFirstUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/getKOL/getKOLoverall")
      .then((response) => response.json())
      .then((data) => {
        setKOLlist(data);
        setFirstUser(data[0]);
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
            <p id="KingAddr" onClick={(e) => copyAddress(e)}>
              <span id="addr4cpy">{firstUser && truncateText(firstUser.walletAddress)}</span>
              <img src="content_copy.svg" alt="copy" />
            </p>
            <p id="verificationText">Verified KOL</p>
          </div>

          <div className="KingStats">
            <p>
              ROI:{" "}
              <span>{firstUser && (firstUser.ROI1D * 100).toFixed(2)}%</span>
            </p>
            <p>
              PnL:{" "}
              <span>{firstUser && formatSOL(firstUser.PnLtotal7D)} Sol</span>
            </p>
          </div>

          <div className="KingStats KingStats2">
            <p>
              Upvotes: <strong>{firstUser && firstUser.cookerCount}</strong>
            </p>
            <p>
              Reviews: <strong>{firstUser && firstUser.farmerCount}</strong>
            </p>
          </div>
        </Link>

        <div id="starContainer">
          <div id="starHeader" />
          <div id="starBody">
            <Star
              pic_path="https://picusm.photos/200/300"
              name="XYZ"
              roi="11.2k%"
              pnl="+9.5 Sol"
            />
            <Star
              pic_path="https://picusm.photos/200/300"
              name="XYZ"
              roi="11.2k%"
              pnl="+9.5 Sol"
            />
            <Star
              pic_path="https://picusm.photos/200/300"
              name="XYZ"
              roi="11.2k%"
              pnl="+9.5 Sol"
            />
            <Star
              pic_path="https://picusm.photos/200/300"
              name="XYZ"
              roi="11.2k%"
              pnl="+9.5 Sol"
            />
          </div>
        </div>

        <ListKOL KOLlist={KOLlist} setKOLlist={setKOLlist}/>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
