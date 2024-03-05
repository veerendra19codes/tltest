import Image from 'next/image'
import React from 'react'
import Links from './Links/Links'
import { getSession } from "@/app/api/auth/[...nextauth]/route";


async function fetchSession() {
    try {
        const session = await getSession();
        // Access session properties like session.user.username, session.user.email, etc.
        console.log("Session:", session);
        return { session };
    } catch (error) {
        console.error("Error fetching session:", error);
    }
}

const Navbar = async () => {
    // roles = bd, sh, tl, fr;
    const role = "bd";
    const session = await fetchSession();
    console.log(session);

    return (
        <div className="navbar h-16 w-full px-24 flex justify-between items-center bg-purple-900 text-white">
            <div className="logo size-12 flex justify-center items-center ">
                <Image src="/tclogo.png" width={100} height={100} priority="false" alt="logo
            " />
            </div>
            <div className="links">
                <Links role={role} />
            </div>
            <div className="username text-xl bg-white rounded-xl py-2 px-4 text-black">Username({role})</div>
        </div>
    )
}

export default Navbar
