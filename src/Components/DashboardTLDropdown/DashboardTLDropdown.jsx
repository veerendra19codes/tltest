"use client";

import React, { useEffect, useState } from 'react';
import { getAllUsers } from '@/lib/actions';

const DashboardTLDropdown = ({ onSelectTeamLeader }) => {
    const [tlsData, setTlsData] = useState([]);
    const [selectedTL, setSelectedTL] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allUsers = await getAllUsers();
                // Filter users whose role is 'tl'
                const tlsData = allUsers.filter(user => user.role === 'tl');
                setTlsData(tlsData);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchData();
    }, []);

    const handleSelectChange = (e) => {
        setSelectedTL(e.target.value);
        onSelectTeamLeader(e.target.value);
    };

    return (
        <div className="mt-6">
            <label className="block text-white font-medium text-sm  mb-2">Select teamleader:</label>
            <select
                className="block appearance-none w-full bg-white border border-gray-300 rounded py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
                onChange={handleSelectChange}
                value={selectedTL}
            >
                <option value="">Select Team Leader</option>
                {tlsData.map(tl => (
                    <option key={tl._id} value={tl.username}>{tl.username}</option>
                ))}
            </select>
        </div>
    );
};

export default DashboardTLDropdown;