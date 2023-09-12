import React, { useState } from 'react';
import twitterImage from '../../assets/images/twitter.jpeg';
import TwitterIcon from '@mui/icons-material/Twitter';
import {
    useSignInWithEmailAndPassword,
    useSignInWithGoogle,
} from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { Link, useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState('');

    const [signInWithEmailAndPassword, user, loading, error] =
        useSignInWithEmailAndPassword(auth);

    const [signInWithGoogle, googleUser, googleLoading, googleError] =
        useSignInWithGoogle(auth);

    const navigate = useNavigate();

    if (user || googleUser) {
        navigate('/');
        console.log(user);
        console.log(googleUser);
    }
    if (error || googleError) {
        console.log(error.message);
        console.log(googleError.message);
    }
    if (loading || googleLoading) {
        console.log('Loading...');
    }

    const handleSubmit = e => {
        e.preventDefault();
        signInWithEmailAndPassword(email, password);
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle();
    };

    const handleMobileLogin = () => {
        alert('Mobile Login');
    };

    return (
        <div className='login-container'>
            <div className='image-container'>
                <img className='image' src={twitterImage} alt='' />
            </div>
            <div className='form-container'>
                <div className='form-box'>
                    <TwitterIcon style={{ color: 'skyblue', fontSize: 80 }} />
                    <h1 className='heading'>Hurry and Jump In!</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type='email'
                            className='email'
                            placeholder='Email Address'
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input
                            type='password'
                            className='password'
                            placeholder='Password'
                            onChange={e => setPassword(e.target.value)}
                        />
                        <div className='btn-login'>
                            <button type='submit' className='btn'>
                                Login
                            </button>
                        </div>
                    </form>
                </div>
                <hr />
                <div className='google-button'>
                    <GoogleButton
                        classname='g-btn'
                        type='light'
                        onClick={handleGoogleSignIn}
                    />
                </div>
                <div className='mobileLogin'>
                    <button onClick={handleMobileLogin}>
                        <Link
                            to='/mobilesignup'
                            style={{
                                textDecoration: 'none',
                                fontWeight: 600,
                                color: 'skyblue',
                                marginLeft: '5px',
                            }}
                        >
                            Sign In with Mobile
                        </Link>
                    </button>
                </div>
                <div className=''>
                    Don't Have an Account Yet?
                    <Link
                        to='/signup'
                        style={{
                            textDecoration: 'none',
                            fontWeight: 600,
                            color: 'skyblue',
                            marginLeft: '5px',
                        }}
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
