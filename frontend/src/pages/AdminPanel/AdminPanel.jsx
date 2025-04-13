import styles from "./AdminPanel.module.css";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

function AdminPanel() {
  document.title = "Admin Panel";

  const { user } = useAuthContext();

  // first check if the user is an admin
  const [isAdmin, setIsAdmin] = useState(false);
  const [contentNo, setContentNo] = useState(0);
  const [unverifiedKOLs, setUnverifiedKOLs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [checking, setChecking] = useState(true);
  const [rejecting, setRejecting] = useState(false);
  const [verifiedKOLs, setVerifiedKOLs] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchAdminStatus = async () => {
      setChecking(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/verifyAdmin`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setChecking(false);
      const data = await response.json();
      if (response.ok) {
        setIsAdmin(true);
      } else {
        console.error(data.message || data.error);
      }
    };
    fetchAdminStatus();
  }, [user]);

  const getUnverifiedKOLs = async () => {
    setLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/unverifiedKOLs`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      setUnverifiedKOLs(data);
    } else {
      console.error(data.message || data.error);
    }
    setLoading(false);
  };

  const getVerifiedKOLs = async () => {
    setLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/verifiedKOLs`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      setVerifiedKOLs(data);
    } else {
      console.error(data.message || data.error);
    }
    setLoading(false);
  };

  const verifyKOL = async (kol_id) => {
    if(verifying) return;
    const formData = new FormData();
    formData.append("_id", kol_id);
    formData.append(
      "twitterName",
      document.getElementById(kol_id + "twitterName").innerText
    );
    formData.append(
      "IRLname",
      document.getElementById(kol_id + "IRLname").innerText
    );
    formData.append(
      "country",
      document.getElementById(kol_id + "country").innerText
    );
    formData.append(
      "walletAddress",
      document.getElementById(kol_id + "walletAddress").innerText
    );
    formData.append(
      "showAddress",
      document.getElementById(kol_id + "showAddress").children[0].checked
    );
    formData.append(
      "photoPath",
      document.getElementById(kol_id + "photoPath").src
    );
    formData.append(
      "imageFile",
      document.getElementById(kol_id + "photoInput").files[0]
    );
    formData.append(
      "twitterLink",
      document.getElementById(kol_id + "twitterLink").innerText
    );
    formData.append(
      "discordLink",
      document.getElementById(kol_id + "discordLink").innerText
    );
    formData.append(
      "telegramLink",
      document.getElementById(kol_id + "telegramLink").innerText
    );
    formData.append(
      "youtubeLink",
      document.getElementById(kol_id + "youtubeLink").innerText
    );
    formData.append(
      "streamLink",
      document.getElementById(kol_id + "streamLink").innerText
    );

    setVerifying(true);
    try {
      const editedKOL = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/editUnverifiedKOL`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          body: formData,
        }
      );

      const data = await editedKOL.json();
      if (editedKOL.ok) {
        // verify the KOL
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/KOLregister/verifyKOL`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({ KOL_id: kol_id }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          setUnverifiedKOLs(unverifiedKOLs.filter((kol) => kol._id !== kol_id));
          alert("KOL verified successfully");
        } else {
          console.error(data.message || data.error);
          alert("KOL verification failed");
        }
      } else {
        console.error(data.message || data.error);
      }
    } catch (error) {
      alert("An error occurred while verifying the KOL.");
      console.error("Error verifying KOL:", error);
    } finally {
      setVerifying(false);
    }
  };

  const handleSubmitVerifiedKOLedit = async (kol_id) => {
    const formData = new FormData();
    formData.append("_id", kol_id);
    formData.append(
      "twitterName",
      document.getElementById(kol_id + "twitterName").innerText
    );
    formData.append(
      "IRLname",
      document.getElementById(kol_id + "IRLname").innerText
    );
    formData.append(
      "country",
      document.getElementById(kol_id + "country").innerText
    );
    formData.append(
      "walletAddress",
      document.getElementById(kol_id + "walletAddress").innerText
    );
    formData.append(
      "showAddress",
      document.getElementById(kol_id + "showAddress").children[0].checked
    );
    formData.append(
      "photoPath",
      document.getElementById(kol_id + "photoPath").src
    );
    formData.append(
      "imageFile",
      document.getElementById(kol_id + "photoInput").files[0]
    );
    formData.append(
      "twitterLink",
      document.getElementById(kol_id + "twitterLink").innerText
    );
    formData.append(
      "discordLink",
      document.getElementById(kol_id + "discordLink").innerText
    );
    formData.append(
      "telegramLink",
      document.getElementById(kol_id + "telegramLink").innerText
    );
    formData.append(
      "youtubeLink",
      document.getElementById(kol_id + "youtubeLink").innerText
    );
    formData.append(
      "streamLink",
      document.getElementById(kol_id + "streamLink").innerText
    );
    formData.append(
      "blueTick",
      document.getElementById(kol_id + "blueTick").children[0].checked
    );

    const editedKOL = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/editVerifiedKOL`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      }
    );

    const data = await editedKOL.json();
    if (editedKOL.ok) {
      getVerifiedKOLs();
    } else {
      console.error(data.message || data.error);
    }
  };

  const deleteVerifiedKOL = async (kol_id) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this KOL? This action cannot be undone."
    );
    if (!confirmation) return;
    const _id = kol_id;
    const deletedKOL = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/deleteVerifiedKOL`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          _id,
        }),
      }
    );

    const data = await deletedKOL.json();
    if (deletedKOL.ok) {
      getVerifiedKOLs();
    } else {
      console.error(data.message || data.error);
    }
  };

  const handleRejectKOL = async (kol_id) => {
    if (rejecting) return;
    const _id = kol_id;
    setRejecting(true);
    const rejectedKOL = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/rejectUnverifiedKOL`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          _id,
        }),
      }
    );

    const data = await rejectedKOL.json();
    if (rejectedKOL.ok) {
      getUnverifiedKOLs();
    } else {
      console.error(data.message || data.error);
    }
  };
  const getReviews = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/getAllReviews`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      setReviews(data);
    } else {
      console.error(data.message || data.error);
    }
    setRejecting(false);
  };

  const deleteReview = async (review_id) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (!confirmation) return;
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/deleteReview`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ _id: review_id }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      setReviews(reviews.filter((review) => review._id !== review_id));
    } else {
      console.error(data.message || data.error);
    }
  };

  return (
    <>
      {isAdmin ? (
        <div className={styles.adminPanel}>
          <h1 style={{ textAlign: "center" }}>Admin Panel</h1>
          <hr />
          <div className={styles.menu}>
            <button
              className={`${styles.menuButton} ${
                contentNo === 1 ? styles.selected : ""
              }`}
              onClick={() => {
                setContentNo(1);
                getUnverifiedKOLs();
              }}
            >
              Unverified KOLs
            </button>
            <button
              className={`${styles.menuButton} ${
                contentNo === 2 ? styles.selected : ""
              }`}
              onClick={() => {
                setContentNo(2);
                getVerifiedKOLs();
              }}
            >
              Verified KOLs
            </button>
            <button
              className={`${styles.menuButton} ${
                contentNo === 3 ? styles.selected : ""
              }`}
              onClick={() => {
                setContentNo(3);
                getReviews();
              }}
            >
              Reviews
            </button>
          </div>
          <hr />

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div id={styles.content}>
              {contentNo === 1 && unverifiedKOLs ? (
                <div className={styles.unverifiedKOLs}>
                  {unverifiedKOLs.map((kol) => (
                    <div key={kol._id} className={styles.kolCard}>
                      <div className={styles.unverifiedKOLsLeft}>
                        <h4>
                          Twitter Name:{" "}
                          <span contentEditable id={kol._id + "twitterName"}>
                            {kol.twitterName}
                          </span>
                        </h4>
                        <p>
                          IRL Name:{" "}
                          <span contentEditable id={kol._id + "IRLname"}>
                            {kol.IRLname}
                          </span>
                        </p>
                        <p>
                          Country:{" "}
                          <span contentEditable id={kol._id + "country"}>
                            {kol.country}
                          </span>
                        </p>
                        <p>
                          Wallet Address:{" "}
                          <span contentEditable id={kol._id + "walletAddress"}>
                            {kol.walletAddress}
                          </span>
                        </p>
                        <p>
                          Show Address:{" "}
                          <span id={kol._id + "showAddress"}>
                            <input
                              type="checkbox"
                              id={kol._id + "showAddress"}
                              defaultChecked={kol.showAddress}
                            />
                          </span>
                        </p>
                        <p>
                          Twitter Link:{" "}
                          <span contentEditable id={kol._id + "twitterLink"}>
                            {kol.twitterLink}
                          </span>
                        </p>
                        <p>
                          Discord Link:{" "}
                          <span contentEditable id={kol._id + "discordLink"}>
                            {kol.discordLink}
                          </span>
                        </p>
                        <p>
                          Telegram Link:{" "}
                          <span contentEditable id={kol._id + "telegramLink"}>
                            {kol.telegramLink}
                          </span>
                        </p>
                        <p>
                          YouTube Link:{" "}
                          <span contentEditable id={kol._id + "youtubeLink"}>
                            {kol.youtubeLink}
                          </span>
                        </p>
                        <p>
                          Stream Link:{" "}
                          <span contentEditable id={kol._id + "streamLink"}>
                            {kol.streamLink}
                          </span>
                        </p>
                        <p>
                          Submitted at:{" "}
                          <span id={kol._id + "timestamp"}>
                            {kol.timestamp}
                          </span>
                        </p>
                        <p className={styles.special}>
                          Sign ID:{" "}
                          <span id={kol._id + "signID"}>{kol.signID}</span>
                        </p>
                        <p className={styles.special}>
                          6 Digit Code:{" "}
                          <span id={kol._id + "generatedCode"}>
                            {kol.generatedCode}
                          </span>
                        </p>
                      </div>
                      <div className={styles.unverifiedKOLsRight}>
                        <div className={styles.imageContainer}>
                          <img
                            src={kol.photoPath}
                            alt="KOL"
                            className={styles.kolImage}
                            id={kol._id + "photoPath"}
                          />
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          id={kol._id + "photoInput"}
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              console.log("Selected file:", file);
                              // Add logic to handle the uploaded file
                            }
                          }}
                        />
                        <div className={styles.buttonContainer}>
                          <button
                            className={styles.verifyButton}
                            onClick={() => {
                              verifyKOL(kol._id);
                            }}
                          >
                            {verifying ? "Verifying..." : "Verify"}
                          </button>
                          <button
                            className={styles.rejectButton}
                            onClick={() => handleRejectKOL(kol._id)}
                          >
                            {rejecting ? "Rejecting..." : "Reject"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}

              {contentNo === 2 && verifiedKOLs ? (
                <div className={styles.verifiedKOLs}>
                  {verifiedKOLs.map((kol) => (
                    <div key={kol._id} className={styles.kolCard}>
                      <div className={styles.verifiedKOLsLeft}>
                        <h4>
                          Twitter Name:{" "}
                          <span contentEditable id={kol._id + "twitterName"}>
                            {kol.twitterName}
                          </span>
                        </h4>
                        <p>
                          IRL Name:{" "}
                          <span contentEditable id={kol._id + "IRLname"}>
                            {kol.IRLname}
                          </span>
                        </p>
                        <p>
                          Country:{" "}
                          <span contentEditable id={kol._id + "country"}>
                            {kol.country}
                          </span>
                        </p>
                        <p>
                          Wallet Address:{" "}
                          <span contentEditable id={kol._id + "walletAddress"}>
                            {kol.walletAddress}
                          </span>
                        </p>
                        <p>
                          Show Address:
                          <span id={kol._id + "showAddress"}>
                            <input
                              type="checkbox"
                              id={kol._id + "showAddress"}
                              defaultChecked={kol.showAddress}
                            />
                          </span>
                        </p>
                        <p>
                          Twitter Link:{" "}
                          <span contentEditable id={kol._id + "twitterLink"}>
                            {kol.twitterLink}
                          </span>
                        </p>
                        <p>
                          Discord Link:{" "}
                          <span contentEditable id={kol._id + "discordLink"}>
                            {kol.discordLink}
                          </span>
                        </p>
                        <p>
                          Telegram Link:{" "}
                          <span contentEditable id={kol._id + "telegramLink"}>
                            {kol.telegramLink}
                          </span>
                        </p>
                        <p>
                          YouTube Link:{" "}
                          <span contentEditable id={kol._id + "youtubeLink"}>
                            {kol.youtubeLink}
                          </span>
                        </p>
                        <p>
                          Stream Link:{" "}
                          <span contentEditable id={kol._id + "streamLink"}>
                            {kol.streamLink}
                          </span>
                        </p>
                        <p>
                          Blue Tick:
                          <span id={kol._id + "blueTick"}>
                            <input
                              type="checkbox"
                              id={kol._id + "blueTick"}
                              defaultChecked={kol.blueTick}
                            />
                          </span>
                        </p>
                        <p>Submitted at: {kol.timestamp}</p>
                      </div>
                      <div className={styles.verifiedKOLsRight}>
                        <div className={styles.imageContainer}>
                          <img
                            src={kol.photoPath}
                            alt="KOL"
                            id={kol._id + "photoPath"}
                            className={styles.kolImage}
                          />
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          id={kol._id + "photoInput"}
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              console.log("Selected file:", file);
                              // Add logic to handle the uploaded file
                            }
                          }}
                        />
                        <div className={styles.buttonContainer}>
                          <button
                            className={styles.editButton}
                            onClick={() => {
                              handleSubmitVerifiedKOLedit(kol._id);
                            }}
                          >
                            Submit Edit
                          </button>
                          <button
                            className={styles.deleteButton}
                            onClick={() => {
                              deleteVerifiedKOL(kol._id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}

              {contentNo === 3 && reviews ? (
                <div className={styles.reviews}>
                  {reviews.map((review) => (
                    <div key={review._id} className={styles.reviewCard}>
                      <p
                        className={styles.buttonContainer}
                        style={{
                          justifyContent: "space-between",
                          marginTop: 0,
                        }}
                      >
                        Given by: {review.username}
                        <button
                          className={styles.deleteButton}
                          onClick={() => deleteReview(review._id)}
                        >
                          Delete
                        </button>
                      </p>
                      <p>Received by: {review.reviewReceiver}</p>
                      <p>Text: {review.text}</p>
                      <p>Like Count: {review.likeCount}</p>
                      <p>Dislike Count: {review.dislikeCount}</p>
                      <p>Type: {review.type ? "Cooker" : "Farmer"}</p>
                      <p>Date: {review.date}</p>
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      ) : (
        <p>
          {checking
            ? "Checking admin status..."
            : "You are not authorized to access this page."}
        </p>
      )}
    </>
  );
}

export default AdminPanel;
