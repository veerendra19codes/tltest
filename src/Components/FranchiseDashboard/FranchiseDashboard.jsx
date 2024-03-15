"use client";

import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

const updateCompany = async (companyId, updatedFields) => {
    try {
        const res = await fetch(`/api/company/${companyId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFields),
        })

        if (!res) {
            console.log(res.json());
        }

        const data = res.json();
        console.log(data);
    }
    catch (err) {
        console.log("error while rejected company:", err);
    }
}

const updateUser = async (userId, updatedFieldsUser) => {
    try {
        const res = await fetch(`/api/user/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFieldsUser),
        })

        if (!res) {
            console.log(res.json());
        }
        // revalidatePath("/dashboardfr")
        const data = res.json();
        console.log(data);
    }
    catch (err) {
        console.log("error while updating rejectedCompaniesName in User:", err);
    }
}

const FranchiseDashboardPage = ({ data, session }) => {
    const router = useRouter();

    const handleNotInterested = (id, companyname) => {
        // console.log("company rejected: ", id);
        // console.log("rejected Company name: ", companyname);

        const companyId = id;
        const updatedFields = {
            // updates in Company model
            franchisename: "unassigned",
            franchise: "unassigned",
            rejectedFranchiseName: session.user?.username,
            rejectedFranchise: session.user?.id,

            //updated in User model
            companiesRejected: id,
            companiesRejectedName: companyname,

            message: "reject fr",
        }
        // console.log("companyId: ", companyId);
        // console.log("updatedFields", updatedFields);

        updateCompany(companyId, updatedFields);

        router.refresh("/dashboardfr");
    }
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="table w-4/5 h-full mt-12 flex flex-col items-center justify-center gap-8">
                <div className="tablehead w-full flex flex-row mb-6" >
                    <div className="w-1/3 py-2 pl-4 text-center font-bold">Company</div>
                    <div className="w-1/3 py-2 pl-4 text-center font-bold">Details</div>
                    <div className="w-1/3 py-2 pl-4 text-center font-bold">Status</div>
                </div>

                {data.map((d) => (
                    <div key={d._id} className="border-[1px] border-gray-500 rounded-xl w-full flex flex-row mb-8 py-4">
                        <div className="w-1/3 mx-2  pl-4 flex justify-center items-center">{d.companyname}</div>
                        <div className="w-1/3  mx-2 pl-4 flex justify-center items-center text-blue-500" ><a href={d.jobdetails} target="_blank" className="hover:underline">Click here</a></div>
                        {d.status === "in progress" ? (
                            <div className="buttons flex flex-row w-1/3 gap-4 mx-2">
                                <button
                                    className="w-1/2 bg-green-600 rounded-xl py-2 text-white"
                                >
                                    Interested
                                </button>
                                <button
                                    onClick={() => handleNotInterested(d._id, d.companyname)}
                                    className="w-1/2 bg-red-600 rounded-xl py-2 text-white"
                                >
                                    Not Interested
                                </button>
                            </div>
                        ) : (
                            <div className="w-1/3  pl-4 text-center items-center flex justify-center h-auto mx-2">{d.status}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FranchiseDashboardPage
