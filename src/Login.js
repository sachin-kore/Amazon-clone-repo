import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from "react-router-dom";
import { auth } from './Firebase';



export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const SignIn = (e) => {
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                navigate('/');
            })
            .catch(error => alert(error.message))
    }

    const Register = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                // it successfully created a new user with email and password
                if (auth) {
                    navigate('/')
                }
            })
            .catch(error => alert(error.message))
    }
    return (
        <div className='login'>
            <Link to='/'>
                <img className='login-logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' />
            </Link>
            <div className='login-form'>
                <h1 className='login__title'>Sign In</h1>
                <h5>E-mail</h5>
                <input type='text' value={email} onChange={e => setEmail(e.target.value)}></input>
                <h5>Password</h5>
                <input type='Password' value={password} onChange={e => setPassword(e.target.value)}></input>

                <button type='submit' className='signIn-btn' onClick={SignIn}>Sign In</button>

                <p>
                    Keep up to date with health and medical developments
                    to stimulate research and improve patient care.
                    Search our books and journals covering education,
                    reference information, decision support and more.
                </p>
                <button className='create-account-btn' onClick={Register}>Create Your Amazon Account</button>
            </div>
        </div>
    )
}
