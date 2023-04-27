import './App.css'
import {Header} from "./components/Header.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home.jsx";
import {Cart} from "./pages/Cart.jsx";

function App() {

    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path={'/'} element={<Home />} />
                <Route path={'/cart'} element={<Cart />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
