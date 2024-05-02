"use client"

import Image from 'next/image'
import React, { useContext, Suspense } from 'react'
const Links = React.lazy(() => import('./Links/Links'))
import { MdLogout } from "react-icons/md";
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import UserContext from '@/contexts/UserContext';

const Navbar = () => {
    const { session, status } = useContext(UserContext);
    const pathname = usePathname();

    if (pathname === "/login") {
        return null;
    }

    return (
        <div className="navbar h-16 w-full px-24 flex justify-between items-center bg-white text-bgColor sm:px-4 sm:overflow-x-hidden shadow-2xl">

            <div className="logo size-16 flex justify-center items-center relative lg:-ml-2">
                <Image src="/tclogo.png" className="size-auto absolute" priority alt="logo" width={100} height={100} />
            </div>

            <Suspense fallback={<></>}>
                <div className="links">
                    <Links />
                </div>
            </Suspense>

            {status !== "loading" &&

                <div className="flex justify-center items-center gap-4">
                    <div className="username text-xl  rounded-xl py-2 px-4 font-bold text-darkpurple  lg:hidden">Hi {session?.user?.username}({session?.user?.role.toUpperCase()})</div>

                    <button onClick={() => signOut()} className="bg-purple mx-2 px-4 my-1 py-2 
                    text-white rounded-lg flex items-center gap-4 font-medium lg:hidden">Log Out <MdLogout size={25} /></button>

                </div>
            }
        </div>
    )
}

export default Navbar
