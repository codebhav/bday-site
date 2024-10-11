// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PhotoParallax from "./components/PhotoParallax";
import Aurora from "./components/Aurora";
import Wishes from "./pages/Wishes";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <PhotoParallax />
                            <Aurora />
                        </>
                    }
                />
                <Route path="/wishes" element={<Wishes />} />
            </Routes>
        </Router>
    );
};

export default App;
