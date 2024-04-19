"use client";

import React, { useEffect, useState } from 'react';
import { getAllUsers } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const DashboardADPage = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    // console.log("session:", session);

    useEffect(() => {
        if (status === "loading") {
            return;
        } else if (session.user?.role !== "ad") {
            router.replace("/");
        }
    }, [status, session, router]);
    const [tls, setTls] = useState([]);
    const [frs, setFrs] = useState([]);
    const [selectedTL, setSelectedTL] = useState('');
    const [selectedFR, setSelectedFR] = useState('');

    const [userData, setUserData] = useState({});
    const [clientName, setClientName] = useState('');
    const [cityData, setCityData] = useState({});
    const [stateData, setStateData] = useState({});
    const [industryData, setIndustryData] = useState({});



    useEffect(() => {
        const fetchData = async () => {
            try {
                const allUsers = await getAllUsers();
                // Filter users whose role is 'tl'
                const filteredTls = allUsers.filter(user => user.role === 'tl');
                setTls(filteredTls);

                if (selectedTL !== "") {
                    const filteredFrs = allUsers.filter(user => user.teamleadername === selectedTL);
                    setFrs(filteredFrs);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchData();
    }, [selectedTL]);

    const SelectTL = (e) => {
        console.log("e.target.value:", e.target.value);
        setSelectedTL(e.target.value);
        console.log("selected TL:", selectedTL);
    };

    const SelectFR = async (e) => {
        setSelectedFR(e.target.value);
        console.log("selected FR:", selectedFR);

        try {

            // const response = await fetch("/api/fetchAppscript", {
            //     method: 'POST,
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({ url: session.user?.deployedlink })
            // });

            const response = await fetch('/api/fetchAppscript', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url: session.user?.deployedlink })
            });
            const data = await response.json();
            console.log("data:", data);
            // setUserData(data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-full h-auto">

            <div className="flex w-full p-8">

                <div className="tldropdown w-1/4 tex-center p-4">

                    <label className="block text-white font-medium text-sm  mb-2">Select Teamleader:</label >
                    <select
                        className="block appearance-none w-full bg-white border border-gray-300 rounded py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
                        onChange={SelectTL}
                        value={selectedTL}
                    >
                        <option value="">Select Team Leader</option>
                        {tls.map(tl => (
                            <option key={tl._id} value={tl.username}>{tl.username}</option>
                        ))}
                    </select>
                </div>

                {selectedTL &&
                    <div className="frdropdown w-1/4 tex-center p-4">

                        <label className="block text-white font-medium text-sm  mb-2">Select Franchise:</label >
                        <select
                            className="block appearance-none w-full bg-white border border-gray-300 rounded py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
                            onChange={SelectFR}
                            value={selectedFR}
                        >
                            <option value="">Select Franchise</option>
                            {frs.map(fr => (
                                <option key={fr._id} value={fr.username}>{fr.username}</option>
                            ))}
                        </select>
                    </div>
                }
            </div>
        </div>
    )
}

export default DashboardADPage


// ------------------------------------------------------------------------------------------

// if (data.hasOwnProperty(selectedFR)) {
//     const clientData = data[selectedFR];
//     console.log("clientData:", clientData);

//     // Set city data
//     const cityCounts = {};
//     clientData.cityState.forEach(cityState => {
//         if (!cityCounts[cityState.city]) {
//             cityCounts[cityState.city] = 0;
//         }
//         cityCounts[cityState.city]++;
//     });
//     setCityData(cityCounts);

//     // Set state data
//     const stateCounts = {};
//     clientData.cityState.forEach(cityState => {
//         if (!stateCounts[cityState.state]) {
//             stateCounts[cityState.state] = 0;
//         }
//         stateCounts[cityState.state]++;
//     });
//     setStateData(stateCounts);

//     // Set industry data
//     const industryCounts = {};
//     clientData.industries.forEach(industry => {
//         if (!industryCounts[industry]) {
//             industryCounts[industry] = 0;
//         }
//         industryCounts[industry]++;
//     });
//     setIndustryData(industryCounts);

//     // Set position status data
//     const positionStatusCounts = {};
//     clientData.positionStatus.forEach(status => {
//         if (!positionStatusCounts[status]) {
//             positionStatusCounts[status] = 0;
//         }
//         positionStatusCounts[status]++;
//     });
//     // Set unique colors for position status data
//     const positionStatusColors = Object.keys(positionStatusCounts).map(() => getRandomColor());
//     setChartData(prevState => ({
//         ...prevState,
//         positionStatus: {
//             datasets: [{
//                 data: Object.values(positionStatusCounts),
//                 backgroundColor: positionStatusColors
//             }],
//             labels: Object.keys(positionStatusCounts)
//         }
//     }));

//     // Set unique colors for city data
//     const cityColors = Object.keys(cityCounts).map(() => getRandomColor());
//     setChartData(prevState => ({
//         ...prevState,
//         city: {
//             datasets: [{
//                 data: Object.values(cityCounts),
//                 backgroundColor: cityColors
//             }],
//             labels: Object.keys(cityCounts)
//         }
//     }));

//     // Set unique colors for state data
//     const stateColors = Object.keys(stateCounts).map(() => getRandomColor());
//     setChartData(prevState => ({
//         ...prevState,
//         state: {
//             datasets: [{
//                 data: Object.values(stateCounts),
//                 backgroundColor: stateColors
//             }],
//             labels: Object.keys(stateCounts)
//         }
//     }));

//     // Set unique colors for industry data
//     const industryColors = Object.keys(industryCounts).map(() => getRandomColor());
//     setChartData(prevState => ({
//         ...prevState,
//         industry: {
//             datasets: [{
//                 data: Object.values(industryCounts),
//                 backgroundColor: industryColors
//             }],
//             labels: Object.keys(industryCounts)
//         }
//     }));
// } else {
//     console.error("User + ${clientName} + not found in the data.");
// }


// ---------------------------------------------------------------------------------------------------
// 'use client'
// import { useState } from 'react';
// import { Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJs, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJs.register(ArcElement, Title, Tooltip, Legend);

// function App() {
//     // State variables for the first API
//     const [userData, setUserData] = useState({});
//     const [clientName, setClientName] = useState('');
//     const [cityData, setCityData] = useState({});
//     const [stateData, setStateData] = useState({});
//     const [industryData, setIndustryData] = useState({});

//     // State variables for the second API
//     const [chartData, setChartData] = useState({
//         city: {
//             datasets: [{
//                 data: [],
//                 backgroundColor: []
//             }],
//             labels: []
//         },
//         state: {
//             datasets: [{
//                 data: [],
//                 backgroundColor: []
//             }],
//             labels: []
//         },
//         industry: {
//             datasets: [{
//                 data: [],
//                 backgroundColor: []
//             }],
//             labels: []
//         },
//         positionStatus: {
//             datasets: [{
//                 data: [],
//                 backgroundColor: []
//             }],
//             labels: []
//         },
//         status: {
//             datasets: [{
//                 data: [],
//                 backgroundColor: []
//             }],
//             labels: []
//         }
//     });

//     // Function to generate random color
//     const getRandomColor = () => {
//         return '#' + Math.floor(Math.random() * 16777215).toString(16);
//     };

//     // Function to handle form submission for the first API
//     const handleSubmitFirstAPI = async (event) => {
//         // event.preventDefault();
//         try {
//             console.log("hi1")
//             const response = await fetch('/api/googleScriptProxy');
//             console.log("hi")
//             const data = await response.json();
//             console.log(data)
//             setUserData(data);
//             if (data.hasOwnProperty(clientName)) {
//                 const clientData = data[clientName];

//                 // Set city data
//                 const cityCounts = {};
//                 clientData.cityState.forEach(cityState => {
//                     if (!cityCounts[cityState.city]) {
//                         cityCounts[cityState.city] = 0;
//                     }
//                     cityCounts[cityState.city]++;
//                 });
//                 setCityData(cityCounts);

//                 // Set state data
//                 const stateCounts = {};
//                 clientData.cityState.forEach(cityState => {
//                     if (!stateCounts[cityState.state]) {
//                         stateCounts[cityState.state] = 0;
//                     }
//                     stateCounts[cityState.state]++;
//                 });
//                 setStateData(stateCounts);

//                 // Set industry data
//                 const industryCounts = {};
//                 clientData.industries.forEach(industry => {
//                     if (!industryCounts[industry]) {
//                         industryCounts[industry] = 0;
//                     }
//                     industryCounts[industry]++;
//                 });
//                 setIndustryData(industryCounts);

//                 // Set position status data
//                 const positionStatusCounts = {};
//                 clientData.positionStatus.forEach(status => {
//                     if (!positionStatusCounts[status]) {
//                         positionStatusCounts[status] = 0;
//                     }
//                     positionStatusCounts[status]++;
//                 });
//                 // Set unique colors for position status data
//                 const positionStatusColors = Object.keys(positionStatusCounts).map(() => getRandomColor());
//                 setChartData(prevState => ({
//                     ...prevState,
//                     positionStatus: {
//                         datasets: [{
//                             data: Object.values(positionStatusCounts),
//                             backgroundColor: positionStatusColors
//                         }],
//                         labels: Object.keys(positionStatusCounts)
//                     }
//                 }));

//                 // Set unique colors for city data
//                 const cityColors = Object.keys(cityCounts).map(() => getRandomColor());
//                 setChartData(prevState => ({
//                     ...prevState,
//                     city: {
//                         datasets: [{
//                             data: Object.values(cityCounts),
//                             backgroundColor: cityColors
//                         }],
//                         labels: Object.keys(cityCounts)
//                     }
//                 }));

//                 // Set unique colors for state data
//                 const stateColors = Object.keys(stateCounts).map(() => getRandomColor());
//                 setChartData(prevState => ({
//                     ...prevState,
//                     state: {
//                         datasets: [{
//                             data: Object.values(stateCounts),
//                             backgroundColor: stateColors
//                         }],
//                         labels: Object.keys(stateCounts)
//                     }
//                 }));

//                 // Set unique colors for industry data
//                 const industryColors = Object.keys(industryCounts).map(() => getRandomColor());
//                 setChartData(prevState => ({
//                     ...prevState,
//                     industry: {
//                         datasets: [{
//                             data: Object.values(industryCounts),
//                             backgroundColor: industryColors
//                         }],
//                         labels: Object.keys(industryCounts)
//                     }
//                 }));
//             } else {
//                 console.error(User "${clientName}" not found in the data.);
//             }
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }

// }
// Function to handle form submission for the second API
// const handleSubmitSecondAPI = async (event) => {
//  // event.preventDefault();
//   try {
//     const response = await fetch(https://script.googleusercontent.com/macros/echo?user_content_key=br5Me2TNBaUlQMVPxJqwXk932-c1HbwDcDgoABUCImwOPAupy2zpYt-MRqoVLfQNKph8e2718nfITDGT3Jay8Kf1GD9E-F72m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnBLzbLCbF7_Dh-lJTsbZalur5tiKZbQdp95DJ53DXXR2R5MyWSVkqRhucVViMAUYf8PBIBLl_0CQ1Y-6PrCRTDgMa5JHD0KCLQ&lib=M8BMFm6gwTdv_4V0rk3E_Y7ONwxaIsT7L);
//     const data = await response.json();
//     setUserData(data);
//     if (data.hasOwnProperty(clientName)) {
//       const clientData = data[clientName];
//       const statusData = [
//         clientData.active,
//         clientData.cancel,
//         clientData.inprogress,
//         clientData.hold
//       ];
//       // Set unique colors for status data
//       const statusColors = statusData.map(() => getRandomColor());
//       setChartData(prevState => ({
//         ...prevState,
//         status: {
//           datasets: [{
//             data: statusData,
//             backgroundColor: statusColors
//           }],
//           labels: ['Active', 'Cancel', 'In Progress', 'Hold']
//         }
//       }));
//     } else {
//       console.error(User "${clientName}" not found in the data.);
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

//     // Form submission handler
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         await handleSubmitFirstAPI();
//         //await handleSubmitSecondAPI();
//     }

//     return (
//         <div className='flex flex-row'>
//             {/* Form for the first API */}
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Enter your name:
//                     <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} />
//                 </label>
//                 <button type="submit">Submit</button>
//             </form>

//             {/* Display charts for the first API */}
//             <div className='w-1/3  h-1/2'>
//                 <h2>Cities Worked In</h2>
//                 <Doughnut data={chartData.city} />
//             </div>
//             <div className='w-1/3 h-1/2'>
//                 <h2>Position Status</h2>
//                 <Doughnut data={chartData.positionStatus} />
//             </div>
//             <div className='w-1/3 h-1/2'>
//                 <h2>States Worked In</h2>
//                 <Doughnut data={chartData.state} />
//             </div>
//             <div className='w-1/3 h-1/2'>
//                 <h2>Industries Worked In</h2>
//                 <Doughnut data={chartData.industry} />
//             </div>

//             {/* Display chart for the second API */}
//             <div className='w-1/6 h-1/2'>
//                 <Doughnut data={chartData.status} />
//             </div>
//         </div>
//     );
// }

// export default App;