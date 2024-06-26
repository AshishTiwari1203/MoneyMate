import React, { useState, useEffect } from 'react'; // Added useEffect import
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Users from '../components/Users';
import Appbar from '../components/Appbar'
import { Balance } from '../components/Balance';

export default function Dashboard() {
    const [bal, setBal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const userToken = localStorage.getItem("token");

        // Check if token exists in local storage
        if (!userToken) {
        navigate("/signin"); // Redirect to sign-in page if token doesn't exist
        } else {
        // Fetch balance if token exists
        axios
            .get("https://moneymate-681h.onrender.com/api/v1/account/balance", {
            headers: {
                Authorization: "Bearer " + userToken,
            },
            })
            .then((response) => {
            setBal(response.data.balance);
            })
            .catch((error) => {
            navigate("/signin");
            });
        }
    }, [navigate]);


    return (
        <div>
            <Appbar />
            <div className="m-8">
                <Balance value={bal} />
                <Users />
            </div>
        </div>
    );
}