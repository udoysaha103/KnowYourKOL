import styles from './AdminPanel.module.css';
import { useState, useEffect } from 'react';
import { useAuthContext } from "../../hooks/useAuthContext";

function AdminPanel() {
  document.title = "Admin Panel";

  const { user } = useAuthContext();

  // first check if the user is an admin
  const [isAdmin, setIsAdmin] = useState(false);
  const [contentNo, setContentNo] = useState(0);
  const [unverifiedKOLs, setUnverifiedKOLs] = useState([]);
  const [verifiedKOLs, setVerifiedKOLs] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchAdminStatus = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/verifyAdmin`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
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
    const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/unverifiedKOLs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      setUnverifiedKOLs(data);
    } else {
      console.error(data.message || data.error);
    }
  }

  const getVerifiedKOLs = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/verifiedKOLs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      setVerifiedKOLs(data);
    } else {
      console.error(data.message || data.error);
    }
  }

  const verifyKOL = async (kol_id) => {
    const _id = kol_id;
    const twitterName = document.getElementById(kol_id + "twitterName").innerHTML;
    const IRLname = document.getElementById(kol_id + "IRLname").innerHTML;
    const country = document.getElementById(kol_id + "country").innerHTML;
    const walletAddress = document.getElementById(kol_id + "walletAddress").innerHTML;
    const showAddress = document.getElementById(kol_id + "showAddress").innerHTML;
    const photoPath = document.getElementById(kol_id + "photoPath").innerHTML;
    const twitterLink = document.getElementById(kol_id + "twitterLink").innerHTML;
    const discordLink = document.getElementById(kol_id + "discordLink").innerHTML;
    const telegramLink = document.getElementById(kol_id + "telegramLink").innerHTML;
    const youtubeLink = document.getElementById(kol_id + "youtubeLink").innerHTML;
    const streamLink = document.getElementById(kol_id + "streamLink").innerHTML;

    const editedKOL = await fetch(`${import.meta.env.VITE_API_URL}/admin/editUnverifiedKOL`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        _id, twitterName, IRLname, country, walletAddress, showAddress, photoPath, twitterLink, discordLink, telegramLink, youtubeLink, streamLink
      }),
    });

    const data = await editedKOL.json();
    if (editedKOL.ok) {
      // verify the KOL
      const response = await fetch(`${import.meta.env.VITE_API_URL}/KOLregister/verifyKOL`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ kol_id }),
      });

      const data = await response.json();
      if (response.ok) {
        setUnverifiedKOLs(unverifiedKOLs.filter(kol => kol._id !== kol_id));
      } else {
        console.error(data.message || data.error);
      }
    } else {
      console.error(data.message || data.error);
    }
  }

  return (
    <>
      {isAdmin ? (
        <div className={styles.adminPanel}>
          <h1 style={{textAlign: "center"}}>Admin Panel</h1>
          <hr />
          <div className={styles.menu}>
            <button className={`${styles.menuButton} ${contentNo === 1? styles.selected : ""}`} onClick={() => {setContentNo(1); getUnverifiedKOLs();}}>Unverified KOLs</button>
            <button className={`${styles.menuButton} ${contentNo === 2? styles.selected : ""}`} onClick={() => {setContentNo(2); getVerifiedKOLs();}}>Verified KOLs</button>
          </div>
          <hr />

          <div id={styles.content}>
            {contentNo === 1 && unverifiedKOLs ? (
              <div className={styles.unverifiedKOLs}>
                {unverifiedKOLs.map((kol) => (
                  <div key={kol._id} className={styles.kolCard}>
                    <div className={styles.unverifiedKOLsLeft}>
                      <h4>Twitter Name: <span contentEditable id={kol._id + "twitterName"}>{kol.twitterName}</span></h4>
                      <p>IRL Name: <span contentEditable id={kol._id + "IRLname"}>{kol.IRLname}</span></p>
                      <p>Country: <span contentEditable id={kol._id + "country"}>{kol.country}</span></p>
                      <p>Wallet Address: <span contentEditable id={kol._id + "walletAddress"}>{kol.walletAddress}</span></p>
                      <p>Show Address: <span contentEditable id={kol._id + "showAddress"}>{kol.showAddress}</span></p>
                      <p>Twitter Link: <span contentEditable id={kol._id + "twitterLink"}>{kol.twitterLink}</span></p>
                      <p>Discord Link: <span contentEditable id={kol._id + "discordLink"}>{kol.discordLink}</span></p>
                      <p>Telegram Link: <span contentEditable id={kol._id + "telegramLink"}>{kol.telegramLink}</span></p>
                      <p>YouTube Link: <span contentEditable id={kol._id + "youtubeLink"}>{kol.youtubeLink}</span></p>
                      <p>Stream Link: <span contentEditable id={kol._id + "streamLink"}>{kol.streamLink}</span></p>
                      <p>Submitted at: <span id={kol._id + "timestamp"}>{kol.timestamp}</span></p>
                      <p className={styles.special}>Sign ID: <span id={kol._id + "signID"}>{kol.signID}</span></p>
                      <p className={styles.special}>6 Digit Code: <span id={kol._id + "generatedCode"}>{kol.generatedCode}</span></p>
                    </div>
                    <div className={styles.unverifiedKOLsRight}>
                      <div className={styles.imageContainer}>
                          <img src={kol.photoPath} alt="KOL" className={styles.kolImage} id={kol._id + "photoPath"} />
                      </div>
                      <div className={styles.buttonContainer}>
                        <button className={styles.verifyButton} onClick={() => {verifyKOL(kol._id, )}}>Verify</button>
                        <button className={styles.rejectButton} onClick={() => {}}>Reject</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ): ("")
            }

            {contentNo === 2 && verifiedKOLs ? (
              <div className={styles.verifiedKOLs}>
                {verifiedKOLs.map((kol) => (
                  <div key={kol._id} className={styles.kolCard}>
                    <div className={styles.verifiedKOLsLeft}>
                      <h4>Twitter Name: {kol.twitterName}</h4>
                      <p>IRL Name: {kol.IRLname}</p>
                      <p>Country: {kol.country}</p>
                      <p>Wallet Address: {kol.walletAddress}</p>
                      <p>Show Address: {kol.showAddress}</p>
                      <p>Twitter Link: {kol.twitterLink}</p>
                      <p>Discord Link: {kol.discordLink}</p>
                      <p>Telegram Link: {kol.telegramLink}</p>
                      <p>YouTube Link: {kol.youtubeLink}</p>
                      <p>Stream Link: {kol.streamLink}</p>
                    </div>
                    <div className={styles.verifiedKOLsRight}>
                      <div className={styles.imageContainer}>
                          <img src={kol.photoPath} alt="KOL" className={styles.kolImage} id={kol._id + "photoPath"} />
                      </div>
                      <div className={styles.buttonContainer}>
                        <button className={styles.blueTickButton} onClick={() => {}}>{kol.verifiedByAdmin ? "Remove Tick" : "Add Tick"}</button>
                        <button className={styles.deleteButton} onClick={() => {}}>Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ): ("")
            }
          </div>
        </div>
      ) : (
        <p>Verifying user...</p>
      )}
    </>
  )
}

export default AdminPanel