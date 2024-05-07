'use client'

import dynamic from "next/dynamic";
import { useEffect, useState } from 'react';
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
const Doughnut = dynamic(() => import("react-chartjs-2").then(module => module.Doughnut));
// import { Doughnut } from 'react-chartjs-2';
import { getAllUsers } from '@/lib/actions';

ChartJs.register(
    Tooltip, Title, ArcElement, Legend
);

const PieChart = ({ username, teamleadername }) => {
    // console.log("username:", username);
    // console.log("teamleadername in pie component:", teamleadername);
    const [tlname, setTlname] = useState(teamleadername);
    // console.log("tlname:", tlname);
    const [url, setUrl] = useState("");


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
        const getteamleaderurl = async () => {
            try {
                // console.log("hello");
                const allUsers = await getAllUsers();

                const teamleaderarr = allUsers.filter((user) => user.username === teamleadername);
                // console.log("teamleaderarr in pie:", teamleaderarr);

                const teamleaderobj = teamleaderarr[0];
                // console.log("teamleader obj in pie:", teamleaderobj);
                // console.log("url from teamleaderobj:", teamleaderobj.deployedlink);

                setUrl(teamleaderobj.deployedlink);
                // console.log("deployedlink url:", url);
            }
            catch (err) {
                // console.log("error getting teamleader deployed url:", err);
            }
        }
        getteamleaderurl();
    }, [tlname]);

    useEffect(() => {
        const fetchData = async () => {

            try {
                // console.log("hello");
                // console.log("url:", url);

                const response = await fetch(url);
                if (!response.ok) {

                    const statusCount = {
                        'In Progress': 0,
                        'Hold': 0,
                        'Cancel': 0,
                        'Closed': 0
                    };
                    // console.log("statusCount:", statusCount);

                    const statusData = Object.values(statusCount);
                    // console.log("statusData:", statusData);

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
                }
                else {
                    const data = await response.json();
                    // console.log('data: ', data);

                    const statusCount = {
                        'In Progress': 0,
                        'Hold': 0,
                        'Cancel': 0,
                        'Closed': 0
                    };
                    // console.log("statusCount:", statusCount);

                    const franchiseData = data.filter((d) => d.nameoffranchisee.replace(/\s/g, '').toLowerCase() === username.replace(/\s/g, '').toLowerCase());
                    // console.log("franchiseData:", franchiseData);

                    const statusEntry = franchiseData[0];
                    // console.log("statusEntry:", statusEntry);

                    statusCount['In Progress'] = statusEntry.inprogress || 0;
                    statusCount['Hold'] = statusEntry.hold || 0;
                    statusCount['Cancel'] = statusEntry.cancel || 0;
                    statusCount['Closed'] = statusEntry.closed || 0;
                    // console.log("statusCount:", statusCount);

                    const statusData = Object.values(statusCount);
                    // console.log("statusData:", statusData);

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
                }

            } catch (error) {
                //error handling incase url is corrupted
                const statusCount = {
                    'In Progress': 0,
                    'Hold': 0,
                    'Cancel': 0,
                    'Closed': 0
                };
                const statusData = Object.values(statusCount);
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
                // console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [url]);

    return (
        <div className="piechart w-full h-full flex justify-center items-center" style={{ width: '100%', height: '100%' }}>
            {<Doughnut data={chartData} /> || "Loading..."}
        </div>
    );
}

export default PieChart;