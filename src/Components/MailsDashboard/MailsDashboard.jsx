"use client";

import { getTeamleader } from "@/lib/actions";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// async function updateCompany(companyId, updatedFields) {

//     // console.log("companyId in page.jsx", companyId);
//     // console.log("updatedFields: ", updatedFields);

//     try {
//         const response = await fetch(`http://localhost:3000/api/company/${companyId}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(updatedFields)
//         });

//         if (!response.ok) {
//             const errorMessage = await response.text();
//             throw new Error(errorMessage);
//         }

//         revalidatePath("/mails");
//         const data = await response.json();
//         console.log(data); // Success message
//     } catch (error) {
//         console.error('Error updating company:', error.message);
//     }
// }


async function AssignTl(updatedFields) {

    // console.log("companyId in page.jsx", companyId);
    // console.log("updatedFields: ", updatedFields);

    try {
        const response = await fetch(`http://localhost:3000/api/assigntl`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedFields)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log(data); // Success message
    } catch (error) {
        console.error('Error updating company:', error.message);
    }
}


const MailsDashboard = ({ data, teamleaders }) => {

    // const [data, setData] = useState(ogData);
    // console.log("data", data);
    // console.log("teamleaders:, ", teamleaders);

    const router = useRouter();



    // async function updateCompany(companyData) {
    //     try {
    //         const response = await fetch('/api/company', {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(companyData)
    //         });

    //         if (!response.ok) {
    //             const errorMessage = await response.text();
    //             // throw new Error(errorMessage);
    //             return {error: errorMessage};
    //         }

    //         const data = await response.json();
    //         console.log(data); // Success message
    //     } catch (error) {
    //         console.error('Error updating company:', error.message);
    //     }
    // }



    // const handleTeamleaderChange = (e, id) => {

    //     console.log("teamleadername selected:", e.target.value);
    //     const teamleader = teamleaders.filter((teamleader) => teamleader.username === e.target.value);
    //     // console.log("teamleader :", teamleader);
    //     const teamleaderId = teamleader[0]._id;
    //     // console.log("teamleaderId:", teamleaderId);

    //     //frontend
    //     // const updatedData = data.map((d) => {
    //     //     if (d._id === id) {
    //     //         return { ...d, teamleader: teamleaderId[0], teamleadername: e.target.value };
    //     //     }
    //     //     else {
    //     //         return d;
    //     //     }
    //     // })
    //     // console.log("teamleader", teamleaderId[0]);
    //     // console.log("teamleadername", e.target.value);
    //     // setData(updatedData);
    //     // useEffect(() => {
    //     //     const UpdateData = () => {
    //     //         const 
    //     //     }
    //     // })

    //     //backend
    //     // Example usage
    //     const companyId = id;
    //     const updatedFields = {
    //         teamleader: teamleaderId,
    //         teamleadername: e.target.value,
    //         message: "assign tl"
    //     };
    //     // console.log("companyId :", companyId);
    //     // console.log("updatedField:", updatedFields);

    //     updateCompany(companyId, updatedFields);
    // }

    const handleTeamleaderChange = (e, id) => {

        console.log("teamleadername selected:", e.target.value);
        const teamleader = teamleaders.filter((teamleader) => teamleader.username === e.target.value);
        // console.log("teamleader :", teamleader);
        const teamleaderId = teamleader[0]._id;
        // console.log("teamleaderId:", teamleaderId);

        //backend
        // Example usage
        const updatedFields = {
            companyId: id,
            teamleader: teamleaderId,
            teamleadername: e.target.value,
        };
        // console.log("companyId :", companyId);
        // console.log("updatedField:", updatedFields);

        AssignTl(updatedFields);
        router.refresh("/mails");
    }


    return (
        <div className="w-full h-auto flex justify-center mt-12">
            <div className="table w-4/5 h-full flex flex-col items-center justify-center gap-8">
                <div className="tablehead w-full flex flex-row mb-6" >
                    <div className="w-1/5 py-2 text-center font-bold text-white">Company</div>
                    <div className="w-1/5 py-2 text-center font-bold  text-white">Details</div>
                    <div className="w-1/5 py-2 text-center font-bold  text-white">Team Leader</div>
                    <div className="w-1/5 py-2 text-center font-bold  text-white">Status</div>
                    <div className="w-1/5 py-2 text-center font-bold  text-white">Rejected Teamleaders</div>
                </div>

                {data.map((d) => (
                    <div key={d._id} className="border-[1px] border-gray-500 rounded-xl w-full flex flex-row mb-8 py-4 justify-between gap-0 bg-white">
                        <div className="w-1/5 mx-2   flex justify-center items-center">{d.companyname}</div>
                        <div className="w-1/5  mx-2 flex justify-center items-center text-blue-500" ><a href={d.jobdetails} target="_blank" className="hover:underline">Clickhere</a></div>
                        {d.teamleadername === "unassigned" ? (
                            <select
                                name="teamleader"
                                value={d.teamleadername === "unassigned" ? "" : d.teamleadername}
                                onChange={(event) => handleTeamleaderChange(event, d._id)}
                                className="border-2 border-gray-400 w-1/5 py-2 pl-4">
                                <option value="" disabled>
                                    Select Teamleader
                                </option>
                                {teamleaders.filter((teamleader) => !d.rejectedTeamLeadersName.find(item => item === teamleader.username)).map((teamleader) => (
                                    <option key={teamleader._id} value={teamleader.username}>{teamleader.username}</option>
                                ))}
                            </select>
                        ) : (
                            <div className="w-1/5 mx-2   flex justify-center items-center">{d.teamleadername}</div>
                            // selectedTeamleader
                        )}
                        <div className={d.status === "in progress" ? " flex w-1/5  bg-red-600 text-white rounded-xl items-center justify-center h-auto mx-2 py-3" : "w-1/5   items-center flex justify-center h-auto mx-2 py-3"}>{d.status}</div>
                        <div className="w-1/5 mx-2  flex justify-center items-center">{d.rejectedTeamLeadersName.length === 0 ? "none" : d.rejectedTeamLeadersName}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MailsDashboard
