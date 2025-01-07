import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';
import Swal from 'sweetalert2';

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setloading] = useState(true);
    const [eyeOpen, setEyeOpen] = useState(false)

    const createUser = async(email, password)=>{
        setloading(true)
        return createUserWithEmailAndPassword(auth, email, password)
        .then(result=>{
            setUser(result?.user);
            setloading(false);
            return result;
        }).catch(error=>{
            setloading(false) 
            throw error
        })
    }
    const signInUser = async(email, password)=>{
        setloading(true)
        return signInWithEmailAndPassword(auth, email, password)
        .then(result=>{
            setUser(result?.user)
            setloading(false)
            return result;
        }).catch(error=>{
            Swal.fire('error!', error.message, "error")
            setloading(false)
            throw error;
        })
    }
    const googleProvider= new GoogleAuthProvider();
    const signInUserPop = async()=>{
        setloading(true)
        return signInWithPopup(auth, googleProvider)
        .then(result=>{
            setUser(result?.user)
            return result;
        }).catch(error=>{
            Swal.fire('error!', error.message, "error")
            setloading(false)
            throw error;
        })
    }
    const sendPasswordResetMail= async(email)=>{
        setloading(true);
        try {
             await sendPasswordResetEmail(auth, email)
            Swal.fire({
                title: "Email Sent!",
                text: "Password reset link has been sent to your email.",
                icon: "success"
            });
        } catch (error) {
            Swal.fire('Error!', error.message, "error");
        }finally{setloading(false)}
    }
    const signOutUser=()=>{
        setloading(true);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log me out!"
        }) .then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Log Out!",
                    text: "You're log out successfully!'.",
                    icon: "success"
                })
                return signOut(auth)
            }
        }).catch(error=>{
            Swal.fire('error!', error.message, "error")
            setloading(false)
            throw error;
        }).finally(()=>{
            setloading(false)
        })
    }
    useEffect(()=>{
        const storedUser= JSON.parse(localStorage.getItem('user'));
        if(storedUser){
            setUser(storedUser)
        }
        setloading(false)
    },[])
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            setloading(false)
        })
        return ()=>{
            unsubscribe();
        }
    },[])
    const handleLogin=(userData)=>{
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
    }

    if(loading){
        return <div>Loading...</div>
    }
    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signInUserPop,
        handleLogin,
        sendPasswordResetMail,
        signOutUser,
        setUser,
        setloading,
        eyeOpen,
        setEyeOpen,
    };
    
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;