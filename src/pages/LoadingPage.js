import React from 'react';

const LoadingPage = () => {
    return (
        <div
            style={{
                display: 'flex',
                minHeight: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div className=''>
                <h3>Loading...</h3>
            </div>
        </div>
    );
};

export default LoadingPage;
