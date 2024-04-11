'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { signUp, useSession } from "next-auth/react"
import Image from "next/image"
import { CgProfile } from "react-icons/cg";
import { MdLockOutline } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";

const BDForm = () => {
    const router = useRouter();
    const session = useSession();

    const [info, setInfo] = useState({ username: "", email: "", password: "", role: "bd" });
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);

    const handleInput = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // console.log({ info });
        if (!info.username || !info.email || !info.password) {
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
                console.log("Error while registering new BD in page.jsx:", err);
                setError("Error in Registering BD");
            }
        }
    }

    return (
        <div className="BDFORM h-auto w-full overflow-hidden flex justify-center items-center sm:px-4 sm:mt-2">

            <div className="w-[500px] m-auto p-12 border-gray-400 border-[1px] rounded-lg flex flex-col justify-center items-center bg-white gap-4 sm:w-full sm:py-4 sm:px-4 sm:m-0 sm:gap-0 ">

                <div className="logo size-32 flex justify-center items-center relative">
                    <Image src="/tclogo.png" fill className="absolute" priority="false" alt="logo" />
                </div>

                <h1 className="text-4xl font-bold sm:text-xl text-lightpurple">Add BD</h1>
                <p className="text-gray-600 text-lg sm:text-base">Enter details below</p>

                <form className="w-full flex flex-col justify-center items-center gap-4 sm:my-4 sm:gap-2" onSubmit={handleSubmit}>

                    <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg">
                        <CgProfile size={40} color='purple' />
                        <input type="text" name="username" placeholder="Username" className="p-2  pl-4  rounded-xl w-full sm:py-1 border-none outline-none text-black" onChange={(e) => handleInput(e)} />
                    </div>

                    <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg">
                        <MdOutlineMailOutline size={40} color='purple' />
                        <input type="email" name="email" placeholder="example@gmail.com" className="p-2  pl-4  rounded-xl w-full sm:py-1 border-none outline-none text-black" onChange={(e) => handleInput(e)} />
                    </div>

                    <div className="w-full flex items-center gap-4 border-2 border-gray-400 py-2 px-4 rounded-2xl shadow-lg">
                        <MdLockOutline size={40} color='purple' />
                        <input type="text" name="password" placeholder="Password" className="p-2  pl-4 rounded-xl w-full sm:py-1 border-none outline-none text-black" onChange={(e) => handleInput(e)} />
                    </div>

                    {error && <span className="text-red-500 font-medium">{error}</span>}

                    <button className="w-1/2 rounded-xl py-4 text-2xl text-white bg-purple hover:bg-lightpurple" disabled={pending ? true : false}>{pending ? "Adding User" : "Add User"}</button>
                </form>
            </div>
        </div>
    )
}
export default BDForm;