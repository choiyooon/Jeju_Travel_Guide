import './App.css';
import Home from "./Pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // BrowserRouter 추가
function App() {
    return (
        <BrowserRouter>
        <div style={{textAlign: 'center'}}>
            <Routes>
                <Route path="/" element ={ <Home onChange = {() => window.location.href = "/sub"} />}></Route>
            </Routes>
        </div>
        </BrowserRouter>

    );
}

export default App;
