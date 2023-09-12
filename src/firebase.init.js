// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyB74d_5-TAhD7wqKa5UmN5gJ-EwXNlGlcA',
    authDomain: 'twitter-c04da.firebaseapp.com',
    projectId: 'twitter-c04da',
    storageBucket: 'twitter-c04da.appspot.com',
    messagingSenderId: '900467759775',
    appId: '1:900467759775:web:7f6e0bc5f1ccf5e74a60aa',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
