import "./Navbar.css"
import { Link } from "react-router-dom"
import Icon from "../Icon";

function Navbar() {
  return (
    <div id="NavbarWrapper">
        <nav className="navbar navbar-expand-lg">
            <div className="container" id="NavbarContainer">
                <div>
                    <Link className="navbar-brand" to="/" id="LogoMenu">
                        <img src="../../public/KOL logo.png" alt="Logo" id="LogoPic" />
                        <div id="VerticalBar"></div>
                        <span id="LogoName">Know Your KOL</span>
                    </Link>
                </div>

                {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent"> */}
                    <div id="SearchForm">
                        <form className="d-flex" role="search">
                            <input className="form-control me-0" type="search" placeholder="Search" aria-label="Search" id="SearchInput"/>
                            {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                        </form>
                    </div>
                {/* </div> */}

                <div id="NavButtons">
                    <div>
                        <Link to="/add-kol" id="AddKOL">
                            <Icon name="AddKOL" color="#f8f8f8" height="32px"/>&nbsp;
                            Add KOL
                        </Link>
                    </div>

                    <div>
                        <Link to="/profile" id="Profile">
                            <Icon name="AccountBox" color="#f8f8f8" height="51px"/>&nbsp;
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar