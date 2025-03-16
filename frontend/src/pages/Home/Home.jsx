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

  const KOLlist_prime = [
    {
      avatar: "https://picsum.photos/200/300",
      name: "MoneyMaykah",
      address: "796....589",
      roi: "110%",
      pnl: "+1k Sol",
      cooker: "50",
      farmer: "10",
      review: "5",
    },
    {
      avatar: "https://picsum.photos/200/300",
      name: "John Doe",
      address: "026....589",
      roi: "110%",
      pnl: "+1k Sol",
      cooker: "50",
      farmer: "10",
      review: "5",
    },
    {
      avatar: "https://picsum.photos/200/300",
      name: "John Doe",
      address: "726....589",
      roi: "110%",
      pnl: "+1k Sol",
      cooker: "50",
      farmer: "10",
      review: "5",
    },
    {
      avatar: "https://picsum.photos/200/300",
      name: "John Doe",
      address: "726....589",
      roi: "110%",
      pnl: "+1k Sol",
      cooker: "50",
      farmer: "10",
      review: "5",
    },
    {
      avatar: "https://picsum.photos/200/300",
      name: "John Doe",
      address: "726....589",
      roi: "110%",
      pnl: "+1k Sol",
      cooker: "50",
      farmer: "10",
      review: "5",
    },
    {
      avatar: "https://picsum.photos/200/300",
      name: "John Doe",
      address: "72675837537636589",
      roi: "110%",
      pnl: "+1k Sol",
      cooker: "50",
      farmer: "10",
      review: "5",
    },
  ];

  return (
    <div id="bodyWrapper">
      <Navbar />

      <div className="container">
        <Link id="King">
          <img src="/king.png" alt="KING" id="KingIcon" />
          <div id="KingImg" >
            <img src="/King_of_KOLs.gif" alt="KING OF KOLS" id="KingImgSvg"/>
            <img src={firstUser && firstUser.photoPath} alt="KING OF KOLS" id="avatar"/>
          </div>

          <div id="KingInfo">
            <p id="KingName">{firstUser && firstUser.twitterName}</p>
            <p id="KingAddr" onClick={(e) => copyAddress(e)}>
              <span id="addr4cpy">{firstUser && truncateText(firstUser.walletAddress)}</span>
              <img src="content_copy.svg" alt="copy" />
            </p>
            <p id="verificationText">Verified KOL</p>
          </div>

          <div className="KingStats">
            <p>
              ROI:{" "}
              <span>{firstUser && (firstUser.ROI7D * 100).toFixed(2)}%</span>
            </p>
            <p>
              PnL:{" "}
              <span>{firstUser && firstUser.PnLtotal7D.toFixed(2)} Sol</span>
            </p>
          </div>

          <div className="KingStats">
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

        <ListKOL KOLlist={KOLlist} />
      </div>

      <Footer />
    </div>
  );
}

export default Home;
