import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RedirectHandler() {
    const navigate = useNavigate();

    useEffect(() => {
        const redirectPath = sessionStorage.redirect;
        if (redirectPath) {
            sessionStorage.removeItem('redirect');
            navigate(redirectPath);
        }
    }, []);

    return null;
}