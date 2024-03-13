"use client";

import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { signIn, useSession } from "next-auth/react"
import { useFormState } from "react-dom";
import { loginAction } from '@/lib/actions'


const LoginPage = () => {
    // const [state, formAction] = useFormState(loginAction, undefined);
    const router = useRouter();

    const session = useSession();

    useEffect(() => {
        if (session.data?.user) {
            router.push("/")
        }
    }, [session.data, router])
    // if (session.data?.user) {
    //     router.push("/")
    // }

    // useEffect(() => {

    //     if (state?.success) {
    //         router.push("/login")
    //     }
    // }, [router, state?.success]);

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
                console.log("Error while logging user in page.jsx", err);
                setError("Something went wrong");
            }
        }
    }

    return (
        <div className="login h-full w-full overflow-hidden flex justify-center items-center sm:px-4 sm:mt-20">
            <div className="w-[500px] m-auto mt-12 p-12 border-gray-400 border-[1px] rounded-lg flex flex-col justify-center items-center gap-4 sm:w-full sm:py-4 sm:px-4 sm:m-0 sm:gap-0 ">
                <h1 className="text-4xl font-bold sm:text-xl">Login</h1>
                <p className="text-gray-600 text-lg sm:text-base">Enter you email below to login</p>
                <form className="w-full flex flex-col justify-center items-start gap-4 sm:my-4 sm:gap-2" onSubmit={handleSubmit}>
                    {/* onSubmit={handleSubmit} */}
                    <label className="text-[12px] font-medium">Email</label>
                    <input type="email" name="email" placeholder="example@gmail.com" className="p-2  pl-4 border-2 border-gray-400 rounded-xl w-full sm:py-1" onChange={(e) => handleInput(e)} />
                    <label className="text-[12px] font-medium">Password</label>
                    <input type="text" name="password" placeholder="password" className="p-2  pl-4 border-2 border-gray-400 rounded-xl w-full sm:py-1" onChange={(e) => handleInput(e)} />
                    <button className="w-full bg-blue-700 rounded-xl py-2 text-white mt-6" disabled={pending ? true : false}>{pending ? "Logging in" : "Login"}</button>
                </form>
                <Link href="/register" >Don't have an account? <span className="hover:underline">Register</span></Link>
            </div>
        </div>
    )
}

export default LoginPage
