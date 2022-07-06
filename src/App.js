import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./pages/Home";
import { getCategories } from "./redux/catSlice";
import Ques from "./pages/Ques";
import Result from "./pages/Result";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="questions" element={<Ques />} />
                    <Route path="result" element={<Result />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
