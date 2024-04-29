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
        <div className="flex justify-center items-center overflow-x-hidden lg:p-4">
            {session && franchiseUnderMe && data && <AssignDashboardPage data={data} franchiseUnderMe={franchiseUnderMe} session={session} />}
        </div >

    )
}

export default AssignPage
