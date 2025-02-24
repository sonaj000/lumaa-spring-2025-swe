import React, { useState, useEffect } from "react";
import { loginUser } from "../api";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        console.log("🔄 Resetting login form...");
        localStorage.removeItem("username"); // ✅ Remove stored username
        sessionStorage.clear(); // ✅ Clear any session storage
        setUsername(""); 
        setPassword("");
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = await loginUser(username, password);
            localStorage.setItem("token", token);
            window.location.href = "/tasks"; // ✅ Redirect & refresh
        } catch (error) {
            alert("Login failed!");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    autoComplete="off"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    autoComplete="off"
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;








