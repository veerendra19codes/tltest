"use client";

import React, { useState, useEffect, useMemo } from 'react'

import TeamleaderContext from './TeamleaderContext'
import { getAllUsers } from '@/lib/actions';

const TeamleaderContextProvider = ({ children }) => {
    const [alltls, setAlltls] = useState([]);

    const teamleaders = useMemo(() => {
        const getAllTeamleaders = async () => {
            try {
                const AllUsers = await getAllUsers();
                const alltls = AllUsers.filter((user) => user.role === "tl");
                // setAlltls(alltls);
                return alltls;
            }
            catch (err) {
                console.log(err);
            }
        }
        getAllTeamleaders();
    }, [])
    console.log("teamleaders:", teamleaders);

    useEffect(() => {
        const getAllTeamleaders = async () => {
            try {
                const AllUsers = await getAllUsers();
                const alltls = AllUsers.filter((user) => user.role === "tl");
                setAlltls(alltls);
            }
            catch (err) {
                console.log(err);
            }
        }
        getAllTeamleaders();
    }, [])

    return (
        <TeamleaderContext.Provider value={{ alltls, setAlltls }} >
            {children}
        </TeamleaderContext.Provider>
    )
}

export default TeamleaderContextProvider
