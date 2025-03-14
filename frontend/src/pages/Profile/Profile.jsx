import React, { useState, useRef } from "react";
import styles from "./Profile.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import Icon from "../../Components/Icon";
import Review from "../../Components/Review/Review";
import Footer from "../../Components/Footer/Footer";

const Profile = () => {
  const reviews = [
    {
      reviewId: "1",
      name: "John Doe",
      review: "farmer",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in turpis vel libero interdum tincidunt. Donec in lorem nec magna scelerisque scelerisque. Nulla facilisi. Sed nec nisl id turpis imperdiet fermentum",
      u_review: "cooker",
      date: "Mar 20, 2025",
      cookerCount: 10,
      farmerCount: 20,
    },
    {
      reviewId: "2",
      name: "John Doe",
      review: "cooker",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in turpis vel libero interdum tincidunt. Donec in lorem nec magna scelerisque scelerisque. Nulla facilisi. Sed nec nisl id turpis imperdiet fermentum",
      u_review: null,
      date: "Mar 20, 2025",
      cookerCount: 10,
      farmerCount: 20,
    },
    {
      reviewId: "3",
      name: "John Doe",
      review: "farmer",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in turpis vel libero interdum tincidunt. Donec in lorem nec magna scelerisque scelerisque. Nulla facilisi. Sed nec nisl id turpis imperdiet fermentum",
      u_review: "farmer",
      date: "Mar 20, 2025",
      cookerCount: 10,
      farmerCount: 20,
    },
  ];
  const [review, setReview] = useState("");
  const isVerified = true;
  const handleRadio = (e) => {
    setReview(e.target.value);
    if(e.target.value === review) {
      e.target.checked = false;
      setReview("");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const text = document.querySelector("textarea").value;
    if (review === "") {
      alert("Please select a review type");
    } else if (text === "") {
      alert("Please write a review");
    }else{
      // API call to submit review
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.name}>Drake</div>
          <div className={styles.addr}>
            Address <Icon name="Copy" color="#f8f8f8" height="24px" />
          </div>
        </div>
        <div className={styles.avatarContainer}>
          <img
            className={`${isVerified ? styles.avatarVerified : styles.avatar}`}
            src="https://picsum.photos/200/300"
            alt=""
          />
          {isVerified ? "Verified" : "Unverified"}
        </div>
        <div className={styles.link}>
          <a href="">
            <Icon name="Twitter" color="#f8f8f8" height="40px" />
          </a>
          <a href="">
            <Icon name="Discord" color="#f8f8f8" height="40px" />
          </a>
          <a href="">
            <Icon name="Telegram" color="#f8f8f8" height="40px" />
          </a>
          <a href="">
            <Icon name="YouTube" color="#f8f8f8" height="40px" />
          </a>
        </div>
        <div className={styles.bio}>
          <button className={styles.bioBtn}>Request Bio Update</button>
        </div>
        <div className={styles.card1}>
          <div className={styles.info1}>Real Name: Hulk Logan</div>
          <div className={styles.info1}>Location: USA</div>
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
            <button className={styles.switch}>1D</button>
            <button className={styles.switch}>7D</button>
            <button className={styles.switch}>30D</button>
          </div>
          <div className={styles.info2}>
            <div>ROI:</div>
            <div className={styles.value_1}>15%</div>
          </div>
          <div className={styles.info2}>
            <div>P&L Total:</div>
            <div className={styles.value_1}>+100 Sol</div>
          </div>
          <div className={styles.info2}>
            <div>Avg. Holding Duration:</div>
            <div className={styles.value_2}>5 min</div>
          </div>
          <div className={styles.info2}>
            <div>ROI:</div>
            <div className={styles.value_2}>50 Sol</div>
          </div>
        </div>
        <div className={styles.card3}>
          <div className={styles.info3}>Upvote Received: 50</div>
          <div className={styles.info3}>Downvote Received: 15</div>
          <div className={styles.info3}>Review Received: 12</div>
        </div>
        <div className={styles.reviews}>
          <div className={styles.reviewInputContainer}>
            <div className={styles.header}>Write a Review</div>
            <div className={styles.inputContainer}>
              <textarea
                className={styles.textarea}
                placeholder="Write an honest Review Based on Your Experience with This KOL If this KOL helped you win, spread the word! If they let you down, share that too. Your feedback empowers others and reclaims power for followers."
              ></textarea>
              <div className={styles.btnContainer}>
                <label
                  className={`${styles.radioContainer} ${
                    review === "cooker" ? styles.selected : ""
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
                    review === "farmer" ? styles.selected : ""
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
                  Submit
                </button>
              </div>
            </div>
          </div>
          <br />
          <div className={styles.dividerHorizontal}>
            <br />
            <div className={styles.header}>Reviews from Community</div>
            <br />
            {reviews.map((review) => (
              <Review
                key={review.reviewId}
                name={review.name}
                review={review.review}
                text={review.text}
                u_review={review.u_review}
                date={review.date}
                cookerCount={review.cookerCount}
                farmerCount={review.farmerCount}
                reviewId={review.reviewId}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
