import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [input,setInput] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [username]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const storedUsername = localStorage.getItem("username");
        const storedPassword = localStorage.getItem("password");

        if (!input.username || !input.password) {
            setError("Please enter username and password");
            return;
        }

        if (input.username !== storedUsername || input.password !== storedPassword) {
            setError("Invalid username or password");
            return;
        }

        setError("");

        navigate("/game");
    };

    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <br/>
                    <input type="text" 
                    id="username"
                    name="username"
                    value={input.username}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <br/>
                    <input type="password"
                    id="password"
                    name="password"
                    value={input.password}
                    onChange={handleChange}
                    required
                     />
                </div>
                {error && <p style={{ color: "red"}}>{error}</p>}
                <button type="submit" className="btn">Login</button>
            </form>
        </div>
    );
 };

 export default Login;