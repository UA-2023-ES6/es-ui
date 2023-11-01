import { Link, useLocation, useNavigate } from "react-router-dom"
import userIcon from "../imgs/Navbar/user.png"
import Cookies from "js-cookie";

const Navbar = ({userGroups}) => {
    const currentPath = useLocation()
    if (Cookies.get("loggedIn") === "true") {
        return(
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse">
                        <NavbarLinks userGroups={userGroups}/>
                        <NavbarUser />
                    </div>
                </div>
            </nav>
        )
    }else if (currentPath.pathname === "/login") {
        return(
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse">
                        <NavbarLinks userGroups={userGroups}/>
                    </div>
                </div>
            </nav>
        ) 
    }else {
        return(
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse">
                        <NavbarLinks userGroups={userGroups}/>
                        <NavbarLogin />
                    </div>
                </div>
            </nav>
        )
    }
}

const NavbarLinks = ({userGroups}) => {
    return(
        <div className="navbar-nav me-auto mb-2 mb-lg-0">
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            
            <Link className="navbar-brand ms-3" to="/">OneCampus</Link>

        </div>  
    )
}

const NavbarUser = () => {
    const navigate = useNavigate();
    return(
        <div className="d-flex align-items-center">
            <div className="dropdown text-end">
                <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={userIcon} alt="user icon" width="32" height="32" className="rounded-circle"/>
                </a>
                <ul className="dropdown-menu dropdown-menu-lg-end text-small">
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" href="#" onClick={() => {Cookies.set("loggedIn", "false"); navigate("/")}}>Sign out</a></li>
                </ul>
            </div>
        </div>
    )
}

const NavbarLogin = () => {
    return(
        <>
            <Link to={"/login"}>
                <button type="button" className="btn btn-primary">Sign in</button>
            </Link>
        </>
    )
}

export default Navbar