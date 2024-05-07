import dynamic from "next/dynamic"
import { getAllCompanies } from '@/lib/actions';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
const DynamicFranchiseDashboardPage = dynamic(() => import('@/Components/FranchiseDashboard/FranchiseDashboard'))
const DynamicPieChart = dynamic(() => import('@/Components/PieComponent/PieComponent'))
const DynamicFranchiseRevenue = dynamic(() => import('@/Components/FranchiseRevenue/FranchiseRevenue'))

// import PieChart from '@/Components/PieComponent/PieComponent';
// import FranchiseRevenue from '@/Components/FranchiseRevenue/FranchiseRevenue';

const DashboardFRPage = async () => {

    const session = await getServerSession(authOptions);
    // console.log("session in franchise page: ", session);

    if (!session) {
        return (
            <div className="text-white">Loading... Please wait</div>
        )
    }

    if (session === null) {
        redirect("/login")
    }
    else if (session?.user?.role !== 'fr') {
        redirect("/")
    }

    const allCompanies = await getAllCompanies();
    // console.log(allCompanies);

    const data = allCompanies.filter((company) => company.franchisename === session?.user?.username && company.status === "in progress");
    // console.log(data);

    return (
        <div className="flex flex-col justify-center items-center w-full py-12 lg:py-4 gap-4">

            <div className="top flex  justify-center items-center w-full px-12 gap-4  overflow-hidden lg:flex-col lg:px-4">



                <div className="w-1/2 h-[450px] bg-white userdetailstext flex flex-col justify-between  items-center rounded p-4">

                    <div className="row flex justiy-start items-center w-full gap-4 lg:text-xs">
                        <label className="w-2/5 py-2 font-bold">Username</label>
                        <div className="w-3/5 py-2 overflow-x-auto">{session?.user?.username}</div>
                    </div>

                    <div className="row flex justiy-start items-center w-full gap-4 lg:text-xs">
                        <label className="w-2/5 py-2 font-bold">Email</label>
                        <div className="w-3/5 py-2 overflow-x-auto">{session?.user?.email}</div>
                    </div>
                    <div className="row flex justiy-start items-center w-full gap-4 lg:text-xs">
                        <label className="w-2/5 py-2 font-bold">Team Leader</label>
                        <div className="w-3/5 py-2 overflow-x-auto">{session?.user?.teamleadername}</div>
                    </div>
                    <div className="row flex justiy-start items-center w-full gap-4 lg:text-xs">
                        <label className="w-2/5 py-2 font-bold">Spreadsheet</label>
                        <a href={session?.user?.spreadsheet} className="text-blue-500 hover:underline cursor-pointer    w-3/5">Click here</a>
                    </div>
                    <div className="row flex justiy-start items-center w-full gap-4 lg:text-xs">
                        <label className="w-2/5 py-2 font-bold">Companies Accepted</label>
                        <div className="w-3/5 py-2">{session?.user?.companiesAccepted.length}</div>
                    </div>
                    <div className="row flex justiy-start items-center w-full gap-4 lg:text-xs">
                        <label className="w-2/5 py-2 font-bold">Companies Rejected</label>
                        <div className="w-3/5 py-2">{session?.user?.companiesRejected.length}</div>
                    </div>
                    <div className="row flex justiy-start items-center w-full gap-4 lg:text-xs">
                        <label className="w-2/5 py-2 font-bold">Reminders</label>
                        <div className="w-3/5 py-2">{session?.user?.reminders}</div>
                    </div>

                    <DynamicFranchiseRevenue username={session?.user?.username} teamleadername={session?.user?.teamleadername} />
                </div>

                <div className="w-1/2 flex justify-center items-center h-[450px] lg:h-auto bg-white py-4 rounded lg:w-full">
                    <DynamicPieChart username={session?.user?.username} teamleadername={session?.user?.teamleadername} />
                </div>
            </div>


            <DynamicFranchiseDashboardPage data={data} />


        </div>
    )
}

export default DashboardFRPage
