import MailsDashboard from "@/Components/MailsDashboard/MailsDashboard";
import { getAllCompanies, getAllUsers } from "@/lib/actions"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const MailsPage = async () => {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect("/login");
    }
    else if (session.user?.role !== 'sh') {
        redirect("/");
    }
    const data = await getAllCompanies();
    // console.log(data);

    const users = await getAllUsers();
    // console.log("all users", users);

    const teamleaders = users.filter((user) => user.role === "tl");
    // console.log("teamleaders:", teamleaders);


    return (
        <div className="flex flex-col gap-12 justify-center items-center">
            {teamleaders ?
                <MailsDashboard data={data} teamleaders={teamleaders} /> : "Loading"
            }
        </div >
    )
}

export default MailsPage


