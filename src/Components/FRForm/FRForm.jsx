'use client'

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic

const DynamicCgProfile = dynamic(() => import("react-icons/cg").then(module => module.CgProfile));
const DynamicMdLockOutline = dynamic(() => import("react-icons/md").then(module => module.MdLockOutline));
const DynamicMdOutlineMailOutline = dynamic(() => import("react-icons/md").then(module => module.MdOutlineMailOutline));
const DynamicRiTeamLine = dynamic(() => import("react-icons/ri").then(module => module.RiTeamLine));
const DynamicLuFileSpreadsheet = dynamic(() => import("react-icons/lu").then(module => module.LuFileSpreadsheet));
const DynamicBsGraphUpArrow = dynamic(() => import("react-icons/bs").then(module => module.BsGraphUpArrow));
const DynamicGrUserExpert = dynamic(() => import("react-icons/gr").then(module => module.GrUserExpert));
// const DynamicToastContainer = dynamic(() => import("react-toastify").then(module => module.ToastContainer));
// const Dynamictoast = dynamic(() => import("react-toastify").then(module => module.toast));


// import { CgProfile } from "react-icons/cg";
// import { MdLockOutline } from "react-icons/md";
// import { MdOutlineMailOutline } from "react-icons/md";
// import { RiTeamLine } from "react-icons/ri";
// import { LuFileSpreadsheet } from "react-icons/lu";
// import { BsGraphUpArrow } from "react-icons/bs";
// import { GrUserExpert } from "react-icons/gr";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { getAllUsers } from '@/lib/actions';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const FRForm = ({ userdetails, method, setSelectedRole, selectedRole, setBds }) => {
    // console.log("userdetails in frform:", userdetails);
    // console.log("method in frform:", method);

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
        companiesAccepted: userdetails.companiesAccepted || "",
        companiesCompletedName: userdetails.companiesCompletedName || "",
        companiesRejectedName: userdetails.companiesRejectedName || "",
        companiesWorkingName: userdetails.companiesWorkingName || "",
        companiesAcceptedName: userdetails.companiesAcceptedName || "",
        deployedlink: userdetails.deployedlink || "",
        revenueapi: userdetails.revenueapi || "",
        reminders: userdetails.reminders || 0,
    });

    const [newpassword, setNewPassword] = useState("");

    const [changePassword, setChangePassword] = useState(false);
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);
    const [teamleaders, setTeamleaders] = useState([]);

    const handleInput = (e) => {
        setInfo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
            role: "fr",
            reminders: 0,
        }));
        setError("");
    }

    useEffect(() => {
        if (changePassword) {
            setInfo((prev) => ({
                ...prev,
                password: newpassword
            }));
            setError("");
        }
    }, [newpassword]);

    useEffect(() => {
        const fetchData = async () => {
            const allUsers = await getAllUsers();

            const alltls = allUsers.filter((user) => user.role === "tl");
            setTeamleaders(alltls);
        }
        fetchData();
    }, [])

    const checkErrors = () => {
        console.log("changePassword:", changePassword);
        if (changePassword) {
            setInfo((prev) => ({
                ...prev,
                password: newpassword
            }))
            setError("");
        }
        console.log("info:", info);
        console.log("newpassword:", newpassword);

        const { username, email, password, teamleadername, spreadsheet, level, preference } = info;

        if (method !== "put") {
            if (!username || !email || !password || !teamleadername || !spreadsheet || !level || !preference) {
                setError("Must provide all credentials 1");
            }
        }
        else {
            if (changePassword) {
                console.log("new password aaja bhai:", newpassword);
                setInfo((prev) => ({
                    ...prev,
                    password: newpassword
                }))
                setError("");
                console.log("i m here")
                console.log("password:", password);
                console.log("info again:", info);
                if (!username || !email || !password || !teamleadername || !spreadsheet || !level || !preference) {
                    setError("Must provide all credentials 2");
                }
            }
            else {
                if (!username || !email || !teamleadername || !spreadsheet || !level || !preference) {
                    setError("Must provide all credentials 3");
                }
            }
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        // console.log("info:", info);
        const { username, email, password, teamleadername, spreadsheet, level, preference } = info;


        //if method is post 
        if (method !== "put") {
            if (!username || !email || !password || !teamleadername || !spreadsheet || !level || !preference) {
                setError("Must provide all credentials 4");
            }
            //registering new franchise

            else {
                try {
                    const res = await fetch("api/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(info),
                    });
                    if (res.ok) {

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

                        // console.log("User registered successfully");
                    }
                    else {
                        setPending(false);
                        const errorData = await res.json();
                        setError(errorData.message);
                    }
                } catch (err) {
                    setPending(false);

                    setError(err.message);
                }
            }
        }
        //method is put
        else {
            console.log("am i here")
            if (!username || !email || !teamleadername || !spreadsheet || !level || !preference) {
                setError("Must provide all credentials 5");
            }
            else {
                try {
                    setPending(true);

                    //updating existing franchise
                    if (changePassword && password != "") {
                        setInfo((prev) => ({
                            ...prev,
                            password: newpassword
                        }))
                        setError("");
                    }
                    const res = await fetch("api/register", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(info),
                    });
                    console.log("res:", res);
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
                        console.log("succes:");

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
                        // setSelectedRole("");
                        console.log("succes2:");
                        // console.log("Franchise updating successfully");
                        // console.log("selectedRole after updating:", selectedRole);
                    }
                    else {
                        setPending(false);
                        const errorData = await res.json();
                        setError(errorData.message);
                    }
                } catch (err) {
                    setPending(false);
                    // console.log("Error while registering new Franhise in page.jsx:", err);
                    setError("Error in Registering Franchise");
                }
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

                toast.success('Franchise deleted successfully', {
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
                setFrs([])
            }
            else {
                setPending(false);
                const errorData = await res.json();
                setError(errorData.message);
            }
        }
        catch (err) {
            setPending(false);
            // console.log("Error while deleting FR in page.jsx:", err);
            setError("Error deleting FR");
        }
    }

    const handleToastClose = () => {
        // Execute the next line of code here
        setSelectedRole("");
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
                        {method == "put" ? <h1 className="lg:text-[10px] text-gray-700">Username:</h1> : <DynamicCgProfile className="size-8 lg:size-6" color='purple' />}
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="p-2 pl-4 rounded w-full sm:py-1 border-none outline-none text-black "
                            onChange={handleInput}
                            value={info.username}
                            disabled={method === "put"}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </div>

                    <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg lg:py-1 lg:gap-0 ">
                        {method == "put" ? <h1 className="lg:text-[10px] text-gray-700">Email:</h1> : <DynamicMdOutlineMailOutline className="size-8 lg:size-6" color='purple' />}
                        <input
                            type="email"
                            name="email"
                            placeholder="example@gmail.com"
                            className="p-2 pl-4 rounded w-full sm:py-1 border-none outline-none text-black "
                            onChange={handleInput}
                            value={info.email}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                }
                            }} />
                    </div>


                    {(method === "post" || method !== "put") &&
                        <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg lg:py-1 lg:gap-0 ">
                            <DynamicMdLockOutline className="size-8 lg:size-6" color='purple' />
                            <input
                                type="text"
                                name="password"
                                placeholder="Password"
                                className="p-2 pl-4 rounded w-full sm:py-1 border-none outline-none text-black "
                                onChange={handleInput}
                                value={info.password}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                    }
                                }} />
                        </div>
                    }

                    {(method === "put" && changePassword) &&
                        <div className="w-full flex flex-col items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg lg:py-1 lg:gap-0 ">
                            <div className="flex items-center">
                                <h1 className="lg:text-[10px] text-gray-700">Password:</h1>
                                <input
                                    type="text"
                                    name="password"
                                    placeholder="Password"
                                    className="p-2 pl-4 rounded w-full sm:py-1  text-black border-none outline-none"
                                    onChange={(e) => setNewPassword(e.target.value)} value={newpassword}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            </div>
                            <div className="flex gap-4">
                                <button onClick={() => setChangePassword(!changePassword)} className="bg-darkpurple rounded px-2 py-1 text-sm text-white">No</button>

                            </div>
                        </div>
                    }

                    {!changePassword && method === "put" &&
                        <div className="w-full flex justify-between items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg lg:py-1 lg:gap-0">
                            <div className="rounded text-purple">Change Password?</div>
                            <button onClick={() => setChangePassword(!changePassword)} className="bg-darkpurple rounded-xl px-2 py-1 text-sm text-white">Yes</button>
                        </div>
                    }

                    <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg lg:py-1 lg:gap-0 ">
                        {method == "put" ? <h1 className="lg:text-[10px] text-gray-700">Teamleadername:</h1> : <DynamicRiTeamLine className="size-8 lg:size-6" color='purple' />}
                        <select name="teamleadername" className="p-2 pl-4 rounded w-full sm:py-1 border-none outline-none text-black" onChange={handleInput}>
                            <option value="">Select Teamleader</option>
                            {teamleaders.map((teamleader) => (
                                <option key={teamleader._id} value={teamleader.username}>{teamleader.username}</option>
                            ))}
                        </select>
                    </div>

                    <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg lg:py-1 lg:gap-0 ">
                        {method == "put" ? <h1 className="lg:text-[10px] text-gray-700">Spreadsheet:</h1> : <DynamicLuFileSpreadsheet className="size-8 lg:size-6" color='purple' />}
                        <input type="text" name="spreadsheet" placeholder="Spreadsheet Link" className="p-2 pl-4 rounded w-full sm:py-1 border-none outline-none text-black" onChange={handleInput} value={info.spreadsheet} />
                    </div>

                    <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg lg:py-1 lg:gap-0 ">
                        <DynamicBsGraphUpArrow className="size-8 lg:size-6" color='purple' />
                        <select name="level" className="p-2 pl-4 rounded w-full sm:py-1 border-none outline-none text-black" onChange={handleInput}>
                            <option value="">Select Franchise Level</option>
                            <option value="junior">Junior</option>
                            <option value="mid">Mid</option>
                            <option value="senior">Senior</option>
                        </select>
                    </div>


                    <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg lg:py-1 lg:gap-0">
                        {method == "put" ? <h1 className="lg:text-[10px] text-gray-700">Preference:</h1> : <DynamicGrUserExpert className="size-8 lg:size-6" color='purple' />}
                        <input type="text" name="preference" placeholder="Preference ex-any" className="p-2 pl-4 rounded w-full sm:py-1 border-none outline-none text-black " onChange={handleInput} value={info.preference} />
                    </div>

                    {/* {error && <span className="text-red-500 font-semibold">{error}</span>} */}

                    {method === "put" ?
                        <div className="flex justify-center items-center gap-4">
                            {/* <button
                                type="submit" className="w-auto rounded-xl py-4 px-8 text-2xl lg:text-xl text-white bg-purple hover:bg-lightpurple lg:py-2 lg:px-4 mt-2" disabled={pending ? true : false}>
                                Update
                            </button> */}

                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <div onClick={checkErrors}
                                        className="w-auto rounded-xl py-4 px-8 text-2xl lg:text-xl text-white bg-purple hover:bg-lightpurple lg:py-2 lg:px-4 mt-2" disabled={pending ? true : false}>
                                        Update
                                    </div>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription className="flex flex-col">
                                            {error && <span className="text-red-500 font-semibold">{error}</span>}

                                            This action cannot be undone. This will permanently update the user details.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel >Cancel</AlertDialogCancel>
                                        <AlertDialogAction type="submit" onClick={handleSubmit}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>


                            <button
                                onClick={handleDeleteUser}
                                className="w-auto rounded-xl py-4 px-8 text-2xl lg:text-xl text-white bg-purple hover:bg-lightpurple lg:py-2 lg:px-4 mt-2" disabled={pending ? true : false}>
                                Delete
                            </button>
                        </div>
                        :
                        <button
                            type="submit"
                            className="w-auto rounded-xl py-4 px-8 text-2xl lg:text-xl text-white bg-purple hover:bg-lightpurple lg:py-2 lg:px-4 mt-2" disabled={pending ? true : false}>
                            Add
                        </button>
                    }

                    <ToastContainer onClose={handleToastClose} />

                </form>
            </div >
        </div >
    );
}

export default FRForm;