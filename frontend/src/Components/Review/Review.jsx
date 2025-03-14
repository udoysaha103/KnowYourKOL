import React, { useEffect, useState } from "react";
import styles from "./Review.module.css";
import Icon from "../Icon";

const Review = ({
  reviewId,
  name,
  review,
  text,
  u_review,
  date,
  cookerCount,
  farmerCount,
}) => {
  const [ureview, setUReview] = useState(u_review);
  const handleChange = (e) => {
    setUReview(e.target.value);
    if(e.target.value === ureview) {
      e.target.checked = false;
      setUReview("");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.name}>{name}</div>
          <div className={styles.review}>
            Reviewed:&nbsp;
            {review !== "farmer" ? (
              <Icon name="ThumbsUp" color="#3ebf3b" height="16px" />
            ) : (
              <Icon name="ThumbsDown" color="#d41e27" height="16px" />
            )}
            &nbsp;{review ? review[0].toUpperCase() + review.slice(1) : ""}
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
        <label className={`${styles.count} ${ureview === "cooker" && styles.selected}`}>
          <input
            type="radio"
            name="review"
            value="cooker"
            onClick={(e) => handleChange(e)}
          />
          <Icon name="ThumbsUp" color="#3ebf3b" height="24px" /> {cookerCount}
        </label>
        <label className={`${styles.count} ${ureview === "farmer" && styles.selected}`}>
          <input
            type="radio"
            name="review"
            value="farmer"
            onClick={(e) => handleChange(e)}
          />
          <Icon name="ThumbsDown" color="#d41e27" height="24px" /> {farmerCount}
        </label>
      </div>
    </>
  );
};

export default Review;
