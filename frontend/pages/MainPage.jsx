import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function MainPage() {

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/users/login');
    }
    const handleRagisterClick = () => {
        navigate('/users/register');
    }

    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');

        navigate('/');
    }

    const role = localStorage.getItem('role');
    return (
        <div>
            <button onClick={handleLoginClick}>Login</button>
            <button onClick={handleRagisterClick}>Register</button>
            <button onClick={handleLogoutClick}>Logout</button>
            <p>{role}</p>
        </div>
    )
}
