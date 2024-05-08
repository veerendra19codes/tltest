"use client";

// import  from 'next/'; // Import  from next/
import { usePathname } from 'next/navigation'
import React from 'react'
import Link from 'next/link';

// const FiHome = (() => import("react-icons/fi").then(module => module.FiHome));
// const LuUser = (() => import("react-icons/lu").then(module => module.LuUser));
// const RxDashboard = (() => import("react-icons/rx").then(module => module.RxDashboard));
// const RiAddBoxLine = (() => import("react-icons/ri").then(module => module.RiAddBoxLine));
// const RiMailUnreadLine = (() => import("react-icons/ri").then(module => module.RiMailUnreadLine));
// const MdOutlineTaskAlt = (() => import("react-icons/md").then(module => module.MdOutlineTaskAlt));
// const FiEdit = (() => import("react-icons/fi").then(module => module.FiEdit));

import { FiHome } from "react-icons/fi";
import { LuUser } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import { RiAddBoxLine } from "react-icons/ri";
import { RiMailUnreadLine } from "react-icons/ri";
import { MdOutlineTaskAlt } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

const NavLink = ({ item, open, setOpen }) => {
    // console.log(item);
    const pathName = usePathname();

    const handleNavClick = () => {
        if (open) {
            setOpen(!open);
        }
    }

    return (
        <div className={pathName === item.path ? "lg:w-full lg:py-1 lg:bg-lightpurple flex items-center px-4" : "lg:w-full lg:py-1 flex items-center px-4"}>

            {item.name === "Home" && <FiHome size={24} color="white" className="hidden lg:block" />}
            {(item.name === "Employee" || item.name === "Franchise") && <LuUser size={26} color="white" className="hidden lg:block" />}
            {item.name === "Dashboard" && <RxDashboard size={24} color="white" className="hidden lg:block" />}
            {item.name === "New" && <RiAddBoxLine size={28} color="white" className="hidden lg:block" />}
            {item.name === "Mails" && <RiMailUnreadLine size={24} color="white" className="hidden lg:block" />}
            {item.name === "Assign" && <MdOutlineTaskAlt size={24} color="white" className="hidden lg:block" />}
            {item.name === "Edit" && <FiEdit size={24} color="white" className="hidden lg:block" />}

            <Link href={item.path} key={item.name} className={pathName === item.path ? " py-1 px-4 hover:underline text-xl font-semibold lg:bg-lightpurple lg:text-white lg:w-[250px]" : "py-1 px-4 hover:underline text-xl font-semibold text-purple lg:text-white sm:w-full"} onClick={handleNavClick} >
                {item.name}
            </Link>
        </div>
    )
}

export default NavLink
