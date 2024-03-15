import { connectToDB } from '@/lib/connectToDB'
import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getAllCompanies } from '@/lib/actions';
import { redirect } from 'next/navigation';

const getData = async () => {
    try {
        connectToDB();

        const res = await fetch("http://localhost:3000/api/company", { cache: 'no-store' });

        if (!res.ok) {
            return { error: "Error in getting companies" };
        }
        return res.json();
    }
    catch (err) {
        console.log("error in getting companies: ", err);
        return null;
    }
}

const DashboardBD = async () => {
    const session = await getServerSession(authOptions);
    // console.log("session in dashboardbd", session);
    // console.log("user details inside session:", session.user);
    if (!session) {
        redirect("/login")
    }

    const allCompanies = await getAllCompanies();
    // console.log("all Companies:", allCompanies);

    //companies listed by me
    const data = allCompanies.filter((data) => data.createdBy === session?.user?.id);
    // console.log("companies listed by me", data);

    const formatCreatedAtDate = (createdAt) => {
        const createdAtDate = new Date(createdAt);
        const formattedDate = createdAtDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).replace(/\//g, '-'); // Replace slashes with dashes

        return formattedDate;
    }

    const formatTime12hr = (timeString) =>
        new Date(timeString).toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });


    // const data = [
    //     {
    //         id: 1,
    //         companyname: "xyz ltd",
    //         jobdetails: "https://chromewebstore.google.com/detail/share-emails-via-secure-u/bceemhpgjlcpelcmnipjfinfnaangpfa",
    //         teamleader: "unassigned",
    //         franchise: "unassigned",
    //         status: "unassigned",
    //     },
    //     {
    //         id: 2,
    //         companyname: "abc ltd",
    //         jobdetails: "https://chromewebstore.google.com/detail/share-emails-via-secure-u/bceemhpgjlcpelcmnipjfinfnaangpfa",
    //         teamleader: "surbhi",
    //         franchise: "unassigned",
    //         status: "unassigned",
    //     },
    //     {
    //         id: 3,
    //         companyname: "pqr ltd",
    //         jobdetails: "https://chromewebstore.google.com/detail/share-emails-via-secure-u/bceemhpgjlcpelcmnipjfinfnaangpfa",
    //         teamleader: "jyothi",
    //         franchise: "ravi",
    //         status: "working",
    //     },
    //     {
    //         id: 4,
    //         companyname: "infosys ltd",
    //         jobdetails: "https://chromewebstore.google.com/detail/share-emails-via-secure-u/bceemhpgjlcpelcmnipjfinfnaangpfa",
    //         teamleader: "surbhi",
    //         franchise: "vikas",
    //         status: "working",
    //     },
    //     {
    //         id: 5,
    //         companyname: "wipro ltd",
    //         jobdetails: "https://chromewebstore.google.com/detail/share-emails-via-secure-u/bceemhpgjlcpelcmnipjfinfnaangpfa",
    //         teamleader: "jyothi",
    //         franchise: "hussain",
    //         status: "completed",
    //     },
    // ]

    // const list = [
    //     'aplpafa', 'avivrw', 'riuwuvri', 'vruwuricb', 'iwvbrivrirvir', 'iwriuvrwiuvvbvkw', 'wuvwivw'
    // ]

    return (
        <div className="flex justify-center items-center flex-col w-full overflow-x-hidden">
            {/* <div className="relative flex items-center  w-screen overflow-x-hidden">
                <div id="slider" className="w-full h-full overflow-x-auto  scroll whitespace-nowrap scroll-smooth gap-2 flex items-center">

                    {
                        list.map((item) => (
                            <div key={item} className="bg-black text-white py-1 px-2 rounded-full inline-block cursor-pointer">{item}</div>
                        ))
                    }
                </div>
            </div> */}
            <div className="lg:overflow-x-auto sm:w-full w-full flex justify-center whitespace-nowrap">
                <div className="table w-4/5 h-full mt-12 flex flex-col items-center justify-center gap-8 sm:mt-4 whitespace-nowrap">
                    <div className="flex w-full py-4 justify-center items-center whitespace-nowrap ">
                        <div className="w-1/5 py-2 text-center font-bold whitespace-nowrap sm:w-[200px] inline-block">Company</div>
                        <div className="w-1/5 py-2 text-center font-bold whitespace-nowrap sm:w-[200px] inline-block">Details</div>
                        <div className="w-1/5 py-2  text-center font-bold  whitespace-nowrap sm:w-[200px] inline-block">Team Leader</div>
                        <div className="w-1/5 py-2 text-center font-bold whitespace-nowrap sm:w-[200px] inline-block">Franchise</div>
                        <div className="w-1/5 py-2 text-center font-bold">Created At</div>
                    </div>

                    {/* companies listed by me */}
                    {data.reverse().map((d) => (
                        <div key={d._id} className="border-[1px] border-gray-500 rounded-lg w-full flex flex-row mb-8 py-4 whitespace-nowrap">
                            <div className="w-1/5 mx-2  pl-4 flex justify-center items-center whitespace-nowrap sm:w-[200px] inline-block">{d.companyname}</div>
                            <div className="w-1/5  mx-2 pl-4 flex justify-center items-center  text-blue-500 whitespace-nowrap sm:w-[200px] inline-block" ><a href={d.jobdetails} target="_blank" className="hover:underline">Click here</a></div>
                            <div className={d.teamleadername === "unassigned" ? " flex w-1/5 bg-red-700 text-white rounded-xl items-center justify-center h-auto mx-2 py-2 whitespace-nowrap sm:w-[200px] inline-block" : "w-1/5  pl-4 flex items-center flex justify-center h-auto mx-2 whitespace-nowrap sm:w-[200px] inline-block"}>{d.teamleadername}</div>
                            <div className={d.franchisename === "unassigned" ? " flex w-1/5 bg-red-700 text-white rounded-xl items-center justify-center h-auto mx-2 whitespace-nowrap sm:w-[200px] inline-block" : "w-1/5  pl-4 text-center items-center flex justify-center h-auto mx-2 whitespace-nowrap sm:w-[200px] inline-block"}>{d.franchisename}</div>
                            <div className="w-1/5 mx-2  pl-4 flex justify-center items-center whitespace-nowrap sm:w-[200px] inline-block">{formatCreatedAtDate(d.createdAt)}, {formatTime12hr(d.createdAt)} </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >

    )
}

export default DashboardBD
