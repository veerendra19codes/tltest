"use client";

import React, { useContext } from 'react'
import { usePathname } from 'next/navigation'
import { useState } from 'react';
import NavLink from './NavLink/NavLink';
import UserContext from '@/contexts/UserContext';
import { TfiMenu } from "react-icons/tfi";
import { MdLogout } from "react-icons/md";
import { signOut } from 'next-auth/react'
import { IoMdCloseCircleOutline } from "react-icons/io";

const Links = () => {
    const { session, status } = useContext(UserContext);
    // console.log("session in links:", session);

    //if role == "bd" this nav
    const linksbd = [
        {
            id: 1,
            name: "Home",
            path: "/",
        },
        {
            id: 2,
            name: "New",
            path: "/new",
        },
        {
            id: 3,
            name: "Dashboard",
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
            name: "Mails",
            path: "/mails",
        },
        {
            id: 3,
            name: "Dashboard",
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
            name: "Assign",
            path: "/assign",
        },
        {
            id: 3,
            name: "Dashboard",
            path: "/dashboardtl",
        },
        {
            id: 4,
            name: "Franchise",
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
            name: "Dashboard",
            path: "/dashboardfr",
        },
    ]

    const linksad = [
        {
            id: 1,
            name: "Home",
            path: "/",
        },
        {
            id: 2,
            name: "Employee",
            path: "/addnewemployee",
        },
        {
            id: 3,
            name: "Dashboard",
            path: "/dashboardad",
        },
        {
            id: 4,
            name: "Edit",
            path: "/edit",
        }
    ]

    const pathName = usePathname();

    const [open, setOpen] = useState(false);

    const handleMobileNav = () => {
        setOpen(!open);
    }
    // console.log(open);

    return (
        <div className="links">
            <div className="w-full h-12 flex justify-between items-center gap-4 lg:hidden"
            >
                {status !== "loading" && session?.user?.role === "bd" &&
                    linksbd.map((link) => (
                        <NavLink item={link} key={link.name} />
                    ))
                }

                {status !== "loading" && session?.user?.role === "sh" &&
                    linkssh.map((link) => (
                        <NavLink item={link} key={link.name} />
                    ))
                }

                {status !== "loading" && session?.user?.role === "tl" &&
                    linkstl.map((link) => (
                        <NavLink item={link} key={link.name} />
                    ))
                }

                {status !== "loading" && session?.user?.role === "fr" &&
                    linksfr.map((link) => (
                        <NavLink item={link} key={link.name} />
                    ))
                }

                {status !== "loading" && session?.user?.role === "ad" &&
                    linksad.map((link) => (
                        <NavLink item={link} key={link.name} />
                    ))
                }

            </div>
            <button onClick={() => setOpen(!open)} className=" hidden lg:block right-4 absolute top-4"
            >
                <TfiMenu size={32} color="purple" />
            </button>

            {/* MOBILE NAVBAR HERE- */}
            <div className="mobile-nav hidden lg:block fixed right-0 top-0 bottom-0">
                {open && status !== "loading" && (

                    <div className="mobileLinks flex flex-col justify-start gap-4 absolute right-0 items-start top-0 bg-purple h-screen w-[250px] overflow-y-hidden lg:gap-0">

                        <div className="username text-xl px-4 font-bold flex items-center text-white w-full h-16"> {session.user?.username}({session.user?.role.toUpperCase()})</div>

                        {status !== "loading" && session?.user?.role === "bd" &&
                            linksbd.map((link) => (
                                <NavLink item={link} key={link.name} open={open} setOpen={setOpen} />
                            ))
                        }

                        {status !== "loading" && session?.user?.role === "sh" &&
                            linkssh.map((link) => (
                                <NavLink item={link} key={link.name} open={open} setOpen={setOpen} />
                            ))
                        }

                        {status !== "loading" && session?.user?.role === "tl" &&
                            linkstl.map((link) => (
                                <NavLink item={link} key={link.name} open={open} setOpen={setOpen} />
                            ))
                        }

                        {status !== "loading" && session?.user?.role === "fr" &&
                            linksfr.map((link) => (
                                <NavLink item={link} key={link.name} open={open} setOpen={setOpen} />
                            ))
                        }

                        {status !== "loading" && session?.user?.role === "ad" &&
                            linksad.map((link) => (
                                <NavLink item={link} key={link.name} open={open} setOpen={setOpen} />
                            ))
                        }




                        <button onClick={() => signOut()} className="
                    text-white flex gap-4 text-xl font-semibold fixed bottom-0 w-full  py-4 bg-red-500 px-4  items-center">Logout <MdLogout size={25} /></button>


                        <button className="fixed top-4 right-4" onClick={() => setOpen(!open)}><IoMdCloseCircleOutline color="white" size={32} /></button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Links
