import MainPage from "./pages/MainPage"
import ServerTime from "./pages/ServerTime";
import NoPage from "./pages/NoPage"
import UserHomePage from "./pages/UserHomePage";
import UserGroupPage from "./pages/UserGroupPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dummy from "./pages/Dummy";
import { Account } from "./components/Account";
import LoginPage from "./pages/LoginPage";
import { useState } from "react";

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {

    const [loggedIn,setLoggedIn] = useState(false)
    const [idToken,setIdToken] = useState("")
    const [userName,setUserName] = useState("")

    return(
        <>
        <div className="d-flex flex-column" style={{height: "100vh"}}>
            <Account>
                <BrowserRouter>
                    <Header isLoggedIn={loggedIn} setLoggedIn={setLoggedIn} setIdToken={setIdToken} setUserName={setUserName}/>
                    <div style={{flex: "1"}}>
                        <Routes>
                            <Route path="/" element={<MainPage />}/>
                            <Route path="/auth" element={<LoginPage setLoggedIn={setLoggedIn} setIdToken={setIdToken} _setUsername={setUserName}/>}/>
                            <Route path="/home" element={<UserHomePage/>}/>
                            <Route path="/groupName" element={<UserGroupPage />}/>
                            <Route path="/serverTime" element={<ServerTime />} />
                            <Route path="/dummy/*" element={<Dummy token={idToken} username={userName}/>} />
                            <Route path="*" element={<NoPage />} />
                        </Routes>
                    </div>
                </BrowserRouter>
                <Footer />
            </Account>
        </div>
        </>
    )
}

export default App;
