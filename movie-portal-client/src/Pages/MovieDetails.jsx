import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';

const MovieDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const userEmail = user?.email;
    // //console.log('id from use params',id)
    const [movie, setMovie] = useState(null);
    const [loading, setloading] = useState(true);
    const [addingToFavorite, setAddingToFavorite] = useState(false)
    const navigate = useNavigate();
    // //console.log(movie)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://movie-portal-server-xi.vercel.app/movies/${id}`)
                const data = await response.json();
                setMovie(data)
                setloading(false)
            } catch (error) {
                Swal.fire({
                    title: "Something wrong on loading data",
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Cool'
                }).then(() => {
                    navigate('/allmovies')
                })
                setloading(false)
            }
        }
        fetchData();
    }, [id, navigate])

    const handleDeleteMovie = async (id) => {
        //console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://movie-portal-server-xi.vercel.app/movies/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        //console.log(data)
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "The movie has been deleted.",
                                icon: "success"
                            });
                            navigate('/allmovies')
                        }
                    })
            }
        });
    }

    const handleAddToFavorites = () => {
        if (!userEmail) {
            Swal.fire({
                title: "You aren't logged",
                text: "Please login to add favorite",
                icon: 'info',
                showCancelButton: true,
                cancelButtonColor: "#d33",
                confirmButtonText: 'OK'
            })
            .then((result) => {
                if (result.isConfirmed){
                    navigate('/signin')
                }
            } )
              return;
        }
        // need to update the user for favorite page individually
        const movieData = {
            movieId: movie._id,
            name: movie.name,
            genre: movie.genre,
            ratings: movie.ratings,
            poster: movie.poster,
            duration: movie.duration,
            releaseYear: movie.releaseYear,
            summary: movie.summary,
        }
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Add it!"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    setAddingToFavorite(true)
                    fetch(`https://movie-portal-server-xi.vercel.app/favorites/${userEmail}`, {
                        method: "PATCH",
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(movieData)
                    })
                        .then(res => res.json())
                        .then(data => {
                            //console.log(data)
                            setAddingToFavorite(false)
                            if (data.modifiedCount > 0 || data.upsertedCount > 0) {
                                Swal.fire({
                                    title: "Added!",
                                    text: "The movie has been added to favorites.",
                                    icon: "success"
                                });
                            }
                            if (data.matchedCount > 0) {
                                Swal.fire({
                                    title: "Already in favorite list!",
                                    text: "The movie already exists to favorites.",
                                    icon: "info"
                                });
                            }
                        })
                        .catch(() => {
                            setAddingToFavorite(false)
                            Swal.fire({
                                title: "Error!",
                                text: "The movie hasn't been added to favorites.",
                                icon: "error"
                            });
                        })
                }
            });
    }

    const handleToUpdate = () => {
        navigate(`/movies/update/${id}`)
    }

    if (loading) {
        return <div className='text-center font-semibold text-3xl'>Loading....</div>
    }
    if (!movie) {
        return <div className='text-center font-semibold text-3xl'>Movie not found</div>;
    }

    return (
        <div>
            <nav className='fixed top-0 left-0 w-full bg-white z-10 shadow-md'>
                <Navbar></Navbar>
            </nav>
            <main>
                {/* A choosen movies details will be shown here: {movie._id} */}
                <div className="max-w-7xl mx-auto my-10  mt-24">
                    <h2 className='font-semibold text-xl md:text-3xl lg:text-5xl text-center italic mb-6'>Movie: {movie.name}</h2>
                    <div className='md:flex items-center justify-center md:flex-row flex-col gap-10'>
                        <div className='md:w-96'>
                            <img src={movie.poster} alt={`${movie.name} poster`} />
                        </div>

                        <div className='px-5'>
                            <div>
                                <p><strong>Genre:</strong> {movie.genre}</p>
                                <p><strong>Duration:</strong> {movie.duration} minutes</p>
                                <p><strong>Release Year:</strong> {movie.releaseYear}</p>
                                <p><strong>Rating:</strong> {movie.ratings}</p>
                                <p><strong>Summary:</strong> {movie.summary}</p>
                            </div>
                            <div className='flex flex-col-reverse md:flex-row items-center justify-center gap-5 md:gap-16 lg:gap-20 my-5'>
                                {user ? <>
                                    <button onClick={() => handleDeleteMovie(id)}
                                        className="btn btn-warning w-full md:w-fit">Delete Movie</button>
                                    <button onClick={handleToUpdate}
                                        className="btn btn-primary w-full md:w-fit">
                                        Update Movie
                                    </button>
                                </>: <span>Thanks for visit</span>}
                            </div>
                            <button onClick={handleAddToFavorites}
                                disabled={addingToFavorite}
                                className="btn btn-primary w-full">
                                {addingToFavorite ? 'Adding...' : "Add to Favorite"}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default MovieDetails;