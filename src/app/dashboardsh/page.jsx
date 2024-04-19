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

const DashboardSHPage = async () => {

    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/login");
    }
    else if (session.user?.role !== "sh") {
        redirect("/");
    }
    const users = await getUsers();
    // console.log("all users", users);

    const data = users.filter((data) => data.role === "fr");

    const sortedData = [...data].sort((a, b) => a.teamleadername.localeCompare(b.teamleadername));


    return (
        <div className="flex flex-col justify-center items-center gap-8">
            {/* <h1 className="text-xl font-bold text-blue-500 mt-4">Select a Team Leader whose franchise's level matches with the job description and is currently not working</h1> */}
            <div className="Table w-4/5 mt-12 h-full flex flex-col items-center justify-center gap-8">
                <div className="tablehead w-full flex flex-row mb-6" >
                    <div className="w-1/4 py-2 pl-4 text-center font-bold text-white">Team Leader</div>
                    <div className="w-1/4 py-2 pl-4 text-center font-bold text-white">Franchise</div>
                    <div className="w-1/4 py-2 pl-4 text-center font-bold text-white">Level</div>
                    <div className="w-1/4 py-2 pl-4 text-center font-bold text-white">Status</div>
                </div>

                {sortedData.map((d) => (
                    <div key={d._id} className="border-[1px] border-gray-500 rounded-xl w-full flex flex-row mb-8 py-4 bg-white">
                        <div className="w-1/4 mx-2  pl-4 flex justify-center items-center">{d.teamleadername}</div>
                        <div className="w-1/4 mx-2  pl-4 flex justify-center items-center">{d.username}</div>
                        <div className="w-1/4 mx-2  pl-4 flex justify-center items-center">{d.level}</div>
                        <div className={d.companiesWorkingName.length === 0 ? " flex w-1/4  text-center bg-red-700 text-white rounded-xl items-center justify-center h-auto mx-2 py-1" : "w-1/4  pl-4 text-center items-center flex bg-green-600 text-white justify-center h-auto mx-2 rounded-xl py-1"}>{d.companiesWorkingName.length === 0 ? "free" : d.companiesWorkingName}</div>
                    </div>
                ))}
            </div>
        </div >

        // <div className="flex justify-center items-center flex-col w-full overflow-x-hidden">
        //     <div className="lg:overflow-x-auto sm:w-full w-[90%] mt-12 flex justify-center whitespace-nowrap bg-white rounded-xl">
        //         <table className="table w-[90%] h-full flex flex-col items-center justify-center gap-8 sm:mt-4 whitespace-nowrap">
        //             <thead>
        //                 <tr>

        //                     <th className="w-1/4 py-2 pl-4 text-center font-bold">Team Leader</th>
        //                     <th className="w-1/4 py-2 pl-4 text-center font-bold">Franchise</th>
        //                     <th className="w-1/4 py-2 pl-4 text-center font-bold">Level</th>
        //                     <th className="w-1/4 py-2 pl-4 text-center font-bold">Status</th>
        //                 </tr>
        //             </thead>

        //             <tbody>
        //                 {sortedData.map((d) => (
        //                     <tr key={d._id} className="border-[1px]  w-full flex flex-row w-full whitespace-nowrap">
        //                         <td className="w-1/4 px-2 pl-4 flex justify-center items-center whitespace-nowrap sm:w-[200px] inline-block border-[1px] border-black">{d.teamleadername}</td>
        //                         <td className="w-1/4 mx-2  pl-4 flex justify-center items-center">{d.username}</td>
        //                         <td className="w-1/4 mx-2  pl-4 flex justify-center items-center">{d.level}</td>
        //                         <td className={d.companiesWorkingName.length === 0 ? " flex w-1/4  text-center bg-red-700 text-white rounded-xl items-center justify-center h-auto mx-2 py-1" : "w-1/4  pl-4 text-center items-center flex bg-green-600 text-white justify-center h-auto mx-2 rounded-xl py-1"}>{d.companiesWorkingName.length === 0 ? "free" : d.companiesWorkingName}</td>
        //                     </tr>
        //                 ))}
        //             </tbody>
        //         </table>
        //     </div>
        // </div>
    )
}

export default DashboardSHPage
