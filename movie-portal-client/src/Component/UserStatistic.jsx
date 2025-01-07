import React, { useEffect, useState } from 'react';

const UserStatistic = () => {
    const [userActivity, setUserActivity] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch('https://movie-portal-server-xi.vercel.app/usersStates')
            .then(res => res.json())
            .then(data => {
                setUserActivity(data.data)
                setLoading(false)
                //console.log("user activity loaded", data)
            })
    }, [])
    return (
        <div className='max-w-7xl mx-auto'>
            <h1 className="text-2xl md:text-4xl lg:text-5xl p-5 font-bold text-center mb-10">User Statistics</h1>
            {loading ? (
                <p>User Statistcs loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Created Time</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Last Login</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Movies Added</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userActivity.map((user, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.createdTime? new Date(user.createdTime).toLocaleDateString() : "N/A"}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.lastSignInTime? new Date(user.lastSignInTime).toLocaleDateString() : "N/A"}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.moviesAdded}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserStatistic;