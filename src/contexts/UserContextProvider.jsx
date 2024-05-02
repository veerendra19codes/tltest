"use client";

import React from 'react'

import UserContext from './UserContext'
import { useSession } from 'next-auth/react'

const UserContextProvider = ({ children }) => {
    const { data: session, status } = useSession();
    console.log("user context");

    return (
        <UserContext.Provider value={{ session, status }} >
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
