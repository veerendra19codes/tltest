"use client";

import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const AssignFr = async (updatedFields) => {

    try {
        const res = await fetch(`/api/assignfr`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFields),
        })

        if (!res.ok) {
            // console.log(res.json());
        }
        const data = await res.json();
        // console.log("updated company object:", data);
    }
    catch (err) {
        // console.log("error sending companydetails to franchise", err);
    }
}

const RejectTl = async (updatedFields) => {

    try {
        const res = await fetch(`/api/rejecttl`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFields),
        })

        if (!res.ok) {
            // console.log(res.json());
        }
        const data = await res.json();
        // console.log(data);

    }
    catch (err) {
        // console.log("error sending companydetails to franchise", err);
    }
}

const AssignDashboardPage = ({ data, franchiseUnderMe, session }) => {
    const router = useRouter();
    // const [isOpen, setIsOpen] = useState(false);


    //using default select tag
    // const handleFranchiseChange = (e, id) => {

    //     console.log("franchise name selected:", e.target.value);
    //     console.log("company id to be updated: ", id);

    //     const franchise = franchiseUnderMe.filter((franchise) => franchise.username === e.target.value);
    //     // console.log("franchise: ", franchise);

    //     const franchiseId = franchise[0]._id;
    //     // console.log("franchiseId", franchiseId);

    //     const companyId = id;
    //     const updatedFields = {
    //         //only changes in Company model
    //         companyId: id,
    //         franchisename: e.target.value,
    //         franchise: franchiseId,
    //     };

    //     // console.log("companyId:", companyId);
    //     // console.log("updatedFields", updatedFields);


    //     AssignFr(updatedFields);
    //     router.refresh("/assign");
    //     revalidatePath("/dashboardbd");
    //     revalidatePath("/dashboardsh");
    //     revalidatePath("/assign");
    // }


    const handleCompanyReject = (id, companyname) => {
        // console.log("company id rejected:", id);

        const updatedFields = {
            companyId: id,
            //changes in Company Model
            teamleader: null, //set
            teamleadername: "unassigned", //set
            franchise: null, //set
            franchisename: "unassigned", //set
            rejectedTeamLeaders: session.user?.id, //push
            rejectedTeamLeadersName: session.user?.username, //push

            userId: session.user?.id,
            //changes in User Model
            companiesRejected: id,
            companiesRejectedName: companyname,
        }
        // console.log("updatedFields", updatedFields);
        RejectTl(updatedFields)
        router.refresh("/assign");
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

    const handleSelectChange = (selectedValue, id) => {
        // console.log("selectedValue:", selectedValue);
        // console.log("company id:", id);

        const franchise = franchiseUnderMe.filter((franchise) => franchise.username === selectedValue);
        // console.log("franchise: ", franchise);

        const franchiseId = franchise[0]._id;
        // console.log("franchiseId", franchiseId);

        const updatedFields = {
            //only changes in Company model
            companyId: id,
            franchisename: selectedValue,
            franchise: franchiseId,
        };

        // console.log("companyId:", companyId);
        // console.log("updatedFields", updatedFields);


        AssignFr(updatedFields);
        router.refresh("/assign");
        router.refresh("/dashboardbd");
        router.refresh("/dashboardsh");


        // revalidatePath("/dashboardbd");
        // revalidatePath("/dashboardsh");
        // revalidatePath("/assign");
    }


    return (
        <div className="w-full py-12 px-24 flex flex-col justify-center items-center lg:m-0 lg:px-2 lg:py-4">
            <div className="Table w-full h-full flex flex-col items-center justify-center whitespace-nowrap overflow-x-auto bg-white border-y-[1px] border-gray-400">
                <div className="w-full ">
                    <div className="w-1/6 py-2 border-y-[1px] border-gray-300 text-center font-bold whitespace-nowrap inline-block lg:w-[250px] lg:py-1 " >Company</div>
                    <div className="w-1/6 py-2 border-y-[1px] border-gray-300 text-center font-bold  whitespace-nowrap inline-block lg:w-[250px] lg:py-1 ">Details</div>
                    <div className="w-1/6 py-2 border-y-[1px] border-gray-300 text-center font-bold whitespace-nowrap inline-block lg:w-[250px] lg:py-1 ">Franchise</div>
                    <div className="w-1/6 py-2 border-y-[1px] border-gray-300 text-center font-bold  whitespace-nowrap inline-block lg:w-[250px] lg:py-1 ">Status</div>
                    <div className="w-1/6 py-2 border-y-[1px] border-gray-300 text-center font-bold  whitespace-nowrap inline-block lg:w-[250px] lg:py-1 ">Rejected Franchise</div>
                    <div className="w-1/6 py-2 border-y-[1px] border-gray-300 text-center font-bold  whitespace-nowrap inline-block lg:w-[250px] lg:py-1 ">Reject</div>
                </div>

                <div className="w-full">
                    {
                        records.map((d) => (

                            <div key={d._id} className="w-full">

                                <div className="w-1/6 py-2 border-y-[1px] border-gray-300 text-center  whitespace-nowrap
                                inline-block lg:w-[250px]">{d.companyname}</div>

                                <div className="w-1/6 py-2 border-y-[1px] border-gray-300 text-center  text-blue-500 whitespace-nowrap inline-block lg:w-[250px]" ><a href={d.jobdetails} target="_blank" className="hover:underline">Click here</a></div>

                                {d.franchisename === "unassigned" ? (
                                    <div className="w-1/6  text-center  whitespace-nowrap inline-block lg:w-[250px]">

                                        {/* <select
                                            name="franchisename"
                                            value={d.franchisename === "unassigned" ? "" : d.franchisename}
                                            onChange={(event) => handleFranchiseChange(event, d._id)}
                                            className="h-full w-full py-2 lg:py-0">
                                            <option value="" disabled>Select Franchise</option>
                                            {franchiseUnderMe.filter((franchise) => !d.rejectedFranchiseName.find(item => item === franchise.username)).map((franchise) => (

                                                <option key={franchise._id} value={franchise.username}>
                                                    {franchise.username}
                                                </option>
                                            ))}
                                        </select> */}

                                        <Select
                                            onValueChange={(selectedValue) => handleSelectChange(selectedValue, d._id)}
                                            className="h-1 border-y-[1px] border-gray-300 rounded-none"
                                        >
                                            <SelectTrigger className="w-[280px">
                                                <SelectValue placeholder="Select Franchise" />
                                            </SelectTrigger>
                                            <SelectContent className="h-[150px]">
                                                {franchiseUnderMe.reverse().map((f) => (
                                                    <SelectItem key={f._id} value={f.username} className="py-1">{f.username}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                    </div>
                                ) : (

                                    <div className="w-1/6 items-center  py-2  border-y-[1px] border-gray-300 text-center  whitespace-nowrap inline-block lg:w-[250px]">{d.franchisename}</div>
                                )}

                                <div className="w-1/6 items-center border-y-[1px] border-gray-300 py-2 text-center  whitespace-nowrap inline-block lg:w-[250px]">{d.status}</div>

                                <div className="w-1/6  items-center border-y-[1px] border-gray-300 py-2 text-center whitespace-nowrap inline-block lg:w-[250px]">
                                    {d.rejectedFranchiseName.length === 0 ? "none" :
                                        d.rejectedFranchiseName.length
                                    }
                                </div>

                                <div className="w-1/6 h-auto  border-y-[1px] border-gray-300 text-center inline-block whitespace-nowrap py-2 lg:w-[250px]">
                                    <button className="bg-red-600  rounded-full px-4  text-white hover:text-blac hover:border-2 hover:border-red-600 hover:bg-white hover:text-red-600" onClick={() => handleCompanyReject(d._id, d.companyname)}>Reject</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div >

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
        </div>

    )
}

export default AssignDashboardPage
