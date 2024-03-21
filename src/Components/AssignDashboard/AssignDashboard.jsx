"use client";

import { useRouter } from "next/navigation";

// const updateCompany = async (companyId, updatedFields) => {

//     try {
//         const res = await fetch(`/api/company/${companyId}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(updatedFields),
//         })

//         if (!res.ok) {
//             console.log(res.json());
//         }
//         const data = await res.json();
//         console.log(data);

//     }
//     catch (err) {
//         console.log("error sending companydetails to franchise", err);
//     }
// }


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

    // console.log("data", data);
    // console.log("franchiseUnderMe:", franchiseUnderMe);

    // const handleFranchiseChange = (e, id) => {

    //     // console.log("franchise name selected:", e.target.value);
    //     // console.log("company id to be updated: ", id);

    //     const franchise = franchiseUnderMe.filter((franchise) => franchise.username === e.target.value);
    //     // console.log("franchise: ", franchise);

    //     const franchiseId = franchise[0]._id;
    //     // console.log("franchiseId", franchiseId);

    //     const companyId = id;
    //     const updatedFields = {
    //         franchisename: e.target.value,
    //         franchise: franchiseId,
    //         message: "assign fr"
    //     };

    //     // console.log("companyId:", companyId);
    //     // console.log("updatedFields", updatedFields);

    //     updateCompany(companyId, updatedFields);
    //     router.refresh("/assign");
    // }

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

    // const handleCompanyReject = (id) => {
    //     console.log("company id rejected:", id);

    //     const companyId = id;
    //     const updatedFields = {

    //         //changes in Company Model
    //         teamleader: null,
    //         teamleadername: "unassigned",
    //         franchise: null,
    //         franchisename: "unassigned",
    //         rejectedTeamLeaders: session.user?.id,
    //         rejectedTeamLeadersName: session.user?.username,

    //         message: "reject tl",

    //         //changes in User Model
    //         //none as of now

    //     }
    //     console.log("companyId", companyId);
    //     console.log("updatedFields", updatedFields);
    //     updateCompany(companyId, updatedFields)
    //     router.refresh("/assign");
    // }


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
        <div className="w-full h-full flex justify-center items-center">
            <div className="table w-4/5 h-full mt-12 flex flex-col items-center justify-center gap-8">
                <div className="tablehead w-full flex flex-row mb-6" >
                    <div className="w-1/5 py-2 text-center font-bold">Company</div>
                    <div className="w-1/5 py-2 text-center font-bold">Details</div>
                    <div className="w-1/5 py-2 text-center font-bold">Franchise</div>
                    <div className="w-1/5 py-2 text-center font-bold">Status</div>
                    <div className="w-1/5 py-2 text-center font-bold">Rejected Franchise</div>
                    <div className="w-1/5 py-2 text-center font-bold">Reject</div>
                </div>

                {/* companies assigned to me by sh */}
                {data.map((d) => (
                    <div key={d._id} className="border-[1px] border-gray-500 rounded-xl w-full flex flex-row mb-8 py-4">
                        <div className="w-1/6 mx-2  flex justify-center items-center">{d.companyname}</div>
                        <div className="w-1/6  mx-2  flex justify-center items-center text-blue-500" ><a href={d.jobdetails} target="_blank" className="hover:underline">Click here</a></div>
                        {d.franchisename === "unassigned" ? (
                            <select
                                name="franchisename"
                                value={d.franchisename === "unassigned" ? "" : d.franchisename}
                                onChange={(event) => handleFranchiseChange(event, d._id)}
                                className="border-2 border-gray-400 w-1/6 py-2 pl-4">
                                <option value="" disabled>Select Franchise</option>
                                {franchiseUnderMe.filter((franchise) => !d.rejectedFranchiseName.find(item => item === franchise.username)).map((franchise) => (
                                    <option key={franchise._id} value={franchise.username}>
                                        {franchise.username}
                                    </option>
                                ))}
                            </select>
                        ) : (

                            <div className="w-1/6 items-center flex justify-center h-auto mx-2">{d.franchisename}</div>
                        )}
                        <div className="w-1/6  items-center flex justify-center h-auto mx-2">{d.status}</div>
                        <div className="w-1/6  items-center flex justify-center h-auto mx-2">
                            {d.rejectedFranchiseName.length === 0 ? "none" :
                                (
                                    <div className="flex flex-col justify-center items-center">
                                        {d.rejectedFranchiseName.map((franchise) => (
                                            <p key={franchise} className="mx-2">{franchise}</p>
                                        ))}
                                    </div>
                                )
                            }
                        </div>

                        <button className="bg-red-600 py-2 px-4 w-1/6 rounded-xl mx-2 text-white hover:text-blac hover:border-2 hover:border-red-600 hover:bg-white hover:text-red-600" onClick={() => handleCompanyReject(d._id, d.companyname)}>Reject</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AssignDashboardPage
