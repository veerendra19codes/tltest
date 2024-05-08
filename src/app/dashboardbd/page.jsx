"use client";

import UserContext from "@/contexts/UserContext";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { getAllCompanies } from '@/lib/actions';
import { useSession } from "next-auth/react";



const DashboardBD = () => {
    // const { session, status } = useContext(UserContext);
    const { data: session, status } = useSession();

    useEffect(() => {
        const fetchData = async () => {
            console.log('computing new again')
            try {
                console.log("yaha aagaya")
                const res = await getAllCompanies();
                console.log("yaha nahi aa pa rha ")
                console.log("res", res);
                // setResStatus(res.status);
                // if (res.status === 200 || res.status === 200) {
                //     const mycompanies = res.data.filter((company) => company.createdBy === (session?.user?.id));
                //     setData(mycompanies);
                // }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error("Error fetching data:", error);
            }
        }

        if (session?.user?.role !== "bd") {
            router.back();
        }
        else {
            fetchData();
        }
    }, [])

    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [resStatus, setResStatus] = useState(400);

    const [data, setData] = useState([]);

    // const fetchData = async () => {
    //     console.log('computing new again')
    //     try {
    //         console.log("yaha aagaya")
    //         const res = await getAllCompanies();
    //         console.log("yaha nahi aa pa rha ")
    //         console.log("res", res);
    //         // setResStatus(res.status);
    //         // if (res.status === 200 || res.status === 200) {
    //         //     const mycompanies = res.data.filter((company) => company.createdBy === (session?.user?.id));
    //         //     setData(mycompanies);
    //         // }
    //         setLoading(false);
    //     } catch (error) {
    //         setLoading(false);
    //         console.error("Error fetching data:", error);
    //     }
    // }
    // useEffect(() => {
    //     fetchData();
    //     console.log("data:", data);
    // }, [])
    // session?.user?.id


    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 15;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = data?.slice(firstIndex, lastIndex);
    const npage = Math.ceil(data?.length / recordsPerPage);
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

    const formatCreatedAtDate = (createdAt) => {
        const createdAtDate = new Date(createdAt);
        const formattedDate = createdAtDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).replace(/\//g, '-'); // Replace slashes widiv dashes

        return formattedDate;
    }

    const formatTime12hr = (timeString) =>
        new Date(timeString).toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });

    // status, session, router

    return (
        <div className="flex justify-center items-center flex-col w-full lg:px-2 px-24 py-12 lg:py-4">
            {loading && <div className="text-white">Loading...</div>}
            {!loading && resStatus === 200 && (
                <>
                    <div className="Table w-full h-full flex flex-col items-center justify-center sm:mt-4 whitespace-nowrap  lg:overflow-x-auto border-gray-400 border-y-[1px] bg-white roundedlg:overflow-x-auto ">

                        <div className="w-full">
                            <div className="w-1/6 py-2 text-center font-bold whitespace-nowrap lg:w-[250px] inline-block lg:py-1 border-gray-400 border-y-[1px]">Company</div>
                            <div className="w-1/6 py-2 text-center font-bold whitespace-nowrap lg:w-[250px] inline-block lg:py-1 border-gray-400 border-y-[1px]">Details</div>
                            <div className="w-1/6 py-2  text-center font-bold  whitespace-nowrap lg:w-[250px] inline-block lg:py-1 border-gray-400 border-y-[1px]">Team Leader</div>
                            <div className="w-1/6 py-2 text-center font-bold whitespace-nowrap lg:w-[250px] inline-block lg:py-1 border-gray-400 border-y-[1px]">Franchise</div>
                            <div className="w-1/6 py-2 text-center font-bold whitespace-nowrap lg:w-[250px] inline-block lg:py-1 border-gray-400 border-y-[1px]">Status</div>
                            <div className="w-1/6 py-2 text-center font-bold whitespace-nowrap lg:w-[250px] inline-block lg:py-1 border-gray-400 border-y-[1px]">Created At</div>
                        </div>


                        {records.reverse().map((d) => (
                            <div key={d._id} className="w-full" >
                                <div className="w-1/6 py-2 text-center whitespace-nowrap lg:w-[250px] inline-block lg:py-1 border-gray-400 border-y-[1px]">{d.companyname}</div>

                                <div className="w-1/6 py-2 text-center whitespace-nowrap lg:w-[250px] inline-block lg:py-1 border-gray-400 border-y-[1px] hover:underline text-blue-500"><a href={d.jobdetails} target="_blank">Click here</a></div>

                                <div className={d.teamleadername === "unassigned" ? "w-1/6 py-2 text-center whitespace-nowrap lg:w-[250px] inline-block lg:py-1 border-gray-400 border-y-[1px] text-red-700" : "w-1/6 py-2 text-center whitespace-nowrap lg:w-[250px] inline-block lg:py-1 border-gray-400 border-y-[1px]"} >{d.teamleadername}</div>

                                <div className={d.franchisename === "unassigned" ? "w-1/6 py-2 text-center whitespace-nowrap lg:w-[250px] inline-block lg:py-1 border-gray-400 border-y-[1px] text-red-700" : "w-1/6 py-2 text-center whitespace-nowrap lg:w-[250px] inline-block lg:py-1 border-gray-400 border-y-[1px]"}>{d.franchisename}</div>

                                <div className={d.status === "in progress" ? "w-1/6 py-2 text-center whitespace-nowrap lg:w-[250px] inline-block lg:py-1 border-gray-400 border-y-[1px] text-yellow-500" : "w-1/6 py-2 text-center whitespace-nowrap lg:w-[250px] inline-block lg:py-1 border-gray-400 border-y-[1px] text-green-500"}>{d.status}</div>


                                <div className="w-1/6 py-2 text-center whitespace-nowrap lg:w-[250px] inline-block lg:py-1 border-gray-400 border-y-[1px] ">{formatTime12hr(d.createdAt)},{formatCreatedAtDate(d.createdAt)}</div>
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
                </>
            )}
            {resStatus !== 200 && !loading && (
                <div className="text-white">Something went wrong..</div>
            )}
        </div >

    )
}

export default DashboardBD


