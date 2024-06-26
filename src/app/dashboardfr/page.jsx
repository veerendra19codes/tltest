// import from "next/"
"use client";

import { getAllCompanies } from '@/lib/actions';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '../api/auth/[...nextauth]/route';
import { useRouter } from 'next/navigation';
// const FranchiseDashboardPage = (() => import('@/Components/FranchiseDashboard/FranchiseDashboard'))
// const PieChart = (() => import('@/Components/PieComponent/PieComponent'))
// const FranchiseRevenue = (() => import('@/Components/FranchiseRevenue/FranchiseRevenue'))

import FranchiseDashboardPage from "@/Components/FranchiseDashboard/FranchiseDashboard";
import PieChart from '@/Components/PieComponent/PieComponent';
import FranchiseRevenue from '@/Components/FranchiseRevenue/FranchiseRevenue';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const DashboardFRPage = () => {

    // const session = await getServerSession(authOptions);
    const { data: session, status } = useSession();
    // console.log("session in franchise page: ", session);
    const [data, setData] = useState([]);

    const router = useRouter();

    if (!session) {
        return (
            <div className="text-white">Loading... Please wait</div>
        )
    }

    useEffect(() => {
        const fetchData = async () => {
            try {

                const allCompanies = await getAllCompanies();
                // console.log(allCompanies);

                const companies = allCompanies.filter((company) => company.franchisename === session?.user?.username && company.status === "in progress");
                setData(companies);
            }
            catch (err) {
                console.log("error in getting my companies:", err);
            }

        }

        if (session?.user?.role !== 'fr') {
            router.back();
        }
        else {
            fetchData();
        }
    }, [])

    // const fetchData = async () => {
    //     try {

    //         const allCompanies = await getAllCompanies();
    //         // console.log(allCompanies);

    //         const companies = allCompanies.filter((company) => company.franchisename === session?.user?.username && company.status === "in progress");
    //         setData(companies);
    //     }
    //     catch (err) {
    //         console.log("error in getting my companies:", err);
    //     }

    // }
    // // console.log(data);

    // useEffect(() => {
    //     fetchData();
    // }, [])
    return (
        <div className="flex flex-col justify-center items-center w-full py-12 lg:py-4 gap-4">

            <div className="top flex  justify-center items-center w-full px-12 gap-4  overflow-hidden lg:flex-col lg:px-4">



                <div className="w-1/2 lg:w-full h-[450px] lg:h-auto bg-white userdetailstext flex flex-col justify-between  items-center rounded p-4">

                    <div className="row flex justiy-start items-center w-full gap-4 lg:text-xs">
                        <label className="w-2/5 py-2 font-bold">Username</label>
                        <div className="w-3/5 py-2 overflow-x-auto">{session?.user?.username}</div>
                    </div>

                    <div className="row flex justiy-start items-center w-full gap-4 lg:text-xs">
                        <label className="w-2/5 py-2 font-bold">Email</label>
                        <div className="w-3/5 py-2 overflow-x-auto">{session?.user?.email}</div>
                    </div>
                    <div className="row flex justiy-start items-center w-full gap-4 lg:text-xs">
                        <label className="w-2/5 py-2 font-bold">Team Leader</label>
                        <div className="w-3/5 py-2 overflow-x-auto">{session?.user?.teamleadername}</div>
                    </div>
                    <div className="row flex justiy-start items-center w-full gap-4 lg:text-xs">
                        <label className="w-2/5 py-2 font-bold">Spreadsheet</label>
                        <a href={session?.user?.spreadsheet} className="text-blue-500 hover:underline cursor-pointer    w-3/5">Click here</a>
                    </div>
                    <div className="row flex justiy-start items-center w-full gap-4 lg:text-xs">
                        <label className="w-2/5 py-2 font-bold">Companies Accepted</label>
                        <div className="w-3/5 py-2">{session?.user?.companiesAccepted.length}</div>
                    </div>
                    <div className="row flex justiy-start items-center w-full gap-4 lg:text-xs">
                        <label className="w-2/5 py-2 font-bold">Companies Rejected</label>
                        <div className="w-3/5 py-2">{session?.user?.companiesRejected.length}</div>
                    </div>
                    <div className="row flex justiy-start items-center w-full gap-4 lg:text-xs">
                        <label className="w-2/5 py-2 font-bold">Reminders</label>
                        <div className="w-3/5 py-2">{session?.user?.reminders}</div>
                    </div>

                    <FranchiseRevenue username={session?.user?.username} teamleadername={session?.user?.teamleadername} />
                </div>

                <div className="w-1/2 flex justify-center items-center h-[450px] lg:h-auto bg-white py-4 rounded lg:w-full">
                    <PieChart username={session?.user?.username} teamleadername={session?.user?.teamleadername} />
                </div>
            </div>


            <FranchiseDashboardPage data={data} />


        </div>
    )
}

export default DashboardFRPage
