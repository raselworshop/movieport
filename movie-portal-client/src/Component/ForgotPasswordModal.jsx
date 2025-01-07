// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useContext } from 'react';
// import { AuthContext } from './AuthProvider';
// import Swal from 'sweetalert2';

// const ForgotPasswordModal = () => {

//     return (
//         <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <div className="modal-content bg-gray-900 rounded-lg shadow-lg p-6">
//                 <h2 className="text-center mb-4 text-2xl font-bold">Forgot Password</h2>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <input
//                         type="email"
//                         placeholder="Enter your email"
//                         {...register('email', { required: "Email is required" })}
//                         className="input input-bordered w-full mt-2"
//                     />
//                     {errors.email && <p className="text-red-500 mt-2">{errors.email.message}</p>}

//                     <button
//                         type="submit"
//                         className="btn btn-primary mt-4 w-full py-2 rounded"
//                     >
//                         Send Reset Link
//                     </button>
//                 </form>

//                 <button
//                     onClick={onClose}
//                     className="btn btn-secondary mt-4 w-full py-2 rounded bg-gray-600"
//                 >
//                     Close
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ForgotPasswordModal;
