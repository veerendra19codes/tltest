"use client";

import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { signIn } from "next-auth/react"
import Image from "next/image"

const DynamicCgProfile = dynamic(() => import("react-icons/cg")); // Dynamic import for CgProfile icon
const DynamicMdLockOutline = dynamic(() => import("react-icons/md").then(module => module.MdLockOutline));

const LoginPage = () => {
    const router = useRouter();

    const [info, setInfo] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);

    const handleInput = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // console.log({ info });
        if (!info.email || !info.password) {
            setError("Must provide all credentials");
        } else {
            try {
                setPending(true);
                // console.log({ info })
                const res = await signIn("credentials",
                    {
                        email: info.email,
                        password: info.password,
                        redirect: false,
                        callbackUrl: process.env.NEXTAUTH_URL,
                    })
                if (res.error) {
                    setError("Invalid Credentials.")
                    setPending(false);
                    return;
                }
                setPending(false);
                router.push("/");
            } catch (err) {
                setPending(false);
                // console.log("Error while logging user in page.jsx", err);
                setError("Something went wrong");
            }
        }
    }

    return (
        <div className="login h-screen w-full overflow-hidden flex justify-center items-center sm:px-4  bg-purple ">

            <div className="w-[500px] m-auto p-12 border-gray-400 border-[1px] rounded-lg flex flex-col justify-center items-center bg-white gap-4 sm:w-full sm:py-4 sm:px-4 sm:m-0 sm:gap-0 ">

                <div className="logo size-32 flex justify-center items-center sm:size-24">
                    <Image
                        src='/tclogo.png' alt="logo"
                        height={150}
                        width={150} priority />
                </div>
                <h1 className="text-4xl font-bold sm:text-3xl text-lightpurple"
                >
                    Login
                </h1>
                <p className="text-gray-600 text-lg sm:text-base"
                >
                    Enter your email below to login
                </p>

                <form className="w-full flex flex-col justify-center items-center gap-4 sm:my-4 sm:gap-2" onSubmit={handleSubmit}>
                    <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg sm:gap-0">
                        <DynamicCgProfile size={40} color='purple' className="sm:size-8" />
                        <input type="email" name="email" placeholder="example@gmail.com" className="p-2  pl-4  rounded-xl w-full sm:py-1 border-none outline-none" onChange={(e) => handleInput(e)} />
                    </div>

                    {/* <label className="text-[12px] font-medium">Password</label> */}
                    <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg sm:gap-0">
                        <DynamicMdLockOutline size={40} color='purple' className="sm:size-8" />
                        <input type="text" name="password" placeholder="password" className="p-2  pl-4 rounded-xl w-full sm:py-1 border-none outline-none" onChange={(e) => handleInput(e)} />
                    </div>

                    {error && <span className="text-red-500 font-semibold">{error}</span>}


                    <button className="w-1/2 rounded-xl py-4 text-2xl text-white mt-6 sm:mt-4 sm:py-2 bg-purple hover:bg-lightpurple" disabled={pending ? true : false}>{pending ? "Logging in" : "Login"}</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
