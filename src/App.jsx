// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PhotoParallax from "./components/PhotoParallax";
import Aurora from "./components/Aurora";
import Wishes from "./pages/Wishes";
import HomePage from "./pages/HomePage";

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
                <Route path="/homepage" element={<HomePage />} />
            </Routes>
        </Router>
    );
};

export default App;
