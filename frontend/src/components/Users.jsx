import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "../components/Button";
import { useNavigate } from 'react-router-dom';


export default function Users() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`);
                setUsers(res.data.user);
            } catch (error) {
                console.error('Error fetching the users:', error);
            }
        };

        fetchUsers();
    }, [filter]);

    return (
        <>
            <div className="font-bold mt-6 text-lg">Users</div>
            <div className="my-4 mx-auto max-w-md">
                <input
                    onChange={(e) => setFilter(e.target.value)}
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 sm:text-sm"
                />
            </div>


            <div>
                {users.map(user => <User key={user._id} user={user} />)}
            </div>
        </>
    );
}

function User({ user }) {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.FirstName[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div>
                        {user.FirstName} {user.LastName}
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <Button
                    onClick={() => {
                        navigate("/send?id=" + user._id + "&name=" + user.FirstName);
                    }}
                    label={"Send Money💰"}
                />
            </div>
        </div>
    );
}
