"use client";

import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic
import { usePathname } from 'next/navigation'
import React from 'react'
import Link from 'next/link';

const DynamicFiHome = dynamic(() => import("react-icons/fi").then(module => module.FiHome));
const DynamicLuUser = dynamic(() => import("react-icons/lu").then(module => module.LuUser));
const DynamicRxDashboard = dynamic(() => import("react-icons/rx").then(module => module.RxDashboard));
const DynamicRiAddBoxLine = dynamic(() => import("react-icons/ri").then(module => module.RiAddBoxLine));
const DynamicRiMailUnreadLine = dynamic(() => import("react-icons/ri").then(module => module.RiMailUnreadLine));
const DynamicMdOutlineTaskAlt = dynamic(() => import("react-icons/md").then(module => module.MdOutlineTaskAlt));
const DynamicFiEdit = dynamic(() => import("react-icons/fi").then(module => module.FiEdit));

// import { FiHome } from "react-icons/fi";
// import { LuUser } from "react-icons/lu";
// import { RxDashboard } from "react-icons/rx";
// import { RiAddBoxLine } from "react-icons/ri";
// import { RiMailUnreadLine } from "react-icons/ri";
// import { MdOutlineTaskAlt } from "react-icons/md";
// import { FiEdit } from "react-icons/fi";

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

            {item.name === "Home" && <DynamicFiHome size={24} color="white" className="hidden lg:block" />}
            {(item.name === "Employee" || item.name === "Franchise") && <DynamicLuUser size={26} color="white" className="hidden lg:block" />}
            {item.name === "Dashboard" && <DynamicRxDashboard size={24} color="white" className="hidden lg:block" />}
            {item.name === "New" && <DynamicRiAddBoxLine size={28} color="white" className="hidden lg:block" />}
            {item.name === "Mails" && <DynamicRiMailUnreadLine size={24} color="white" className="hidden lg:block" />}
            {item.name === "Assign" && <DynamicMdOutlineTaskAlt size={24} color="white" className="hidden lg:block" />}
            {item.name === "Edit" && <DynamicFiEdit size={24} color="white" className="hidden lg:block" />}

            <Link href={item.path} key={item.name} className={pathName === item.path ? " py-1 px-4 hover:underline text-xl font-semibold lg:bg-lightpurple lg:text-white lg:w-[250px]" : "py-1 px-4 hover:underline text-xl font-semibold text-purple lg:text-white sm:w-full"} onClick={handleNavClick} >
                {item.name}
            </Link>
        </div>
    )
}

export default NavLink
