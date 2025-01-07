import React, { useContext, useState } from 'react';
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaSignInAlt } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

const Signup = () => {
    const { createUser, eyeOpen, setEyeOpen, signInUserPop } = useContext(AuthContext);
    const [photoLink, setPhotoLink] = useState('')
    const [linkErr, setLinkErr] = useState('');
    const [loading, setloading] = useState(false);
    const [passwordErr, setPasswordErr] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';
    const handleSignUp = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = photoLink;
        // const photo= form.photurl.value
        const email = form.email.value;
        const password = form.password.value;

        const urlPattern = /^https?:\/\/[^\s$.?#].[^\s]*$/i;
        if (photo && !urlPattern.test(photo)) {
            setLinkErr('Not mendatory but Photo URL must be a valid link!');
            return;
        }
        const passwordError=validatePassword(password);
        if(passwordError){
            setPasswordErr(passwordError)
            return;
        }
        setLinkErr('')
        setPasswordErr('')
        setloading(true)

        createUser(email, password)
            .then(result => {
                const photoUrl = result.user.photoURL || photo;
                //console.log(result)
                const newUser = { name, email, photoUrl };
                fetch('https://movie-portal-server-xi.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        //console.log(data)
                        if (data.insertedId) {
                            Swal.fire({
                                title: "Successfull!",
                                text: "User successfully created an account.",
                                icon: "success"
                            });
                            navigate(from, { replace: true })
                        }
                    }).catch(error => {
                        Swal.fire({
                            title: 'Error!',
                            text: error.message,
                            icon: 'error'
                        })
                    }).finally(() => {
                        setloading(false)
                    })
            })

    }
    const validatePassword=(password)=>{
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const isValidLength = password.length >= 6;
        if(!hasUppercase){
            return 'Password must contain at least one uppercase letter!'
        }
        if(!hasLowercase){
            return 'Password must contain at least one lowercase letter!'
        }
        if(!isValidLength){
            return 'Password must contain at least 6 charecters long!'
        }
    }
    const handleGoogleSignin=async () => {
        try {
            const result = await signInUserPop();
            const email = result?.user?.email;
            const lastSignInTime = result?.user?.metadata?.lastSignInTime;
            const loginInfo = {email, lastSignInTime}
            const response = await  fetch('https://movie-portal-server-xi.vercel.app/users',{
                method: 'PATCH',
                headers:{
                    'content-type':"application/json"
                },
                body: JSON.stringify(loginInfo)
            })
            const data = await response.json();
            //console.log(data.matchedCount)
            if(data.matchedCount>0){
                Swal.fire({
                    title: "Successfull!",
                    text: "User successfully log in your account.",
                    icon: "success"
                });
                navigate(from, {replace:true})
            }else{
                Swal.fire({
                    title: "Error",
                    text: "Failed to update user data.",
                    icon: "error"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Login Failed",
                text: error.message,
                icon: "error"
            });
        }finally{setloading(false)}
    }
    const showPass = () => {
        setEyeOpen(!eyeOpen)
    }
    return (
        <div>
            <nav className='fixed top-0 left-0 w-full bg-white z-10 shadow-md'>
                <Navbar></Navbar>
            </nav>
            <main>
                <div className="hero bg-base-200 my-12">
                    <div className="hero-content flex-col">
                        <div className="text-center lg:text-left">
                            <h1 className="text-xl md:text-3xl lg:text-5xl font-bold">Register now!</h1>
                        </div>
                        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                            <form onSubmit={handleSignUp} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" name='name' placeholder="Name" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo</span>
                                    </label>
                                    <input type="text" name='photourl'
                                        value={photoLink}
                                        onChange={(e) => setPhotoLink(e.target.value)}
                                        placeholder="Photo URL"
                                        className="input input-bordered" />
                                </div>
                                {linkErr && <p
                                    className='text-red-500 text-sm text-start'>
                                    {linkErr}
                                </p>}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control relative">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type={eyeOpen ? "text" : "password"}
                                        name='password' placeholder="password" className="input input-bordered" required />
                                    <button onClick={showPass} type='button'
                                        className='absolute right-5 top-14'>
                                        {eyeOpen ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                </div>
                                {passwordErr && <p className='text-sm text-red-500'>{passwordErr}</p>}
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary hover:bg-blue-700 focus:ring focus:ring-blue-300">
                                        {loading? "Registering...":"Register"}
                                    </button>
                                </div>
                                <div>
                                    <span>Having problem to create account? Please</span>
                                    <div className='flex flex-col lg:flex-row gap-4'>
                                        <Link className="btn btn-primary btn-outline w-full lg:w-fit" to={'/'} onClick={handleGoogleSignin}> login with <FcGoogle className='-mr-2' />oogle</Link>
                                        <Link className="btn btn-primary btn-outline w-full lg:w-fit" to={'/signin'}><FaSignInAlt className='text-xl' />Login here</Link>
                                    </div>
                                </div>
                            </form>
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

export default Signup;