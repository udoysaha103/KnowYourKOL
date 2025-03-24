import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styles from "./Profile.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import Icon from "../../Components/Icon";
import Review from "../../Components/Review/Review";
import Footer from "../../Components/Footer/Footer";
import { useAuthContext } from "../../hooks/useAuthContext";

const Profile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setRequest(false);
      }
    });
  }, []);

  const submitRequest = async () => {
    const requestData = {
      kol_id: id,
    };

    if (twitterNameRequest) {
      requestData.twitterName = twitterNameRequest;
    }
    if (irlNameRequest) {
      requestData.irlName = irlNameRequest;
    }
    if (locationRequst) {
      requestData.location = locationRequst;
    }
    if (twitterLinkRequest) {
      requestData.twitterLink = twitterLinkRequest;
    }
    if (discordLinkRequest) {
      requestData.discordLink = discordLinkRequest;
    }
    if (telegramLinkRequest) {
      requestData.telegramLink = telegramLinkRequest;
    }
    if (youtubeLinkRequest) {
      requestData.youtubeLink = youtubeLinkRequest;
    }
    if (streamLinkRequest) {
      requestData.streamLink = streamLinkRequest;
    }
    console.log(requestData);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/request-bio-update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );
    const data = await response.json();
    if (response.ok) {
      alert(
        "Your profile change request has been submitted successfully. It will be shown like this after approval."
      );
      setRequest(false);
    } else {
      alert(data.message || data.error);
    }
  };

  const [duration, setDuration] = useState(1);
  const [request, setRequest] = useState(false);
  const [review, setReview] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailedMessage, setShowFailedMessage] = useState(false);
  const [failedMessage, setFailedMessage] = useState("");
  const [PnLRank, setPnLRank] = useState(0);
  const [sentimentRank, setSentimentRank] = useState(0);
  const [twitterNameRequest, setTwitterNameRequest] = useState("");
  const [irlNameRequest, setIrlNameRequest] = useState("");
  const [locationRequst, setLocationRequest] = useState("");
  const [twitterLinkRequest, setTwitterLinkRequest] = useState("");
  const [discordLinkRequest, setDiscordLinkRequest] = useState("");
  const [telegramLinkRequest, setTelegramLinkRequest] = useState("");
  const [youtubeLinkRequest, setYoutubeLinkRequest] = useState("");
  const [streamLinkRequest, setStreamLinkRequest] = useState("");

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
  const copyAddress = () => {
    navigator.clipboard.writeText(kol.walletAddress);
    copyRef.current.children[0].innerText = "Copied!";
    setTimeout(() => {
      copyRef.current.children[0].innerText = truncateText(kol.walletAddress);
    }, 1000);
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
  const handleRadio = (e) => {
    setReview(e.target.value === "cooker");
    if ((e.target.value === "cooker") === review) {
      e.target.checked = false;
      setReview(null);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
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
        `${import.meta.env.VITE_API_URL}/review/submitReview`,
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
        kol.reviewCount += text ? 1 : 0;
        setLoading(false);
        setReview(null);
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 1000);
      } else {
        setLoading(false);
        setReview(null);
        setFailedMessage(data.message || data.error);
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
      const response1 = await fetch(
        `${import.meta.env.VITE_API_URL}/getKOL/${id}`
      );
      const kolData = await response1.json();
      const response2 = await fetch(
        `${import.meta.env.VITE_API_URL}/review/getReviews/${id}`
      );
      const reviewData = await response2.json();
      const response3 = await fetch(
        `${import.meta.env.VITE_API_URL}/getKOL/getPnLRank/${id}/${duration}`
      );
      const response4 = await fetch(
        `${import.meta.env.VITE_API_URL}/getKOL/getSentimentRank/${id}`
      );
      const data3 = await response3.json();
      console.log(data3);
      const data4 = await response4.json();
      setPnLRank(data3.rank);
      setSentimentRank(data4.rank);
      setReviews(reviewData);
      setKOL(kolData);
    };
    fetchData(id);
  }, [id, duration]);
  useEffect(() => {
    const fetchData = async (id) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/review/getReviews/${id}`
      );
      const reviewData = await response.json();
      setReviews(reviewData);
    };
    fetchData(id);
  }, [showSuccessMessage]);

  document.title = "KOL Profile";

  return (
    <>
      <Navbar />
      {request && <div className={styles.background} />}
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
        {request && (
          <button className={styles.requestBtn} onClick={submitRequest}>
            Submit
          </button>
        )}
        <div className={styles.top}>
          <div
            className={`${styles.name} ${styles.request}`}
            onClick={() => {
              if (request)
                setTwitterNameRequest(prompt("Enter new Twitter Name"));
            }}
          >
            {!twitterNameRequest ? kol.twitterName : twitterNameRequest}{" "}
            {kol.verifiedByAdmin && (
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
              kol.verifiedByAdmin ? styles.avatarVerified : styles.avatar
            }`}
            src={kol.photoPath}
            alt=""
          />
        </div>
        <div className={styles.link}>
          {kol.twitterLink && (
            <a
              href={kol.twitterLink}
              className={styles.request}
              onClick={(e) => {
                if (request) {
                  e.preventDefault();
                  setTwitterLinkRequest(prompt("Enter new Twitter Link"));
                }
              }}
            >
              <Icon name="Twitter" color="#f8f8f8" height="40px" />
            </a>
          )}
          {kol.discordLink && (
            <a
              href={kol.discordLink}
              className={styles.request}
              onClick={(e) => {
                if (request) {
                  e.preventDefault();
                  setDiscordLinkRequest(prompt("Enter new Discord Link"));
                }
              }}
            >
              <Icon name="Discord" color="#f8f8f8" height="40px" />
            </a>
          )}
          {kol.telegramLink && (
            <a
              href={kol.telegramLink}
              className={styles.request}
              onClick={(e) => {
                if (request) {
                  e.preventDefault();
                  setTelegramLinkRequest(prompt("Enter new Telegram Link"));
                }
              }}
            >
              <Icon name="Telegram" color="#f8f8f8" height="40px" />
            </a>
          )}
          {kol.youtubeLink && (
            <a
              href={kol.youtubeLink}
              className={styles.request}
              onClick={(e) => {
                if (request) {
                  e.preventDefault();
                  setYoutubeLinkRequest(prompt("Enter new Youtube Link"));
                }
              }}
            >
              <Icon name="YouTube" color="#f8f8f8" height="40px" />
            </a>
          )}
          {kol.streamLink && (
            <a
              href={kol.streamLink}
              className={styles.request}
              onClick={(e) => {
                if (request) {
                  e.preventDefault();
                  setStreamLinkRequest(prompt("Enter new Stream Link"));
                }
              }}
            >
              <Icon name="VideoCamera" color="#f8f8f8" height="40px" />
            </a>
          )}
        </div>
        <div className={styles.bio}>
          <button className={styles.bioBtn} onClick={() => setRequest(true)}>
            Request Bio Update
          </button>
        </div>
        <div className={styles.card1}>
          <div style={{ display: "flex" }}>
            {kol.IRLname && (
              <>
                <div
                  className={`${styles.info1} ${styles.request} ${styles.info1_prime}`}
                  onClick={() => {
                    if (request)
                      setIrlNameRequest(prompt("Enter new IRL Name"));
                  }}
                >
                  Real Name:
                </div>
                <div
                  className={`${styles.info1} ${styles.request} ${styles.value1}`}
                  onClick={() => {
                    if (request)
                      setIrlNameRequest(prompt("Enter new IRL Name"));
                  }}
                >
                  {!irlNameRequest ? kol.IRLname : irlNameRequest}
                </div>
              </>
            )}
          </div>
          <div
            style={{ display: "flex" }}
            onClick={() => {
              if (request) setLocationRequest(prompt("Enter new Location"));
            }}
          >
            {kol.country && (
              <>
                <div
                  className={`${styles.info1} ${styles.request} ${styles.info1_prime}`}
                >
                  Location:
                </div>
                <div
                  className={`${styles.info1} ${styles.request} ${styles.value1}`}
                >
                  {!locationRequst ? kol.country : locationRequst}
                </div>
              </>
            )}
          </div>
          <div className={styles.infoValue}>
            <p className={styles.info1}>PnL Ranking:</p>
            <div className={styles.value}># {PnLRank}</div>
          </div>
          <div className={styles.infoValue}>
            <p className={styles.info1}>Follower's Sentiment Ranking:</p>
            <div className={styles.value}># {sentimentRank}</div>
          </div>
        </div>
        <div className={styles.card2}>
          <div className={styles.switches}>
            <button
              className={`${styles.switch} ${
                duration === 1 && styles.selected
              }`}
              onClick={() => setDuration(1)}
            >
              1D
            </button>
            <button
              className={`${styles.switch} ${
                duration === 7 && styles.selected
              }`}
              onClick={() => setDuration(7)}
            >
              7D
            </button>
            <button
              className={`${styles.switch} ${
                duration === 30 && styles.selected
              }`}
              onClick={() => setDuration(30)}
            >
              30D
            </button>
          </div>
          {kol[`ROI${duration}D`] !== undefined && (
            <div className={styles.info2}>
              <div>ROI:</div>
              <div
                className={`${styles.value_1} ${
                  kol[`ROI${duration}D`] < 0 ? styles.negative : ""
                }`}
              >
                {(kol[`ROI${duration}D`] * 100).toFixed(digit)}%
              </div>
            </div>
          )}
          {kol[`PnLtotal${duration}D`] !== undefined && (
            <div className={styles.info2}>
              <div>PnL Total:</div>
              <div
                className={`${styles.value_1} ${
                  kol[`PnLtotal${duration}D`] < 0 ? styles.negative : ""
                }`}
              >
                {formatSOL(kol[`PnLtotal${duration}D`])} Sol
              </div>
            </div>
          )}

          {kol.avgHoldingDuration !== undefined && (
            <div className={styles.info2}>
              <div>Avg. Holding Duration:</div>
              <div className={styles.value_2}>
                {timeConvert(kol.avgHoldingDuration)}
              </div>
            </div>
          )}
          {kol[`buy${duration}D`] !== undefined &&
            kol[`sell${duration}D`] !== undefined && (
              <div className={styles.info2}>
                <div>Transaction (W/L)</div>
                <div className={styles.value_2}>
                  <span style={{color:"#06c022"}}>{kol[`buy${duration}D`]}</span>/
                  <span style={{color:"#be0215"}}>{kol[`sell${duration}D`]}</span>
                </div>
              </div>
            )}
        </div>
        <div className={styles.card3}>
          { kol.walletBalance !== undefined && (
            <div className={styles.info3}>Wallet Balance: {kol.walletBalance.toFixed(2)} Sol</div>
          )}
          {kol.cookerCount !== undefined && (
            <div className={styles.info3}>
              Upvote Received: {kol.cookerCount}
            </div>
          )}
          {kol.farmerCount !== undefined && (
            <div className={styles.info3}>
              Downvote Received: {kol.farmerCount}
            </div>
          )}
          {kol.reviewCount !== undefined && (
            <div className={styles.info3}>
              Review Received: {kol.reviewCount}
            </div>
          )}
          
        </div>
        <div className={styles.reviews}>
          <div className={styles.reviewInputContainer}>
            <div className={styles.header}>Write a Review</div>
            <br />
            <div className={styles.inputContainer}>
              <textarea
                className={styles.textarea}
                placeholder="Write an honest review based on your experience with this KOL
If this KOL helped you win, spread the word! If they let you down, share that too.
Your feedback empowers others and reclaims power for followers."
                ref={textRef}
              ></textarea>
              <div className={styles.btnContainer}>
                <label
                  className={`${styles.radioContainer} ${
                    review === true && styles.selected
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
                    review === false && styles.selected
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
                <button className={styles.btn} onClick={(e) => handleSubmit(e)}>
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
