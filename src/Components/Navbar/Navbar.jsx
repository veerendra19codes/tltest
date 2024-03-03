"use client";

import Image from 'next/image'
import React from 'react'
import Links from './Links/Links'

const Navbar = () => {
    // roles = bd, sh, tl, fr;
    const role = "fr";

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
