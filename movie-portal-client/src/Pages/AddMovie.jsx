import React, { useContext, useState } from 'react';
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';
import StarRatings from 'react-star-ratings';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
    const { loading, setloading, user } = useContext(AuthContext);
    const [movieLink, setMovieLink] = useState('');
    const [durations, setDurations] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [rating, setRating] = useState(0);
    const [textSummery, setTextSummery] = useState('')

    const [movieTitleErr, setMovieTitleErr] = useState('');
    const [movieLinkErr, setMovieLinkErr] = useState('')
    const [durationErr, setDurationErr] = useState('');
    const [releaseErr, setReleaseErr] = useState('');
    const [ratingErr, setRatingErr] = useState('');
    const [textSummeryErr, setTextSummeryErr] = useState('')
    const navigate = useNavigate()

    const years = [];
    for (let year = 2026; year >= 1971; year--) {
        years.push(year)
    }
    const handleAddMovie = (e) => {
        // //console.log('Form Data:', e.target);

        e.preventDefault();
        let hasError = false
        setloading(true)
        setMovieTitleErr('');
        setMovieLinkErr('')
        setDurationErr('');
        setReleaseErr('');
        setRatingErr('');
        setTextSummeryErr('');

        const form = e.target;
        const name = form.name.value.trim();
        const poster = movieLink;
        const genre = form.genre.value;
        const duration = form.duration.value;
        const releaseYearInput = form.releaseYear.value;
        const ratings = rating;
        const summary = textSummery;

        if (typeof name!=='string' || !name || name.length < 2) {
            setMovieTitleErr('Movie title must be letter with at least 2 charecters long');
            hasError = true;
        }
        const urlPattern = /^https?:\/\/[^\s$.?#].[^\s]*$/i;
        if (!urlPattern.test(movieLink)) {
            setMovieLinkErr('Movie URL must be a valid link');
            hasError = true;
        }
        if (durations === '' || Number(durations) <= 60) {
            setDurationErr('Duration must be greater than 60 Minutes');
            hasError = true;
        }
        if (!releaseYear || releaseYear === '') {
            setReleaseErr('Release year must be selected');
            hasError = true;
        }
        if (rating === 0) {
            setRatingErr('Rating must be selected');
            hasError = true;
        }
        if (textSummery === '' || textSummery.length < 10) {
            setTextSummeryErr('Summery must be at least 10 characters long');
            hasError = true;
        }
        if (hasError) {
            setloading(false);
            return;
        }

        const newMovie = {
            name,
            poster,
            genre,
            duration,
            releaseYear: releaseYearInput,
            ratings, summary,
            userEmail: user?.email,
        };
        //console.log(newMovie)

        fetch('https://movie-portal-server-xi.vercel.app/movies/add', {
            method: 'POST',
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(newMovie)
        })
        .then(res=> res.json())
        .then(data=> {
            //console.log(data, "from clint")
            if(data.insertedId){
                Swal.fire({
                    title: "Congratulation!",
                    text: "You added the movie successfully!",
                    imageUrl: `${poster}`,
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: "Custom image"
                  });
                  navigate('/postedMovies')
            }
        })

        form.reset();
        setMovieLink('')
        setDurations('')
        setReleaseYear('');
        setRating(0)
        setTextSummery('')
        setloading(false)
    }
    const changeRating = (newRating) => {
        setRating(newRating);
    };
    return (
        <div>
            <nav className='fixed top-0 left-0 w-full bg-white z-10 shadow-md'>
                <Navbar></Navbar>
            </nav>
            <main>
                <div className='lg:w-3/4 mx-auto mt-20'>
                    <div className="text-center px-10 py-6">
                        <h1 className="text-xl md:text-3xl lg:text-5xl font-bold">Add Movie!</h1>
                        <p className="py-3 text-center">
                            This is a sophisticated feature of our Movie Portal designed to allow
                            users to effortlessly add new movies to the database. This component provides a user-friendly
                            form where essential details about a movie can be entered, ensuring a seamless experience for
                            content creators and administrators.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
                        <form onSubmit={handleAddMovie} className="card-body">
                            {/* form first row */}
                            <div className='flex flex-col lg:flex-row gap-5'>
                                <div className="form-control flex-1">
                                    <label className="label">
                                        <span className="label-text">Movie Title</span>
                                    </label>
                                    <input type="text" name='name' placeholder="Movie Title" className="input input-bordered" required />
                                </div>
                                <div className="form-control flex-1">
                                    <label className="label">
                                        <span className="label-text">Movie Poster</span>
                                    </label>
                                    <input type="text"
                                        name='poster'
                                        placeholder="Movie Poster"
                                        value={movieLink}
                                        onChange={(e) => setMovieLink(e.target.value)}
                                        className="input input-bordered" required />
                                </div>
                            </div>
                            {movieTitleErr && <p className='text-red-500 text-sm'>{movieTitleErr}</p>}
                            {movieLinkErr && <p className='text-red-500 text-sm text-end'>{movieLinkErr}</p>}
                            {/* form second row */}
                            <div className='flex flex-col lg:flex-row gap-5'>
                                <div className="form-control flex-1">
                                    <label className="label">
                                        <span className="label-text">Genre</span>
                                    </label>
                                    <select className="input input-bordered " name="genre" id="day">
                                        <option value="" disabled selected>Please select a genre</option>                                        <option value="romance">Romance</option>
                                        <option value="action">Action</option>
                                        <option value="comedy">Comedy</option>
                                        <option value="drama">Drama</option>
                                        <option value="horror">Horror</option>
                                        <option value="fantasy">Fantasy</option>
                                        <option value="adventure">Adventure</option>
                                        <option value="animation">Animation</option>
                                    </select>
                                </div>
                                <div className="form-control flex-1">
                                    <label className="label">
                                        <span className="label-text">Duration</span>
                                    </label>
                                    <input type="number" name='duration'
                                        value={durations}
                                        onChange={(e) => setDurations(e.target.value)}
                                        placeholder="Enter duration in minutes"
                                        className="input input-bordered" required />
                                </div>
                            </div>
                            {durationErr && <p className='text-red-500 text-sm text-end'>{durationErr}</p>}
                            {/* form third row */}
                            <div className='flex flex-col lg:flex-row gap-5'>
                                <div className="form-control flex-1">
                                    <label className="label">
                                        <span className="label-text">Release Year</span>
                                    </label>
                                    <select name="releaseYear" value={releaseYear}
                                        onChange={(e) => setReleaseYear(e.target.value)}
                                        className="input input-bordered ">
                                        <option value="" disabled>Please select a year for release</option>
                                        {years.map(year => (<option key={year} value={year}>
                                            {year}
                                        </option>))}
                                    </select>

                                </div>
                                <div className="form-control flex-1">
                                    <label className="label">
                                        <span className="label-text">Rating</span>
                                    </label>
                                    <div className='flex items-center'>
                                        <h1>Your Rating: {rating}</h1>
                                        <StarRatings
                                            rating={rating}
                                            starRatedColor="gold"
                                            changeRating={changeRating}
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension="20px"
                                        />
                                    </div>
                                </div>
                            </div>
                            {releaseErr && <p className='text-red-500 text-sm'>{releaseErr}</p>}
                            {ratingErr && <p className='text-red-500 text-sm text-end'>{ratingErr}</p>}


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Summary</span>
                                </label>
                                <textarea type="text"
                                    name='summary'
                                    value={textSummery}
                                    placeholder="Summary of the movie"
                                    onChange={(e) => setTextSummery(e.target.value)}
                                    className="textarea textarea-bordered" required />

                            </div>
                            {textSummeryErr && <p className='text-red-500 text-sm'>{textSummeryErr}</p>}
                            <div className="form-control mt-6">
                                <button className="btn btn-primary" disabled={loading}>
                                    {loading ? "Loading..." : "Add Movie"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <footer className='mt-6'>
                <Footer></Footer>
            </footer>
        </div>

    );
};

export default AddMovie;