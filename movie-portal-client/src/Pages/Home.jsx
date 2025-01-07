import React, { useContext } from 'react';
import Carosole from '../Component/Carosole';
import FeaturedMovies from '../Component/FeaturedMovies';
import RandomMovies from '../Component/RandomMovies';
import UserStatistic from '../Component/UserStatistic';
import { AuthContext } from '../Provider/AuthProvider';
import AboutUs from '../Component/AboutUs';

const Home = ({ movies }) => {
    const { user } = useContext(AuthContext);
    return (
        <div className='flex flex-col'>
            {/* <aside className='col-span-3'>Side info</aside> */}
            <main className=''>
                <section className='my-6'>
                    <Carosole></Carosole>
                </section>
                <section className='my-6'>
                    <FeaturedMovies movies={movies}></FeaturedMovies>
                </section>
                <section className='my-6'>
                    <RandomMovies></RandomMovies>
                </section>
                <section className='my-6'>
                    <AboutUs></AboutUs>
                </section>
                {user ? (
                    <section className='my-6'>
                        <UserStatistic></UserStatistic>
                    </section>) : (
                    <div>
                        <h1 className="text-2xl font-bold text-center mb-6">User Statistics</h1>
                        <p className="text-center text-gray-600 mb-6">Please log in to see user statistics</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Home;