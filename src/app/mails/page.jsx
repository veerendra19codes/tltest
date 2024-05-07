import React, { Suspense } from "react";

const MailsDashboard = React.lazy(() => import("@/Components/MailsDashboard/MailsDashboard"));
import { getAllCompanies, getAllUsers } from "@/lib/actions"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const MailsPage = async () => {

    //this is server side logic 
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect("/login");
    }
    else if (session?.user?.role !== 'sh') {
        redirect("/");
    }
    const data = await getAllCompanies();
    // console.log(data);

    const users = await getAllUsers();
    // console.log("all users", users);

    const teamleaders = users.filter((user) => user.role === "tl");
    // console.log("teamleaders:", teamleaders);


    return (
        // <div className="flex flex-col gap-12 justify-center items-center">
        <Suspense fallback={<p className="text-white">Loading...</p>} >
            <MailsDashboard data={data.reverse()} teamleaders={teamleaders} />
            {/* passing props from server logic into client side components and how to implement lazy laoding here using next/dynamic? */}
        </Suspense>

        //</div >
    )
}

export default MailsPage


