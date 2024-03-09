"use client"

import Image from 'next/image'
import React from 'react'
import Links from './Links/Links'
// import { getSession } from "@/app/api/auth/[...nextauth]/route";
// import session from '@/app/api/auth/[...nextauth]/route'
// import { auth } from '@/lib/auth'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
// import { redirect } from "next/navigation"

// async function fetchSession() {
//     try {
//         const session = await getSession();
//         // Access session properties like session.user.username, session.user.email, etc.
//         console.log("Session:", session);
//         return { session };
//     } catch (error) {
//         console.error("Error fetching session:", error);
//     }
// }

const Navbar = () => {
    // const role = "bd";
    // const session = await fetchSession();
    // console.log(session);
    // const session = await auth();

    // console.log(session);
    const router = useRouter();

    const session = useSession();
    // console.log("session in navbar", session);

    if (session.data === null) {
        router.replace("/login");
    }

    return (
        <div className="navbar h-16 w-full px-24 flex justify-between items-center bg-purple-900 text-white sm:px-4 sm:overflow-x-hidden">
            <div className="logo size-12 flex justify-center items-center ">
                <Image src="/tclogo.png" width={100} height={100} priority="false" alt="logo
            " />
            </div>
            <div className="links">
                <Links session={session} />
                {/* role={role} */}
            </div>
            {session.data?.user &&

                <div className="flex justify-center items-center gap-4">
                    <div className="username text-xl  rounded-xl py-2 px-4 text-white lg:hidden">Hi, {session.data?.user?.username}({session.data?.user?.role.toUpperCase()})</div>

                    <button onClick={() => signOut()} className="bg-red-600 mx-2 px-4 my-1 py-2 text-white rounded-lg">LogOut</button>

                </div>
            }
        </div>
    )
}

export default Navbar
