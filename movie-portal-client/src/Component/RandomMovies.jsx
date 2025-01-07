import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RandomMovies = () => {
    const [loading, setloading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [randomMovies, setRandomMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            setloading(true)
            try {
                const response = await fetch('https://movie-portal-server-xi.vercel.app/random/movies');
                const data = await response.json();
                setMovies(data || []);
                //console.log(data)
                setloading(false);
            } catch (error) {
                //console.error('Error fetching movies', error);
                setloading(false)
            }
        }
        fetchMovies();
    }, []);

    useEffect(() => {
        const getRandomMovies = (movies) => {
            if (movies.length <= 8) return movies;
            const shuffled = [...movies].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, 3);
        }
        if (movies.length > 0) {
            setRandomMovies(getRandomMovies(movies))
        }
        const intervalId = setInterval(() => {
            setRandomMovies(getRandomMovies(movies))
        }, 5000);
        return () => clearInterval(intervalId);
    }, [movies])
    // const randomMovies = getRandomMovies(movies);
    const handleSeeDetails = (id) => {
        navigate(`/moviedetails/${id}`)
    }
    const handleSeeAllMovies = () => {
        navigate('/recommendedmovies')
    }
    return (
        <div className='my-12'>
            <h2 className="section-title text-xl md:text-3xl lg:text-5xl bg-slate-800 text-white p-5 mb-10">
                Random Movies
            </h2>
            {loading ? (
                <div className="flex justify-center items-center">
                    <p className="text-center text-3xl animate-spin">Loading...</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {randomMovies.map((movie) => (
                        <div key={movie._id} className="relative card bg-base-100 shadow-xl transition transform hover:-translate-y-1 hover:scale-105">
                            <figure className="relative">
                                <img src={movie.poster} alt={`${movie.name} poster`}
                                    className="movie-poster rounded w-full h-64 object-cover" />
                                <div className="progress-bar-container absolute bottom-0 left-0 w-full bg-gray-700 h-2">
                                    <div className="progress-bar bg-green-500 h-2"
                                        style={{ width: `${(movie.watchProgress || 0) * 100}%` }}>
                                    </div>
                                </div>
                            </figure>
                            <div className="card-body text-center p-4">
                                <h3 className="card-title text-lg font-bold">
                                    {movie.name}
                                </h3>
                                <p className="text-sm text-gray-400">Genre: {movie.genre}</p>
                                <p className="text-sm text-gray-400">Duration: {movie.duration} minutes</p>
                                <p className="text-sm text-gray-400">Release Year: {movie.releaseYear}</p>
                                <p className="text-sm text-gray-400">Rating: {movie.ratings}</p>
                                <div className="card-actions mt-4">
                                    <button className=" btn btn-primary w-full text-white py-2 rounded hover:btn-secondary"
                                        onClick={() => handleSeeDetails(movie._id)}>
                                        See Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className='flex justify-center items-center my-5'>
                <button onClick={handleSeeAllMovies} className=" btn btn-primary text-white py-2 rounded hover:btn-secondary">See all Recommendations</button>
            </div>
        </div>
    );
};

export default RandomMovies;