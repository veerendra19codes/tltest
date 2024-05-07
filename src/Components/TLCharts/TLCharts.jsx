// 'use client'

// import { useEffect, useState } from 'react';
// import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
// import { Doughnut } from 'react-chartjs-2';

// ChartJs.register(
//     Tooltip, Title, ArcElement, Legend
// );

// const TLCharts = ({ username }) => {
//     // console.log("username:", username);
//     const [chartData, setChartData] = useState({
//         datasets: [{
//             data: [0, 0, 0, 0],
//             backgroundColor: [
//                 'yellow',
//                 'blue',
//                 'red',
//                 'green',
//             ]
//         }],
//         labels: ['In Progress', 'Hold', 'Cancel', 'Closed']
//     });

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('https://script.google.com/macros/s/AKfycbxXJ0pz6BYDUvY8gSc6MkYS4PLGCQIUSen2df0barSBC6mBBCPbyMNV64maie_31xzJ/exec');


//                 const data = await response.json();
//                 console.log('data: ', data);

//                 const statusCount = {
//                     'In Progress': 0,
//                     'Hold': 0,
//                     'Cancel': 0,
//                     'Closed': 0
//                 };
//                 console.log("statusCount:", statusCount);

//                 const franchiseData = data.filter((d) => d.nameoffranchisee.replace(/\s/g, '').toLowerCase() === username.replace(/\s/g, '').toLowerCase());
//                 console.log("franchiseData:", franchiseData);

//                 const statusEntry = franchiseData[0];
//                 console.log("statusEntry:", statusEntry);

//                 statusCount['In Progress'] = statusEntry.inprogress;
//                 statusCount['Hold'] = statusEntry.hold;
//                 statusCount['Cancel'] = statusEntry.cancel;
//                 statusCount['Closed'] = statusEntry.closed;
//                 console.log("statusCount:", statusCount);


//                 // data.forEach(entry => {
//                 //     const status = entry.status;
//                 //     if (statusCount.hasOwnProperty(status)) {
//                 //         statusCount[status]++;
//                 //     }
//                 // });

//                 const statusData = Object.values(statusCount);
//                 console.log("statusData:", statusData);

//                 setChartData({
//                     datasets: [{
//                         data: statusData,
//                         backgroundColor: [
//                             'yellow',
//                             'blue',
//                             'red',
//                             'green',
//                         ]
//                     }],
//                     labels: ['In Progress', 'Hold', 'Cancel', 'Closed']
//                 });
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };

//         fetchData();
//     }, []);

//     return (
//         <div className="piechart w-full h-full" style={{ width: '80%', height: '80%' }}>
//             <Doughnut data={chartData} />
//         </div>
//     );
// }

// export default TLCharts;