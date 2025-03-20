import React, { useState } from "react";
import styles from "./Review.module.css";
import Icon from "../Icon";
import { useAuthContext } from "../../hooks/useAuthContext";

const Review = ({
  reviewId,
  reviewReceiverId,
  username,
  review,
  text,
  u_review,
  date,
  cookerCount,
  farmerCount,
}) => {
  const [ureview, setUReview] = useState(u_review);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [cookerCountLive, setCookerCount] = useState(cookerCount);
  const [farmerCountLive, setFarmerCount] = useState(farmerCount);
  const { user } = useAuthContext();
  const handleChange = async (e) => {
    if (!user) return;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/review/${
          e.target.value === "cooker" ? "likeReview" : "dislikeReview"
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ reviewId, reviewReceiverId }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (data.message === "liked" || data.message === "disliked") {
          setUReview(data.message==="liked");
          setCookerCount(data.cookerCount);
          setFarmerCount(data.farmerCount);
        } else if (
          data.message === "unliked" ||
          data.message === "undisliked"
        ) {
          setUReview(null);
          setCookerCount(data.cookerCount);
          setFarmerCount(data.farmerCount);
        }
      }else{
        setShowErrorMsg(true);
        setErrorMsg(data.message || data.error);
        setTimeout(() => {
          setShowErrorMsg(false);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {showErrorMsg && <div className={styles.error}>{errorMsg}</div>}
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.name}>{username}</div>
          <div className={styles.review}>
            Reviewed:&nbsp;
            {review ? (
              <Icon name="ThumbsUp" color="#3ebf3b" height="16px" />
            ) : (
              <Icon name="ThumbsDown" color="#d41e27" height="16px" />
            )}
            &nbsp;{review ? "Cooker" : "Farmer"}
          </div>
          <div className={styles.date}>Date Posted: {date}</div>
        </div>
        <p className={styles.text}>{text}</p>
      </div>
      <div className={styles.reviewCounts}>
        {/* <div className={`${styles.count} ${u_review === "cooker" && styles.selected}`}>
          <Icon name="ThumbsUp" color="#3ebf3b" height="24px" /> {cookerCount}
        </div>
        <div className={`${styles.count} ${u_review === "farmer" && styles.selected}`}>
          <Icon name="ThumbsDown" color="#d41e27" height="24px" /> {farmerCount}
        </div> */}
        <label
          className={`${user ? styles.count : styles.count_disabled} ${
            user && ureview === true && styles.selected
          }`}
        >
          <input
            type="radio"
            name="review"
            value="cooker"
            onClick={(e) => handleChange(e)}
          />
          <Icon name="ThumbsUp" color="#3ebf3b" height="24px" /> {cookerCountLive}
        </label>
        <label
          className={`${user ? styles.count : styles.count_disabled} ${
            user && ureview === false && styles.selected
          }`}
        >
          <input
            type="radio"
            name="review"
            value="farmer"
            onClick={(e) => handleChange(e)}
          />
          <Icon name="ThumbsDown" color="#d41e27" height="24px" /> {farmerCountLive}
        </label>
      </div>
    </>
  );
};

export default Review;
