import { Link } from "react-router-dom";
import { useState } from "react";
import Icon from "../Icon";
import styles from "./Navbar.module.css";

function Navbar() {
  const [search, setSearch] = useState([]);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setSearch([]);
    }
  }
  );
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    if (searchValue.length > 0) {
      fetch(`http://localhost:5000/getKOL/search/${searchValue}`)
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
            <img src="../../public/KOL logo.png" alt="Logo" />
            <div className={styles.dividerVertical}></div>
            <span className={styles.header}>Know Your KOL</span>
          </div>
        </Link>

        <input
          className={styles.searchBar}
          type="search"
          placeholder="Search"
          aria-label="Search"
          id="SearchInput"
          onChange={(e) => handleSearch(e)}
        />
        <div className={styles.navButtons}>
          <div>
            <Link to="/add-kol" className={styles.link}>
              <button className={styles.btn}>
                <Icon name="AddKOL" color="#f8f8f8" height="32px" />
                &nbsp; Add KOL
              </button>
            </Link>
          </div>

          <div>
            <Link to="/login" className={styles.link}>
              <Icon name="AccountBox" color="#f8f8f8" height="51px" />
              &nbsp;
            </Link>
          </div>
        </div>
      </nav>
      {search.length > 0 && <div className={styles.searchResult}>
        {search.map((searchItem, idx)=> <Link to={`/profile/${searchItem._id}`}><div key={idx} className={styles.searchResultItem}>
          <img
            src={searchItem.photoPath}
            className={styles.searchResultImg}
          />
          <div className={styles.searchResultText}>
            <span className={styles.searchResultTitle}>{searchItem.twitterName}</span>
          </div>
        </div></Link>)}
      </div>}
    </>
  );
}

export default Navbar;
