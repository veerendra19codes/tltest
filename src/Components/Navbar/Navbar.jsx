"use client"

import Image from 'next/image'
import React, { useEffect } from 'react'
import Links from './Links/Links'
import { MdLogout } from "react-icons/md";
import { signOut, useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

const Navbar = () => {
    // const role = "bd";
    const pathname = usePathname();

    const router = useRouter();

    const session = useSession();
    // console.log("session in navbar", session);

    useEffect(() => {
        // Use useEffect to perform side effects, like redirecting
        if (session.data === null) {
            router.replace("/login");
        }
    }, [session.data, router]);

    // console.log(pathname);
    if (pathname === "/login") {

        return null;
    }

    return (
        <div className="navbar h-16 w-full px-24 flex justify-between items-center bg-white text-bgColor sm:px-4 sm:overflow-x-hidden shadow-2xl ">
            <div className="logo size-16 flex justify-center items-center relative">
                <Image src="/tclogo.png" className="size-auto absolute" priority alt="logo" width={100} height={100} />
            </div>

            <div className="links">
                <Links session={session} />
                {/* role={role} */}
            </div>

            {session.data?.user &&

                <div className="flex justify-center items-center gap-4">
                    <div className="username text-xl  rounded-xl py-2 px-4 font-bold text-darkpurple  lg:hidden">Hi, {session.data?.user?.username}({session.data?.user?.role.toUpperCase()})</div>

                    <button onClick={() => signOut()} className="bg-purple mx-2 px-4 my-1 py-2 
                    text-white rounded-lg flex items-center gap-4 font-medium">Log Out <MdLogout size={25} /></button>

                </div>
            }
        </div>
    )
}

export default Navbar
