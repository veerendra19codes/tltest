import { usePathname } from 'next/navigation'
import React from 'react'
import Link from 'next/link';

const NavLink = ({ link }) => {
    // console.log(link);
    const pathName = usePathname();
    return (
        <div>
            <Link href={link.path} key={link.id} className={pathName === link.path ? "text-purple-300 py-2 px-4 hover:underline text-xl font-medium" : "py-2 px-4 hover:underline text-xl font-medium"} >
                {link.name}
            </Link>
        </div>
    )
}

export default NavLink
