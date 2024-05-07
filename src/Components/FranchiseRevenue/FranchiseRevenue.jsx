"use client";

import { getAllUsers } from "@/lib/actions";
import { useEffect, useState } from "react";

const FranchiseRevenue = ({ username, teamleadername }) => {
    // console.log("username in Franchise Revenue:", username);
    // console.log("teamleadername in FranchiseRevenue:", teamleadername);

    const [revenuegained, setRevenuegained] = useState(0);
    const [revenuelost, setRevenuelost] = useState(0);
    const [url, setUrl] = useState("");
    const [tlname, setTlname] = useState(teamleadername);
    // console.log('tlname:', tlname);

    useEffect(() => {
        const getteamleaderurl = async () => {
            try {
                // console.log("hello inside useEffect");
                const allUsers = await getAllUsers();
                // console.log("allUsers:", allUsers);

                const teamleaderarr = allUsers.filter((user) => user.username === teamleadername)
                // console.log("teamleaderarr:", teamleaderarr);
                const teamleaderobj = teamleaderarr[0];
                // console.log("teamleaderobj:", teamleaderobj);

                setUrl(teamleaderobj.revenueapi);
                // console.log("url:", url);
            }
            catch (err) {
                // console.log("error getting teamleader deployed url:", err);
            }
        }
        getteamleaderurl();
    }, [tlname]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // console.log("url:", url);

                const response = await fetch(url);

                const data = await response.json();
                // console.log('data: ', data);

                const franchiseData = data.filter((d) => d.nameoffranchisee.replace(/\s/g, '').toLowerCase() === username.replace(/\s/g, '').toLowerCase());
                // console.log("franchiseData:", franchiseData);

                const statusEntry = franchiseData[0];
                // console.log("statusEntry:", statusEntry);

                const rg = statusEntry.closed || 0;
                const rl = statusEntry.cancel || 0;
                setRevenuegained(rg);
                setRevenuelost(rl);


            } catch (error) {
                setRevenuegained(0);
                setRevenuelost(0);
                // console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [url]);
    return (
        <div className="w-full franchiserevenue flex justify-center items-center gap-4 lg:flex-row lg:text-xs lg:px-2">

            <div className="revenuegained flex flex-col justify-around items-center bg-green-500 rounded-xl w-full py-4 px-8 h-[80px]">
                <div className="title font-bold text-white text-center">Revenue Gained</div>
                <div className="title font-bold text-white text-center">Rs.{revenuegained}</div>
            </div>

            <div className="revenuelost flex flex-col justify-around items-center bg-red-500 rounded-xl w-full py-4 px-8 h-[80px]">
                <div className="title font-bold text-white text-center">Revenue Lost</div>
                <div className="title font-bold text-white text-center">Rs.{revenuelost}</div>
            </div>

        </div>
    )
}

export default FranchiseRevenue
