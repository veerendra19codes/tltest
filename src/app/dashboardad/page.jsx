"use client";

import React, { useContext, useEffect, useState } from 'react';
import { getAllUsers } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import UserContext from '@/contexts/UserContext';

// import { Line, Bar, Doughnut } from 'react-chartjs-2';

// import  from 'next/';
// const Line = (() => import("react-chartjs-2").then(module => module.Line));
// const Bar = (() => import("react-chartjs-2").then(module => module.Bar));
// const Doughnut = (() => import("react-chartjs-2").then(module => module.Doughnut));

import { Line, Bar, Doughnut } from "react-chartjs-2"

import { Chart as ChartJs, ArcElement, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, registerables } from 'chart.js';
// import { Chart } from 'chart.js/auto';

ChartJs.register(ArcElement, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, ...registerables);
import Link from 'next/link';
import { FaExternalLinkAlt } from "react-icons/fa";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const DashboardADPage = () => {
    const router = useRouter();
    const { session, status } = useContext(UserContext);
    // console.log("session:", session);

    useEffect(() => {
        if (status === "loading") {
            return;
        } else if (session?.user?.role !== "ad") {
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
        // console.log("e.target.value:", e.target.value);
        setSelectedTL(e.target.value);
        // console.log("selected TL:", selectedTL);
    };

    useEffect(() => {
        if (selectedFR !== "") {
            const fetchSheetData = async (e) => {
                try {
                    // console.log("franchise selected:", selectedFR);

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
                    // console.log("normalized selectedfr:", selectedFRNormalized);
                    // console.log("dataKeyNormalized:", dataKeysNormalized);

                    if (dataKeysNormalized.hasOwnProperty(selectedFRNormalized)) {
                        const clientData = dataKeysNormalized[selectedFRNormalized];
                        // console.log("clientData:", clientData);
                        // console.log("clientData.cityState:", clientData.cityState);

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
                                // Define a color mapping for each status label
                                const statusColorMap = {
                                    "Closed": "green",
                                    "Cancel": "red",
                                    "Hold": "blue",
                                    "In Progress": "yellow",
                                    "Internally Closed": "purple",
                                };

                                // Set unique colors for positionStatusCounts data
                                const positionStatusColors = Object.keys(positionStatusCounts).map(() => statusColorMap[status] || getRandomColor());
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
                            // console.log("first round");
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
    }, [selectedFR, session?.user?.deployedlink, status])


    const SelectFR = (e) => {
        e.preventDefault();
        // console.log("e.target.value:", e.target.value);
        setSelectedFR(e.target.value);
        // console.log("selected FR:", selectedFR);
        // fetchSheetData();
    };

    const handleSelectChange = (selectedValue) => {
        // e.preventDefault();
        // console.log("e.target.value:", selectedValue);
        setSelectedFR(selectedValue);
        // console.log("selected FR:", selectedFR);
        // fetchSheetData();
    }


    const renderLineChart = () => {
        const data = {
            labels: Object.keys(cityData),
            datasets: [
                {
                    label: 'City Counts',
                    data: Object.values(cityData),
                    fill: true,
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
                    fill: true,
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
                    ticks: {
                        // Set the font size for y-axis ticks
                        fontSize: typeof window !== 'undefined' && window.innerWidth > 768 ? 14 : 10, // Adjust font size based on screen width
                    },
                },
            },

        };

        return <Line data={data} options={options} />;
    };

    const barColors = ["#ADD8E6"];

    const options = {
        plugins: {
            legend: {
                labels: {
                    // Set the font size for legend labels
                    fontSize: typeof window !== 'undefined' && window.innerWidth > 768 ? 14 : 10, // Adjust font size based on screen width
                },
            },
            title: {
                display: true,
                text: 'Chart Title',
                // Set the font size for the chart title
                fontSize: typeof window !== 'undefined' && window.innerWidth > 768 ? 18 : 14, // Adjust font size based on screen width
            },
        },
        // Other chart options...
    };


    const renderVerticalBarChart = () => {
        const data = {
            labels: Object.keys(industryData),
            datasets: [
                {
                    label: 'Industries Worked In',
                    data: Object.values(industryData),
                    backgroundColor: barColors, // Set the color for all bars to blue
                    borderWidth: 1,
                },
            ],
        };

        const options = {
            indexAxis: 'y', // Set the bar chart to be vertical
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        // Set the font size for y-axis ticks
                        fontSize: typeof window !== 'undefined' && window.innerWidth > 768 ? 14 : 3,
                    },
                },
                x: {
                    ticks: {
                        // Set the font size for x-axis ticks
                        fontSize: typeof window !== 'undefined' && window.innerWidth > 768 ? 14 : 3,
                    },
                },
            },
            plugins: {
                legend: {
                    labels: {
                        // Set the font size for legend labels
                        fontSize: typeof window !== 'undefined' && window.innerWidth > 768 ? 14 : 10,
                    },
                },
                title: {
                    display: true,
                    text: 'Industries Worked In',
                    // Set the font size for the chart title
                    fontSize: typeof window !== 'undefined' && window.innerWidth > 768 ? 18 : 14,
                },
            },
        };

        return <Bar data={data} options={options} />;
    };

    return (
        <div className="flex flex-col justify-center items-center w-full h-auto gap-4 py-8">

            <div className="flex w-full px-8 gap-4 justify-between  lg:flex-col-reverse  lg:justify-center lg:items-center lg:gap-2 lg:px-4 items-end">

                <div className="flex w-full px-8 gap-4 lg:justify-between lg:gap-2 lg:px-0">

                    <div className="tldropdown w-1/4 lg:w-1/2">

                        <label className="block text-white font-thin text-sm  mb-2 lg:text-[12px]">Select Teamleader:</label >
                        <select
                            className="block appearance-none w-full bg-white border border-gray-300 rounded py-2 px-4 leading-tight focus:outline-none focus:border-blue-500 lg:text-[12px]"
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
                        <div className="frdropdown w-1/4 lg:w-1/2">

                            {/* <label className="block text-white font-medium text-sm  mb-2 lg:text-[12px] lg:font-thin">Select Franchise:</label >
                            <select
                                className="block appearance-none w-full bg-white border border-gray-300 rounded py-2 px-4 leading-tight focus:outline-none focus:border-blue-500 lg:text-[12px]"
                                onChange={SelectFR}
                                value={selectedFR}
                            >
                                <option value="">Select Franchise</option>
                                {frs.map(fr => (
                                    <option key={fr._id} value={fr.username}>{fr.username}</option>
                                ))}
                            </select> */}

                            <label className="block text-white font-medium text-sm  mb-2 lg:text-[12px] lg:font-thin">Select Franchise:</label >
                            <Select
                                onValueChange={handleSelectChange}
                            >
                                <SelectTrigger className="w-[280px] lg:w-full h-[36px] lg:h-[32px] rounded border-none outline-none px-2 lg:p-0" placeholder="Select Franchise">
                                    <SelectValue placeholder="Select Franchise" />
                                </SelectTrigger>
                                <SelectContent className="h-[150px]">
                                    {frs.map((f) => (
                                        <SelectItem key={f._id} value={f.username} className="py-1">{f.username}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    }

                </div>

                {session?.user?.username &&
                    <div className="py-0 px-8 rounded bg-blue-500 gap-4 flex items-center h-[40px]">

                        <Link href={session?.user?.spreadsheet || ""} target="_blank" className="text-white font-semi-bold text-center whitespace-nowrap">
                            My Spreadsheet
                        </Link>
                        <FaExternalLinkAlt size={12} color='white' />
                    </div>
                }



            </div>

            {selectedFR ?
                <div className="flex flex-col justify-center items-center w-full h-auto gap-4 px-8 lg:px-4">

                    <div className="flex justify-between items-center w-full h-auto gap-4 lg:flex-col">
                        <div className="w-1/2 flex flex-col justify-center items-center h-auto p-8 bg-white rounded-xl lg:w-full"  >

                            <h2>Position Status Counts</h2>
                            {Object.keys(positionStatusData).length > 0 ?
                                <div className="piechart w-auto h-[90%]">
                                    <Doughnut data={chartData.positionStatus} options={options} />
                                </div> : <p>Loading...</p>}
                        </div>
                        <div className="w-1/2 h-full bg-white text-black p-4 text-center rounded-xl lg:w-full ">
                            <h2>Industries Worked In</h2>
                            {Object.keys(industryData).length > 0 ?
                                renderVerticalBarChart()
                                :
                                <p>Loading...</p>}
                        </div>

                    </div>

                    <div className="flex justify-between items-center w-full h-auto gap-4 lg:flex-col">
                        <div className="w-1/2 h-full bg-white text-black p-4 text-center rounded-xl lg:w-full lg:p-0">
                            <h2>Cities Worked In</h2>

                            {Object.keys(cityData).length > 0 ? renderLineChart() : <p>Loading...</p>}
                        </div>
                        <div className="w-1/2 h-full bg-white text-black p-4 text-center rounded-xl lg:w-full lg:p-0">
                            <h2>States Worked In</h2>
                            {Object.keys(stateData).length > 0 ? renderLineChartStates() : <p>Loading...</p>}
                        </div>
                    </div>

                </div>
                :
                <p className="text-white text-2xl text-center">Please select a teamleader and franchise to view their dashboard</p>
            }

        </div>
    )
}

export default DashboardADPage

