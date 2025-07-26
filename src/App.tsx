import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import GameListPage from "./pages/GameListPage.tsx";
import SubmitGamePage from "./pages/SubmitGamePage.tsx";

export default function App(){
    return(
        <BrowserRouter>
            <div
                style={{
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                    padding:'24px',
                    justifyContent:'flex-start',
                    boxSizing:'border-box',
            }}>
                <nav
                    style={{
                        display:'flex',
                        gap:'16px',
                        marginBottom:'24px',
                    }}>
                    <Link to={"/boardgames"}>Games</Link>
                    <Link to={"/submit"}>Submit New Game</Link>
                </nav>
                <Routes>
                    <Route path={"/boardgames"} element={<GameListPage/>}/>
                    <Route path={"/submit"} element={<SubmitGamePage/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}