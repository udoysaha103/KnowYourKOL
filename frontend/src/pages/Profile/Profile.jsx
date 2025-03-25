import React, { useState, useEffect, useRef } from "react";
import { data, useParams } from "react-router-dom";
import styles from "./Profile.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import Icon from "../../Components/Icon";
import Review from "../../Components/Review/Review";
import Footer from "../../Components/Footer/Footer";
import { useAuthContext } from "../../hooks/useAuthContext";

const Profile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
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
  const [submitLoading, setSubmitLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [pnlLoading, setPnLLoading] = useState(true);
  const [sentimentLoading, setSentimentLoading] = useState(true);
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
    // navigator.clipboard.writeText(kol.walletAddress);
    const copyToClipboard = async (text) => {
      try {
        // Try modern Clipboard API first
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(text);
          return true;
        }

        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed"; // Avoid scrolling to bottom
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          const successful = document.execCommand("copy");
          document.body.removeChild(textArea);
          return successful;
        } catch (err) {
          document.body.removeChild(textArea);
          return false;
        }
      } catch (err) {
        console.error("Failed to copy:", err);
        return false;
      }
    };

    copyToClipboard(kol.walletAddress);
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
      setSubmitLoading(true);
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
        setSubmitLoading(false);
        setReview(null);
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 1000);
      } else {
        setSubmitLoading(false);
        setReview(null);
        setFailedMessage(data.message || data.error);
        setShowFailedMessage(true);
        setTimeout(() => {
          setShowFailedMessage(false);
        }, 1000);
      }
    }
  };
  useEffect(() => {
    const fetchData = async (id) => {
      setDataLoading(true);
      const response1 = await fetch(
        `${import.meta.env.VITE_API_URL}/getKOL/${id}`
      );
      const kolData = await response1.json();
      setKOL(kolData);
      setDataLoading(false);

      const response2 = await fetch(
        `${import.meta.env.VITE_API_URL}/review/getReviews/${id}`
      );
      const reviewData = await response2.json();
      setReviews(reviewData);
    };
    fetchData(id);
  }, [id]);

  useEffect(() => {
    const fetchData = async (id) => {
      setPnLLoading(true);
      setSentimentLoading(true);

      const response3 = await fetch(
        `${import.meta.env.VITE_API_URL}/getKOL/getPnLRank/${id}/${duration}`
      );
      const data3 = await response3.json();
      setPnLRank(data3.rank);
      setPnLLoading(false);

      const response4 = await fetch(
        `${import.meta.env.VITE_API_URL}/getKOL/getSentimentRank/${id}`
      );
      const data4 = await response4.json();
      setSentimentRank(data4.rank);
      setSentimentLoading(false);
    };
    fetchData(id);
  }, [duration]);

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
      <Navbar changeRequest={setRequest} />
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
        <div className={`${styles.top} ${dataLoading && "loading"}`}>
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
          {kol.walletAddress && (
            <div className={styles.addr} ref={copyRef}>
              <div style={{ margin: "0 10px" }}>
                {truncateText(kol.walletAddress)}
              </div>
              <Icon
                name="Copy"
                color="#f8f8f8"
                height="24px"
                onClick={copyAddress}
              />
            </div>
          )}
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
        <div className={`${styles.card1} ${dataLoading && "loading"}`}>
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
          {PnLRank !== null && (
            <div className={styles.infoValue}>
              <p className={styles.info1}>PnL Ranking:</p>
              <div className={`${styles.value} ${pnlLoading ? "loading" : ""}`}>
                # {PnLRank}
              </div>
            </div>
          )}
          {sentimentRank !== null && (
            <div className={styles.infoValue}>
              <p className={styles.info1}>Follower's Sentiment Ranking:</p>
              <div
                className={`${styles.value} ${
                  sentimentLoading ? "loading" : ""
                }`}
              >
                # {sentimentRank}
              </div>
            </div>
          )}
        </div>
        <div className={`${styles.card2} ${dataLoading && "loading"}`}>
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
                  <span style={{ color: "#06c022" }}>
                    {kol[`buy${duration}D`]}
                  </span>
                  /
                  <span style={{ color: "#be0215" }}>
                    {kol[`sell${duration}D`]}
                  </span>
                </div>
              </div>
            )}
        </div>
        <div className={`${styles.card3} ${dataLoading && "loading"}`}>
          {kol.walletBalance !== undefined && (
            <div className={styles.info3}>
              Wallet Balance: {kol.walletBalance.toFixed(2)} Sol
            </div>
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
                  {submitLoading ? "Submitting..." : "Submit"}
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
