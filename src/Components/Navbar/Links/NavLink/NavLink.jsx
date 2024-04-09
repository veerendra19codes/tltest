"use client";

import { usePathname } from 'next/navigation'
import React from 'react'
import Link from 'next/link';

const NavLink = ({ item, open, setOpen }) => {
    // console.log(item);
    const pathName = usePathname();

    const handleNavClick = () => {
        if (open) {
            setOpen(!open);
        }
    }

    return (
        <div>
            <Link href={item.path} key={item.name} className={pathName === item.path ? "text-lightpurple py-2 px-4 hover:underline text-xl font-medium " : "py-2 px-4 hover:underline text-xl font-medium text-purple"} onClick={handleNavClick} >
                {item.name}
            </Link>
        </div>
    )
}

export default NavLink
