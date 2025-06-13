import React from 'react'

export default function RegisterForm() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', alignItems: 'center', marginTop: '100px' }}>
            <h1>Register form</h1>
            <form style={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
                <label htmlFor='username'>username</label>
                <input type='text' name='username' id='username'></input>
                <label htmlFor='password'>password</label>
                <input type='password' name='password'></input>

                <label htmlFor='email'>email</label>
                <input type='text' name='email' id='email'></input>

                <button style={{ marginTop: '20px' }}>Register</button>
            </form>
        </div>
    )
}
