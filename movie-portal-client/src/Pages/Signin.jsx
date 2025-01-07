import React, { useContext, useState } from 'react';
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash, FaRegRegistered } from 'react-icons/fa6';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

const Signin = () => {
    const {eyeOpen, setEyeOpen, signInUser, signInUserPop, handleLogin, sendPasswordResetMail }= useContext(AuthContext);
    const [loading, setloading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();


    const from = location.state?.from?.pathname || '/';
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleSignIn=e=>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        setloading(true)
        signInUser(email, password)
        .then(result=>{
            const lastSignInTime = result?.user?.metadata?.lastSignInTime;
            const loginInfo = {email, lastSignInTime}
            const user = result.user;
            handleLogin(user)
            fetch('https://movie-portal-server-xi.vercel.app/users',{
                method: 'PATCH',
                headers:{
                    'content-type':"application/json"
                },
                body: JSON.stringify(loginInfo)
            })
            .then(res=> res.json())
            .then(data=>{
                // console.log(data)
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
            }).catch(error=>{
                Swal.fire({
                    title: "Login Failed",
                    text: error.message,
                    icon: "error"
                });
            }).finally(()=>{
                setloading(false)
            })
        })
        // //console.log(email)
    }
    const handleGoogleSignin=async () => {
        try {
            const result = await signInUserPop();
            const user = result.user;
            handleLogin(user)
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
    const showPass=()=>{
        setEyeOpen(!eyeOpen)
    }
    const toggleModal =()=>{
        setIsModalOpen(!isModalOpen)
    }
    const onSubmitResetPassword=async(data)=>{
        try {
            await sendPasswordResetMail(data.email)
        } catch (error) {
            
        }
    }
    return (
        <div>
            <nav className='fixed top-0 left-0 w-full bg-white z-10 shadow-md'>
                <Navbar></Navbar>
            </nav>
            <main>
                <div className="hero bg-base-200 my-8">
                    <div className="hero-content flex-col">
                        <div className="text-center lg:text-left">
                            <h1 className="text-xl md:text-3xl lg:text-5xl font-bold">Login now!</h1>
                        </div>
                        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                            <form onSubmit={handleSignIn} className="card-body">
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
                                        className='absolute right-5 top-14'
                                        aria-label={eyeOpen ? "Hide password" : "Show password"}>
                                        {eyeOpen ? <FaEye/> : <FaEyeSlash/>}
                                    </button>
                                    <label className="label">
                                        <span onClick={toggleModal} className="label-text-alt link link-hover">Forgot password?</span>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary hover:bg-blue-700 focus:ring focus:ring-blue-300">
                                        {loading? 'Logining...':'Login'}
                                    </button>
                                </div>
                                <div>
                                    <span>Having problem to Login? </span>
                                    <span>Please  </span>
                                    <div className='flex flex-col lg:flex-row gap-4'>
                                        <Link className="btn btn-primary btn-outline w-full lg:w-fit" to={'/'} onClick={handleGoogleSignin}> login with <FcGoogle className='-mr-2' />oogle</Link>
                                        <Link className="btn btn-primary btn-outline w-full lg:w-fit" to={'/signup'}><FaRegRegistered className='text-xl -mr-2' />egister here</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-900 rounded-lg shadow-lg p-8 w-96">
                        <h2 className="text-center font-bold text-2xl mb-4">Reset Password</h2>

                        {/* React Hook Form for email input */}
                        <form onSubmit={handleSubmit(onSubmitResetPassword)}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                {...register('email', { required: "Email is required" })}
                                className="input input-bordered w-full mt-2"
                            />
                            {errors.email && <p className="text-red-500 mt-2">{errors.email.message}</p>}

                            <button type="submit" className="btn mt-4 w-full bg-blue-500 rounded">
                                Send Reset Link
                            </button>

                            {/* Close button */}
                            <button
                                type="button"
                                onClick={toggleModal}
                                className="btn mt-2 w-full bg-gray-600"
                            >
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default Signin;