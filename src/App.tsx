import Main from "@/pages/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './assets/styles/globals.scss'

const basename = import.meta.env.BASE_URL;

function App() {

    return (
        <BrowserRouter basename={basename}>
            <Routes>
                <Route path="/" element={<Main/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;