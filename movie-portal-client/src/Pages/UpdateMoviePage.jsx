import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UpdateMovieForm from '../Component/UpdateMovieForm';
import Swal from 'sweetalert2';

const UpdateMoviePage = () => {
    const { id } = useParams();
    const [movieData, setMovieData] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const res = await fetch(`https://movie-portal-server-xi.vercel.app/movies/${id}`);
                const data = await res.json();
                //console.log(data)
                setMovieData(data)
            } catch (error) {
                //console.log("Error on updating movie error from client", error)
            }
        }
        fetchMovieData();
    }, [id]);
    const handleUpdate = async (data) => {
        try {
            const response = await fetch(`https://movie-portal-server-xi.vercel.app/movies/${id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                if (data._id) {
                    Swal.fire({
                        title: "Congratulation!",
                        text: "You updated the movie successfully!",
                        imageUrl: `${data.poster}`,
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: "Custom image"
                    });
                    navigate('/allmovies')
                }

            } else {
                Swal.fire({
                    title: "Failed to update!",
                    text: "There is something wrong!!.",
                    icon: "info"
                });
            }
        } catch (error) {
            //console.log('Error updating movie', error)
        }
    }
    return (
        <div>
            {movieData ? (
                <UpdateMovieForm movieData={movieData} onUpdate={handleUpdate}></UpdateMovieForm>
            ) : (
                <div className="flex justify-center items-center">
                    <p className="text-center text-3xl animate-spin">Loading...</p>
                </div>
            )}
        </div>
    );
};

export default UpdateMoviePage;