import React from 'react'

const NavLink = ({ link }) => {
    return (
        <div>
            <NavLink href={link.path} key={link.id} className={pathName === link.path ? "text-purple-300 py-2 px-4 hover:underline text-xl font-medium" : "py-2 px-4 hover:underline text-xl font-medium"} >
                {link.name}
            </NavLink>
        </div>
    )
}

export default NavLink
