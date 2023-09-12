import React from 'react';
import auth from '../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import LoadingPage from './LoadingPage';

const ProtectedRoutes = ({ children }) => {
    const [user, isLoading] = useAuthState(auth);
    if (isLoading) {
        return <LoadingPage />;
    }
    if (!user) {
        return <Navigate to='/login' />;
    }
    return children;
};

export default ProtectedRoutes;
