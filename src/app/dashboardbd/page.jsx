import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getAllCompanies } from '@/lib/actions';
import { redirect } from 'next/navigation';

const DashboardBD = async () => {
    const session = await getServerSession(authOptions);
    // console.log("session in dashboardbd", session);
    // console.log("user details inside session:", session.user);
    if (!session) {
        redirect("/login");
    }
    else if (session.user?.role !== 'bd') {
        redirect("/")
    }

    const allCompanies = await getAllCompanies();
    // console.log("all Companies:", allCompanies);

    //companies listed by me
    const data = allCompanies.filter((data) => data.createdBy === session?.user?.id);
    // console.log("companies listed by me", data);

    const formatCreatedAtDate = (createdAt) => {
        const createdAtDate = new Date(createdAt);
        const formattedDate = createdAtDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).replace(/\//g, '-'); // Replace slashes with dashes

        return formattedDate;
    }

    const formatTime12hr = (timeString) =>
        new Date(timeString).toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });

    return (
        <div className="flex justify-center items-center flex-col w-full lg:px-2 ">
            <div className="lg:overflow-x-auto sm:w-full w-[90%] my-12 flex justify-center whitespace-nowrap bg-white rounded-xl lg:mt-2">
                <table className="Table w-full h-full flex flex-col items-center justify-center sm:mt-4 whitespace-nowrap lg:overflow-x-auto border-gray-400 border-[1px]">
                    <thead className="w-full">
                        <tr className="w-full flex justify-center">
                            <th className="w-[250px] py-2 text-center font-bold whitespace-nowrap sm:w-[200px] inline-block lg:py-1 border-gray-400 border-[1px]">Company</th>
                            <th className="w-[250px] py-2 text-center font-bold whitespace-nowrap sm:w-[200px] inline-block lg:py-1 border-gray-400 border-[1px]">Details</th>
                            <th className="w-[250px] py-2  text-center font-bold  whitespace-nowrap sm:w-[200px] inline-block lg:py-1 border-gray-400 border-[1px]">Team Leader</th>
                            <th className="w-[250px] py-2 text-center font-bold whitespace-nowrap sm:w-[200px] inline-block lg:py-1 border-gray-400 border-[1px]">Franchise</th>
                            <th className="w-[250px] py-2 text-center font-bold whitespace-nowrap sm:w-[200px] inline-block lg:py-1 border-gray-400 border-[1px]">Created At</th>
                        </tr>
                    </thead>

                    <tbody className="w-full">

                        {/* companies listed by me */}
                        {data.reverse().map((d) => (            //border-[1px] border - gray - 500
                            <tr key={d._id} className="w-full flex justify-center">
                                <td className="w-[250px] py-2 text-center whitespace-nowrap sm:w-[200px] inline-block lg:py-1 border-gray-400 border-[1px]">{d.companyname}</td>

                                <td className="w-[250px] py-2 text-center whitespace-nowrap sm:w-[200px] inline-block lg:py-1 border-gray-400 border-[1px] hover:underline text-blue-500"><a href={d.jobdetails} target="_blank">Click here</a></td>

                                <td className={d.teamleadername === "unassigned" ? "w-[250px] py-2 text-center whitespace-nowrap sm:w-[200px] inline-block lg:py-1 border-gray-400 border-[1px] text-red-700" : "w-[250px] py-2 text-center whitespace-nowrap sm:w-[200px] inline-block lg:py-1 border-gray-400 border-[1px]"} >{d.teamleadername}</td>

                                <td className={d.franchisename === "unassigned" ? "w-[250px] py-2 text-center whitespace-nowrap sm:w-[200px] inline-block lg:py-1 border-gray-400 border-[1px] text-red-700" : "w-[250px] py-2 text-center whitespace-nowrap sm:w-[200px] inline-block lg:py-1 border-gray-400 border-[1px]"}>{d.franchisename}</td>


                                <td className="w-[250px] py-2 text-center whitespace-nowrap sm:w-[200px] inline-block lg:py-1 border-gray-400 border-[1px]">{formatTime12hr(d.createdAt)}, {formatCreatedAtDate(d.createdAt)}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div >

    )
}

export default DashboardBD


