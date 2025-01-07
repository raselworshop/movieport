// src/Pages/MovieRecommendations.jsx
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';

const RecommendedMovies = () => {
    const { user } = useContext(AuthContext)
    const [movies, setMovies] = useState([]);
    const [showAllRecommendtion, setShowAllRecommendation] = useState(false);
    const visibleMovies = showAllRecommendtion ? movies : movies.slice(0, 9)

    useEffect(() => {
        // Example: Fetch movies from a mock API
        fetch('https://api.sampleapis.com/movies/animation')
            .then((response) => response.json())
            .then((data) => {
                setMovies(data)
                //console.log(data)
            })

            
    }, []);

    const handleAddToMovies = async (movie) => {
        const genres = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller'];
        const randomGenre = genres[Math.floor(Math.random() * genres.length)]
        const randomRating = (Math.random() * 4 + 1).toFixed(1);
        const randomMinutes = (Math.random() * 121 + 60).toFixed(0);
        const currentYear = new Date().getFullYear();
        const randomYear = Math.floor(Math.random() * (currentYear - 1970 + 1) + 1970)
        const movieData = {
            name: movie?.title,
            poster: movie.posterURL,
            genre: movie?.genre || randomGenre,
            duration: movie?.runtime || randomMinutes,
            releaseYear: movie?.releaseYear || randomYear,
            ratings: movie?.rating || randomRating,
            summary: movie?.summary || "This movies summery can't reading",
            userEmail: user?.email,
        }

        try {
            // checking beckend if already exists 
            const response = await fetch(`https://movie-portal-server-xi.vercel.app/movies/check/${movie?.title}`, {
                method: "GET"
            })
            //console.log('Check movie response status:', response.status);
            const result = await response.json();
            //console.log('Check movie response data:', result);
            if (result.exists) {
                Swal.fire({
                    title: "Movie Already Exists!",
                    text: "This movie is already in the list.",
                    icon: "warning",
                });
                return;
            }

            // add movie if doesn't exist 
            await fetch('https://movie-portal-server-xi.vercel.app/movies/add', {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(movieData)
            }).then(res => res.json())
                .then(data => {
                    //console.log(data, "from clint")
                    if (data.insertedId) {
                        Swal.fire({
                            title: "Congratulation!",
                            text: "You added the movie successfully!",
                            imageUrl: `${movie.posterURL}`,
                            imageWidth: 400,
                            imageHeight: 200,
                            imageAlt: "Custom image"
                        });
                    }
                })
        } catch (error) {
            //console.log(error, 'checking error')
        }


    }

    return (
        <div className='bg-base-100'>
            <nav className='fixed top-0 left-0 w-full z-10 shadow-md'><Navbar /></nav>
            <main className="container mx-auto my-10">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-5  mt-24">Recommended Movies</h1>
                <div className='px-5'>
                    <h2 className='text-xl md:text-2xl lg:text-3xl font-semibold mb-3'>Discover Your Next Favorite Movie! 🎥✨</h2>

                    <p>Step into the world of cinematic excellence with our <strong>Recommended Movies</strong> section! Carefully curated to ignite your imagination, these movies span across genres, ensuring there’s something for everyone. Whether you’re craving heartwarming tales, pulse-pounding action, or laugh-out-loud comedies, our selection will keep you entertained for hours.
                        Each movie is a masterpiece in its own right, complete with captivating stories, stunning visuals, and unforgettable characters. So, grab your popcorn, settle into your favorite spot, and explore a collection of movies that promise to leave a lasting impression.
                    </p>
                    <p>Start your cinematic journey now and find your next obsession!</p>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-10">
                    {visibleMovies.length > 0 ? (
                        visibleMovies.map((movie, index) => (
                            <div
                                key={movie.id}
                                className={`card shadow-lg hover:shadow-2xl rounded-lg transform transition-transform duration-700 ease-out
                                    ${showAllRecommendtion || index < 9 ? "translate-x-0 opacity-100" : "translate-x-[-200%] opacity-0"}
                                    `}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <img
                                    src={movie?.posterURL && movie?.posterURL !== 'N/A' ? movie?.posterURL : "https://via.placeholder.com/150"}
                                    alt={movie.title}
                                    className="w-full h-64 object-cover mb-4"
                                />
                                <h2 className="text-xl font-bold">{movie.title}</h2>
                                <p className="text-sm text-gray-600">{movie.genre}</p>
                                <p className="mt-2">{movie.runtime} mins</p>
                                <p className="text-gray-500">{movie.summary?.slice(0, 60)}...</p>
                                <button
                                    onClick={() => handleAddToMovies(movie)}
                                    className="btn btn-primary mt-4 hover:bg-blue-900"
                                >
                                    Add to Movie List
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-2xl text-red-500 my-16">Loading recommended movies...</p>
                    )}
                </div>
                {!showAllRecommendtion && (
                    <button
                        className='btn btn-primary mt-4 hover:bg-blue-900'
                        onClick={() => setShowAllRecommendation(true)}
                    >
                        More Movies
                    </button>
                )}
            </main>
            <footer><Footer /></footer>
        </div>
    );
};

export default RecommendedMovies;
