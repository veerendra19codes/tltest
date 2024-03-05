"use client";

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react';
import NavLink from './NavLink/NavLink';

const Links = ({ role }) => {

    //if role == "bd" this nav
    const linksbd = [
        {
            id: 1,
            name: "Home",
            path: "/",
        },
        {
            id: 2,
            name: "new",
            path: "/new",
        },
        {
            id: 3,
            name: "dashboard",
            path: "/dashboardbd",
        },
    ]

    //if role == sh, this nav
    const linkssh = [
        {
            id: 1,
            name: "Home",
            path: "/",
        },
        {
            id: 2,
            name: "mails",
            path: "/mails",
        },
        {
            id: 3,
            name: "dashboard",
            path: "/dashboardsh",
        },
    ]

    const linkstl = [
        {
            id: 1,
            name: "Home",
            path: "/",
        },
        {
            id: 2,
            name: "assign",
            path: "/assign",
        },
        {
            id: 3,
            name: "dashboard",
            path: "/dashboardtl",
        },
    ]

    const linksfr = [
        {
            id: 1,
            name: "Home",
            path: "/",
        },
        {
            id: 2,
            name: "dashboard",
            path: "/dashboardfr",
        },
    ]

    const pathName = usePathname();

    const [open, setOpen] = useState(false);

    const handleMobileNav = () => {
        setOpen(!open);
    }
    console.log(open);

    return (
        <>
            <div className="w-full h-12 flex justify-between items-center gap-12 bg-purple-900 text-white" >
                {role === "bd" &&
                    linksbd.map((link) => (
                        // <Link href={link.path} key={link.id} className={pathName === link.path ? "text-purple-300 py-2 px-4 hover:underline text-xl font-medium" : "py-2 px-4 hover:underline text-xl font-medium"} >
                        //     {link.name}
                        // </Link>
                        <NavLink link={link} key={link.id} />
                    ))
                }

                {role === "sh" &&
                    linkssh.map((link) => (
                        // <Link href={link.path} key={link.id} className={pathName === link.path ? "text-purple-300 py-2 px-4 hover:underline text-xl font-medium" : "py-2 px-4 hover:underline text-xl font-medium"} >
                        //     {link.name}
                        // </Link>
                        <NavLink link={link} key={link.id} />
                    ))
                }

                {role === "tl" &&
                    linkstl.map((link) => (
                        // <Link href={link.path} key={link.id} className={pathName === link.path ? "text-purple-300 py-2 px-4 hover:underline text-xl font-medium" : "py-2 px-4 hover:underline text-xl font-medium"} >
                        //     {link.name}
                        // </Link>
                        <NavLink link={link} key={link.id} />
                    ))
                }

                {role === "fr" &&
                    linksfr.map((link) => (
                        // <Link href={link.path} key={link.id} className={pathName === link.path ? "text-purple-300 py-2 px-4 hover:underline text-xl font-medium" : "py-2 px-4 hover:underline text-xl font-medium"} >
                        //     {link.name}
                        // </Link>
                        <NavLink link={link} key={link.id} />
                    ))
                }

                <div className="text-white hidden md:block" onClick={handleMobileNav}>Menu</div>
            </div>

        </>
    )
}

export default Links
