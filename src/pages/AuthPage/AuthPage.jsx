import React, { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import './AuthPage.css';

export default function AuthPage({ setUser }) {
    const [showLogin, setShowLogin] = useState(true);

    function toggleLogin() {
        setShowLogin(!showLogin)
    }

    return (
        <main className='AuthPage'>
            <h1>Login/Signup</h1>
            {showLogin ? (
                <>
                <LoginForm setUser={setUser} />
                <p><span className='auth-toggle-link' onClick={toggleLogin}>Need to signup? Click Here</span></p>
                </>
            ) : (
                <>
                <SignUpForm setUser={setUser} />
                <p><span className='auth-toggle-link' onClick={toggleLogin}>Already have an account? Click Here</span></p>
                </>
            )}
        </main>
    )
}