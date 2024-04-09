"use client";

import { useEffect, useState } from "react";

const FranchiseRevenue = ({ username }) => {
    console.log(username);
    const [revenuegained, setRevenuegained] = useState(0);
    const [revenuelost, setRevenuelost] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://script.google.com/macros/s/AKfycbwDqkTWyHHrubAriPFaiOZsMARt-0I6nLo-Uwa7tpmstSFona8LF6NP2wY2czSDWWoA/exec');


                const data = await response.json();
                console.log('data: ', data);

                const statusCount = {
                    'In Progress': 0,
                    'Hold': 0,
                    'Cancel': 0,
                    'Closed': 0
                };
                console.log("statusCount:", statusCount);

                const franchiseData = data.filter((d) => d.nameoffranchisee.replace(/\s/g, '').toLowerCase() === username.replace(/\s/g, '').toLowerCase());
                console.log("franchiseData:", franchiseData);

                const statusEntry = franchiseData[0];
                console.log("statusEntry:", statusEntry);

                setRevenuegained(statusEntry.closed);
                setRevenuelost(statusEntry.cancel);

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
    }, []);
    return (
        <div className="franchiserevenue flex justify-center items-center flex-col gap-4">
            <div className="revenuegained flex flex-col justify-around items-center bg-green-500 rounded-xl w-full py-4 px-8">
                <div className="title font-bold text-white text-center">Revenue Gained</div>
                <div className="title font-bold text-white text-center">{revenuegained}</div>
            </div>
            <div className="revenuelost flex flex-col justify-around items-center bg-red-500 rounded-xl w-full py-4 px-8">
                <div className="title font-bold text-white text-center">Revenue Lost</div>
                <div className="title font-bold text-white text-center">{revenuelost}</div>
            </div>
        </div>
    )
}

export default FranchiseRevenue
