import { Link } from "react-router-dom"
import userIcon from "../imgs/Navbar/user.png"
import { AccountContext } from "./Account"
import { useContext, useEffect } from "react"
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({setLoggedIn,isLoggedIn,setIdToken,setUserName}) => {
    const {getSession,logout} = useContext(AccountContext)
    const currentPath = useLocation()
    const navigate = useNavigate()

    const uiLogout = () => {
        logout()
        setLoggedIn(false)
        navigate("/")
    }

    useEffect(() => {
        getSession()
        .then(session => {
            setLoggedIn(true)
            setIdToken(session.idToken.jwtToken)
            setUserName(session.idToken.payload["custom:username"])
        })
        .catch(err => () => {
            setLoggedIn(false)
            setIdToken("")
        })
    },[])

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className="collapse navbar-collapse">
                    <NavbarLinks/>
                    {isLoggedIn ? <NavbarUser logout={uiLogout}/> : currentPath.pathname === "/auth" ? null : <NavbarLogin/>}
                </div>
            </div>
        </nav>
    )
}

const NavbarLinks = () => {
    return(
        <div className="navbar-nav me-auto mb-2 mb-lg-0">
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            
            <Link className="navbar-brand ms-3" to="/">OneCampus</Link>

        </div>  
    )
}

const NavbarUser = ({logout}) => {
    return(
        <div className="dropdown text-end">
            <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={userIcon} alt="user icon" width="32" height="32" className="rounded-circle"/>
            </a>
            <ul className="dropdown-menu dropdown-menu-lg-end text-small">
                {/* <li><hr className="dropdown-divider"/></li> */}
                <li><button onClick={logout} className="dropdown-item">Sign out</button></li>
            </ul>
        </div>
    )
}

const NavbarLogin = () => {
    return(
        <>
            <Link to={"/auth"}>
                <button type="button" className="btn btn-primary">Sign in</button>
            </Link>
        </>
    )
}

export default Navbar