"use client";

import { useRouter } from "next/navigation";


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
            console.log(res.json());
        }
        const data = await res.json();
        console.log(data);

    }
    catch (err) {
        console.log("error sending companydetails to franchise", err);
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
            console.log(res.json());
        }
        const data = await res.json();
        console.log(data);

    }
    catch (err) {
        console.log("error sending companydetails to franchise", err);
    }
}

const AssignDashboardPage = ({ data, franchiseUnderMe, session }) => {
    const router = useRouter();

    const handleFranchiseChange = (e, id) => {

        // console.log("franchise name selected:", e.target.value);
        // console.log("company id to be updated: ", id);

        const franchise = franchiseUnderMe.filter((franchise) => franchise.username === e.target.value);
        // console.log("franchise: ", franchise);

        const franchiseId = franchise[0]._id;
        // console.log("franchiseId", franchiseId);

        const companyId = id;
        const updatedFields = {
            //only changes in Company model
            companyId: id,
            franchisename: e.target.value,
            franchise: franchiseId,
        };

        // console.log("companyId:", companyId);
        // console.log("updatedFields", updatedFields);

        AssignFr(updatedFields);
        router.refresh("/assign");
    }


    const handleCompanyReject = (id, companyname) => {
        console.log("company id rejected:", id);

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
        console.log("updatedFields", updatedFields);
        RejectTl(updatedFields)
        router.refresh("/assign");
    }

    return (
        <div className="lg:overflow-x-auto sm:w-full w-[90%] my-12 flex justify-center whitespace-nowrap bg-white rounded lg:m-0">
            <table className=" w-full h-full mt-12 flex flex-col items-center justify-center whitespace-nowrap  lg:w-full overflow-x-auto lg:m-0 ">
                <thead className="w-full ">
                    <tr className="w-full ">
                        <th className="min-w-[200px] py-2 border-[1px] border-gray-300 text-center font-bold whitespace-nowrap inline-block" >Company</th>
                        <th className="min-w-[200px] py-2 border-[1px] border-gray-300 text-center font-bold  whitespace-nowrap inline-block">Details</th>
                        <th className="min-w-[200px] py-2 border-[1px] border-gray-300 text-center font-bold whitespace-nowrap inline-block">Franchise</th>
                        <th className="min-w-[200px] py-2 border-[1px] border-gray-300 text-center font-bold  whitespace-nowrap inline-block">Status</th>
                        <th className="min-w-[200px] py-2 border-[1px] border-gray-300 text-center font-bold  whitespace-nowrap inline-block">Rejected Franchise</th>
                        <th className="min-w-[200px] py-2 border-[1px] border-gray-300 text-center font-bold  whitespace-nowrap inline-block">Reject</th>
                    </tr>
                </thead>

                {/* companies assigned to me by sh */}
                <tbody className="w-full">
                    {
                        data.map((d) => (

                            <tr key={d._id} className="w-full">

                                <td className="min-w-[200px] py-2 border-[1px] border-gray-300 text-center  whitespace-nowrap
                                inline-block">{d.companyname}</td>

                                <td className="min-w-[200px] py-2 border-[1px] border-gray-300 text-center  text-blue-500 whitespace-nowrap inline-block" ><a href={d.jobdetails} target="_blank" className="hover:underline">Click here</a></td>

                                {d.franchisename === "unassigned" ? (
                                    <td className="min-w-[200px] border-[1px] border-red-400 text-center  whitespace-nowrap inline-block ">

                                        <select
                                            name="franchisename"
                                            value={d.franchisename === "unassigned" ? "" : d.franchisename}
                                            onChange={(event) => handleFranchiseChange(event, d._id)}
                                            className="h-full w-full py-2 px-4">
                                            {/* <div className="min-h-[100px] overflow-y-auto"> */}
                                            <option value="" disabled>Select Franchise</option>
                                            {franchiseUnderMe.filter((franchise) => !d.rejectedFranchiseName.find(item => item === franchise.username)).map((franchise) => (

                                                <option key={franchise._id} value={franchise.username}>
                                                    {franchise.username}
                                                </option>
                                            ))}
                                            {/* </div> */}
                                        </select>

                                    </td>
                                ) : (

                                    <td className="min-w-[200px] items-center  py-2  border-[1px] border-gray-300 text-center  whitespace-nowrap inline-block ">{d.franchisename}</td>
                                )}

                                <td className="min-w-[200px] items-center border-[1px] border-gray-300 py-2 text-center  whitespace-nowrap inline-block">{d.status}</td>

                                <td className="min-w-[200px]  items-center border-[1px] border-gray-300 py-2 text-center whitespace-nowrap inline-block">
                                    {d.rejectedFranchiseName.length === 0 ? "none" :
                                        // (
                                        //     <td className="flex flex-col justify-center items-center">
                                        //         {d.rejectedFranchiseName.map((franchise) => (
                                        //             <p key={franchise} className="mx-2">{franchise}</p>
                                        //         ))}
                                        //     </td>
                                        // )
                                        d.rejectedFranchiseName.length
                                    }
                                </td>

                                <td className="min-w-[200px] h-auto py-1 border-[1px] border-gray-300 text-center inline-block whitespace-nowrap">
                                    <button className="bg-red-600  rounded-full px-4 py-1 text-white hover:text-blac hover:border-2 hover:border-red-600 hover:bg-white hover:text-red-600" onClick={() => handleCompanyReject(d._id, d.companyname)}>Reject</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table >
        </div>

    )
}

export default AssignDashboardPage
