import { Link } from "react-router-dom";
import Icon from "../../Components/Icon";
import styles from "./Footer.module.css";

const Footer = (props) => {
  return (
    <div className={styles.footerText} {...props}>
        2025 © All rights reserved - Know Your KOL. 
        <Link to="/termsofuse" className={styles.footerLink}>Terms of Use</Link> 
        <Link to="/privacypolicies" className={styles.footerLink}>Privacy</Link> 
        <Link to="/FAQ" className={styles.footerLink}>FAQ</Link>  
        <Link to="https://x.com/KnowYourKOL" target="_blank" className={styles.footerLink}>
          <Icon name="X" color="#f8f8f8" />
        </Link>
    </div>
  )
}

export default Footer