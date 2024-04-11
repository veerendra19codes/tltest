"use client";

import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import { useFormState } from "react-dom";
import { addCompany } from '@/lib/actions';
import { useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const NewPage = () => {
    const session = useSession();
    // console.log("session in new", session);

    const router = useRouter();

    const [info, setInfo] = useState({ companyname: "", jobdetails: "" });
    const [error, setError] = useState("");
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

            <form action={formAction} className="w-[450px] m-auto mt-24 p-12 bg-white rounded-xl flex flex-col justify-center items-center gap-8 shadow-xl sm:w-full sm:m-0 sm:p-4 sm:gap-2 sm:mt-24">
                <h1 className="text-3xl font-bold text-darkpurple sm:text-xl sm:mb-4">Add new openings</h1>

                <input type="hidden" name="createdBy" value={session.data?.user?.id} />

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
                    <span className="w-full text-center text-red-600">
                        {state.error}
                    </span>
                )}

                <button type="submit" className="px-8 bg-purple text-xl font-medium rounded-xl py-2 text-white sm:mt-2">Add</button>
                <ToastContainer />
                {/* <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition:Bounce
                ></ToastContainer> */}

            </form>
        </div>
    )
}

export default NewPage
