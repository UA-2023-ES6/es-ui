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
import { useEffect, useState } from "react";

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {

    const [loggedIn,setLoggedIn] = useState(false)

    const userGroups = [
        "grupo 1",
        "grupo 2",
        "grupo 3",
        "grupo 4"
    ]

    return(
        <>
        <div className="d-flex flex-column" style={{height: "100vh"}}>
            <Account>
                <BrowserRouter>
                    <Header userGroups={userGroups} isLoggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
                    <div style={{flex: "1"}}>
                        <Routes>
                            <Route path="/" element={<MainPage />}/>
                            <Route path="/auth" element={<LoginPage setLoggedIn={setLoggedIn} />}/>
                            <Route path="/home" element={<UserHomePage userGroups={userGroups}/>}/>
                            <Route path="/groupName" element={<UserGroupPage />}/>
                            <Route path="/serverTime" element={<ServerTime />} />
                            <Route path="/dummy/*" element={<Dummy />} />
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