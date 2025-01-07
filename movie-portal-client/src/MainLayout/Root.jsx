import React from 'react';
import Navbar from '../Component/Navbar';
import Home from '../Pages/Home';
import Footer from '../Component/Footer';
import { useLoaderData } from 'react-router-dom';

const Root = () => {
    const movies = useLoaderData();
    return (
        <div className='text-gray-700 flex flex-col min-h-screen'>
            <nav className='fixed top-0 left-0 min-w-full bg-white z-10'>
                <Navbar></Navbar>
            </nav>
            <main className='mt-20 flex-grow px-4 sm:px-8 lg:px-12'>
                <Home movies={movies}></Home>
            </main>

            <footer>
                <Footer></Footer>
            </footer>

        </div>
    );
};

export default Root;