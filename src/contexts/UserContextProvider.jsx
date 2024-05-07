"use client";

// import React, { useState, useMemo } from 'react';
import UserContext from './UserContext';
import { useSession } from 'next-auth/react';

const UserContextProvider = ({ children }) => {
    // console.log("UserContextProvider called");

    // const [memoizedSession, setMemoizedSession] = useState({}); //undefined or object
    // const [memoizedStatus, setMemoizedStatus] = useState(""); //loading or authenticated

    const { data: session, status } = useSession();
    // useMemo(() => {
    //     // console.log("computing session and status again")
    //     console.log("Updating memoized session");
    //     setMemoizedSession(session);
    //     setMemoizedStatus(status);
    // }, [memoizedStatus, memoizedSession]);

    return (
        <UserContext.Provider value={{ session: session, status: status }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
