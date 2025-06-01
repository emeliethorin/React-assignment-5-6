import { useState } from "react";
import React { useState } from "react";
import { useNavigate } from react-router-dom;

function Register() {
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "";
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("user", JSON.stringify(input));
        setShowSuccess(true);
        setTimeout(() => {
            navigate("/login");
        }, 3000);
    };

    return (
        <>
        <h1>Register to play</h1>
            <div className="container">
                <h2>Create account</h2>
            </div>
        </>
    )
}