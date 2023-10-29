import Navbar from "./Navbar"

const Header = ({userGroups}) => {
    return(
        <header className="border-bottom">
            <Navbar userGroups={userGroups}/>
        </header>
    )
}

export default Header