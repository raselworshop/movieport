import React, { useEffect, useState } from 'react';
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';
import { Link } from 'react-router-dom';

const AllMovies = () => {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const sortedMovies = movies.sort((a, b) => b.ratings - a.ratings);
//console.log(sortedMovies)
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('https://movie-portal-server-xi.vercel.app/all/movies');
                const data = await response.json();
                setMovies(data);
                //console.log(data)
                setLoading(false);
            } catch (error) {
                //console.error('Error fetching movies', error);
                setLoading(false)
            }
        }
        fetchMovies();
    }, [])
    if (loading) {
        return <div className="flex justify-center items-center">
            <p className="text-center text-3xl animate-spin">Loading...</p>
        </div>;
    }
    return (
        <div className='text-gray-400'>
            <nav className='fixed top-0 left-0 w-full bg-white z-10 shadow-md'>
                <Navbar></Navbar>
            </nav>
            <main>
                <div className="container mx-auto px-4 py-6 mt-16">
                    <h1 className="text-3xl font-bold my-4 text-center">All Movies</h1>
                    <p className="text-lg text-center mb-8 lg:mx-24">Dive into our extensive collection of movies,
                        carefully curated to cater to all your cinematic cravings.
                        From timeless classics to the latest blockbusters, we've got something
                        for everyone!</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-6">
                        {sortedMovies.map(movie => (
                            <div key={movie._id} className="bg-white shadow-lg rounded-lg">
                                <img src={movie.poster} alt={movie.name} className="w-full h-52 object-cover rounded-t-lg mb-5" />
                                <div className="flex flex-col border rounded-lg ">
                                    <div className="flex-grow">
                                        <h2 className="text-xl font-bold">{movie.name}</h2>
                                        <p><strong>Genre:</strong>{movie.genre}</p>
                                        <p><strong>Duration:</strong>{movie?.duration || 'Unknown'}</p>
                                        <p><strong>Release Year:</strong> {movie.releaseYear}</p>
                                        <p><strong>Rating:</strong> {movie.ratings}</p>
                                        {/* <p><strong>Summary:</strong> A very nice movie summary.</p> */}
                                    </div>
                                    <Link to={`/moviedetails/${movie._id}`}
                                        className="mt-4 btn btn-primary text-white px-4 py-2 rounded hover:btn-secondary">
                                        See Details
                                    </Link>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default AllMovies;