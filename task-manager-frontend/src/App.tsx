import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";

const App: React.FC = () => {
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.clear(); // ✅ Clears everything from localStorage
        sessionStorage.clear(); // ✅ Clears sessionStorage in case browser retains anything
        window.location.href = "/login"; // ✅ Full refresh to reset React state
    };
    

    return (
        <Router>
            <nav>
                {!token ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                ) : (
                    <>
                        <Link to="/tasks">Tasks</Link>
                        <button onClick={handleLogout}>Logout</button> {}
                    </>
                )}
            </nav>

            <Routes>
                <Route path="/login" element={!token ? <Login /> : <Navigate to="/tasks" />} />
                <Route path="/register" element={!token ? <Register /> : <Navigate to="/tasks" />} />
                <Route path="/tasks" element={token ? <Tasks /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;



