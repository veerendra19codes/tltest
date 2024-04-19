import { getAllCompanies, getAllUsers } from "@/lib/actions"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AssignDashboardPage from "@/Components/AssignDashboard/AssignDashboard";

const AssignPage = async () => {
    const session = await getServerSession(authOptions);
    // console.log("id of current user: ", session.user?.id);

    if (!session) {
        redirect("/login");
    }
    else if (session.user?.role !== 'tl') {
        redirect("/")
    }
    const allCompanies = await getAllCompanies();
    // console.log("all Companies:", allCompanies);

    //companies assigned to this teamleader
    const data = allCompanies.reverse().filter((company) => company.teamleadername === session.user?.username)
    // console.log("filtered data:", data);

    const allUsers = await getAllUsers();
    // console.log("all users:", allUsers);

    const franchiseUnderMe = allUsers.reverse().filter((user) => user.teamleader === session.user?.id);
    // console.log("franchiseUnderMe:", franchiseUnderMe);


    return (
        <div className="flex justify-center items-center">
            <AssignDashboardPage data={data} franchiseUnderMe={franchiseUnderMe} session={session} />
            {/* <div className="table w-4/5 h-full mt-12 flex flex-col items-center justify-center gap-8">
                <div className="tablehead w-full flex flex-row mb-6" >
                    <div className="w-1/5 py-2 text-center font-bold">Company</div>
                    <div className="w-1/5 py-2 text-center font-bold">Details</div>
                    <div className="w-1/5 py-2 text-center font-bold">Franchise</div>
                    <div className="w-1/5 py-2 text-center font-bold">Status</div>
                    <div className="w-1/5 py-2 text-center font-bold">RejectBy</div>
                    <div className="w-1/5 py-2 text-center font-bold">Reject ?</div>

                </div>

                {data.map((d) => (
                    <div key={d.id} className="border-[1px] border-gray-500 rounded-xl w-full flex flex-row mb-8 py-4">
                        <div className="w-1/6 mx-2  flex justify-center items-center">{d.companyname}</div>
                        <div className="w-1/6  mx-2  flex justify-center items-center text-blue-500" ><a href={d.jobdetails} target="_blank" className="hover:underline">Click here</a></div>
                        {d.franchise === "unassigned" ? (
                            <select
                                name="franchise"
                                value={d.franchise === "unassigned" ? "" : d.franchise}
                                className="border-2 border-gray-400 w-1/6 py-2 pl-4">
                                <option value="" disabled>Select Franchise</option>
                                {franchiseUnderMe.map((franchise) => (
                                    <option key={franchise._id} value={franchise.username}>
                                        {franchise.username}
                                    </option>
                                ))}
                            </select>
                        ) : (

                            <div className="w-1/6 items-center flex justify-center h-auto mx-2">{d.franchise}</div>
                        )}
                        <div className="w-1/6  items-center flex justify-center h-auto mx-2">{d.status}</div>
                        <div className="w-1/6  items-center flex justify-center h-auto mx-2">{d.rejectedFranchise.length === 0 ? "none" : d.rejectedFranchise}</div>
                        <button className="bg-red-600 py-2 px-4 w-1/6 rounded-xl mx-2 text-white hover:text-blac hover:border-2 hover:border-red-600 hover:bg-white hover:text-red-600">Reject ?</button>
                    </div>
                ))}
            </div> */}
        </div >

    )
}

export default AssignPage
