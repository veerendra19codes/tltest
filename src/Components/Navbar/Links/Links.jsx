"use client";

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react';
import NavLink from './NavLink/NavLink';

const Links = ({ session }) => {
    // console.log(session);
    // const role = "bd";

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
            path: "/tldashboard",
        },
        {
            id: 4,
            name: "franchise",
            path: "/franchise",
        }
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
    // console.log(open);

    const role = session.data?.user?.role;

    return (
        <div className="links">
            <div className="w-full h-12 flex justify-between items-center gap-12 bg-purple-900 text-white lg:hidden"
            >
                {role === "bd" &&
                    linksbd.map((link) => (
                        <NavLink item={link} key={link.name} />
                    ))
                }

                {role === "sh" &&
                    linkssh.map((link) => (
                        <NavLink item={link} key={link.name} />
                    ))
                }

                {role === "tl" &&
                    linkstl.map((link) => (
                        <NavLink item={link} key={link.name} />
                    ))
                }

                {role === "fr" &&
                    linksfr.map((link) => (
                        <NavLink item={link} key={link.name} />
                    ))
                }

            </div>
            <button onClick={() => setOpen(!open)} className=" hidden lg:block"> Menu</button>

            <div className="mobile-nav hidden lg:block">
                {open && (
                    <div className="mobileLinks flex flex-col justify-start gap-4 absolute right-0 items-start top-0 bg-purple-800 h-screen w-[250px] pt-4">
                        {linksbd.map((link) => (
                            <NavLink item={link} key={link.title} open={open} setOpen={setOpen} />
                        ))}
                        <button className="fixed top-4 right-4" onClick={() => setOpen(!open)}>Close</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Links
