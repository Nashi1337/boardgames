import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import GameListPage from "./pages/GameListPage.tsx";
import SubmitGamePage from "./pages/SubmitGamePage.tsx";

export default function App(){
    return(
        <BrowserRouter>
            <nav className={"p-4 shadow bg-white flex space-x-4"}>
                <Link to={"/"}>Games</Link>
                <Link to={"/submit"}>Submit New Game</Link>
            </nav>
            <Routes>
                <Route path={"/"} element={<GameListPage/>}/>
                <Route path={"/submit"} element={<SubmitGamePage/>}/>
            </Routes>
        </BrowserRouter>
    )
}