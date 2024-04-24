"use client";

import UserContext from '@/contexts/UserContext';
import { useRouter } from 'next/navigation'
import { useContext, useState, useEffect } from 'react';

const FranchisePage = () => {
    const router = useRouter();
    const { session, status } = useContext(UserContext);

    useEffect(() => {
        if (status === "loading") {
            return;
        } else if (session.user?.role !== "tl") {
            router.back();
        }
    }, [session, status, router])


    const [info, setInfo] = useState({
        username: "",
        email: "",
        password: "",
        role: "",
        teamleader: "",
        level: "",
        teamleadername: "", companiesCompleted: [], companiesRejected: [], companiesWorking: [],
        companiesCompletedName: [], companiesRejectedName: [], companiesWorkingName: [],
        spreadsheet: "",
    });
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);

    const handleInput = (e) => {
        setInfo((prev) => ({
            ...prev, [e.target.name]: e.target.value,
            role: "fr",
            teamleader: session.data?.user?.id,
            teamleadername: session.data?.user?.username,
            level: "junior",
            companiesCompleted: [],
            companiesRejected: [],
            companiesWorking: [],
            companiesCompletedName: [], companiesRejectedName: [], companiesWorkingName: []
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!info.email || !info.password) {
            setError("Must provide all credentials");
        }
        else {
            try {
                setPending(true);

                const res = await fetch("api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(info),
                });

                console.log(res);

                if (res.ok) {
                    setPending(false);
                    const form = e.target;
                    form.reset();
                    router.refresh("/dashboardtl");
                    router.push("/dashboardtl");
                    console.log("Franchise registered successfully");
                }
                else {
                    setPending(false);
                    const errorData = await res.json();
                    setError(errorData.message);
                }
            } catch (err) {
                setPending(false);
                console.log("Error while registering franchise in page.jsx", err);
                // setError("error in register franchise page in catch block");
            }
        }
    }

    return (
        <div className="w-full h-full overflow-hidden flex justify-center items-center sm:px-4">
            <div className="w-[500px] m-auto my-8 px-12 py-8 border-gray-400 border-[1px] rounded-lg flex flex-col justify-center items-center bg-white gap-4 sm:w-full sm:m-0 sm:p-4  sm:gap-0 sm:mt-8 ">

                <h1 className="text-4xl font-bold text-darkpurple sm:text-xl">Add new Franchise</h1>

                <form className="w-full flex flex-col justify-center items-center gap-4 sm:gap-2 sm:my-4" action="" onSubmit={handleSubmit}>

                    <div className="flex flex-col w-full">

                        <label className=" font-normal text-purple">Username</label>
                        <input type="text" name="username" placeholder="username" className="p-2  pl-4 border-2 border-gray-400 rounded-xl w-full sm:py-1" onChange={(e) => handleInput(e)} />
                    </div>

                    <div className="flex flex-col w-full">

                        <label className=" font-normal text-purple">Email</label>
                        <input type="email" name="email" placeholder="example@gmail.com" className="p-2  pl-4 border-2 border-gray-400 rounded-xl w-full sm:py-1" onChange={(e) => handleInput(e)} />
                    </div>

                    <div className="flex flex-col w-full">

                        <label className=" font-normal text-purple">Password</label>
                        <input type="text" name="password" placeholder="password" className="p-2  pl-4 border-2 border-gray-400 rounded-xl w-full sm:py-1" onChange={(e) => handleInput(e)} />
                    </div>

                    <div className="flex flex-col w-full">

                        <label className=" font-normal text-purple">Spreadsheet</label>
                        <input type="text" name="spreadsheet" placeholder="spreadsheet link" className="p-2  pl-4 border-2 border-gray-400 rounded-xl w-full sm:py-1" onChange={(e) => handleInput(e)} />
                    </div>

                    {/* <input type="hidden" name="role" value="fr" /> */}
                    {/* <input type="hidden" name="teamleader" value={session.data?.user?.id} /> */}
                    {/* <input type="hidden" name="teamleadername" value={session.data?.user?.username} /> */}
                    {error && <span className="error-message w-full text-center text-red-600">{error}</span>}

                    <button className=" bg-purple rounded-xl py-2 px-8 text-white text-xl font-medium mt-6 sm:mt-2" type="submit" disabled={pending ? true : false} >{pending ? "Adding" : "Add"}</button>

                </form>
            </div>
        </div>
    )
}

export default FranchisePage
