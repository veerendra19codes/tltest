"use client";

import dynamic from 'next/dynamic';
import React, { useState, useEffect, useContext } from 'react'
import { useFormState } from "react-dom";
import { addCompany } from '@/lib/actions';
import { ToastContainer, toast } from 'react-toastify';
// const ToastContainer = dynamic(() => import("react-toastify").then(module => module.ToastContainer));
// const toast = dynamic(() => import("react-toastify").then(module => module.toast));

import { useRouter } from 'next/navigation';

import 'react-toastify/dist/ReactToastify.css';
import UserContext from '@/contexts/UserContext';

const NewPage = () => {
    const router = useRouter();
    const { session, status } = useContext(UserContext);
    // console.log("session:", session);

    useEffect(() => {
        if (status === "loading") {
            return;
        } else if (session?.user?.role !== "bd") {
            router.back();
        }
    }, [status, session, router]);

    const [info, setInfo] = useState({ companyname: "", jobdetails: "" });
    // const [error, setError] = useState("");
    // const [pending, setPending] = useState(false);

    const handleInput = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const [state, formAction] = useFormState(addCompany, undefined);

    useEffect(() => {
        if (state?.success) {
            toast("Company listed successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
            router.push("/dashboardbd");
        }
    }, [router, state?.success]);

    return (
        <div className="flex  h-screen justify-center items-center sm:overflow-hidden sm:px-4">

            {status !== "loading" &&
                <form action={formAction} className="w-[450px] m-auto mt-24 p-12 pb-8 bg-white rounded-xl flex flex-col justify-center items-center gap-4 shadow-xl sm:w-full sm:m-0 sm:p-4 sm:gap-2">
                    <h1 className="text-3xl font-bold text-darkpurple sm:text-xl sm:mb-4">Add new openings</h1>

                    <input type="hidden" name="createdBy" value={session?.user?.id} />

                    <div className="w-full flex flex-col">

                        <label className="text-lg font-normal text-darkpurple">Company name</label>
                        <input type="text" name="companyname" placeholder="Ex. Infosys Ltd" className="p-2  pl-4 border-2 border-gray-400 rounded-xl w-full  sm:py-1" onChange={e => handleInput(e)} />
                    </div>

                    <div className="w-full flex flex-col">

                        <label className="text-lg font-normal text-darkpurple">Job details</label>
                        <input type="text" name="jobdetails" placeholder="mail url" className="p-2  pl-4 border-2 border-gray-400 rounded-xl w-full sm:py-1" onChange={e => handleInput(e)} />
                        <p className="text-purple">Use <a href="https://chromewebstore.google.com/detail/share-emails-via-secure-u/bceemhpgjlcpelcmnipjfinfnaangpfa" target="_blank" className="underline text-blue-500">cloudhq</a> and paste the mail url here</p>
                    </div>



                    {state?.error && (
                        <span className="w-full font-semibold text-center text-red-600">
                            {state.error}
                        </span>
                    )}

                    <button type="submit" className="px-12 bg-purple text-2xl font-medium rounded-xl py-4 text-white sm:mt-2 hover:bg-lightpurple">Add</button>
                    <ToastContainer />

                </form>
            }
        </div>
    )
}

export default NewPage
