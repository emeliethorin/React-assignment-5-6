import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Form.css';
import { Link } from "react-router-dom";

function RegistrationForm() {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.username || !input.password) {
            setError("Username and password is required");
            return;
        } 

        localStorage.setItem("username", input.username);
        localStorage.setItem("password", input.password);

        setError("");
        setShowSuccess(true);
        setTimeout(() => {
            navigate("/login");
        }, 2000);
    };


    return (
    
            <div className="container">
                <h1>Register to play</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                        <label htmlFor="username">Username:</label>
                        <br/>
                        <input className="input" type="text" 
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
                        <input className="input" type="password"
                        id="password"
                        name="password"
                        value={input.password}
                        onChange={handleChange}
                        required
                        />
                    </div>
                        {error && <p style={{ color: "red"}}>{error}</p>}
                        {showSuccess && (
                            <p style={{ color: "green" }}>
                                Success! <br/>You are now being redirected..
                            </p>
                        )}

                        <button type="submit" className="btn">Register</button>
                        <p><Link to="/login">Already have an account? Login here</Link></p>

                    </form>
            </div>
    );
};

export default RegistrationForm;