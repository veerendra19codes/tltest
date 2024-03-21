'use client'

import { useEffect, useState } from 'react';
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJs.register(
    Tooltip, Title, ArcElement, Legend
);

const PieChart = ({ username }) => {
    console.log("username:", username);
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
                // const response = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=lK4Cc-JgcEbSNBfMMuOToYR1Q2_38gpHqQ8TVVynYJRr2OyKqNaxHx9VKVqQJr5NhsLEsYjyL2KqGItU9zICkx8sf-hXLD9Rm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKE_Bi6_w8Iv3fi5IAlYV3tEAdbL6d2WDU2aqM2fhLcVYM4Wo6hVRkxvuKIAutcB2iq7xzmef4-XcL_fGo314wG8Cf_zVO3e0g&lib=MLML_NRMKbZzfyHtveTdE3LONwxaIsT7L');
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

                const franchiseData = data.filter((d) => d.nameoffranchisee.replace(/\s/g, '').toLowerCase() === username.replace(/\s/g, '').toLowerCase());
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
    }, []);

    return (
        <div className="App" style={{ width: '20%', height: '20%' }}>
            <Doughnut data={chartData} />
        </div>
    );
}

export default PieChart;