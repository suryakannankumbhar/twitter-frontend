import React, { useState } from 'react';
import twitterImage from '../../assets/images/twitter.jpeg';
import TwitterIcon from '@mui/icons-material/Twitter';
import {
    useCreateUserWithEmailAndPassword,
    useSignInWithGoogle,
} from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import GoogleButton from 'react-google-button';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

const MobileSignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');

    const [createUserWithEmailAndPassword, user, loading, error] =
        useCreateUserWithEmailAndPassword(auth);

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
        createUserWithEmailAndPassword(email, password);
        const user = {
            username: username,
            name: name,
            email: email,
        };

        axios.post(
            `https://twitterclone-backend-h2ft.onrender.com/register`,
            user
        );
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle();
    };

    return (
        <div className='signup-container'>
            <div className='image-container'>
                <img className='image' src={twitterImage} alt='' />
            </div>
            <div className='form-container'>
                <div className='form-box'>
                    <TwitterIcon
                        classname='twitterIcon'
                        style={{ color: 'skyblue', fontSize: 80 }}
                    />
                    <h1 className='heading'>Join Twitter Today Using Mobile</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type='text'
                            className='name'
                            placeholder='Name'
                            onChange={e => setName(e.target.value)}
                        />
                        <input
                            type='text'
                            className='username'
                            placeholder='@username'
                            onChange={e => setUsername(e.target.value)}
                        />
                        <input
                            type='text'
                            className='email'
                            placeholder='Phone Number'
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
                                Sign Up
                            </button>
                        </div>
                    </form>
                    <hr />
                    <div className='google-button'>
                        <GoogleButton
                            classname='g-btn'
                            type='light'
                            onClick={handleGoogleSignIn}
                        />
                    </div>
                    <div className=''>
                        Already Have an Account?
                        <Link
                            to='/login'
                            style={{
                                textDecoration: 'none',
                                fontWeight: 600,
                                color: 'skyblue',
                                marginLeft: '5px',
                            }}
                        >
                            {' '}
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileSignUp;
