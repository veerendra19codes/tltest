// "use client";

// import { useSession } from 'next-auth/react';
import Image from 'next/image'
import models from "@/lib/models";
// const User = models.User;
import { connectToDB } from '@/lib/connectToDB';
// import { useState, useEffect } from "react";
// import { useFormState } from "react-dom";
import { getTeamleader } from '@/lib/actions';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

//FETCHING DATA WITH API
const getUser = async (id) => {
    // console.log("id insie getUser", id);
    const res = await fetch(`http://localhost:3000/api/user/${id}`);

    if (!res.ok) {
        console.log(res.json);
    }
    return res.json();
}

const DashboardFRPage = async () => {
    // const [teamLeaderDetails, setTeamLeaderDetails] = useState({ username: "teamleader" });
    // const session = useSession();
    const session = await getServerSession(authOptions);
    if (session === null) {
        redirect("/login")
    }
    console.log("session in franchise page: ", session);
    const teamleaderId = await session.user?.teamleader;
    // console.log("teamleader id of this user/franchise : ", teamleaderId);


    const teamleader = await getUser(teamleaderId);
    // console.log("user found:", user);


    // useEffect(() => {
    //     const fetchTeamLeaderDetails = async () => {
    //         try {
    //             if (teamleaderId) {
    //                 connectToDB();

    //                 const teamleader = await models.User.findOne({ _id: teamleaderId });

    //                 if (!teamleader) {
    //                     setTeamLeaderDetails({ username: "teamleader" })
    //                 }
    //                 console.log(teamleader);
    //                 setTeamLeaderDetails(teamleader.data);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching team leader details:', error);
    //         }
    //     };
    //     if (teamleaderId) fetchTeamLeaderDetails();
    // }, [teamleaderId]);

    const data = [
        {
            id: 1,
            company: "xyz",
            details: "https://chromewebstore.google.com/detail/share-emails-via-secure-u/bceemhpgjlcpelcmnipjfinfnaangpfa",
            status: "not decided",
        },
        {
            id: 2,
            company: "abc",
            details: "https://chromewebstore.google.com/detail/share-emails-via-secure-u/bceemhpgjlcpelcmnipjfinfnaangpfa",
            status: "working",
        },
        {
            id: 3,
            company: "pqr",
            details: "https://chromewebstore.google.com/detail/share-emails-via-secure-u/bceemhpgjlcpelcmnipjfinfnaangpfa",
            status: "completed",
        },
    ]

    // const statusInterested = (id) => {
    //     console.log(id);
    //     data.map((d) => {
    //         if (d.id == id) {
    //             d.status = "working";
    //         }
    //     });
    // }

    // const statusNotInterested = (id) => {
    //     data.map((d) => {
    //         if (d.id == id) {
    //             d.status = "rejected";
    //         }
    //     });
    // }

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div className="top userdetails flex justify-start  items-center w-4/5 mt-12  gap-12">
                <div className="profile picture size-48 rounded-full relative">
                    <Image src="/profile.jpg" priority="true" className="rounded-full" alt="profilepicture" width={200} height={200} />
                </div>
                <div className="userdetailstext flex flex-col justify-between  items-start w-full py-4">
                    <div className="row flex justiy-start items-center w-full">
                        <label className="w-1/5 py-2">Username</label>
                        <div className="w-4/5 py-2">{session.user?.username}</div>
                    </div>
                    <div className="row flex justiy-start items-center w-full">
                        <label className="w-1/5 py-2">Email</label>
                        <div className="w-4/5 py-2">{session.user?.email}</div>
                    </div>
                    <div className="row flex justiy-start items-center w-full">
                        <label className="w-1/5 py-2">My Team Leader</label>
                        {/* <form action={formAction}>
                            <input type="hidden" name="teamleader" value={teamleaderId} />
                        </form> */}
                        <div className="w-4/5 py-2">{teamleader.username}</div>
                    </div>
                </div>
            </div>

            <div className="table w-4/5 h-full mt-12 flex flex-col items-center justify-center gap-8">
                <div className="tablehead w-full flex flex-row mb-6" >
                    <div className="w-1/3 py-2 pl-4 text-center font-bold">Company</div>
                    <div className="w-1/3 py-2 pl-4 text-center font-bold">Details</div>
                    <div className="w-1/3 py-2 pl-4 text-center font-bold">Status</div>
                </div>

                {data.map((d) => (
                    <div key={d.id} className="border-[1px] border-gray-500 rounded-xl w-full flex flex-row mb-8 py-4">
                        <div className="w-1/3 mx-2  pl-4 flex justify-center items-center">{d.company}</div>
                        <div className="w-1/3  mx-2 pl-4 text-center text-blue-500" ><a href={d.details} target="_blank" className="hover:underline">Click here</a></div>
                        {d.status === "not decided" ? (
                            <div className="buttons flex flex-row w-1/3 gap-4 mx-2">
                                <button className="w-1/2 bg-green-600 rounded-xl py-2 text-white">
                                    {/* onClick={() => statusInterested(d.id)} */}
                                    Interested
                                </button>
                                <button className="w-1/2 bg-red-600 rounded-xl py-2 text-white">
                                    {/* onClick={() => statusNotInterested(d.id)}  */}
                                    Not Interested
                                </button>
                            </div>
                        ) : (

                            <div className="w-1/3  pl-4 text-center items-center flex justify-center h-auto mx-2">{d.status}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DashboardFRPage
