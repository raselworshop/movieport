import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Footer from "../../Component/Footer";
import Navbar from "../../Component/Navbar";

const MovieTable = () => {
    const { user } = useContext(AuthContext);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`http://localhost:5000/movies?email=${user?.email}`);
                const data = await response.json();

                if (response.ok) {
                    setMovies(data);
                } else {
                    console.error("Error:", data.error);
                }
            } catch (error) {
                console.error("Failed to fetch movies:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchMovies();
        }
    }, [user?.email]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-lg font-semibold">Loading movies...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <nav className="fixed top-0 left-0 w-full bg-white z-10 shadow-md">
                <Navbar />
            </nav>

            <main className="mt-24 px-4 lg:px-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl lg:text-5xl font-bold mb-3">My Posted Movies</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        View and manage the movies you have added to the database. Below is a detailed list of your
                        posted movies.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="table-auto border-collapse border border-gray-300 w-full">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 px-4 py-3 text-left font-medium">Name</th>
                                <th className="border border-gray-300 px-4 py-3 text-left font-medium">Poster</th>
                                <th className="border border-gray-300 px-4 py-3 text-left font-medium">Genre</th>
                                <th className="border border-gray-300 px-4 py-3 text-left font-medium">Duration</th>
                                <th className="border border-gray-300 px-4 py-3 text-left font-medium">Release Year</th>
                                <th className="border border-gray-300 px-4 py-3 text-left font-medium">Ratings</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies.map((movie, index) => (
                                <tr key={movie._id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}>
                                    <td className="border border-gray-300 px-4 py-3">{movie.name}</td>
                                    <td className="border border-gray-300 px-4 py-3">
                                        <img
                                            src={movie.poster}
                                            alt={movie.name}
                                            className="w-16 h-24 object-cover rounded shadow-md"
                                        />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-3">{movie.genre}</td>
                                    <td className="border border-gray-300 px-4 py-3">{movie.duration}</td>
                                    <td className="border border-gray-300 px-4 py-3">{movie.releaseYear}</td>
                                    <td className="border border-gray-300 px-4 py-3">{movie.ratings}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            <footer className="mt-auto">
                <Footer />
            </footer>
        </div>
    );
};

export default MovieTable;
