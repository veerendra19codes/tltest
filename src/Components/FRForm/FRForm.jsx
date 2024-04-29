'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSession } from "next-auth/react";
import { CgProfile } from "react-icons/cg";
import { MdLockOutline } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";
import { LuFileSpreadsheet } from "react-icons/lu";
import { BsGraphUpArrow } from "react-icons/bs";
import { GrUserExpert } from "react-icons/gr";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { getAllUsers } from '@/lib/actions';


const FRForm = ({ userdetails, method }) => {
    console.log("userdetails in frform:", userdetails);
    // console.log("method in frform:", method);
    const router = useRouter();
    const session = useSession();

    const [info, setInfo] = useState({
        username: userdetails.username || "",
        email: userdetails.email || "",
        password: userdetails.password || "",
        role: userdetails.role || "",
        teamleadername: userdetails.teamleadername || "",
        spreadsheet: userdetails.spreadsheet || "",
        level: userdetails.level || "",
        preference: userdetails.preference || "",
        companiesCompleted: userdetails.companiesCompleted || "",
        companiesRejected: userdetails.companiesRejected || "",
        companiesWorking: userdetails.companiesWorking || "",
        companiesCompletedName: userdetails.companiesCompletedName || "",
        companiesRejectedName: userdetails.companiesRejectedName || "",
        companiesWorkingName: userdetails.companiesWorkingName || "",
        deployedlink: userdetails.deployedlink || "",
        revenueapi: userdetails.revenueapi || "",
    });
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);

    const handleInput = (e) => {
        setInfo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
            role: "fr",
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("info:", info);

        const { username, email, password, teamleadername, spreadsheet, level, preference } = info;


        if (!username || !email || !password || !teamleadername || !spreadsheet || !level || !preference) {
            setError("Must provide all credentials");
        } else {
            try {
                setPending(true);


                if (method === "put") {
                    const res = await fetch("api/register", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(info),
                    });
                    if (res.ok) {
                        setPending(false);
                        const form = e.target;
                        form.reset();
                        console.log("User registered successfully");
                        toast.success('Franchise updated successfully', {
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
                    else {
                        setPending(false);
                        const errorData = await res.json();
                        setError(errorData.message);
                    }
                }
                else {
                    const res = await fetch("api/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(info),
                    });
                    if (res.ok) {
                        toast.success('Franchise added successfully', {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        setPending(false);
                        const form = e.target;
                        form.reset();
                        console.log("User registered successfully");
                    }
                    else {
                        setPending(false);
                        const errorData = await res.json();
                        setError(errorData.message);
                    }
                }
            } catch (err) {
                setPending(false);
                console.log("Error while registering new Franhise in page.jsx:", err);
                setError("Error in Registering Franchise");
            }
        }
    }

    return (
        <div className="FRFORM h-auto w-full overflow-hidden flex justify-center items-center  sm:mt-2">
            <div className="w-[500px] m-auto p-12 border-gray-400 border-[1px] rounded-lg flex flex-col justify-center items-center bg-white gap-4 sm:w-full sm:py-4 sm:px-4 sm:m-0 sm:gap-0 ">

                <h1 className="text-4xl font-bold sm:text-3xl text-lightpurple">
                    {method === "put" ? "Edit Franchise" : "Add Franchise"}
                </h1>
                <p className="text-gray-600 text-lg sm:text-xs">
                    {method == "put" ? "Note: Username cannot be edited" : "Enter details below"}
                </p>

                <form className="w-full flex flex-col justify-center items-center gap-4 sm:my-4 sm:gap-2" onSubmit={handleSubmit}>

                    <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg lg:py-1 lg:gap-0 ">
                        {method == "put" ? <h1 className="lg:text-[10px] text-gray-700">Username:</h1> : <CgProfile className="size-8 lg:size-6" color='purple' />}
                        <input type="text" name="username" placeholder="Username" className="p-2 pl-4 rounded w-full sm:py-1 border-none outline-none text-black " onChange={handleInput} value={info.username} disabled={method === "put"} />
                    </div>

                    <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg lg:py-1 lg:gap-0 ">
                        {method == "put" ? <h1 className="lg:text-[10px] text-gray-700">Email:</h1> : <MdOutlineMailOutline className="size-8 lg:size-6" color='purple' />}
                        <input type="email" name="email" placeholder="example@gmail.com" className="p-2 pl-4 rounded w-full sm:py-1 border-none outline-none text-black " onChange={handleInput} value={info.email} />
                    </div>

                    <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg lg:py-1 lg:gap-0 ">
                        {method == "put" ? <h1 className="lg:text-[10px] text-gray-700">Password:</h1> : <MdLockOutline className="size-8 lg:size-6" color='purple' />}
                        <input type="text" name="password" placeholder="Password" className="p-2 pl-4 rounded w-full sm:py-1 border-none outline-none text-black " onChange={handleInput} value={info.password} />
                    </div>

                    <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg lg:py-1 lg:gap-0 ">
                        {method == "put" ? <h1 className="lg:text-[10px] text-gray-700">Teamleadername:</h1> : <RiTeamLine className="size-8 lg:size-6" color='purple' />}
                        <input type="text" name="teamleadername" placeholder="Teamleader name" className="p-2 pl-4 rounded w-full sm:py-1 border-none outline-none text-black " onChange={handleInput} value={info.teamleadername} />
                    </div>

                    <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg lg:py-1 lg:gap-0 ">
                        {method == "put" ? <h1 className="lg:text-[10px] text-gray-700">Spreadsheet:</h1> : <LuFileSpreadsheet className="size-8 lg:size-6" color='purple' />}
                        <input type="text" name="spreadsheet" placeholder="Spreadsheet Link" className="p-2 pl-4 rounded w-full sm:py-1 border-none outline-none text-black" onChange={handleInput} value={info.spreadsheet} />
                    </div>

                    <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg lg:py-1 lg:gap-0 ">
                        <BsGraphUpArrow className="size-8 lg:size-6" color='purple' />
                        <select name="level" className="p-2 pl-4 rounded w-full sm:py-1 border-none outline-none text-black" onChange={handleInput}>
                            <option value="">Select Franchise Level</option>
                            <option value="junior">Junior</option>
                            <option value="mid">Mid</option>
                            <option value="senior">Senior</option>
                        </select>
                    </div>


                    <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg lg:py-1 lg:gap-0">
                        {method == "put" ? <h1 className="lg:text-[10px] text-gray-700">Preference:</h1> : <GrUserExpert className="size-8 lg:size-6" color='purple' />}
                        <input type="text" name="preference" placeholder="Preference ex-any" className="p-2 pl-4 rounded w-full sm:py-1 border-none outline-none text-black " onChange={handleInput} value={info.preference} />
                    </div>

                    {error && <span className="text-red-500 font-semibold">{error}</span>}

                    {method == "put" ? <button className="w-auto rounded-xl py-4  px-8 text-2xl lg:text-xl text-white mt-2 bg-purple hover:bg-lightpurple lg:py-2 lg:px-4" disabled={pending}>{pending ? "Updating" : "Update Franchise"}</button> : <button className="w-auto rounded-xl py-4  px-8 text-2xl lg:text-xl text-white mt-2 bg-purple hover:bg-lightpurple lg:py-2 lg:px-4" disabled={pending}>{pending ? "Adding" : "Add Franchise"}</button>}

                    <ToastContainer />

                </form>
            </div>
        </div>
    );
}

export default FRForm;