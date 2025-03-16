import { Link } from "react-router-dom";
import Icon from "../Icon";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link className={styles.link} to="/">
        <div className={styles.logoMenu}>
          <img src="../../public/KOL logo.png" alt="Logo"/>
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
  );
}

export default Navbar;
