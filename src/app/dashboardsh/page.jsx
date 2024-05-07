"use client";

import UserContext from "@/contexts/UserContext";
import { useState, useEffect, useContext } from "react";

import { getAllUsers } from "@/lib/actions";
import { useRouter } from "next/navigation";

const DashboardSHPage = () => {

    const { session, status } = useContext(UserContext);

    const router = useRouter();

    useEffect(() => {
        if (status === "loading") {
            return;
        } else if (session?.user?.role !== "sh") {
            router.back();
        }
    }, [status, session, router]);

    const [sortedData, setSortedData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

            const users = await getAllUsers();
            // console.log("all users", users);

            const data = users.filter((data) => data.role === "fr");

            const sortingData = [...data].sort((a, b) => a.teamleadername.localeCompare(b.teamleadername));
            setSortedData(sortingData);
        }
        fetchData();
    }, [])

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 15;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = sortedData.slice(firstIndex, lastIndex);
    const npage = Math.ceil(sortedData.length / recordsPerPage);
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

        <div className="flex justify-center items-center flex-col w-full px-24 lg:px-2 py-12 lg:py-4">

            <div className="Table w-full h-full flex flex-col items-center justify-center whitespace-nowrap lg:overflow-x-auto border-gray-400 border-y-[1px] bg-white rounded">
                <div className="w-full">
                    <div className="w-1/6 py-2 text-center font-bold whitespace-nowrap lg:w-[200px] inline-block lg:py-1 border-gray-400 border-y-[1px]">Teamleader</div>
                    <div className="w-1/6 py-2 text-center font-bold whitespace-nowrap lg:w-[200px] inline-block lg:py-1 border-gray-400 border-y-[1px]">Franchise</div>
                    <div className="w-1/6 py-2  text-center font-bold  whitespace-nowrap lg:w-[200px] inline-block lg:py-1 border-gray-400 border-y-[1px]">Level</div>
                    <div className="w-1/6 py-2  text-center font-bold  whitespace-nowrap lg:w-[200px] inline-block lg:py-1 border-gray-400 border-y-[1px]">Preference</div>
                    <div className="w-1/6 py-2  text-center font-bold  whitespace-nowrap lg:w-[200px] inline-block lg:py-1 border-gray-400 border-y-[1px]">Companies Accepted</div>
                    <div className="w-1/6 py-2  text-center font-bold  whitespace-nowrap lg:w-[200px] inline-block lg:py-1 border-gray-400 border-y-[1px]">Companies Rejected</div>

                </div>

                <div className="w-full">

                    {records.map((d) => (
                        <div key={d._id} className="w-full">

                            <div className="w-1/6 py-2 text-center whitespace-nowrap lg:w-[200px] inline-block lg:py-1 border-gray-400 border-y-[1px]">{d.teamleadername}</div>


                            <div className="w-1/6 py-2 text-center whitespace-nowrap lg:w-[200px] inline-block lg:py-1 border-gray-400 border-y-[1px]">{d.username}</div>


                            <div className="w-1/6 py-2 text-center whitespace-nowrap lg:w-[200px] inline-block lg:py-1 border-gray-400 border-y-[1px]" >{d.level}</div>

                            <div className="w-1/6 py-2 text-center whitespace-nowrap lg:w-[200px] inline-block lg:py-1 border-gray-400 border-y-[1px]" >{d.preference}</div>

                            <div className="w-1/6 py-2 text-center whitespace-nowrap lg:w-[200px] inline-block lg:py-1 border-gray-400 border-y-[1px]" >{d.companiesAccepted.length}</div>

                            <div className="w-1/6 py-2 text-center whitespace-nowrap lg:w-[200px] inline-block lg:py-1 border-gray-400 border-y-[1px]" >{d.companiesRejected.length}</div>



                        </div>
                    ))}
                </div>

            </div>

            <nav >
                <ul className="pagination flex mt-4 flex-wrap">
                    <li className="page-item border-y-[1px] border-black py-1 px-2 flex items-center bg-white cursor-pointer" onClick={prePage}>
                        <a href="#" className="page-link" >Prev</a>
                    </li>
                    <div className="flex flex-wrap">
                        {
                            numbers.map((n, i) => (
                                <li className={`page-item ${currentPage === n ? "active bg-blue-400 text-white border-y-[1px] border-black py-2 px-4" : "bg-white border-y-[1px] border-black py-2 px-4 cursor-pointer"}`} key={i} onClick={() => changePage(n)}>
                                    <button href="#" className="page-link"  >
                                        {n}
                                    </button>
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

export default DashboardSHPage
