import React, { useEffect, useState } from 'react';
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';
import { Link, useLocation } from 'react-router-dom';

const SearchResult = () => {
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();
    const [loading, setLoading] = useState(true)
    const query = new URLSearchParams(location.search).get('searchQuery');
    //console.log(query)//got the result
    useEffect(() => {
        const fetchSearch = async () => {
            setLoading(true)
            if (query) {
                try {
                    const res = await fetch(`https://movie-portal-server-xi.vercel.app/search?searchQuery=${query}`);
                    const data = await res.json();
                    setSearchResults(data);
                    setLoading(false)
                    //console.log(data)
                } catch (error) {
                    setLoading(false)
                    //console.log('Error fetching search result in clinet', error);
                }
            }
        }
        fetchSearch();
    }, [query])
    return (
        <div>
            <nav className='fixed top-0 left-0 w-full bg-white z-10 shadow-md'><Navbar /></nav>
            <main className='px-4 py-16 my-6'>
                <h2 className="text-3xl font-bold mb-6">Search Results for:
                    <span className='text-xl'> {query}</span>
                </h2>
                {loading ? (
                    <p className='text-center align-middle'>Loading....</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {searchResults.map((movie) => (
                            <div key={movie._id}
                                className="card">
                                <figure>
                                    <img src={movie.poster} alt={`${movie.name} poster`}
                                        className="movie-poster rounded w-full h-40" />
                                </figure>
                                <div className="card-body">
                                    <h3 className="card-title">{movie.name}</h3>
                                    <p>{movie.genre}</p>
                                    <p>{movie.duration} minutes</p>

                                    <p>{movie.releaseYear} Released</p>
                                    <p>{movie.ratings} Rated</p>
                                    <div className="card-actions">
                                    <Link to={`/moviedetails/${movie._id}`}
                                        className="mt-4 btn btn-primary text-white px-4 py-2 rounded hover:btn-secondary">
                                        See Details
                                    </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <footer><Footer /></footer>
        </div>
    );
};

export default SearchResult;