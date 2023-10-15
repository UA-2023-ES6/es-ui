import MainPage from "./pages/MainPage"
import ServerTime from "./pages/ServerTime";
import NoPage from "./pages/NoPage"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />}/>
                <Route path="serverTime" element={<ServerTime />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default App;