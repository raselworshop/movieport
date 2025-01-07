import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Provider/AuthProvider';
const FeaturedMovies = ({ movies }) => {
    const {loading, setLoading} = useContext(AuthContext)
    const navigate = useNavigate();

    // //console.log(movies)
    const sortedMovies = movies.sort((a,b)=> b.ratings - a.ratings)
    const handleSeeDetails = (id) => {
        navigate(`/moviedetails/${id}`)
    }
    const handleSeeAllMovies = () => {
        navigate('/allmovies')
    }
    return (
        <div>
            <div className="featured-movies-section">
                <h2 className="section-title text-xl md:text-3xl lg:text-5xl p-5 mb-6">Featured Movies</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {sortedMovies.slice(0, 8).map((movie) => (
                        <div key={movie._id} className="relative card bg-base-100 shadow-xl transition transform hover:-translate-y-1 hover:scale-105">
                            <figure className="">
                                <img src={movie.poster} alt={`${movie.name} poster`}
                                    className="movie-poster rounded w-full h-40" />
                            </figure>
                            <div className="card-body">
                                <h3 className='card-title'>{movie.name}</h3>
                                <p>{movie.genre}</p>
                                <p>{movie.duration} minutes</p>
                                <p>{movie.releaseYear} released</p>
                                <p>{movie.ratings} Ratings</p>
                                <div className="card-actions">
                                    <button className='mt-4 btn btn-primary text-white px-4 py-2 rounded hover:btn-secondary' onClick={() => handleSeeDetails(movie._id)}>See Details</button>
                                </div>
                            </div>
                        </div>))}
                </div>
                <div className='flex justify-center items-center my-5'>
                    <button onClick={handleSeeAllMovies} className=" btn btn-primary text-white py-2 rounded hover:btn-secondary">See all movies</button>
                </div>
            </div>
        </div>
    );
};

export default FeaturedMovies;