'use client'

// import  from 'next/'; // Import  from next/
import { useState, useEffect } from 'react';

// const CgProfile = (() => import("react-icons/cg").then(module => module.CgProfile));
// const MdLockOutline = (() => import("react-icons/md").then(module => module.MdLockOutline));
// const MdOutlineMailOutline = (() => import("react-icons/md").then(module => module.MdOutlineMailOutline));
// const LuFileSpreadsheet = (() => import("react-icons/lu").then(module => module.LuFileSpreadsheet));
// const FaLink = (() => import("react-icons/fa").then(module => module.FaLink));
// const ToastContainer = (() => import("react-toastify").then(module => module.ToastContainer));
// const toast = (() => import("react-toastify").then(module => module.toast));

import { CgProfile } from "react-icons/cg";
import { MdLockOutline } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { LuFileSpreadsheet } from "react-icons/lu";
import { FaLink } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

// import TeamleaderContext from '@/contexts/TeamleaderContext/TeamleaderContext';

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


const TLForm = ({ method, userdetails, setSelectedRole, selectedRole, setTls }) => {
    // const { alltls, setAlltls } = useContext(TeamleaderContext);


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
        companiesAccepted: userdetails.companiesAccepted,
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

    const handleInput = (e) => {
        setInfo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
            role: "tl",
            preference: "any",
            level: "junior",
        }));
        setError("");
    }

    useEffect(() => {
        setError("");

        if (changePassword) {
            setInfo((prev) => ({
                ...prev,
                password: newpassword
            }));
            setError("");
        }
    }, [newpassword, changePassword]);

    const checkErrors = () => {
        // console.log("error:", error);
        const { username, email, password, spreadsheet, deployedlink, revenueapi } = info;
        // console.log("changePassword:", changePassword);
        if (changePassword) {
            setInfo((prev) => ({
                ...prev,
                password: newpassword
            }))
            setError("");
        }
        // console.log("info:", info);
        // console.log("newpassword:", newpassword);


        if (method !== "put") {
            // console.log("info:", info);
            if (!username || !email || !password || !spreadsheet || !deployedlink || !revenueapi) {
                setError("Must provide all credentials");
            }
        }
        else {
            if (changePassword) {
                // console.log("new password:", newpassword);
                setInfo((prev) => ({
                    ...prev,
                    password: newpassword
                }))
                setError("");
                // console.log("i m here")
                // console.log("password:", password);
                // console.log("info again:", info);
                if (!username || !email || !password || !spreadsheet || !deployedlink || !revenueapi) {
                    setError("Must provide all credentials");
                }
            }
            else {
                // console.log("am i here")
                // console.log("info:", info);
                if (!username || !email || !spreadsheet || !deployedlink || !revenueapi) {
                    setError("Must provide all credentials");
                }
            }
        }
    }

    async function handleSubmit(e) {
        // console.log("error:", error);
        e.preventDefault();

        const { username, email, password, spreadsheet, deployedlink, revenueapi } = info;
        // console.log("info:", info);

        //method is post 
        if (method !== "put") {
            //check all fields
            if (!username || !email || !password || !spreadsheet || !deployedlink || !revenueapi) {
                setError("Must provide all credentials");
            }
            else {
                //all credentials , then post 
                try {
                    const res = await fetch("api/register", {
                        method: "POST",
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

                        // console.log("userdetails after submission:", userdetails);
                        toast.success('TL added successfully', {
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
                catch (err) {
                    setError(err.message);
                }
            }
        }
        //method is put
        else {
            //check if user wants to change the password 
            if (changePassword) {

                setInfo((prev) => ({
                    ...prev,
                    password: newpassword
                }));
                setError("");

                //check all fields
                if (!username || !email || !password || !spreadsheet || !deployedlink || !revenueapi) {
                    setError("Must provide all credentials");
                }
                else {
                    try {
                        const res = await fetch("api/register", {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(info),
                        });
                        if (res.ok) {

                            // /set userdetails to default values
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

                            toast.success('Teamleader updated successfully', {
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

                            // console.log("Teamleader updated successfully");
                        }
                        else {
                            setPending(false);
                            const errorData = await res.json();
                            setError(errorData.message);
                        }
                    }
                    catch (err) {
                        setError(err.message);
                    }
                }
            }
            else {
                //check everything except password
                if (!username || !email || !spreadsheet || !deployedlink || !revenueapi) {
                    setError("Must provide all credentials");
                }
                else {
                    try {
                        const res = await fetch("api/register", {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(info),
                        });
                        if (res.ok) {

                            // /set userdetails to default values
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

                            toast.success('Teamleader updated successfully', {
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
                            // const form = e.target;
                            // form.reset();
                            // console.log("Teamleader updated successfully");
                        }
                        else {
                            setPending(false);
                            const errorData = await res.json();
                            setError(errorData.message);
                        }
                    }
                    catch (err) {
                        setError(err.message);
                    }
                }
            }
        }
    }

    const handleToastClose = () => {
        // Execute the next line of code here
        setSelectedRole("");
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


                toast.success('TL deleted successfully', {
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
                setTls([]);
                // setAlltls([])
            }
            else {
                setPending(false);
                const errorData = await res.json();
                setError(errorData.message);
            }
        }
        catch (err) {
            setPending(false);
            // console.log("Error while deleting TL in page.jsx:", err);
            setError("Error deleting TL");
        }
    }

    return (
        <div className="TLForm h-auto w-full overflow-hidden flex justify-center items-center sm:mt-2">
            <div className="w-[500px] m-auto p-12 border-gray-400 border-[1px] rounded-lg flex flex-col justify-center items-center bg-white gap-4 sm:w-full sm:p-4 sm:m-0 sm:gap-0 ">


                <h1 className="text-4xl font-bold sm:text-3xl text-lightpurple">
                    {method === "put" ? "Edit TL" : "Add TL"}
                </h1>
                <p className="text-gray-600 text-lg sm:text-xs">
                    {method === "put" ? "Note: Username cannot be edited" : "Enter details below"}
                </p>

                <form className="w-full flex flex-col justify-center items-center gap-4 sm:my-4 sm:gap-2" onSubmit={handleSubmit}>
                    <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg lg:py-1 lg:gap-0">
                        {method == "put" ? <h1 className="text-black">Username:</h1> : <CgProfile className="size-8 lg:size-6" color='purple' />}
                        <input
                            type="text" name="username" placeholder="Username" className="p-2 pl-4 rounded-xl w-full sm:py-1 border-none outline-none text-black"
                            onChange={handleInput} value={info.username} disabled={method === "put"}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </div>

                    <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg lg:py-1 lg:gap-0">
                        {method == "put" ? <h1 className="text-black">Email:</h1> : <MdOutlineMailOutline className="size-8 lg:size-6" color='purple' />}
                        <input
                            type="email" name="email" placeholder="example@gmail.com"
                            className="p-2 pl-4 rounded-xl w-full sm:py-1 border-none outline-none text-black "
                            onChange={handleInput} value={info.email}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </div>

                    {/* <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg lg:py-1 lg:gap-0">
                        {method == "put" ? <h1 className="text-black">Password:</h1> : <MdLockOutline className="size-8 lg:size-6" color='purple' />}
                        <input
                            type="text" name="password" placeholder="Password" className="p-2 pl-4 rounded-xl w-full sm:py-1 border-none outline-none text-black"
                            onChange={handleInput} value={info.password}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </div> */}

                    {(method === "post" || method !== "put") &&
                        <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg lg:py-1 lg:gap-0 ">
                            <MdLockOutline className="size-8 lg:size-6" color='purple' />
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


                    <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg lg:py-1 lg:gap-0">
                        {method === "put" ? <h1 className="text-black">Spreadsheet:</h1> : <LuFileSpreadsheet className="size-8 lg:size-6" color='purple' />}
                        <input
                            type="text" name="spreadsheet" placeholder="Spreadsheet Link"
                            className="p-2 pl-4 rounded-xl w-full sm:py-1 border-none outline-none text-black"
                            onChange={handleInput} value={info.spreadsheet}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </div>

                    <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg lg:py-1 lg:gap-0">
                        {method === "put" ? <h1 className="text-black">Deployedlink:</h1> : <FaLink className="size-8 lg:size-6" color='purple' />}
                        <input
                            type="text" name="deployedlink" placeholder="Deployed Sheet Link" className="p-2 pl-4 rounded-xl w-full sm:py-1 border-none outline-none text-black"
                            onChange={handleInput} value={info.deployedlink}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </div>

                    <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg lg:py-1 lg:gap-0">
                        {method === "put" ? <h1 className="text-black">Revenue api:</h1> :
                            <FaLink className="size-8 lg:size-6" color='purple' />}
                        <input
                            type="text" name="revenueapi" placeholder="Revenue api"
                            className="p-2 pl-4 rounded-xl w-full sm:py-1 border-none outline-none text-black"
                            onChange={handleInput} value={info.revenueapi}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </div>

                    {error && <span className="text-red-500 font-semibold">{error}</span>}

                    {/* {method === "put" ?
                        <div className="flex justify-center items-center gap-4">
                            <button
                                type="submit" className="w-auto rounded-xl py-4 px-8 text-2xl lg:text-xl text-white bg-purple hover:bg-lightpurple lg:py-2 lg:px-4 mt-2" disabled={pending ? true : false}>
                                Update
                            </button>

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
                    <ToastContainer /> */}

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
                                        <AlertDialogAction type="submit" onClick={handleSubmit} disabled={(error !== "") || !info.username}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>


                            {/* <button
                                onClick={handleDeleteUser}
                                className="w-auto rounded-xl py-4 px-8 text-2xl lg:text-xl text-white bg-purple hover:bg-lightpurple lg:py-2 lg:px-4 mt-2" disabled={pending ? true : false}>
                                Delete
                            </button> */}
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <div
                                        className="w-auto rounded-xl py-4 px-8 text-2xl lg:text-xl text-white bg-purple hover:bg-lightpurple lg:py-2 lg:px-4 mt-2" disabled={pending ? true : false}>
                                        Delete
                                    </div>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription className="flex flex-col">
                                            {error && <span className="text-red-500 font-semibold">{error}</span>}

                                            This action cannot be undone. This will permanently delete the user details.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel >Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleDeleteUser} disabled={(error !== "") || !info.username}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                        :
                        //method === "post"

                        // <button
                        //     type="submit"
                        //     className="w-auto rounded-xl py-4 px-8 text-2xl lg:text-xl text-white bg-purple hover:bg-lightpurple lg:py-2 lg:px-4 mt-2" disabled={pending ? true : false}>
                        //     Add
                        // </button>

                        <AlertDialog>
                            <AlertDialogTrigger>
                                <div onClick={checkErrors}
                                    className="w-auto rounded-xl py-4 px-8 text-2xl lg:text-xl text-white bg-purple hover:bg-lightpurple lg:py-2 lg:px-4 mt-2" disabled={pending ? true : false}>
                                    Add
                                </div>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription className="flex flex-col">
                                        {error && <span className="text-red-500 font-semibold">{error}</span>}

                                        This action cannot be undone. This will permanently add a new user.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel >Cancel</AlertDialogCancel>
                                    <AlertDialogAction type="submit" onClick={handleSubmit} disabled={(error !== "") || !info.username}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>


                    }

                    <ToastContainer onClose={handleToastClose} />

                </form>
            </div>
        </div>
    );
}

export default TLForm;