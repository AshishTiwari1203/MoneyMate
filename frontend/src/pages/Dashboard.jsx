import React, { useState, useEffect } from 'react'; // Added useEffect import
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Users from '../components/Users';
import Appbar from '../components/Appbar'
import { Balance } from '../components/Balance';

export default function Dashboard() {
    return (
        <div>
            <Appbar />
            <div className="m-8">
                <Balance value={"10,000"} />
                <Users />
            </div>
        </div>
    );
}