import "./Footer.css"
import { Link } from "react-router-dom";

import React from 'react'

function Footer() {
  return (
    <div className="footerText">
        2025 © All rights reserved - Know Your KOL. 
        <Link to="" className="footerLink">Terms of Use</Link> 
        <Link to="" className="footerLink">Privacy</Link> 
        <Link to="" className="footerLink">FAQ</Link>  
        <Link to="" className="footerLink">
            <img src="./x.png" alt="Twitter" />
        </Link>
    </div>
  )
}

export default Footer