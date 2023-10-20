import MainPage from "./pages/MainPage"
import ServerTime from "./pages/ServerTime";
import NoPage from "./pages/NoPage"
import UserHomePage from "./pages/UserHomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />}/>
                <Route path="/home" element={<UserHomePage />}/>
                <Route path="serverTime" element={<ServerTime />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default App;