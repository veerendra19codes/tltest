'use client'

import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic
import { useState } from 'react';

const DynamicCgProfile = dynamic(() => import("react-icons/cg").then(module => module.CgProfile));
const DynamicMdLockOutline = dynamic(() => import("react-icons/md").then(module => module.MdLockOutline));
const DynamicMdOutlineMailOutline = dynamic(() => import("react-icons/md").then(module => module.MdOutlineMailOutline));
// const ToastContainer = dynamic(() => import("react-toastify").then(module => module.ToastContainer));
// const toast = dynamic(() => import("react-toastify").then(module => module.toast));

// import { CgProfile } from "react-icons/cg";
// import { MdLockOutline } from "react-icons/md";
// import { MdOutlineMailOutline } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const SHForm = ({ method, userdetails, setSelectedRole, selectedRole, setShs }) => {
    // console.log("method in shform:", method);
    // console.log("selectedRole", selectedRole);
    // console.log("userdetails in shform:", userdetails);


    const [info, setInfo] = useState({
        username: userdetails.username,
        email: userdetails.email,
        password: userdetails.password,
        role: "sh",
        teamleadername: userdetails.teamleadername,
        spreadsheet: userdetails.spreadsheet,
        level: userdetails.level,
        preference: userdetails.preference,
        companiesCompleted: userdetails.companiesCompleted,
        companiesRejected: userdetails.companiesRejected,
        companiesWorking: userdetails.companiesWorking,
        companiesAccepted: userdetails.companiesAccepted,
        companiesCompletedName: userdetails.companiesCompletedName,
        companiesRejectedName: userdetails.companiesRejectedName,
        companiesWorkingName: userdetails.companiesWorkingName,
        companiesAcceptedName: userdetails.companiesAcceptedName,
        deployedlink: userdetails.deployedlink,
        revenueapi: userdetails.revenueapi,
        reminders: userdetails.reminders || 0,

    });
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);

    const handleInput = (e) => {
        // console.log("changing");
        setInfo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
            role: "sh",
            level: "junior",
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();


        // console.log({ info });
        if (!info.username || !info.email || !info.password) {
            setError("Must provide all credentials");
        }
        else {
            try {
                setPending(true);

                //updating existing sh
                if (method === "put") {
                    // console.log("info to be updated:", info);
                    const res = await fetch("api/register", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(info),
                    });
                    if (res.ok) {
                        setPending(false);

                        //set userdetails to default values
                        setInfo({
                            username: "",
                            password: "",
                            email: "",
                            role: "",
                            level: "",
                            teamleadername: "",
                            companiesCompleted: [],
                            companiesRejected: [],
                            companiesWorking: [],
                            companiesAccepted: [],
                            companiesCompletedName: [],
                            companiesRejectedName: [],
                            companiesWorkingName: [],
                            companiesAcceptedName: [],
                            spreadsheet: "",
                            deployedlink: "",
                            revenueapi: "",
                            preference: "",
                            reminders: 0,

                        });



                        toast.success('Super Head updated successfully', {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        // console.log("User registered successfully");
                        setSelectedRole("");
                        // console.log("selectedRole after updating:", selectedRole);
                    }
                    else {
                        setPending(false);
                        const errorData = await res.json();
                        setError(errorData.message);
                    }
                }

                //registering new sh
                else {
                    const res = await fetch("api/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(info),
                    });
                    if (res.status === 201) {
                        setPending(false);


                        //set userdetails to default values
                        setInfo({
                            username: "",
                            password: "",
                            email: "",
                            role: "",
                            level: "",
                            teamleadername: "",
                            companiesCompleted: [],
                            companiesRejected: [],
                            companiesWorking: [],
                            companiesAccepted: [],
                            companiesCompletedName: [],
                            companiesRejectedName: [],
                            companiesWorkingName: [],
                            companiesAcceptedName: [],
                            spreadsheet: "",
                            deployedlink: "",
                            revenueapi: "",
                            preference: "",
                            reminders: 0,

                        });

                        toast.success('SH added successfully', {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        // console.log("User registered successfully");
                    }
                    else {
                        setPending(false);
                        const errorData = await res.json();
                        setError(errorData.message);
                    }
                }

            }
            catch (err) {
                setPending(false);
                // console.log("Error while registering new SH in page.jsx:", err);
                setError("Error in Registering SH");
            }
        }
    }



    const handleDeleteUser = async (e) => {
        e.preventDefault();

        try {
            setPending(true);
            const username = info.username;
            // console.log("username to delete:", username);

            const res = await fetch(`/api/register/${username}`, {
                method: "DELETE"
            })
            // const data = await res.json();
            // console.log("res:", res);
            if (res.status === 201) {
                setPending(false);

                //set userdetails to default values
                setInfo({
                    username: "",
                    password: "",
                    email: "",
                    role: "sh",
                    level: "",
                    teamleadername: "",
                    companiesCompleted: [],
                    companiesRejected: [],
                    companiesWorking: [],
                    companiesAccepted: [],
                    companiesCompletedName: [],
                    companiesRejectedName: [],
                    companiesWorkingName: [],
                    companiesAcceptedName: [],
                    spreadsheet: "",
                    deployedlink: "",
                    revenueapi: "",
                    preference: "",
                    reminders: 0,

                });


                toast.success('SH deleted successfully', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                // console.log("user deleted successfully");
                setSelectedRole("");
                // console.log("selectedRole after deleting:", selectedRole);
                setShs([])
            }
            else {
                setPending(false);
                const errorData = await res.json();
                setError(errorData.message);
            }
        }
        catch (err) {
            setPending(false);
            // console.log("Error while deleting SH in page.jsx:", err);
            setError("Error deleting SH");
        }
    }

    return (
        <div className="SHFORM h-auto w-full overflow-hidden flex justify-center items-center sm:mt-2">

            <div className="w-[500px] m-auto p-12 border-gray-400 border-[1px] rounded-lg flex flex-col justify-center items-center bg-white gap-4 sm:w-full sm:p-4 sm:m-0 sm:gap-0 ">


                <h1 className="text-4xl font-bold lg:text-3xl text-lightpurple">{method === "put" ? "Update SH" : "Add SH"}</h1>
                <p className="text-gray-600 text-lg sm:text-xs">{method === "put" ? "Note: Username cannot be edited" : "Enter details below"}</p>

                <form className="w-full flex flex-col justify-center items-center gap-4 sm:my-4 sm:gap-2" onSubmit={handleSubmit}>

                    <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg lg:py-1 lg:gap-0">
                        {method == "put" ? <h1 className="lg:text-[10px] text-gray-700">Username:</h1> : <DynamicCgProfile className="size-8 lg:size-6" color='purple' />}
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="p-2  pl-4  rounded-xl w-full sm:py-1 border-none outline-none text-black"
                            onChange={(e) => handleInput(e)}
                            value={info.username}
                            disabled={method === "put"}
                        />
                    </div>

                    <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg lg:py-1 lg:gap-0">
                        {method == "put" ? <h1 className="lg:text-[10px] text-gray-700">Email:</h1> : <DynamicMdOutlineMailOutline className="size-8 lg:size-6" color='purple' />}
                        <input
                            type="email"
                            name="email"
                            placeholder="example@gmail.com"
                            className="p-2  pl-4  rounded-xl w-full sm:py-1 border-none outline-none text-black"
                            onChange={(e) => handleInput(e)}
                            value={info.email}
                        />
                    </div>

                    <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg lg:py-1 lg:gap-0">
                        {method == "put" ? <h1 className="lg:text-[10px] text-gray-700">Password:</h1> : <DynamicMdLockOutline className="size-8 lg:size-6" color='purple' />}
                        <input
                            type="text"
                            name="password"
                            placeholder="Password"
                            className="p-2  pl-4 rounded-xl w-full sm:py-1 border-none outline-none text-black"
                            onChange={(e) => handleInput(e)}
                            value={info.password}
                        />
                    </div>

                    {error && <span className="text-red-500 font-medium">{error}</span>}

                    {method === "put" ?
                        <div className="flex justify-center items-center gap-4">
                            <button
                                type="submit" className="w-auto rounded-xl py-4 px-8 text-2xl lg:text-xl text-white bg-purple hover:bg-lightpurple lg:py-2 lg:px-4 mt-2" disabled={pending ? true : false}>
                                {/* {pending ? "Updating" : "Update"} */}
                                Update
                            </button>

                            <button
                                onClick={handleDeleteUser}
                                className="w-auto rounded-xl py-4 px-8 text-2xl lg:text-xl text-white bg-purple hover:bg-lightpurple lg:py-2 lg:px-4 mt-2" disabled={pending ? true : false}>
                                {/* {pending ? "Deleting" : "Delete"} */}
                                Delete
                            </button>
                        </div>
                        :
                        <button
                            type="submit"
                            className="w-auto rounded-xl py-4 px-8 text-2xl lg:text-xl text-white bg-purple hover:bg-lightpurple lg:py-2 lg:px-4 mt-2" disabled={pending ? true : false}>
                            {/* {pending ? "Adding User" : "Add User"} */}
                            Add
                        </button>
                    }


                    <ToastContainer />
                </form>
            </div>
        </div>
    )
}
export default SHForm;