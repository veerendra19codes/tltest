"use client";

import { connectToDB } from "@/lib/connectToDB"
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getAllUsers } from "@/lib/actions";
import TLCharts from "@/Components/TLCharts/TLCharts";
import { useSession } from "next-auth/react";

//FETCHING DATA WITH API
// const getUsers = async () => {
//     // console.log("id insie getUser", id);
//     const res = await fetch(`http://localhost:3000/api/user`);

//     if (!res.ok) {
//         console.log(res.json);
//     }
//     return res.json();
// }

const DashboardTLPage = () => {
    // const session = await getServerSession(authOptions);
    const session = useSession();
    console.log("session in dashboardtl:", session);

    if (session === null) {
        redirect("/login");
    }

    // const [franchise, setFranchise] = useState([]);

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         const users = await getAllUsers();
    //     }
    //     const data = users.reverse().filter((data) => data.teamleader === session.user?.id);
    //     setFranchise(data);
    //     console.log(franchise);
    //     fetchUsers();
    // }, [])
    // console.log("all users", users);

    //franchiseUnderMe
    // console.log(data);

    return (
        <div className="flex justify-center items-center flex-col">
            hello

            {/* <div className="table w-4/5 h-full mt-12 flex flex-col items-center justify-center gap-8">
                <div className="tablehead w-full flex flex-row mb-6" >
                    <div className="w-1/5 py-2 text-center font-bold">Franchise under me</div>
                    <div className="w-1/5 py-2 text-center font-bold">Franchise level</div>
                    <div className="w-1/5 py-2  text-center font-bold">Companes working</div>
                    <div className="w-1/5 py-2  text-center font-bold">Companies Completed</div>
                    <div className="w-1/5 py-2 text-center font-bold">Companies Rejected</div>

                </div> */}

            {/* franchiseUnderMe */}
            {/* {data.map((d) => (
                    <div key={d._id} className="border-[1px] border-gray-500 rounded-xl w-full flex flex-row mb-8 py-4">
                        <div className="w-1/5 mx-2  flex justify-center items-center">{d.username}</div>
                        <div className="w-1/5  text-center items-center flex justify-center h-auto mx-2">{d.level}</div>
                        <div className={d.companiesWorkingName.length === 0 ? "w-1/5   items-center flex justify-center h-auto mx-2 bg-green-500 rounded-xl text-white" : "w-1/5  items-center flex justify-center h-auto mx-2"}>{d.companiesWorkingName.length === 0 ? "none" : d.companiesWorkingName}</div>
                        <div className="w-1/5   items-center flex justify-center h-auto mx-2">{d.companiesCompletedName.length === 0 ? "none" : d.companiesCompletedName}</div>
                        <div className="w-1/5  items-center flex justify-center h-auto mx-2">{d.companiesRejectedName.length === 0 ? " none" : d.companiesRejectedName}</div>
                    </div>
                ))} */}
            {/* </div> */}

            {/* <select
                name="franchise"
                value={franchise}
                className="border-2 border-gray-400 w-full py-2 pl-4 sm:py-1" onChange={(e) => handleInput(e)}>

                <option value="" disabled={true} className="py-1">Select franchise</option>
                {franchise.map((f) => (
                    <option key={f._id} value={f.username} className="py-1">{f.username}</option>
                ))}
            </select> */}
        </div>

    )
}

export default DashboardTLPage
