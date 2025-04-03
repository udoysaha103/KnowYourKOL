import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import Icon from "../Icon";
import { copyElementText } from "../../utils/textUtils";
import styles from "./Navbar.module.css";

function Navbar({ changeRequest }) {
  const [search, setSearch] = useState([]);
  const [query, setQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [sending, setSending] = useState(false);
  const [isMouseOnElement, setIsMouseOnElement] = useState(false);
  const [showDonation, setShowDonation] = useState(false);
  const [searching, setSearching] = useState(false);
  const abortController = useRef(null);
  const copyRef = useRef(null);
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const handleResend = async () => {
    if (sending) return;
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
  const fetchSearchResult = async (query) => {
    if (query.length > 0) {
      if (abortController.current) {
        abortController.current.abort(); // Abort the previous request if it exists
      }
      abortController.current = new AbortController(); // Create a new AbortController for the new request
      try {
        setSearching(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/getKOL/search/${query}`,
          {
            signal: abortController.current.signal, // Pass the signal to the fetch request
          }
        );
        const data = await response.json();
        setSearching(false);
        if (response.ok) {
          setSearch(data);
        } else {
          console.log("Error fetching search results");
        }
      } catch (err) {
        console.log(err);
        setSearching(false);
        setSearch([]);
      }
    } else {
      setSearch([]);
    }
  };
  const handleSearch = async (e) => {
    const value = e.target.value.trim();
    setQuery(value);
    fetchSearchResult(value);
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
        <div className={styles.searchContainer}>
          <input
            className={styles.searchBar}
            type="search"
            placeholder="Search"
            aria-label="Search"
            id="SearchInput"
            autoComplete="off"
            value={query}
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
          <button className={styles.btn} onClick={() => navigate("/memebubbles")}>
            Meme Bubbles
          </button>
          <button className={styles.btn} onClick={() => navigate("/add-kol")}>
            <Icon name="AddKOL" color="#f8f8f8" height="100%" />
            &nbsp;Add KOL
          </button>
          <button
            onClick={() => setShowDonation(!showDonation)}
            style={{ background: "none", border: "none" }}
          >
            <Icon
              name="Donation"
              color="#f8f8f8"
              height="100%"
              onClick={() => setShowDonation(!showDonation)}
              style={{ cursor: "pointer" }}
            />
          </button>
          <button
            style={{ background: "none", border: "none" }}
            onClick={() => {
              if (user) setShowMenu(!showMenu);
              else navigate("/login");
            }}
          >
            <Icon
              name="AccountBox"
              color="#f8f8f8"
              height="100%"
              style={{ cursor: "pointer" }}
            />
          </button>
        </div>
      </nav>

      {user && showMenu && (
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
              {sending ? "Sending..." : "Resend Verification Email"}
            </div>
          )}
          <div className={styles.menuItem} onClick={() => logout()}>
            <Icon name="Login" color="#f8f8f8" height="32px" />
            &nbsp; Logout
          </div>
        </div>
      )}
      {showDonation && (
        <div className={styles.donation}>
          <div className={styles.donationText}>
            We’re committed to keep KnowYourKOL a Not-For-Profit platform and
            won't implement any payment wall for end users. <br />
            <br />
            In return, we kindly request your donation to sustain and operate
            it.
            <br />
            <br />
          </div>
          <div className={styles.addressHeader}>Solana Donation Wallet</div>
          <div className={styles.address}>
            <div ref={copyRef} style={{ wordWrap: "break-word" }}>
              7FD1SXXe8YaD1VxyCLmb41tzkUSfwNP4mFN9NUxPbZt3{" "}
            </div>
            <Icon
              name="Copy"
              color="#f8f8f8"
              height="20px"
              onClick={() =>
                copyElementText(
                  copyRef.current,
                  "7FD1SXXe8YaD1VxyCLmb41tzkUSfwNP4mFN9NUxPbZt3"
                )
              }
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
