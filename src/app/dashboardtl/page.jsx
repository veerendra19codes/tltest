// "use client";

// import { connectToDB } from "@/lib/connectToDB"
// import { authOptions } from "../api/auth/[...nextauth]/route";
// import { redirect } from "next/navigation";
// import { getAllUsers } from "@/lib/actions";
// import TLCharts from "@/Components/TLCharts/TLCharts";
// import { useSession } from "next-auth/react";

// //FETCHING DATA WITH API
// // const getUsers = async () => {
// //     // console.log("id insie getUser", id);
// //     const res = await fetch(`http://localhost:3000/api/user`);

// //     if (!res.ok) {
// //         console.log(res.json);
// //     }
// //     return res.json();
// // }

// const DashboardTLPage = () => {
//     const session = useSession();
//     console.log("session in dashboardtl:", session);

//     if (session === null) {
//         redirect("/login");
//     }

//     // const [franchise, setFranchise] = useState([]);

//     // useEffect(() => {
//     //     const fetchUsers = async () => {
//     //         const users = await getAllUsers();
//     //     }
//     //     const data = users.reverse().filter((data) => data.teamleader === session.user?.id);
//     //     setFranchise(data);
//     //     console.log(franchise);
//     //     fetchUsers();
//     // }, [])
//     // console.log("all users", users);

//     //franchiseUnderMe
//     // console.log(data);

//     return (
//         <div className="flex justify-center items-center flex-col">
//             hello

//             {/* <div className="table w-4/5 h-full mt-12 flex flex-col items-center justify-center gap-8">
//                 <div className="tablehead w-full flex flex-row mb-6" >
//                     <div className="w-1/5 py-2 text-center font-bold">Franchise under me</div>
//                     <div className="w-1/5 py-2 text-center font-bold">Franchise level</div>
//                     <div className="w-1/5 py-2  text-center font-bold">Companes working</div>
//                     <div className="w-1/5 py-2  text-center font-bold">Companies Completed</div>
//                     <div className="w-1/5 py-2 text-center font-bold">Companies Rejected</div>

//                 </div> */}

//             {/* franchiseUnderMe */}
//             {/* {data.map((d) => (
//                     <div key={d._id} className="border-[1px] border-gray-500 rounded-xl w-full flex flex-row mb-8 py-4">
//                         <div className="w-1/5 mx-2  flex justify-center items-center">{d.username}</div>
//                         <div className="w-1/5  text-center items-center flex justify-center h-auto mx-2">{d.level}</div>
//                         <div className={d.companiesWorkingName.length === 0 ? "w-1/5   items-center flex justify-center h-auto mx-2 bg-green-500 rounded-xl text-white" : "w-1/5  items-center flex justify-center h-auto mx-2"}>{d.companiesWorkingName.length === 0 ? "none" : d.companiesWorkingName}</div>
//                         <div className="w-1/5   items-center flex justify-center h-auto mx-2">{d.companiesCompletedName.length === 0 ? "none" : d.companiesCompletedName}</div>
//                         <div className="w-1/5  items-center flex justify-center h-auto mx-2">{d.companiesRejectedName.length === 0 ? " none" : d.companiesRejectedName}</div>
//                     </div>
//                 ))} */}
//             {/* </div> */}


//         </div>

//     )
// }

// export default DashboardTLPage




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

    useEffect(() => {
        if (status === "loading") {
            return;
        } else if (session.user?.role !== "tl") {
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
        const FranchiseUnderMe = allUsers.filter((user) => user.teamleader === session.data?.user?.id);
        setFranchiseUnderMe(FranchiseUnderMe);
        console.log("franchise:", franchise);
        // console.log("franchiseSelected:", franchiseSelected);
        if (franchiseSelected !== "") {
            const franchiseSelectedObj = franchiseUnderMe.filter((franchise) => franchise.username === franchiseSelected);
            console.log("franchiseSelectedObj:", franchiseSelectedObj);
            setFranchise(franchiseSelectedObj[0]);
            console.log("franchise:", franchise);
        }

    }, [allUsers, session.data?.user, franchiseSelected]);

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
    //         bcc: session.data?.user?.email,
    //         subject: "Test Email: This is a Test Message ✔",
    //         text: "This is a test email message to check the email sending functionality.",
    //         html: "<p>This is a <b>test email message</b> to check the email sending functionality.</p>",
    //     };
    //     sendEmail(emailOptions);
    // }

    return (
        <div className="w-full h-auto flex justify-center items-start p-12 gap-4">

            <div className="flex flex-col w-1/2 gap-4">

                <select
                    name="franchiseSelected"
                    value={franchiseSelected}
                    className="border-2 border-gray-400 w-[200px] py-2 pl-4 sm:py-1" onChange={(e) => handleInput(e)}
                >

                    <option value="" disabled={true} className="py-1">Select franchise</option>
                    {franchiseUnderMe.map((f) => (
                        <option key={f._id} value={f.username} className="py-1">{f.username}</option>
                    ))}
                </select>

                <div className="selectedFranchise w-full flex flex-col ">
                    <div className="userdetailstext flex flex-col justify-between  items-start w-full bg-white py-[28px] rounded-xl px-4">
                        <div className="row flex justiy-start items-center w-full gap-4">
                            <label className="w-2/5 py-2 font-bold">Username</label>
                            <div className="w-3/5 py-2">{franchise.username}</div>
                        </div>
                        <div className="row flex justiy-start items-center w-full gap-4">
                            <label className="w-2/5 py-2 font-bold">Email</label>
                            <div className="w-3/5 py-2">{franchise.email}</div>
                        </div>
                        <div className="row flex justiy-start items-center w-full gap-4">
                            <label className="w-2/5 py-2 font-bold">Team Leader</label>
                            <div className="w-3/5 py-2">{session.data?.user?.username}</div>
                        </div>
                        <div className="row flex justiy-start items-center w-full gap-4">
                            <label className="w-2/5 py-2 font-bold">Spreadsheet</label>
                            <a href={franchise.spreadsheet} className="text-blue-500 hover:underline cursor-pointer">Click here</a>
                        </div>
                    </div>
                </div>


                <div className="flex justify-center items-center bg-white rounded-xl p-4 ">
                    <div className="w-1/2 p-4 flex flex-col gap-4 h-full">
                        <button className="alert bg-red-500 py-2 px-8 font-bold text-white text-xl rounded-lg h-1/2">Alert</button>
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
                    </div>
                    <div className="size-[300px] ">
                        <Doughnut data={chartData} />
                    </div>
                </div>
            </div>

            <div className="w-1/2 flex flex-col gap-4 mt-[56px] justify-center items-center py-4  bg-white px-4 rounded-xl ">
                <div className="text-darkpurple font-bold">
                    Franchise under me
                </div>
                <table className="w-full h-auto">
                    <thead>
                        <tr>
                            <th className="border-[1px] border-black w-1/3 ">Junior</th>
                            <th className="border-[1px] border-black w-1/3">Mid</th>
                            <th className="border-[1px] border-black w-1/3">Senior</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array(Math.max(juniorFranchise.length, midFranchise.length, seniorFranchise.length)).fill().map((_, index) => (
                            <tr key={index}>
                                <td className="border-[1px] border-black text-center w-1/3">{juniorFranchise[index]?.username || ''}</td>
                                <td className="border-[1px] border-black text-center w-1/3">{midFranchise[index]?.username || ''}</td>
                                <td className="border-[1px] border-black text-center w-1/3">{seniorFranchise[index]?.username || ''}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>

    )
}

export default TLDashboardPage