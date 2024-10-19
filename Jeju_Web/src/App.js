import './App.css';
import Home from "./Pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sub from "./Pages/Sub"; // BrowserRouter 추가
function App() {
    return (
        <BrowserRouter>
        <div style={{textAlign: 'center'}}>
            <Routes>
                <Route path="/" element ={ <Home onChange = {() => window.location.href = "/sub"} />}></Route>
                <Route path="/sub" element ={<Sub />}></Route>
            </Routes>
        </div>
        </BrowserRouter>

    );
}

export default App;
