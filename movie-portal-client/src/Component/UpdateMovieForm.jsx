import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const UpdateMovieForm = ({ movieData, onUpdate }) => {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({ defaultValues: movieData });
    useEffect(() => {
        if (movieData) {
            for (const key in movieData) {
                setValue(key, movieData[key]);
            }
        }
    }, [movieData, setValue]);
    const onSubmit = (data) => {
        //console.log(data)
        onUpdate(data)
    }
    return (
        <div className="update-movie-form p-4">
            <h2 className="text-center text-2xl md:text-4xl lg:text-5xl font-bold">Update Movie</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='md:p-6 lg:p-10'>
                <div className='mb-4'>
                    <label htmlFor="name" className="block mb-2">Name</label>
                    <input id="name"
                        {...register('name', { required: "Name is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>
                <div className='mb-4'>
                    <label htmlFor="poster" className="block mb-2">Poster URL</label>
                    <input id="poster"
                    type='text'
                        {...register('poster', { required: "Photo URL is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.poster && <p className="text-red-500">{errors.poster.message}</p>}
                </div>
                <div className='mb-4'>
                    <label htmlFor="genre" className="block mb-2">Genre</label>
                    <input id="genre"
                        {...register('genre', { required: "Genre is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.genre && <p className="text-red-500">{errors.genre.message}</p>}
                </div>
                <div className='mb-4'>
                    <label htmlFor="duration" className="block mb-2">Duration (Minutes)</label>
                    <input id="duration"
                    type='number'
                        {...register('duration', { required: "Duration is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.duration && <p className="text-red-500">{errors.duration.message}</p>}
                </div>
                <div className='mb-4'>
                    <label htmlFor="releaseYear" className="block mb-2">Release Year</label>
                    <input id="releaseYear"
                    type='number'
                        {...register('releaseYear', { required: "Release year is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.releaseYear && <p className="text-red-500">{errors.releaseYear.message}</p>}
                </div>
                <div className='mb-4'>
                    <label htmlFor="ratings" className="block mb-2">Ratings</label>
                    <input id="ratings"
                    step={'0.1'}
                    type='number'
                        {...register('ratings', { required: "Ratings is required", min:1, max:5 })}
                        className="input input-bordered w-full"
                    />
                    {errors.ratings && <p className="text-red-500">{errors.ratings.message}</p>}
                </div>
                <button type="submit" className="btn btn-primary w-full py-2 rounded">Update Movie</button>
            </form>
        </div>
    );
};

export default UpdateMovieForm;