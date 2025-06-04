import React from "react";
import { Link } from "react-router-dom";
 
function Home() {
    return (
<div>
    <h1>Welcome to the <br /> Dog Guessing Game!</h1>
    <p>
    <Link to="/registration">Register</Link> or
    <Link to="/login"> Login</Link> to start playing.
    </p>
</div>
    );
}
 
export default Home;