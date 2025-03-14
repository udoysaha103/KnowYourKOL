import "./Footer.css"
import { Link } from "react-router-dom";

import Star from "../Star/Star";

function Footer() {
  return (
    <div className="footerText">
        2025 © All rights reserved - Know Your KOL. 
        <Link to="/termsOfUse" className="footerLink">Terms of Use</Link> 
        <Link to="/privacyPolicies" className="footerLink">Privacy</Link> 
        <Link to="/FAQ" className="footerLink">FAQ</Link>  
        <Link to="https://x.com/KnowYourKOL" target="_blank" className="footerLink">
            <img src="./x.png" alt="Twitter" />
        </Link>
    </div>
  )
}

export default Footer