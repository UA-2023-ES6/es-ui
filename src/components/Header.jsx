import Navbar from "./Navbar"

const Header = ({setLoggedIn,isLoggedIn,setIdToken,setUserName}) => {
    return(
        <header className="border-bottom" style={{position: "sticky", top: 0, zIndex: 1000, backgroundColor: "white", width: "100%"}}>
            <Navbar setLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn} setIdToken={setIdToken} setUserName={setUserName}/>
        </header>
    )
}

export default Header