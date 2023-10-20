import Navbar from "./Navbar"

const Header = ({userGroups}) => {
    return(
        <header className="mb-3 border-bottom">
            <Navbar userGroups={userGroups}/>
        </header>
    )
}

export default Header