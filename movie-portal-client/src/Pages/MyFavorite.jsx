import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';

const MyFavorite = () => {
    const { user } = useContext(AuthContext);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchingFavMovies = async () => {
            if (user?.email) {
                try {
                    const res = await fetch(`https://movie-portal-server-xi.vercel.app/favorites/${user?.email}`)
                    if (res.ok) {
                        const data = await res.json();
                        setFavoriteMovies(data)
                    } else {
                        setLoading(false)
                        //console.log('Eror fatching fav');
                    }
                } catch (error) {
                    //console.log('Eror fatching fav', error);
                } finally {
                    setLoading(false)
                }
            }
        }
        fetchingFavMovies();
    }, [user?.email])
    const handleRemoveFavMovie = (movieId) => {
        //console.log(movieId)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`https://movie-portal-server-xi.vercel.app/favorites/${user?.email}/${movieId}`, {
                        method: "DELETE",
                    });
                    if (response.ok) {
                        setFavoriteMovies(prevMovies => prevMovies.filter(movie => movie._id !== movieId));
                        Swal.fire({
                            title: "Removed!",
                            text: "The movie has been removed from your favorites.",
                            icon: "success"
                        });
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "The movie couldn't be removed from your favorites.",
                            icon: "error"
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong while removing the movie.",
                        icon: "error"
                    });
                    //console.error(error);
                }
            }
        });
    }

    if (loading) {
        return <div className='text-center font-semibold text-3xl'>Loading....</div>;
    }
    return (
        <div>
            <nav className='fixed top-0 left-0 w-full bg-white z-10 shadow-md'>
                <Navbar></Navbar>
            </nav>
            <main>
                <div className='container mx-auto px-4 py-6 mt-16'>
                    <h1 className='text-2xl md:text-3xl lg:text-5xl font-bold my-4 text-center'>My Favorites Movies</h1>
                    <p className='text-center md:px-16 lg:px-28'>Explore your personal cinematic haven! These handpicked movies represent
                        your unique taste and cherished memories. Dive into a collection that
                        mirrors your love for the world of cinema. Enjoy your favorites!
                    </p>
                    {favoriteMovies.length === 0 ? (
                        <div className="flex justify-center items-center">
                            <p className="text-center text-3xl animate-spin">Loading...</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>
                                            #
                                        </th>
                                        <th>Name</th>
                                        <th>MOvie</th>
                                        <th>Rating</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        favoriteMovies.map((movie, idx) => <tr key={movie._id}>
                                            <th>
                                                {idx + 1}
                                            </th>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-12 w-12">
                                                            <img
                                                                src={movie.poster} alt={movie.name} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{movie.name}</div>
                                                        <div className="text-sm opacity-50">{movie.genre}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                            <span>{movie.releaseYear}</span>
                                                <br />
                                                <span className="badge badge-ghost badge-sm">{movie.duration} minutes</span>
                                                <span className="badge badge-ghost badge-sm">{movie.summary} minutes</span>
                                            </td>
                                            <td>
                                                <span>{movie.ratings}</span>
                                                
                                            </td>
                                            <th>
                                                <button onClick={() => handleRemoveFavMovie(movie._id)}
                                                    className="btn btn-primary">
                                                    Remove Favorite
                                                </button>                                            </th>
                                        </tr>)
                                    }

                                </tbody>

                            </table>
                        </div>
                    )}
                </div>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default MyFavorite;