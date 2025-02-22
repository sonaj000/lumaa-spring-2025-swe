import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";

const App: React.FC = () => {
    return (
        <Router>
            <nav>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/tasks">Tasks</Link>
            </nav>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tasks" element={<Tasks />} />
            </Routes>
        </Router>
    );
};

export default App;

