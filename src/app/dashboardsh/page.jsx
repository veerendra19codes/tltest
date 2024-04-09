import { connectToDB } from "@/lib/connectToDB"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

//FETCHING DATA WITH API
const getUsers = async () => {
    // console.log("id insie getUser", id);
    const res = await fetch(`http://localhost:3000/api/user`);

    if (!res.ok) {
        console.log(res.json);
    }
    return res.json();
}

// //FETCHING DATA WITH API
// const getUser = async (id) => {
//     // console.log("id insie getUser", id);
//     const res = await fetch(`http://localhost:3000/api/user/${id}`);

//     if (!res.ok) {
//         console.log(res.json);
//     }
//     return res.json();
// }

const DashboardSHPage = async () => {

    const session = await getServerSession(authOptions);
    if (session === null) {
        redirect("/login");
    }
    const users = await getUsers();
    // console.log("all users", users);

    const data = users.filter((data) => data.role === "fr");

    const sortedData = [...data].sort((a, b) => a.teamleadername.localeCompare(b.teamleadername));


    return (
        <div className="flex flex-col justify-center items-center gap-8">
            {/* <h1 className="text-xl font-bold text-blue-500 mt-4">Select a Team Leader whose franchise's level matches with the job description and is currently not working</h1> */}
            <div className="table w-4/5 mt-12 h-full flex flex-col items-center justify-center gap-8">
                <div className="tablehead w-full flex flex-row mb-6" >
                    <div className="w-1/4 py-2 pl-4 text-center font-bold">Team Leader</div>
                    <div className="w-1/4 py-2 pl-4 text-center font-bold">Franchise</div>
                    <div className="w-1/4 py-2 pl-4 text-center font-bold">Level</div>
                    <div className="w-1/4 py-2 pl-4 text-center font-bold">Status</div>
                </div>

                {sortedData.map((d) => (
                    <div key={d._id} className="border-[1px] border-gray-500 rounded-xl w-full flex flex-row mb-8 py-4">
                        <div className="w-1/4 mx-2  pl-4 flex justify-center items-center">{d.teamleadername}</div>
                        <div className="w-1/4 mx-2  pl-4 flex justify-center items-center">{d.username}</div>
                        <div className="w-1/4 mx-2  pl-4 flex justify-center items-center">{d.level}</div>
                        <div className={d.companiesWorkingName.length === 0 ? " flex w-1/4  text-center bg-red-700 text-white rounded-xl items-center justify-center h-auto mx-2 py-1" : "w-1/4  pl-4 text-center items-center flex bg-green-600 text-white justify-center h-auto mx-2 rounded-xl py-1"}>{d.companiesWorkingName.length === 0 ? "free" : d.companiesWorkingName}</div>
                    </div>
                ))}
            </div>
        </div >

    )
}

export default DashboardSHPage
