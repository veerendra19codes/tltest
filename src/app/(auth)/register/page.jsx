"use client";

import { redirect, useRouter } from 'next/navigation'
import { registerAction } from '@/lib/actions';
// import { useFormState } from "react-dom";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { User } from '@/lib/models';
import { useSession } from 'next-auth/react';
const RegisterPage = () => {
    const session = useSession();
    if (!session) {
        redirect("/login");
    }
    else if (session.data?.user?.role !== "ad" || session.data?.user?.role !== "tl" || session.data?.user?.role !== "sh") {
        redirect("/");
    }

    // const [state, formAction] = useFormState(registerAction, undefined);

    const router = useRouter();

    // useEffect(() => {
    //     if (state?.success) {
    //         router.push("/login")
    //     }
    // }, [router, state?.success]);

    // const handleRegister = () => {
    //     router.push("/");
    // }

    const [info, setInfo] = useState({ username: "", email: "", password: "", role: "" });
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);

    const handleInput = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // console.log({ info });
        if (!info.username || !info.email || !info.password || !info.role) {
            setError("Must provide all credentials");
        } else {
            try {
                setPending(true);

                const res = await fetch("api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(info),
                });
                if (res.ok) {
                    setPending(false);
                    const form = e.target;
                    form.reset();
                    router.push("/login");
                    console.log("User registered successfully");
                }
                else {
                    setPending(false);
                    const errorData = await res.json();
                    setError(errorData.message);
                }
            } catch (err) {
                setPending(false);
                console.log("Error while registering user in page.jsx", err);
                setError("error in register page in catch block");
            }
        }
    }

    return (
        <div className="w-full h-full overflow-hidden flex justify-center items-center sm:px-4">
            <div className="w-[500px] m-auto my-12 p-12 border-gray-400 border-[1px] rounded-lg flex flex-col justify-center items-center gap-4 sm:w-full sm:m-0 sm:p-4  sm:gap-0 sm:mt-8 ">
                <h1 className="text-4xl font-bold sm:text-xl">Register</h1>
                <p className="text-gray-600 text-lg sm:text-[12px]">Enter your information to create an account</p>
                <form className="w-full flex flex-col justify-center items-start gap-4 sm:gap-2 sm:my-4" action="" onSubmit={handleSubmit}>

                    <label className="text-[12px] font-medium">Username</label>
                    <input type="text" name="username" placeholder="username" className="p-2  pl-4 border-2 border-gray-400 rounded-xl w-full sm:py-1" onChange={(e) => handleInput(e)} />

                    <label className="text-[12px] font-medium">Email</label>
                    <input type="email" name="email" placeholder="example@gmail.com" className="p-2  pl-4 border-2 border-gray-400 rounded-xl w-full sm:py-1" onChange={(e) => handleInput(e)} />

                    <label className="text-[12px] font-medium">Password</label>
                    <input type="text" name="password" placeholder="password" className="p-2  pl-4 border-2 border-gray-400 rounded-xl w-full sm:py-1" onChange={(e) => handleInput(e)} />

                    <label className="text-[12px] font-medium">Select your role</label>

                    <select
                        name="role"
                        value={role === "" ? "" : role}
                        className="border-2 border-gray-400 w-full py-2 pl-4 sm:py-1" onChange={(e) => handleInput(e)}>

                        <option value="" disabled={true} className="py-1">Select your role</option>
                        <option value="bd" className="py-1">Business Developer</option>
                        <option value="sh" className="py-1">Super Head</option>
                        <option value="tl" className="py-1">Team Leader</option>

                    </select>

                    {error && <span className="error-message w-full text-center text-red-600">{error}</span>}

                    <button className="w-full bg-blue-700 rounded-xl py-2 text-white mt-6 sm:mt-2" type="submit" disabled={pending ? true : false} >{pending ? "Registering" : "Register"}</button>

                </form>

                <Link href="/login">Already have an account? OR Are you a franchise? <span className="hover:underline hover:text-blue-300 text-blue-500">Login</span></Link>

            </div>
        </div>
    )
}

export default RegisterPage
