'use client'

import { useEffect, useState } from 'react';
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJs.register(
    Tooltip, Title, ArcElement, Legend
);

const PieChart = () => {
    const [chartData, setChartData] = useState({
        datasets: [{
            data: [10, 20, 30],
            backgroundColor: [
                'red',
                'blue',
                'yellow',
                'green',
            ]
        }],
        labels: ['In Progress', 'Hold', 'Cancel', 'Closed']
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=lK4Cc-JgcEbSNBfMMuOToYR1Q2_38gpHqQ8TVVynYJRr2OyKqNaxHx9VKVqQJr5NhsLEsYjyL2KqGItU9zICkx8sf-hXLD9Rm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKE_Bi6_w8Iv3fi5IAlYV3tEAdbL6d2WDU2aqM2fhLcVYM4Wo6hVRkxvuKIAutcB2iq7xzmef4-XcL_fGo314wG8Cf_zVO3e0g&lib=MLML_NRMKbZzfyHtveTdE3LONwxaIsT7L');
                const data = await response.json();

                const statusCount = {
                    'In Progress': 0,
                    'Hold': 0,
                    'Cancel': 0,
                    'Closed': 0
                };

                data.forEach(entry => {
                    const status = entry.status;
                    if (statusCount.hasOwnProperty(status)) {
                        statusCount[status]++;
                    }
                });

                const statusData = Object.values(statusCount);

                setChartData({
                    datasets: [{
                        data: statusData,
                        backgroundColor: [
                            'red',
                            'blue',
                            'yellow',
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