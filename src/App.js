import MainPage from "./pages/MainPage"
import ServerTime from "./pages/ServerTime";
import NoPage from "./pages/NoPage"
import UserHomePage from "./pages/UserHomePage";
import UserGroupPage from "./pages/UserGroupPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dummy from "./pages/Dummy";

function App() {
    const userGroups = [
        "grupo 1",
        "grupo 2",
        "grupo 3",
        "grupo 4"
    ]
    return(
        <>
        <div className="d-flex flex-column" style={{height: "100vh"}}>
            <Header userGroups={userGroups}/>
            <div style={{flex: "1"}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainPage />}/>
                        <Route path="/home" element={<UserHomePage userGroups={userGroups}/>}/>
                        <Route path="/groupName" element={<UserGroupPage />}/>
                        <Route path="/serverTime" element={<ServerTime />} />
                        <Route path="/dummy" element={<Dummy />} />
                        <Route path="*" element={<NoPage />} />
                    </Routes>
                </BrowserRouter>
            </div>
            <Footer />
        </div>
        </>
    )
}

export default App;