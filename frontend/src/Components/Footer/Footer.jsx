import "./Footer.css"
import { Link } from "react-router-dom";
import Icon from "../../Components/Icon";

const Footer = (props) => {
  return (
    <div className="footerText" {...props}>
        2025 © All rights reserved - Know Your KOL. 
        <Link to="/termsofuse" className="footerLink">Terms of Use</Link> 
        <Link to="/privacypolicies" className="footerLink">Privacy</Link> 
        <Link to="/FAQ" className="footerLink">FAQ</Link>  
        <Link to="https://x.com/KnowYourKOL" target="_blank" className="footerLink">
          <Icon name="X" height="22px" color="#f8f8f8" />
        </Link>
    </div>
  )
}

export default Footer