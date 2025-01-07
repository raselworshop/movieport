import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '/MOVIE-PORTAL.png'
import { AuthContext } from '../Provider/AuthProvider';
import ThemeToggleButton from './ThemeToggleButton';

const Navbar = () => {
    const { signOutUser, user, setUser } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [searchQue, setSearchQue] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUserData = async () => {
            if (user?.email) {
                try {
                    const response = await fetch(`https://movie-portal-server-xi.vercel.app/users/${user.email}`)
                    const data = await response.json();
                    setProfile(data)
                } catch (error) {
                    //console.log(error, "fetching users")
                }
            }
        }
        fetchUserData();
    }, [user?.email])

    // console.log(searchQue)
    useEffect(() => {
        // if(searchQue){
        //     navigate(`searchmovies/search?query=${searchQue}`)
        // }

        const timer = setTimeout(() => {
            if (searchQue.trim() !== '') {
                navigate(`/search?searchQuery=${searchQue}`)
            }
        }, 500);
        return () => clearTimeout(timer)

        //         fetch(`https://movie-portal-server-xi.vercel.app/search?searchQuery=${searchQue}`)
        //  .then(res=>res.json())
        //  .then(data=>{
        //     //console.log(data)
        //  })

    }, [searchQue, navigate])

    const links = <>
        <li><NavLink to="/" className="hover:text-gray-400">Home</NavLink></li>
        <li><NavLink to="/allmovies" className="hover:text-gray-400">Movies</NavLink></li>
        {user ? <>
            <li><NavLink to={'/recommendedmovies'}>Must-Watch</NavLink></li>
            <li><NavLink to={'/postedMovies'}>Posted Movies</NavLink></li>
            <li><NavLink to="/myfavorites" className="hover:text-gray-400">Favorites</NavLink></li>
            <li><NavLink to="/addmovie" className="hover:text-gray-400">Add movie</NavLink></li>
        </> : <></>}
        <ThemeToggleButton />
    </>
    return (
        <div className=" bg-gray-300 backdrop-blur">
            <div className='navbar p-4 max-w-screen-xl mx-auto'>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <div className='flex justify-center items-center cursor-pointer'>
                        <Link to="/" className="lg:text-3xl text-xl font-bold hidden md:block md:text-2xl">MOVIE PORT</Link>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 pl-44 xl:pl-0">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end flex items-center gap-4">
                    <input type="text"
                        value={searchQue}
                        onChange={(e) => setSearchQue(e.target.value)}
                        placeholder='Search Movies...'
                        className='input input-bordered w-full max-w-sm'
                    />
                    {/* Conditional Rendering */}
                    {user ? (
                        <div className="relative group">
                            <div className="btn btn-ghost btn-circle avatar">
                                {profile?.photoUrl ? (
                                    <img
                                        src={profile.photoUrl}
                                        alt="Profile"
                                        className="w-10 rounded-full"
                                    />
                                ) : (
                                    <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-lg font-bold">
                                        {user.email.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            {/* Logout Option on Hover */}
                            <div className="absolute top-full right-0 bg-gray-700 text-white rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200">
                                <ul className="py-2">
                                    <li className="px-4 py-2">
                                        Hi, {profile?.name || "Anonymous"}
                                    </li>
                                    <li className="px-4 py-2">
                                        user: {profile?.email || "anonymous@example.com"}
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">
                                        <button
                                            onClick={signOutUser}
                                            className="w-full btn btn-sm text-left">
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            <Link to="/signin" className="btn btn-primary">Login</Link>
                            <Link to="/signup" className="btn btn-secondary">Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
