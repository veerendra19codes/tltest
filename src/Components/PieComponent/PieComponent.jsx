'use client'

import { useEffect, useState } from 'react';
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
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

    // useEffect(() => {
    //     const getteamleaderurl = async () => {
    //         // console.log("hello");
    //         const res = await fetch(`/api/user/${teamleaderId}`);
    //         const data = await res.json();
    //         // console.log("teamleader obj:", data);

    //         setUrl(data.deployedlink);

    //     }
    //     getteamleaderurl();
    // }, [username])

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
                console.log("error getting teamleader deployed url:", err);
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

                statusCount['In Progress'] = statusEntry.inprogress;
                statusCount['Hold'] = statusEntry.hold;
                statusCount['Cancel'] = statusEntry.cancel;
                statusCount['Closed'] = statusEntry.closed;
                // console.log("statusCount:", statusCount);


                // data.forEach(entry => {
                //     const status = entry.status;
                //     if (statusCount.hasOwnProperty(status)) {
                //         statusCount[status]++;
                //     }
                // });

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

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [url]);

    return (
        <div className="piechart w-full h-full" style={{ width: '80%', height: '80%' }}>
            <Doughnut data={chartData} />
        </div>
    );
}

export default PieChart;