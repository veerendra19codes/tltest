'use client'
import React, { useState, useEffect } from 'react';
import DashboardTLDropdown from '../../Components/DashboardTLDropdown/DashboardTLDropdown';
import PieChart from '@/Components/PieComponent/PieComponent'; // Import PieChart component
import { getAllUsers } from '@/lib/actions';

import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJs.register(
    Tooltip, Title, ArcElement, Legend
);

const DashboardADPage = () => {
    const [frUsers, setFrUsers] = useState([]);
    const [selectedTL, setSelectedTL] = useState('');
    const [selectedFr, setSelectedFr] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allUsers = await getAllUsers();
                const filteredUsers = allUsers.filter(user => user.role === 'fr' && user.teamleadername === selectedTL);
                setFrUsers(filteredUsers);
                // setSelectedFr(''); // Removed resetting selectedFr here
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchData();
    }, [selectedTL, selectedFr]); // Include selectedFr in the dependency array

    const handleSelectTeamLeader = async (selectedTL) => {
        setSelectedTL(selectedTL);
        setSelectedFr(''); // Reset selected Franchise User when TL changes
    };

    const handleSelectFranchiseUser = (username) => {
        setSelectedFr(username);
    };

    const [chartData, setChartData] = useState({
        datasets: [{
            data: [0, 0, 0, 0],
            backgroundColor: [
                'yellow',
                'blue',
                'red',
                'green',
            ]
        }],
        labels: ['In Progress', 'Hold', 'Cancel', 'Closed']
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=qWWfPwzDyYRboI0XMl6hdgJHcxi1zbRvAzZ7JO13EX4UiMcgLe4QIGwIoUU8LkAgCSFXzlgbJt86U_saoO7rPdFfOcvNOAjem5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnACjCMGIFewAJBbxbYdscE-QTHINCExkmOjUHG9hH7R7Ek4mh7uzoWGFO-7zYJpb_GAO8W7C_SauCK145m3xOrOdJoCw8JvXDg&lib=MM96Da-oZfWYlnBietGpgWWhlU9biCwv8');


                const data = await response.json();
                console.log('data: ', data);

                const statusCount = {
                    'In Progress': 0,
                    'Hold': 0,
                    'Cancel': 0,
                    'Closed': 0
                };
                console.log("statusCount:", statusCount);

                const franchiseData = data.filter((d) => d.nameoffranchisee.replace(/\s/g, '').toLowerCase() === selectedFr.replace(/\s/g, '').toLowerCase());
                console.log("franchiseData:", franchiseData);

                const statusEntry = franchiseData[0];
                console.log("statusEntry:", statusEntry);

                statusCount['In Progress'] = statusEntry.inprogress;
                statusCount['Hold'] = statusEntry.hold;
                statusCount['Cancel'] = statusEntry.cancel;
                statusCount['Closed'] = statusEntry.closed;
                console.log("statusCount:", statusCount);


                // data.forEach(entry => {
                //     const status = entry.status;
                //     if (statusCount.hasOwnProperty(status)) {
                //         statusCount[status]++;
                //     }
                // });

                const statusData = Object.values(statusCount);
                console.log("statusData:", statusData);

                setChartData({
                    datasets: [{
                        data: statusData,
                        backgroundColor: [
                            'yellow',
                            'blue',
                            'red',
                            'green',
                        ]
                    }],
                    labels: ['In Progress', 'Hold', 'Cancel', 'Closed']
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [selectedFr]);


    return (
        <div className="flex h-screen gap-4 justify-center items-center p-12 ">

            <div className="w-1/3 -mt-12">
                <DashboardTLDropdown onSelectTeamLeader={handleSelectTeamLeader} />
                <div>
                    <h2 className="text-lg font-bold text-white mt-6">Franchise Under this TL:</h2>
                    <div>
                        {frUsers.map(user => (
                            <button key={user._id} onClick={() => handleSelectFranchiseUser(user.username)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">{user.username}</button>
                        ))}
                    </div>
                </div>
            </div>

            <div className='w-2/3 -mt-12 flex justify-center items-center size-[500px] text-white bg-white rounded-xl p-4'>
                {/* <PieChart username={selectedFr} />  */}
                <Doughnut data={chartData} />

            </div>
        </div>
    );
};

export default DashboardADPage;