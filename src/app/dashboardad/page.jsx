"use client";

import React, { useContext, useEffect, useState } from 'react';
import { getAllUsers } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import UserContext from '@/contexts/UserContext';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJs, ArcElement, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, registerables } from 'chart.js';
// import { Chart } from 'chart.js/auto';

ChartJs.register(ArcElement, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, ...registerables);

import { Line, Bar, Dooughnut } from 'react-chartjs-2';


const DashboardADPage = () => {
    const router = useRouter();
    const { session, status } = useContext(UserContext);
    // console.log("session:", session);

    useEffect(() => {
        if (status === "loading") {
            return;
        } else if (session.user?.role !== "ad") {
            router.back();
        }
    }, [status, session, router]);


    const [tls, setTls] = useState([]);
    const [frs, setFrs] = useState([]);
    const [selectedTL, setSelectedTL] = useState('');
    const [selectedFR, setSelectedFR] = useState('');

    const [userData, setUserData] = useState({});
    const [cityData, setCityData] = useState({});
    const [stateData, setStateData] = useState({});
    const [industryData, setIndustryData] = useState({});
    const [positionStatusData, setPositionStatusData] = useState({});


    // State variables for the second API
    const [chartData, setChartData] = useState({
        city: {
            datasets: [{
                data: [],
                backgroundColor: []
            }],
            labels: []
        },
        state: {
            datasets: [{
                data: [],
                backgroundColor: []
            }],
            labels: []
        },
        industry: {
            datasets: [{
                data: [],
                backgroundColor: []
            }],
            labels: []
        },
        positionStatus: {
            datasets: [{
                data: [],
                backgroundColor: []
            }],
            labels: []
        },
        status: {
            datasets: [{
                data: [],
                backgroundColor: []
            }],
            labels: []
        }
    });

    // Function to generate random color
    const getRandomColor = () => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    };

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

    useEffect(() => {
        if (selectedFR !== "") {
            const fetchSheetData = async (e) => {
                try {
                    console.log("i was called");
                    console.log("franchise selected:", selectedFR);

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
                    // console.log("data:", data);
                    setUserData(data);

                    const selectedFRNormalized = selectedFR.replace(/\s+/g, '').toLowerCase();
                    const dataKeysNormalized = Object.keys(data).reduce((acc, key) => {
                        acc[key.replace(/\s+/g, '').toLowerCase()] = data[key];
                        return acc;
                    }, {});
                    console.log("normalized selectedfr:", selectedFRNormalized);
                    // console.log("dataKeyNormalized:", dataKeysNormalized);


                    // if (data.hasOwnProperty(selectedFR)) {
                    //     const clientData = data[selectedFR];
                    //     console.log("clientData:", clientData);

                    if (dataKeysNormalized.hasOwnProperty(selectedFRNormalized)) {
                        const clientData = dataKeysNormalized[selectedFRNormalized];
                        console.log("clientData:", clientData);
                        console.log("clientData.cityState:", clientData.cityState);

                        if (clientData && clientData.cityState) {

                            // Set city data
                            const cityCounts = {};
                            clientData.cityState.forEach(cityState => {
                                if (!cityCounts[cityState.city]) {
                                    cityCounts[cityState.city] = 0;
                                }
                                cityCounts[cityState.city]++;
                            });
                            setCityData(cityCounts);


                            // Set state data
                            const stateCounts = {};
                            clientData.cityState.forEach(cityState => {
                                if (!stateCounts[cityState.state]) {
                                    stateCounts[cityState.state] = 0;
                                }
                                stateCounts[cityState.state]++;
                            });
                            setStateData(stateCounts);

                            // Set industry data
                            const industryCounts = {};
                            clientData.industries.forEach(industry => {
                                if (!industryCounts[industry]) {
                                    industryCounts[industry] = 0;
                                }
                                industryCounts[industry]++;
                            });
                            setIndustryData(industryCounts);


                            // Process positionStatusCounts data
                            if (clientData && clientData.positionStatusCounts) {
                                const positionStatusCounts = clientData.positionStatusCounts.reduce((acc, item) => {
                                    const key = Object.keys(item)[0];
                                    acc[key] = item[key];
                                    return acc;
                                }, {});
                                setPositionStatusData(positionStatusCounts);

                                // Set unique colors for positionStatusCounts data

                                // Set unique colors for positionStatusCounts data
                                const positionStatusColors = Object.keys(positionStatusCounts).map(() => getRandomColor());
                                setChartData(prevState => ({
                                    ...prevState,
                                    positionStatus: {
                                        datasets: [{
                                            data: Object.values(positionStatusCounts),
                                            backgroundColor: positionStatusColors
                                        }],
                                        labels: Object.keys(positionStatusCounts)
                                    }
                                }));
                            }

                            // Set unique colors for city data
                            const cityColors = Object.keys(cityCounts).map(() => getRandomColor());
                            setChartData(prevState => ({
                                ...prevState,
                                city: {
                                    datasets: [{
                                        data: Object.values(cityCounts),
                                        backgroundColor: cityColors
                                    }],
                                    labels: Object.keys(cityCounts)
                                }
                            }));

                            // Set unique colors for state data
                            const stateColors = Object.keys(stateCounts).map(() => getRandomColor());
                            setChartData(prevState => ({
                                ...prevState,
                                state: {
                                    datasets: [{
                                        data: Object.values(stateCounts),
                                        backgroundColor: stateColors
                                    }],
                                    labels: Object.keys(stateCounts)
                                }
                            }));

                            // Set unique colors for industry data
                            const industryColors = Object.keys(industryCounts).map(() => getRandomColor());
                            setChartData(prevState => ({
                                ...prevState,
                                industry: {
                                    datasets: [{
                                        data: Object.values(industryCounts),
                                        backgroundColor: industryColors
                                    }],
                                    labels: Object.keys(industryCounts)
                                }
                            }));
                        }
                        else {
                            console.log("first round");
                        }
                    } else {
                        console.error("This user not found:", selectedFR);
                    }

                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
            fetchSheetData();
        }
    }, [selectedFR])


    const SelectFR = (e) => {
        e.preventDefault();
        console.log("e.target.value:", e.target.value);
        setSelectedFR(e.target.value);
        console.log("selected FR:", selectedFR);
        // fetchSheetData();
    };


    const renderLineChart = () => {
        const data = {
            labels: Object.keys(cityData),
            datasets: [
                {
                    label: 'City Counts',
                    data: Object.values(cityData),
                    fill: false,
                    borderColor: 'blue',
                    borderWidth: 2,
                },
            ],
        };

        const options = {
            scales: {
                x: {
                    type: 'category',
                    labels: data.labels,
                },
                y: {
                    type: 'linear',
                    beginAtZero: true,
                },
            },
            elements: {
                point: {
                    radius: 5,
                    borderWidth: 2,
                    borderColor: 'red',
                    backgroundColor: 'white',
                },
                line: {
                    tension: 0.4,
                    borderColor: 'blue',
                    borderWidth: 2,
                },
            },
        };

        return <Line data={data} options={options} />;
    };


    const renderLineChartStates = () => {
        const data = {
            labels: Object.keys(stateData),
            datasets: [
                {
                    label: 'States Worked In',
                    data: Object.values(stateData),
                    fill: false,
                    borderColor: 'green',
                    backgroundColor: 'rgba(0, 128, 0, 0.2)',
                    borderWidth: 2,
                },
            ],
        };

        const options = {
            scales: {
                x: {
                    type: 'category',
                    labels: data.labels,
                },
                y: {
                    type: 'linear',
                    beginAtZero: true,
                },
            },
        };

        return <Line data={data} options={options} />;
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

            {/* <div className="w-full flex">

                <div className='w-1/3  h-1/2'>
                    <h2>Cities Worked In</h2>
                    <Doughnut data={chartData.city} />
                </div>

                <div className='w-1/3 h-1/2'>
                    <h2>Position Status Counts</h2>
                    <Doughnut data={chartData.positionStatus} />
                </div>
                <div className='w-1/3 h-1/2'>
                    <h2>States Worked In</h2>
                    <Doughnut data={chartData.state} />
                </div>
                <div className='w-1/3 h-1/2'>
                    <h2>Industries Worked In</h2>
                    <Doughnut data={chartData.industry} />
                </div>
                <div className='w-1/6 h-1/2'>
                    <Doughnut data={chartData.status} />
                </div>
            </div> */}

            <div className="flex flex-col justify-center items-center w-full h-auto gap-8">

                <div className="flex justify-between items-center w-full h-auto p-4 gap-4">
                    <div className="w-1/2 h-full bg-white text-black p-4 text-center">
                        <h2>Position Status Counts</h2>
                        {/* <Doughnut data={chartData.positionStatus} /> */}
                        {Object.keys(positionStatusData).length > 0 ? <Doughnut data={chartData.positionStatus} /> : <p>Loading...</p>}
                    </div>
                    <div className="w-1/2 h-full bg-white text-black p-4 text-center">
                        <h2>Industries Worked In</h2>
                        {/* <Bar data={chartData.industry} /> */}
                        {Object.keys(industryData).length > 0 ? <Bar data={chartData.industry} /> : <p>Loading...</p>}
                    </div>

                </div>

                <div className="flex justify-between items-center w-full h-auto p-4 gap-4">
                    <div className="w-1/2 h-full bg-white text-black p-4 text-center">
                        <h2>Cities Worked In</h2>

                        {Object.keys(cityData).length > 0 ? renderLineChart() : <p>Loading...</p>}
                    </div>
                    <div className="w-1/2 h-full bg-white text-black p-4 text-center">
                        <h2>States Worked In</h2>
                        {Object.keys(stateData).length > 0 ? renderLineChartStates() : <p>Loading...</p>}
                    </div>
                </div>

            </div>




        </div>
    )
}

export default DashboardADPage

