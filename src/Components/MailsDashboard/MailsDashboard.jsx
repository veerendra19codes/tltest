"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

async function AssignTl(updatedFields) {

    // console.log("companyId in page.jsx", companyId);
    // console.log("updatedFields: ", updatedFields);

    try {
        const response = await fetch(`/api/assigntl`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedFields)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            // throw new Error(errorMessage);
        }

        const data = await response.json();
        return;
        // console.log(data); // Success message
    } catch (error) {
        // console.error('Error updating company:', error.message);
    }
}


const MailsDashboard = ({ data, teamleaders }) => {
    //how to get server side props into client side Component and how to implement lazy loading

    // console.log("data", data);
    // console.log("teamleaders:, ", teamleaders);


    const router = useRouter();

    const handleTeamleaderChange = (e, id) => {

        // console.log("teamleadername selected:", e.target.value);
        const teamleader = teamleaders.filter((teamleader) => teamleader.username === e.target.value);
        console.log("teamleader :", teamleader);
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


    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 15;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = data.slice(firstIndex, lastIndex);
    const npage = Math.ceil(data.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    const prePage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const nextPage = () => {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1);
        }
    }

    const changePage = (id) => {
        setCurrentPage(id);
    }

    return (
        <div className="flex justify-center items-center flex-col w-full py-12 lg:py-4 lg:px-2 px-24">

            <div className="Table w-full h-full flex flex-col items-center justify-center sm:mt-4 whitespace-nowrap lg:overflow-x-auto border-gray-400 border-y-[1px] bg-white">
                <div className="w-full">
                    <div className="w-1/5 py-2 text-center font-bold whitespace-nowrap sm:w-[200px] inline-block lg:py-1 border-gray-400 border-y-[1px]">Company</div>
                    <div className="w-1/5 py-2 text-center font-bold whitespace-nowrap sm:w-[200px] inline-block lg:py-1 border-gray-400 border-y-[1px]">Details</div>
                    <div className="w-1/5 py-2  text-center font-bold  whitespace-nowrap sm:w-[200px] inline-block lg:py-1 border-gray-400 border-y-[1px]">Team Leader</div>
                    <div className="w-1/5 py-2 text-center font-bold whitespace-nowrap sm:w-[200px] inline-block lg:py-1 border-gray-400 border-y-[1px]">Status</div>
                    <div className="w-1/5 py-2 text-center font-bold whitespace-nowrap sm:w-[200px] inline-block lg:py-1 border-gray-400 border-y-[1px]">Rejected</div>
                </div>


                {records.map((d) => (
                    <div key={d._id} className="w-full">

                        <div className="w-1/5 py-2 text-center whitespace-nowrap sm:w-[200px] inline-block lg:py-1 border-gray-400 border-y-[1px]">{d.companyname}</div>

                        <div className="w-1/5 py-2 text-center whitespace-nowrap sm:w-[200px] inline-block lg:py-1 border-gray-400 border-y-[1px] hover:underline text-blue-500"><a href={d.jobdetails} target="_blank">Click here</a></div>

                        <div className={d.teamleadername === "unassigned" ? "w-1/5 text-center whitespace-nowrap sm:w-[200px] inline-block lg:py-1 border-gray-400 border-y-[1px]" : "w-1/5 text-center py-2 whitespace-nowrap sm:w-[200px] inline-block lg:py-1 border-gray-400 border-y-[1px]"}>
                            {d.teamleadername === "unassigned" ? (
                                <select
                                    name="teamleader"
                                    value={d.teamleadername === "unassigned" ? "" : d.teamleadername}
                                    onChange={(event) => handleTeamleaderChange(event, d._id)}
                                    className="w-full py-2 pl-4 lg:py-0">
                                    <option value="" disabled>
                                        Select Teamleader
                                    </option>
                                    {teamleaders.filter((teamleader) => !d.rejectedTeamLeadersName.find(item => item === teamleader.username)).map((teamleader) => (
                                        <option key={teamleader._id} value={teamleader.username}>{teamleader.username}</option>
                                    ))}
                                </select>
                            ) : (
                                <div className="w-full text-center">{d.teamleadername}</div>
                            )}
                        </div>

                        <div className={d.status === "in progress" ? "w-1/5 py-2 text-center whitespace-nowrap sm:w-[200px] inline-block lg:py-1 border-gray-400 border-y-[1px] text-red-700" : "w-1/5 py-2 text-center whitespace-nowrap sm:w-[200px] inline-block lg:py-1 border-gray-400 border-y-[1px]"}>{d.status}</div>

                        <div className="w-1/5 py-2 text-center whitespace-nowrap sm:w-[200px] inline-block lg:py-1 border-gray-400 border-y-[1px]">{d.rejectedTeamLeadersName.length}</div>
                    </div>
                ))}

            </div>

            <nav >
                <ul className="pagination flex mt-4 flex-wrap">
                    <li className="page-item border-y-[1px] border-black py-1 px-2 flex items-center bg-white cursor-pointer" onClick={prePage}>
                        <a href="#" className="page-link" >Prev</a>
                    </li>
                    <div className="flex flex-wrap">
                        {
                            numbers.map((n, i) => (
                                <li className={`page-item ${currentPage === n ? "active bg-blue-400 text-white border-y-[1px] border-black py-2 px-4 cursor-pointer" : "bg-white border-y-[1px] border-black py-2 px-4 cursor-pointer"}`} key={i} onClick={() => changePage(n)}>
                                    <a href="#" className="page-link"  >
                                        {n}
                                    </a>
                                </li>
                            ))
                        }
                    </div>
                    <li className="page-item border-y-[1px] border-black py-1 px-2 flex items-center bg-white cursor-pointer" onClick={nextPage}>
                        <a href="#" className="page-link"  >Next</a>
                    </li>
                </ul>
            </nav>
        </div >
    )
}

export default MailsDashboard
