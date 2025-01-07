import React from 'react';
import { useNavigate } from 'react-router-dom';
import Error from '/404.gif'

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); 
    };

    const handleGoHome = () => {
        navigate('/'); 
    };

    return (
        <div>
            <main className="container mx-auto text-center">
                <h1 className="text-5xl font-bold mb-4">Oops!</h1>
                <p className="text-xl mb-6">We can't seem to find the page you're looking for.</p>
                <div className='flex justify-center items-center'>
                    <img src={Error} alt="Error Page" className='max-w-96' />
                </div>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={handleGoBack}
                        className="btn btn-secondary text-white px-4 py-2 rounded"
                    >
                        Go Back
                    </button>
                    <button
                        onClick={handleGoHome}
                        className="btn btn-primary text-white px-4 py-2 rounded"
                    >
                        Go Home
                    </button>
                </div>
            </main>
        </div>
    );
};

export default ErrorPage;
