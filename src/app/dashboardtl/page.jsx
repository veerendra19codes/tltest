
"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, useContext } from "react";
import { getAllUsers } from "@/lib/actions";


import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import sendEmail from "@/lib/mailer";
import { useRouter } from "next/navigation";
import UserContext from "@/contexts/UserContext";

ChartJs.register(
    Tooltip, Title, ArcElement, Legend
);

const TLDashboardPage = () => {
    const router = useRouter();
    const { session, status } = useContext(UserContext);
    console.log("session in dashboardtl:", session)

    useEffect(() => {
        if (status === "loading") {
            return;
        } else if (session?.user?.role !== "tl") {
            router.back();
        }
    }, [session, router, status])


    const [allUsers, setAllUsers] = useState([]);
    const [franchiseUnderMe, setFranchiseUnderMe] = useState([]);
    const [franchiseSelected, setFranchiseSelected] = useState("");
    const [franchise, setFranchise] = useState({});
    const [revenuegained, setRevenuegained] = useState(0);
    const [revenuelost, setRevenuelost] = useState(0);


    useEffect(() => {
        const fetchUsers = async () => {
            const AllUsers = await getAllUsers();
            // console.log("Users:", Users);
            setAllUsers(AllUsers);
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        // console.log("users:", users);
        const FranchiseUnderMe = allUsers.filter((user) => user.teamleadername === session?.user?.username && user.role === "fr");
        setFranchiseUnderMe(FranchiseUnderMe);
        console.log("franchise:", franchise);
        // console.log("franchiseSelected:", franchiseSelected);
        if (franchiseSelected !== "") {
            const franchiseSelectedObj = franchiseUnderMe.filter((franchise) => franchise.username === franchiseSelected);
            console.log("franchiseSelectedObj:", franchiseSelectedObj);
            setFranchise(franchiseSelectedObj[0]);
            console.log("franchise:", franchise);
        }

    }, [allUsers, session?.user, franchiseSelected]);

    // Filter franchise data based on level
    const juniorFranchise = franchiseUnderMe.filter(franchise => franchise.level === 'junior');
    const midFranchise = franchiseUnderMe.filter(franchise => franchise.level === 'mid');
    const seniorFranchise = franchiseUnderMe.filter(franchise => franchise.level === 'senior');


    const handleInput = (e) => {
        console.log("selected:", e.target.value);
        setFranchiseSelected(e.target.value);
        console.log("franchiseSelected:", franchiseSelected);

    }



    // console.log("username:", username);
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
                // console.log('data: ', data);

                const statusCount = {
                    'In Progress': 0,
                    'Hold': 0,
                    'Cancel': 0,
                    'Closed': 0
                };
                // console.log("statusCount:", statusCount);

                const franchiseData = data.filter((d) => d.nameoffranchisee.replace(/\s/g, '').toLowerCase() === franchiseSelected.replace(/\s/g, '').toLowerCase());
                // console.log("franchiseData:", franchiseData);

                const statusEntry = franchiseData[0];
                // console.log("statusEntry:", statusEntry);

                statusCount['In Progress'] = statusEntry.inprogress;
                statusCount['Hold'] = statusEntry.hold;
                statusCount['Cancel'] = statusEntry.cancel;
                statusCount['Closed'] = statusEntry.closed;
                // console.log("statusCount:", statusCount);

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
    }, [franchiseSelected]);

    useEffect(() => {
        const fetchRevenue = async () => {
            try {
                const response = await fetch('https://script.google.com/macros/s/AKfycbwDqkTWyHHrubAriPFaiOZsMARt-0I6nLo-Uwa7tpmstSFona8LF6NP2wY2czSDWWoA/exec');


                const data = await response.json();
                console.log('data: ', data);

                // const statusCount = {
                //     'In Progress': 0,
                //     'Hold': 0,
                //     'Cancel': 0,
                //     'Closed': 0
                // };
                // console.log("statusCount:", statusCount);

                const franchiseData = data.filter((d) => d.nameoffranchisee.replace(/\s/g, '').toLowerCase() === franchiseSelected.replace(/\s/g, '').toLowerCase());
                console.log("franchiseData:", franchiseData);

                const statusEntry = franchiseData[0];
                console.log("statusEntry:", statusEntry);

                setRevenuegained(statusEntry.closed);
                setRevenuelost(statusEntry.cancel);

                // statusCount['In Progress'] = statusEntry.inprogress;
                // statusCount['Hold'] = statusEntry.hold;
                // statusCount['Cancel'] = statusEntry.cancel;
                // statusCount['Closed'] = statusEntry.closed;
                // console.log("statusCount:", statusCount);


                // // data.forEach(entry => {
                // //     const status = entry.status;
                // //     if (statusCount.hasOwnProperty(status)) {
                // //         statusCount[status]++;
                // //     }
                // // });

                // const statusData = Object.values(statusCount);
                // console.log("statusData:", statusData);


                // setChartData({
                //     datasets: [{
                //         data: statusData,
                //         backgroundColor: [
                //             'yellow',
                //             'blue',
                //             'red',
                //             'green',
                //         ]
                //     }],
                //     labels: ['In Progress', 'Hold', 'Cancel', 'Closed']
                // });
            } catch (error) {
                console.error("Error fetching revenue:", error);
            }
        };

        fetchRevenue();
    }, [franchiseSelected]);

    // const sendmail = () => {
    //     const emailOptions = {
    //         from: 'info@talentcornertaskmanager.com',
    //         to: "me",
    //         bcc: session?.user?.email,
    //         subject: "Test Email: This is a Test Message ✔",
    //         text: "This is a test email message to check the email sending functionality.",
    //         html: "<p>This is a <b>test email message</b> to check the email sending functionality.</p>",
    //     };
    //     sendEmail(emailOptions);
    // }

    return (
        <div className="w-full h-auto flex justify-center items-start p-12 gap-4 lg:px-4 lg:flex-col">

            <div className="flex flex-col w-1/2 gap-4 lg:w-full">

                <select
                    name="franchiseSelected"
                    value={franchiseSelected}
                    className="border-2 border-gray-400 w-[200px] py-2 pl-4 sm:py-1 lg:w-full lg:py-1 rounded"
                    style={{ maxHeight: '50px', overflowY: 'auto' }}
                    onChange={(e) => handleInput(e)}
                >

                    <option value="" disabled={true} className="py-1">Select franchise</option>
                    {franchiseUnderMe.map((f) => (
                        <option key={f._id} value={f.username} className="py-1">{f.username}</option>
                    ))}
                </select>

                <div className="userdetailstext flex flex-col justify-between  items-start w-full bg-white rounded px-4 py-2">
                    <div className="row flex justiy-start items-center w-full gap-4">
                        <label className="w-2/5 py-2 font-bold lg:py-0 lg:font-medium">Username</label>
                        <div className="w-3/5 py-2 lg:py-0 lg:font-normal overflow-x-auto">{franchise.username}</div>
                    </div>
                    <div className="row flex justiy-start items-center w-full gap-4">
                        <label className="w-2/5 py-2 font-bold lg:py-0 lg:font-medium">Email</label>
                        <div className="w-3/5 py-2 lg:py-0 lg:font-normal overflow-x-auto">{franchise.email}</div>
                    </div>
                    <div className="row flex justiy-start items-center w-full gap-4">
                        <label className="w-2/5 py-2 font-bold lg:py-0 lg:font-medium">Team Leader</label>
                        <div className="w-3/5 py-2 lg:py-0 lg:font-normal overflow-x-auto">{session?.user?.username}</div>
                    </div>
                    <div className="row flex justiy-start items-center w-full gap-4">
                        <label className="w-2/5 py-2 font-bold lg:py-0 lg:font-medium">Spreadsheet</label>
                        <a href={franchise.spreadsheet} className="text-blue-500 hover:underline cursor-pointer w-3/5">Click here</a>
                    </div>
                    <div className="row flex justiy-start items-center w-full gap-4">
                        <label className="w-2/5 py-2 font-bold lg:py-0 lg:font-medium">Preference</label>
                        <div className="w-3/5 py-2 lg:py-0 lg:font-normal overflow-x-auto">{franchise.preference}</div>
                    </div>
                </div>


                <div className="flex justify-center items-center bg-white rounded p-4 lg:flex-col lg:p-2 gap-4">
                    <div className="w-1/2 p-4 flex flex-col justify-between gap-4 h-full lg:w-full lg:flex-row lg:p-0 lg:gap-2">
                        <div className="franchiserevenue flex justify-center items-center flex-col gap-4 lg:flex-row lg:gap-2">
                            <div className="revenuegained flex flex-col justify-around items-center bg-green-500 rounded w-full py-4 px-8 lg:px-4 lg:py-2 h-full ">
                                <div className="title font-bold text-white text-center lg:font-medium lg:text-[8px]">Revenue Gained</div>
                                <div className="title font-bold text-white text-center lg:font-medium lg:text-xs">Rs.{revenuegained}</div>
                            </div>
                            <div className="revenuelost flex flex-col justify-around items-center bg-red-500 rounded w-full py-4 px-8 lg:px-4 lg:py-2 h-full">
                                <div className="title font-bold text-white text-center lg:font-medium lg:text-[8px]">Revenue Lost</div>
                                <div className="title font-bold text-white text-center lg:font-medium lg:text-xs">Rs.{revenuelost}</div>
                            </div>
                        </div>
                        <button className="alert bg-red-500 py-2 px-8 font-bold text-white text-xl rounded h-1/2 lg:py-1 lg:px-4 lg:font-medium lg:text-base">Alert</button>
                    </div>

                    <div className="size-[300px] ">
                        <Doughnut data={chartData} />
                    </div>
                </div>
            </div>

            <div className="w-1/2 flex flex-col gap-4 mt-[56px] justify-center items-center p-4 bg-white rounded lg:w-full lg:overflow-x-hidden lg:mt-0 lg:p-2 lg:gap-2">
                <div className="text-darkpurple font-bold">
                    Franchise under me
                </div>
                <div className="w-full overflow-x-auto whitespace-nowrap">
                    <table className="w-full h-full flex flex-col items-center justify-center   whitespace-nowrap lg:overflow-x-auto border-gray-400 border-[1px]">
                        <thead className="w-full">
                            <tr className="w-full">
                                <th className="border-2   w-1/3 whitespace-nowrap inline-block lg:w-[100px]">Junior</th>
                                <th className="border-2  w-1/3 whitespace-nowrap inline-block lg:w-[100px]">Mid</th>
                                <th className="border-2  w-1/3 whitespace-nowrap inline-block lg:w-[100px]">Senior</th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            {Array(Math.max(juniorFranchise.length, midFranchise.length, seniorFranchise.length)).fill().map((_, index) => (
                                <tr key={index} className="w-full">
                                    <td className="border-2  text-center w-1/3 whitespace-nowrap inline-block lg:w-[100px]">{juniorFranchise[index]?.username || ''}</td>
                                    <td className="border-2  text-center w-1/3 whitespace-nowrap inline-block lg:w-[100px]">{midFranchise[index]?.username || ''}</td>
                                    <td className="border-2  text-center w-1/3 whitespace-nowrap inline-block lg:w-[100px]">{seniorFranchise[index]?.username || ''}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    )
}

export default TLDashboardPage