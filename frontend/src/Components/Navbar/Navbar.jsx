import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import Icon from "../Icon";
import styles from "./Navbar.module.css";

function Navbar({ changeRequest }) {
  const [search, setSearch] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [sending, setSending] = useState(false);
  const [isMouseOnElement, setIsMouseOnElement] = useState(false);
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const handleResend = async () => {
    if(sending) return;
    setSending(true);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/user/getVerificationMail`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      }
    );
    const json = await response.json();
    setSending(false);
    if (response.ok) {
      alert("Verification email sent successfully");
    } else {
      alert(json.error);
    }
  };


  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setSearch([]);
      if (changeRequest) changeRequest(false);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    if (searchValue.length > 0) {
      fetch(`${import.meta.env.VITE_API_URL}/getKOL/search/${searchValue}`)
        .then((res) => res.json())
        .then((data) => {
          setSearch(data);
        });
    } else {
      setSearch([]);
    }
  };
  return (
    <>
      <nav className={styles.navbar}>
        <Link className={styles.link} to="/">
          <div className={styles.logoMenu}>
            <img src="/KOL logo.png" alt="Logo" />
            <div className={styles.dividerVertical}></div>
            <span className={styles.header}>Know Your KOL</span>
          </div>
        </Link>
        <div>
          <input
            className={styles.searchBar}
            type="search"
            placeholder="Search"
            aria-label="Search"
            id="SearchInput"
            autoComplete="off"
            onChange={(e) => handleSearch(e)}
            onBlur={() => {
              if (!isMouseOnElement) {
                setSearch([]);
              }
            }}
          />
          {search.length > 0 && (
            <div
              className={styles.searchResult}
              onMouseEnter={() => setIsMouseOnElement(true)}
              onMouseLeave={() => setIsMouseOnElement(false)}
            >
              {search.map((searchItem, idx) => (
                <div
                  key={idx}
                  className={styles.searchResultItem}
                  onClick={() => navigate(`/profile/${searchItem._id}`)}
                >
                  <img
                    src={searchItem.photoPath}
                    className={styles.searchResultImg}
                  />
                  <div className={styles.searchResultText}>
                    <span className={styles.searchResultTitle}>
                      {searchItem.twitterName}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.navButtons}>
          <div>
            <Link to="/memebubbles" className={styles.link}>
              <button className={styles.btn}>Meme Bubbles</button>
            </Link>
          </div>
          <div>
            <Link to="/add-kol" className={styles.link}>
              <button className={styles.btn}>
                <Icon name="AddKOL" color="#f8f8f8" height="32px" />
                <span style={{ marginLeft: "10px" }}>Add KOL</span>
              </button>
            </Link>
          </div>

          <div
            onClick={() => {
              if (user) setShowMenu(!showMenu);
            }}
          >
            <Link to={user ? "" : "/login"} className={styles.link}>
              <Icon name="AccountBox" color="#f8f8f8" height="51px" />
              &nbsp;
            </Link>
          </div>
        </div>
      </nav>

      {showMenu && (
        <div className={styles.menu}>
          {user && (
            <div className={styles.name}>
              {user.username}&nbsp;
              <small style={{ color: "GrayText" }}>
                {user.verificationStatus ? "(verified)" : "(Not verified)"}
              </small>
            </div>
          )}
          {user && !user.verificationStatus && (
            <div className={styles.resendLink} onClick={handleResend}>
              {sending? "Sending..." : "Resend Verification Email"}
            </div>
          )}
          <div className={styles.menuItem} onClick={() => logout()}>
            <Icon name="Login" color="#f8f8f8" height="32px" />
            &nbsp; Logout
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
