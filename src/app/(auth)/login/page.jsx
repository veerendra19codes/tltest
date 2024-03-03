"use client";

import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { signIn } from "next-auth/react"

const LoginPage = () => {
    const router = useRouter();

    const handleRegister = () => {
        router.push("/register");
    }

    // const handleLogin = () => {
    //     router.push("/");
    // }

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
                    })
                if (res.error) {
                    setError("Invalid Credentials.")
                    setPending(false);
                    return;
                }
                router.replace("/");
            } catch (err) {
                setPending(false);
                console.log("Error while logging user in page.jsx", err);
                setError("Something went wrong");
            }
        }
    }

    return (
        <div className="w-[500px] m-auto mt-12 p-12 border-black border-[1px] rounded-lg flex flex-col justify-center items-center gap-4">
            <h1 className="text-4xl font-bold">Login</h1>
            <p className="text-gray-600 text-lg">Enter you email below to login</p>
            <form className="w-full flex flex-col justify-center items-start gap-4" action="" onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" name="email" placeholder="example@gmail.com" className="p-2  pl-4 border-2 border-gray-400 rounded-xl w-full" onChange={(e) => handleInput(e)} />
                <label>Password</label>
                <input type="text" name="password" placeholder="password" className="p-2  pl-4 border-2 border-gray-400 rounded-xl w-full" onChange={(e) => handleInput(e)} />
                <button className="w-full bg-blue-700 rounded-xl py-2 text-white mt-6" disabled={pending ? true : false}>{pending ? "Logging in" : "Login"}</button>
            </form>
            <Link href="/register">Don't have an account? <span className="hover:underline">Register</span></Link>
        </div>
    )
}

export default LoginPage
