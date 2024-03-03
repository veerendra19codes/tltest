"use client";

import { useRouter } from 'next/navigation'
import { registerAction } from '@/lib/actions';
// import { useFormState } from "react-dom";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { User } from '@/lib/models';

const RegisterPage = () => {

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
                setError("Something went wring");
            }
        }
    }

    return (
        <div className="w-[500px] m-auto my-12 p-12 border-black border-[1px] rounded-lg flex flex-col justify-center items-center gap-4 ">
            <h1 className="text-4xl font-bold">Register</h1>
            <p className="text-gray-600 text-lg">Enter your information to create am account</p>
            <form className="w-full flex flex-col justify-center items-start gap-4" action="" onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" name="username" placeholder="username" className="p-2  pl-4 border-2 border-gray-400 rounded-xl w-full" onChange={(e) => handleInput(e)} />
                <label>Email</label>
                <input type="email" name="email" placeholder="example@gmail.com" className="p-2  pl-4 border-2 border-gray-400 rounded-xl w-full" onChange={(e) => handleInput(e)} />
                <label>Password</label>
                <input type="text" name="password" placeholder="password" className="p-2  pl-4 border-2 border-gray-400 rounded-xl w-full" onChange={(e) => handleInput(e)} />
                <label>Select you role</label>
                <select name="role" className="border-2 border-gray-400 w-full py-2 pl-4" onChange={(e) => handleInput(e)}>
                    <option value="bd">Business Developer</option>
                    <option value="sh">Super Head</option>
                    <option value="tl">Team Leader</option>
                    <option value="fr">Franchise</option>
                </select>
                {error && <span className="error-message w-full text-center text-red-600">{error}</span>}
                <button className="w-full bg-blue-700 rounded-xl py-2 text-white mt-6" type="submit" disabled={pending ? true : false} >{pending ? "Registering" : "Register"}</button>
                {/* {state?.error && <p>{state?.error}</p>} */}
            </form>
            <Link href="/login">Already have an account? <span className="hover:underline">Login</span></Link>
        </div>
    )
}

export default RegisterPage
