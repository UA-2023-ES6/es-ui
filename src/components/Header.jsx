import Navbar from "./Navbar"

const Header = ({userGroups,setLoggedIn,isLoggedIn}) => {
    return(
        <header className="border-bottom" style={{position: "sticky", top: 0, zIndex: 1000, backgroundColor: "white", width: "100%"}}>
            <Navbar userGroups={userGroups} setLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn}/>
        </header>
    )
}

export default Header