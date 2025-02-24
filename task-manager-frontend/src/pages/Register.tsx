import React, { useState, useEffect } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        console.log("🔄 Resetting register form...");
        localStorage.removeItem("username"); // ✅ Remove stored username
        sessionStorage.clear(); // ✅ Clear session storage
        setUsername(""); 
        setPassword("");
    }, []);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await registerUser(username, password);
            alert("User registered! You can now log in.");
            navigate("/login");
        } catch (error) {
            alert("Registration failed!");
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;




