import userIcon from "../imgs/Navbar/user.png"

const Navbar = ({userGroups}) => {
    return(
        <div className="container-fluid">
            <div className="d-flex align-items-center">
                <NavbarLinks userGroups={userGroups}/>
                <div className="flex-grow-1"></div>
                <NavbarUser />
            </div>
        </div>
    )
}

const NavbarLinks = ({userGroups}) => {
    console.log(userGroups)
    return(
        <nav className="navbar navbar-expand-lg" aria-label="navbar">
            <div className="container">
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand ms-3" href="#">ES project</a>
                
                <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">ES project</h5>
                    <button type="button" className="btn-close btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-start flex-grow-1 pe-3">
                            <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Groups
                            </a>
                            <ul className="dropdown-menu">
                                {userGroups.map((groupName) => {
                                    return <li key={groupName}><a className="dropdown-item">{groupName}</a></li>
                                })}
                            </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

const NavbarUser = () => {
    return(
        <div className="dropdown text-end">
            <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={userIcon} alt="user icon" width="32" height="32" className="rounded-circle"/>
            </a>
            <ul className="dropdown-menu dropdown-menu-lg-end text-small">
                <li><a className="dropdown-item" href="#">New project...</a></li>
                <li><a className="dropdown-item" href="#">Settings</a></li>
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li><hr className="dropdown-divider"/></li>
                <li><a className="dropdown-item" href="#">Sign out</a></li>
            </ul>
        </div>
    )
}

export default Navbar