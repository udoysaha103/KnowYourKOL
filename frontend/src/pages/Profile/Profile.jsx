import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styles from "./Profile.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import Icon from "../../Components/Icon";
import Review from "../../Components/Review/Review";
import Footer from "../../Components/Footer/Footer";
import { useAuthContext } from "../../hooks/useAuthContext";

const Profile = () => {
  const [time, setTime] = useState("1D");
  const [review, setReview] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailedMessage, setShowFailedMessage] = useState(false);
  const [failedMessage, setFailedMessage] = useState("");
  const [kol, setKOL] = useState({});
  const { id } = useParams();
  const copyRef = useRef(null);
  const textRef = useRef(null);
  const { user } = useAuthContext();

  const digit = 2;

  const truncateText = (text) => {
    if (text.length >= 10) {
      return text.slice(0, 4) + "..." + text.slice(-3);
    }
    return text;
  };
  const copyAddress = () => {
    navigator.clipboard.writeText(kol.walletAddress);
    copyRef.current.children[0].innerText = "Copied!";
    setTimeout(() => {
      copyRef.current.children[0].innerText = truncateText(kol.walletAddress);
    }, 1000);
  };
  const handleRadio = (e) => {
    setReview(e.target.value === "cooker");
    if ((e.target.value === "cooker") === review) {
      e.target.checked = false;
      setReview(null);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!user){
      setFailedMessage("You must be logged in to submit a review.");
      setShowFailedMessage(true);
      setTimeout(() => {
        setShowFailedMessage(false);
      }, 1000);
      return;
    }
    const text = document.querySelector("textarea").value;
    if (review === null) {
      alert("Please select a review type");
    } else {
      // API call to submit review
      setLoading(true);
      const response = await fetch(
        "http://localhost:5000/review/submitReview",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
          },
          body: JSON.stringify({
            reviewDescription: text,
            reviewType: review,
            reviewReceiver: id,
          }),
        }
      );
      const data = await response.json();
      textRef.current.value = "";
      if (response.ok) {
        kol.cookerCount += review ? 1 : 0;
        kol.farmerCount += review ? 0 : 1;
        setLoading(false);
        setReview(null);
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 1000);
      } else {
        setLoading(false);
        setReview(null);
        setFailedMessage(data.message||data.error);
        setShowFailedMessage(true);
        setTimeout(() => {
          setShowFailedMessage(false);
        }, 1000);
      }
    }
  };
  // const reviews = [
  //   {
  //     reviewId: "1",
  //     username: "John Doe",
  //     review: false,
  //     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in turpis vel libero interdum tincidunt. Donec in lorem nec magna scelerisque scelerisque. Nulla facilisi. Sed nec nisl id turpis imperdiet fermentum",
  //     u_review: true,
  //     date: "Mar 20, 2025",
  //     cookerCount: 10,
  //     farmerCount: 20,
  //   },
  //   {
  //     reviewId: "2",
  //     username: "John Doe",
  //     review: true,
  //     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in turpis vel libero interdum tincidunt. Donec in lorem nec magna scelerisque scelerisque. Nulla facilisi. Sed nec nisl id turpis imperdiet fermentum",
  //     u_review: null,
  //     date: "Mar 20, 2025",
  //     cookerCount: 10,
  //     farmerCount: 20,
  //   },
  //   {
  //     reviewId: "3",
  //     username: "John Doe",
  //     review: false,
  //     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in turpis vel libero interdum tincidunt. Donec in lorem nec magna scelerisque scelerisque. Nulla facilisi. Sed nec nisl id turpis imperdiet fermentum",
  //     u_review: false,
  //     date: "Mar 20, 2025",
  //     cookerCount: 10,
  //     farmerCount: 20,
  //   },
  // ];
  useEffect(() => {
    // API call to get KOL data
    const fetchData = async (id) => {
      const response1 = await fetch(`http://localhost:5000/getKOL/${id}`);
      const kolData = await response1.json();
      const response2 = await fetch(`http://localhost:5000/review/getReviews/${id}`);
      const reviewData = await response2.json();
      setReviews(reviewData);
      setKOL(kolData);
    };
    fetchData(id);
  }, []);
  useEffect(() => {
    const fetchData = async (id) => {
    const response = await fetch(`http://localhost:5000/review/getReviews/${id}`);
    const reviewData = await response.json();
    setReviews(reviewData);
    };
    fetchData(id);
  }, [showSuccessMessage]);
  return (
    <>
      <Navbar />
      {showSuccessMessage && (
        <div className={styles.successMessage}>
          <Icon name="Check" color="#3ebf3b" height="100px" />
          <br />
          Review submitted successfully!
        </div>
      )}
      {showFailedMessage && (
        <div className={styles.failedMessage}>
          <Icon name="Error" color="#d41e27" height="100px" />
          <br />
          {failedMessage}
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.name}>
            {kol.twitterName}{" "}
            {kol.verified && (
              <Icon name="Verified" color="#f8f8f8" height="24px" />
            )}
          </div>
          <div className={styles.addr} ref={copyRef}>
            <div style={{ margin: "0 10px" }}>
              {kol.walletAddress && truncateText(kol.walletAddress)}
            </div>
            <Icon
              name="Copy"
              color="#f8f8f8"
              height="24px"
              onClick={copyAddress}
            />
          </div>
        </div>
        <div className={styles.avatarContainer}>
          <img
            className={`${
              kol.verified ? styles.avatarVerified : styles.avatar
            }`}
            src="https://picsum.photos/200/300"
            alt=""
          />
          {kol.verified ? "Verified" : "Unverified"}
        </div>
        <div className={styles.link}>
          {kol.twitterLink && (
            <a href={kol.twitterLink}>
              <Icon name="Twitter" color="#f8f8f8" height="40px" />
            </a>
          )}
          {kol.discordLink && (
            <a href={kol.discordLink}>
              <Icon name="Discord" color="#f8f8f8" height="40px" />
            </a>
          )}
          {kol.telegramLink && (
            <a href={kol.telegramLink}>
              <Icon name="Telegram" color="#f8f8f8" height="40px" />
            </a>
          )}
          {kol.youtubeLink && (
            <a href={kol.youtubeLink}>
              <Icon name="YouTube" color="#f8f8f8" height="40px" />
            </a>
          )}
          {kol.streamLink && (
            <a href={kol.streamLink}>
              <Icon name="VideoCamera" color="#f8f8f8" height="40px" />
            </a>
          )}
        </div>
        <div className={styles.bio}>
          <button className={styles.bioBtn}>Request Bio Update</button>
        </div>
        <div className={styles.card1}>
          <div style={{ display: "flex" }}>
            {kol.IRLname && (
              <div className={styles.info1}>Real Name: {kol.IRLname}</div>
            )}
          </div>
          <div styles={{ display: "flex" }}>
            {kol.country && (
              <div className={styles.info1}>Location: {kol.country}</div>
            )}
          </div>
          <div className={styles.infoValue}>
            <div className={styles.info1}>Ranking by P&L:</div>
            <div className={styles.value}>#1</div>
          </div>
          <div className={styles.infoValue}>
            <div className={styles.info1}>Ranking by Follwer's Review:</div>
            <div className={styles.value}>#1</div>
          </div>
        </div>
        <div className={styles.card2}>
          <div className={styles.switches}>
            <button
              className={`${styles.switch} ${time === "1D" && styles.selected}`}
              onClick={() => setTime("1D")}
            >
              1D
            </button>
            <button
              className={`${styles.switch} ${time === "7D" && styles.selected}`}
              onClick={() => setTime("7D")}
            >
              7D
            </button>
            <button
              className={`${styles.switch} ${
                time === "30D" && styles.selected
              }`}
              onClick={() => setTime("30D")}
            >
              30D
            </button>
          </div>
          {kol[`ROI${time}`] && (
            <div className={styles.info2}>
              <div>ROI:</div>
              <div className={styles.value_1}>
                {(kol[`ROI${time}`] * 100).toFixed(digit)}%
              </div>
            </div>
          )}
          {kol[`PnLtotal${time}`] && (
            <div className={styles.info2}>
              <div>P&L Total:</div>
              <div className={styles.value_1}>
                {kol[`PnLtotal${time}`].toFixed(digit)} Sol
              </div>
            </div>
          )}

          {kol.avgHoldingDuration && (
            <div className={styles.info2}>
              <div>Avg. Holding Duration:</div>
              <div className={styles.value_2}>{kol.avgHoldingDuration}</div>
            </div>
          )}
          {kol.walletBalance && (
            <div className={styles.info2}>
              <div>Wallet Balance:</div>
              <div className={styles.value_2}>
                {kol.walletBalance.toFixed(digit)}
              </div>
            </div>
          )}
        </div>
        {kol.cookerCount !== undefined && kol.farmerCount !== undefined && (
          <div className={styles.card3}>
            <div className={styles.info3}>Upvote Received: {kol.cookerCount}</div>
            <div className={styles.info3}>Downvote Received: {kol.farmerCount}</div>
            <div className={styles.info3}>Review Received: {kol.cookerCount + kol.farmerCount}</div>
          </div>
        )}
        <div className={styles.reviews}>
          <div className={styles.reviewInputContainer}>
            <div className={styles.header}>Write a Review</div>
            <br />
            <div className={styles.inputContainer}>
              <textarea
                className={styles.textarea}
                placeholder="Write an honest Review Based on Your Experience with This KOL If this KOL helped you win, spread the word! If they let you down, share that too. Your feedback empowers others and reclaims power for followers."
                ref={textRef}
              ></textarea>
              <div className={styles.btnContainer}>
                <label
                  className={`${styles.radioContainer} ${
                    review === true  && styles.selected
                  }`}
                >
                  <input
                    type="radio"
                    name="review"
                    value="cooker"
                    onClick={(e) => handleRadio(e)}
                  />
                  <Icon name="ThumbsUp" color="#3ebf3b" height="24px" /> &nbsp;
                  <div>Cooker</div>
                </label>
                <label
                  className={`${styles.radioContainer} ${
                    review===false && styles.selected
                  }`}
                >
                  <input
                    type="radio"
                    name="review"
                    value="farmer"
                    onClick={(e) => handleRadio(e)}
                  />
                  <Icon name="ThumbsDown" color="#d41e27" height="24px" />
                  &nbsp;
                  <div>Farmer</div>
                </label>
                <button
                  className={styles.submitBtn}
                  onClick={(e) => handleSubmit(e)}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
          <br />
          <div className={styles.dividerHorizontal} />
          <br />
          <div className={styles.header}>Reviews from Community</div>
          <br />
          {reviews.map((review) => (
            <Review
              key={review.reviewId}
              username={review.username}
              review={review.review}
              text={review.text}
              u_review={review.u_review}
              date={review.date}
              cookerCount={review.cookerCount}
              farmerCount={review.farmerCount}
              reviewId={review.reviewId}
              reviewReceiverId={review.reviewReceiverId}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
