"use client";

import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import { useFormState } from "react-dom";
import { addCompany } from '@/lib/actions';

const NewPage = () => {

    const router = useRouter();

    const [info, setInfo] = useState({ companyname: "", jobdetails: "" });
    const [error, setError] = useState("");
    // const [pending, setPending] = useState(false);

    const handleInput = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log({ info });

    //     if (!info.companyname) {
    //         setError("Must provide company name");
    //     }
    //     if (!info.jobdetails) {
    //         setError("Must provide url");
    //     }
    //     if (!info.companyname && !info.jobdetails) {
    //         setError("Must provide all the details");
    //     }
    //     else {
    //         try {
    //             setPending(true);

    //             const res = await fetch("api/company", {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify(info),
    //             });
    //             if (res.ok) {
    //                 setPending(false);
    //                 const form = e.target;
    //                 form.reset();
    //                 router.push("/dashboardbd");
    //                 revalidatePath("/dashboarbd");
    //                 console.log("Details sent successfully");
    //             }
    //             else {
    //                 setPending(false);
    //                 const errorData = await res.json();
    //                 setError(errorData.message);
    //             }
    //         } catch (err) {
    //             setPending(false);
    //             console.log("Error while sending company details in page.jsx", err);
    //             setError("Something went wrong");
    //         }
    //     }
    // }


    const [state, formAction] = useFormState(addCompany, undefined);

    useEffect(() => {
        if (state?.success) {
            router.push("/dashboardbd");
        }
    }, [router, state?.success]);

    return (
        <div className="flex justify-center items-center">
            <form action={formAction} className="w-[500px] m-auto mt-12 p-12 border-black border-[1px] rounded-lg flex flex-col justify-center items-start gap-4">
                {/* onSubmit={handleSubmit} */}
                <h1 className="text-3xl font-bold">Add new openings here</h1>
                <label>Company name</label>
                <input type="text" name="companyname" placeholder="Ex. Infosys Ltd" className="p-2  pl-4 border-2 border-gray-400 rounded-xl w-full" onChange={e => handleInput(e)} />
                <label>Job Details</label>
                <input type="text" name="jobdetails" placeholder="mail url" className="p-2  pl-4 border-2 border-gray-400 rounded-xl w-full" onChange={e => handleInput(e)} />
                <p>Use <a href="https://chromewebstore.google.com/detail/share-emails-via-secure-u/bceemhpgjlcpelcmnipjfinfnaangpfa" target="_blank" className="hover:underline">cloudhq</a> and paste the mail url here</p>
                {state?.error && <span className="w-full text-center text-red-600">{state.error}</span>}
                {/* <button type="submit" className="w-full bg-blue-700 rounded-xl py-2 text-white mt-6" disabled={pending ? true : false}>{pending ? "Sending" : "Send"}</button> */}
                <button type="submit" className="w-full bg-blue-700 rounded-xl py-2 text-white mt-6">Add</button>

            </form>
        </div>
    )
}

export default NewPage
