import { useState } from "react"
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSumbit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                localStorage.setItem('role', data.role)

                if (data.role === 'admin') {
                    navigate('/dashboard/admin');
                } else if (data.role === 'user') {
                    navigate('/')
                } else {
                    console.log(data.message || "Login");
                }

            } else {
                setMessage(data.message || "login failed");
            }
        } catch (err) {
            console.log(err);

        }
    }



    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', alignItems: 'center', marginTop: '100px' }}>
                <h1>Login form</h1>
                <form onSubmit={handleSumbit} style={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
                    <label htmlFor='email'>email</label>
                    <input type='text' name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <label htmlFor='password'>password</label>
                    <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <button style={{ marginTop: '20px' }}>Login</button>
                </form>
            </div>
        </>
    )
}