"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useContext } from "react";
import { getAllUsers } from "@/lib/actions";

import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';

const Doughnut = dynamic(() => import("react-chartjs-2").then(module => module.Doughnut));
// import { Doughnut } from 'react-chartjs-2';

import { useRouter } from "next/navigation";
import UserContext from "@/contexts/UserContext";
// import { sendEmail } from "@/lib/mailer";

ChartJs.register(
    Tooltip, Title, ArcElement, Legend
);

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
//     AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"


// import { ToastContainer, toast } from 'react-toastify';
const ToastContainer = dynamic(() => import("react-toastify").then(module => module.ToastContainer));
const toast = dynamic(() => import("react-toastify").then(module => module.toast));

import 'react-toastify/dist/ReactToastify.css';
// import { revalidatePath } from "next/cache";


const TLDashboardPage = () => {
    const router = useRouter();
    const { session, status } = useContext(UserContext);
    // console.log("session in dashboardtl:", session)
    if (status === "loading") {
        return (
            <div className="text-white">Loading...</div>
        )
    }

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
        // console.log("franchise:", franchise);

        // console.log("franchiseSelected:", franchiseSelected);
        if (franchiseSelected !== "") {
            const franchiseSelectedObj = franchiseUnderMe.filter((franchise) => franchise.username === franchiseSelected);
            // console.log("franchiseSelectedObj:", franchiseSelectedObj);
            setFranchise(franchiseSelectedObj[0]);
            // console.log("franchise:", franchise);
        }

    }, [allUsers, session?.user, franchiseSelected]);

    // Filter franchise data based on level
    const juniorFranchise = franchiseUnderMe.filter(franchise => franchise.level === 'junior');
    const midFranchise = franchiseUnderMe.filter(franchise => franchise.level === 'mid');
    const seniorFranchise = franchiseUnderMe.filter(franchise => franchise.level === 'senior');

    //xdefault select tag
    // const handleInput = (e) => {
    //     // console.log("selected:", e.target.value);
    //     setFranchiseSelected(e.target.value);
    //     // console.log("franchiseSelected:", franchiseSelected);
    // }

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
            if (session?.user) {
                try {
                    const response = await fetch(session.user?.deployedlink);


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
                    //error handling in case of no url, no values for graph
                    const statusCount = {
                        'In Progress': 0,
                        'Hold': 0,
                        'Cancel': 0,
                        'Closed': 0
                    };

                    const statusData = Object.values(statusCount);

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
                    // console.error("Error fetching data:", error);
                }
            }
        };

        fetchData();
    }, [franchiseSelected, session, router, status]);

    useEffect(() => {
        // console.log("franchiseSelected state changed")
        const fetchRevenue = async () => {
            try {
                const response = await fetch(session?.user?.revenueapi);

                const data = await response.json();
                // console.log('data: ', data);

                const franchiseData = data.filter((d) => d.nameoffranchisee.replace(/\s/g, '').toLowerCase() === franchiseSelected.replace(/\s/g, '').toLowerCase());
                // console.log("franchiseData:", franchiseData);

                const statusEntry = franchiseData[0];
                // console.log("statusEntry:", statusEntry);

                //error handling for no url
                const rg = statusEntry.closed || 0;
                const rl = statusEntry.cancel || 0;

                setRevenuegained(rg);
                setRevenuelost(rl);
            } catch (error) {
                console.error("Error fetching revenue:", error);
            }
        };

        fetchRevenue();
    }, [franchiseSelected]);

    const handleAlert = async () => {
        const franchisearr = franchiseUnderMe.filter((franchise) => franchise.username === franchiseSelected);
        // console.log("franchiseobj:", franchisearr);
        const franchiseobj = franchisearr[0];
        const email = franchiseobj.email;

        const emails = [];
        emails.push(email);
        // console.log("emails in handleAlert fn in frontend", emails);

        try {
            const res = await fetch("/api/sendEmail", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ emails })
            });
            console.log("res in frontend:", res);
            if (res.ok) {
                console.log("mail sent successfully");
                // router.refresh("dashboardtl")
                revalidatePath("/dashboardtl")
                revalidatePath("/dashboardfr")
                revalidatePath("/dashbaordsh")

                toast.success('Mail sent successfully', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });



                //update reminder count
                try {

                    const res = fetch(`api/user/${franchiseobj._id}`, {
                        method: 'PUT',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ message: "update reminder count" })
                    })
                    if (!res.ok) {
                        // console.log("error in updating reminder count");
                    }
                    // console.log("successfully sent email")
                }
                catch (err) {
                    // console.log("error in updating count")
                }
            }
            else {
                // console.log("error in sending email:", res.json);
                toast.error('Try again later', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
        catch (err) {
            toast.error('Try again later', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            // console.log("error in sending email in frontend:", err);
        }
    }

    const handleSelectChange = (selectedValue) => {
        // console.log("Selected value:", selectedValue);
        setFranchiseSelected(selectedValue);
    };

    return (
        <div className="w-full h-auto flex justify-center items-start p-12 gap-4 lg:px-4 lg:flex-col">

            <div className="flex flex-col w-1/2 gap-4 lg:w-full">
                <Select
                    onValueChange={handleSelectChange}
                >
                    <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Select Franchise" />
                    </SelectTrigger>
                    <SelectContent className="h-[150px]">
                        {franchiseUnderMe.reverse().map((f) => (
                            <SelectItem key={f._id} value={f.username} className="py-1">{f.username}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>


                <div className="userdetailstext flex flex-col justify-between  items-start w-full bg-white rounded px-4 py-2">
                    <div className="row flex justiy-start items-center w-full gap-4">
                        <label className="w-2/5 py-2 font-bold lg:py-0 lg:font-medium">Username</label>
                        <div className="w-3/5 py-2 lg:py-0 lg:font-normal overflow-x-auto">{franchise?.username || "select a franchise"}</div>
                    </div>
                    <div className="row flex justiy-start items-center w-full gap-4">
                        <label className="w-2/5 py-2 font-bold lg:py-0 lg:font-medium">Email</label>
                        <div className="w-3/5 py-2 lg:py-0 lg:font-normal overflow-x-auto">{franchise?.email || "select a franchise"}</div>
                    </div>
                    <div className="row flex justiy-start items-center w-full gap-4">
                        <label className="w-2/5 py-2 font-bold lg:py-0 lg:font-medium">Team Leader</label>
                        <div className="w-3/5 py-2 lg:py-0 lg:font-normal overflow-x-auto">{session?.user?.username || "loading..."}</div>
                    </div>
                    <div className="row flex justiy-start items-center w-full gap-4">
                        <label className="w-2/5 py-2 font-bold lg:py-0 lg:font-medium">Spreadsheet</label>
                        <a href={franchise?.spreadsheet} className="text-blue-500 hover:underline cursor-pointer w-3/5">Click here</a>
                    </div>
                    <div className="row flex justiy-start items-center w-full gap-4">
                        <label className="w-2/5 py-2 font-bold lg:py-0 lg:font-medium">Companies Accepted</label>
                        <div className="w-3/5 py-2 lg:py-0 lg:font-normal overflow-x-auto">{franchise?.companiesAccepted?.length === 0 ? 0 : franchise?.companiesAccepted?.length}</div>
                    </div>
                    <div className="row flex justiy-start items-center w-full gap-4">
                        <label className="w-2/5 py-2 font-bold lg:py-0 lg:font-medium">Companies Rejected</label>
                        <div className="w-3/5 py-2 lg:py-0 lg:font-normal overflow-x-auto">{franchise?.companiesRejected?.length === 0 ? 0 : franchise?.companiesRejected?.length}</div>
                    </div>
                    <div className="row flex justiy-start items-center w-full gap-4">
                        <label className="w-2/5 py-2 font-bold lg:py-0 lg:font-medium">Reminders</label>
                        <div className="w-3/5 py-2 lg:py-0 lg:font-normal overflow-x-auto">{franchise?.reminders || "select a franchise"}</div>
                    </div>
                    <div className="row flex justiy-start items-center w-full gap-4">
                        <label className="w-2/5 py-2 font-bold lg:py-0 lg:font-medium">Preference</label>
                        <div className="w-3/5 py-2 lg:py-0 lg:font-normal overflow-x-auto">{franchise?.preference || "select a franchise"}</div>
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
                        <button
                            className="alert bg-red-500 py-2 px-8 font-bold text-white text-xl rounded h-1/2 lg:py-1 lg:px-4 lg:font-medium lg:text-base active:bg-red-300 hover:bg-red-300"
                            onClick={handleAlert}>Alert</button>
                        <ToastContainer />

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

                <div className="Table w-full h-full flex flex-col justify-center items-center whitespace-nowrap lg:overflow-x-auto bg-white border-gray-400 border-[1px] ">
                    <div className="w-full">
                        <div className="w-1/3 py-2 border-[1px] border-gray-300 text-center font-bold whitespace-nowrap inline-block lg:w-[200px] lg:py-1 ">Junior</div>
                        <div className="w-1/3 py-2 border-[1px] border-gray-300 text-center font-bold whitespace-nowrap inline-block lg:w-[200px] lg:py-1 ">Mid</div>
                        <div className="w-1/3 py-2 border-[1px] border-gray-300 text-center font-bold whitespace-nowrap inline-block lg:w-[200px] lg:py-1 ">Senior</div>
                    </div>

                    <div className="w-full gap-0">
                        {Array(Math.max(juniorFranchise.length, midFranchise.length, seniorFranchise.length)).fill().map((_, index) => (
                            <div key={index} className="w-full">
                                <div className="w-1/3 py-2 border-[1px] border-gray-300 text-center  whitespace-nowrap
                                inline-block lg:w-[200px] lg:py-1">{juniorFranchise[index]?.username || '-'}</div>
                                <div className="w-1/3 py-2 border-[1px] border-gray-300 text-center  whitespace-nowrap
                                inline-block lg:w-[200px] lg:py-1">{midFranchise[index]?.username || ''}</div>
                                <div className="w-1/3 py-2 border-[1px] border-gray-300 text-center  whitespace-nowrap
                                inline-block lg:w-[200px] lg:py-1">{seniorFranchise[index]?.username || '-'}</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div >

    )
}


export default TLDashboardPage
