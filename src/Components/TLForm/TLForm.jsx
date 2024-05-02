'use client'

import { useState, useContext } from 'react';
import { CgProfile } from "react-icons/cg";
import { MdLockOutline } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { LuFileSpreadsheet } from "react-icons/lu";
import { FaLink } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

// import TeamleaderContext from '@/contexts/TeamleaderContext/TeamleaderContext';


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
            role: "tl",
            preference: "any",
            level: "junior",
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const { username, email, password, spreadsheet, deployedlink, revenueapi } = info;
        console.log("info:", info);

        if (!username || !email || !password || !spreadsheet || !deployedlink || !revenueapi) {
            setError("Must provide all credentials");
        } else {
            try {
                setPending(true);

                //updating existing tl
                if (method === "put") {
                    const res = await fetch("api/register", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(info),
                    });
                    if (res.ok) {
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
                        const form = e.target;
                        form.reset();
                        console.log("Teamleader updated successfully");
                    }
                    else {
                        setPending(false);
                        const errorData = await res.json();
                        setError(errorData.message);
                    }
                }

                //registering new tl
                else {

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
                            companiesCompletedName: [],
                            companiesRejectedName: [],
                            companiesWorkingName: [],
                            spreadsheet: "",
                            deployedlink: "",
                            revenueapi: "",
                            preference: ""
                        });

                        console.log("userdetails after submission:", userdetails);
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
                console.error("Error registering new TL in page.jsx:", err);
                setError("Error in registering TL");
            }
        }
    }


    const handleDeleteUser = async (e) => {
        e.preventDefault();

        try {
            setPending(true);
            const username = info.username;
            console.log("username to delete:", username);

            const res = await fetch(`/api/register/${username}`, {
                method: "DELETE"
            })
            // const data = await res.json();
            console.log("res:", res);
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
                    companiesCompletedName: [],
                    companiesRejectedName: [],
                    companiesWorkingName: [],
                    spreadsheet: "",
                    deployedlink: "",
                    revenueapi: "",
                    preference: ""
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
                console.log("user deleted successfully");
                setSelectedRole("");
                console.log("selectedRole after deleting:", selectedRole);
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
            console.log("Error while deleting TL in page.jsx:", err);
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
                        <input type="text" name="username" placeholder="Username" className="p-2 pl-4 rounded-xl w-full sm:py-1 border-none outline-none text-black" onChange={handleInput} value={info.username} disabled={method === "put"} />
                    </div>

                    <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg lg:py-1 lg:gap-0">
                        {method == "put" ? <h1 className="text-black">Email:</h1> : <MdOutlineMailOutline className="size-8 lg:size-6" color='purple' />}
                        <input type="email" name="email" placeholder="example@gmail.com" className="p-2 pl-4 rounded-xl w-full sm:py-1 border-none outline-none text-black " onChange={handleInput} value={info.email} />
                    </div>

                    <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg lg:py-1 lg:gap-0">
                        {method == "put" ? <h1 className="text-black">Password:</h1> : <MdLockOutline className="size-8 lg:size-6" color='purple' />}
                        <input type="text" name="password" placeholder="Password" className="p-2 pl-4 rounded-xl w-full sm:py-1 border-none outline-none text-black" onChange={handleInput} value={info.password} />
                    </div>

                    <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg lg:py-1 lg:gap-0">
                        {method === "put" ? <h1 className="text-black">Spreadsheet:</h1> : <LuFileSpreadsheet className="size-8 lg:size-6" color='purple' />}
                        <input type="text" name="spreadsheet" placeholder="Spreadsheet Link" className="p-2 pl-4 rounded-xl w-full sm:py-1 border-none outline-none text-black" onChange={handleInput} value={info.spreadsheet} />
                    </div>

                    <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg lg:py-1 lg:gap-0">
                        {method === "put" ? <h1 className="text-black">Deployedlink:</h1> : <FaLink className="size-8 lg:size-6" color='purple' />}
                        <input type="text" name="deployedlink" placeholder="Deployed Sheet Link" className="p-2 pl-4 rounded-xl w-full sm:py-1 border-none outline-none text-black" onChange={handleInput} value={info.deployedlink} />
                    </div>

                    <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg lg:py-1 lg:gap-0">
                        {method === "put" ? <h1 className="text-black">Revenue api:</h1> :
                            <FaLink className="size-8 lg:size-6" color='purple' />}
                        <input type="text" name="revenueapi" placeholder="Revenue api" className="p-2 pl-4 rounded-xl w-full sm:py-1 border-none outline-none text-black" onChange={handleInput} value={info.revenueapi} />
                    </div>

                    {error && <span className="text-red-500 font-semibold">{error}</span>}

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
    );
}

export default TLForm;