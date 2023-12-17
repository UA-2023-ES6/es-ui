import MainPage from "./pages/MainPage"
import NoPage from "./pages/NoPage"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import InstitutionsPage from "./pages/InstitutionsPage";
import { Account } from "./components/Account";
import LoginPage from "./pages/LoginPage";
import { useEffect, useState } from "react";
import Confirmation from "./pages/Confirmation";

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {

    const [loggedIn,setLoggedIn] = useState(false)
    const [idToken,setIdToken] = useState("")
    const [userName,setUserName] = useState("")

    useEffect(() => {
        document.title = "OneCampus"
    },[])

    return(
        <>
        <div className="d-flex flex-column" style={{height: "100vh"}}>
            <Account>
                <BrowserRouter>
                    <Header isLoggedIn={loggedIn} setLoggedIn={setLoggedIn} setIdToken={setIdToken} setUserName={setUserName}/>
                    <div style={{flex: "1"}}>
                        <Routes>
                            <Route path="/" element={<MainPage />}/>
                            {!loggedIn ? <Route path="/auth" element={<LoginPage setLoggedIn={setLoggedIn} setIdToken={setIdToken} _setUsername={setUserName}/>}/> : null}
                            {loggedIn ? <Route path="/institutions" element={<InstitutionsPage token={idToken} username={userName}/>} /> : null}
                            {!loggedIn ? <Route path="/auth/confirmation" element={<Confirmation />}/> : null}
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
