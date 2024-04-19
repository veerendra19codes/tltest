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
        <div className="flex justify-center items-center flex-col w-full overflow-x-hidden">
            {/* <div className="relative flex items-center  w-screen overflow-x-hidden">
                <div id="slider" className="w-full h-full overflow-x-auto  scroll whitespace-nowrap scroll-smooth gap-2 flex items-center">

                    {
                        list.map((item) => (
                            <div key={item} className="bg-black text-white py-1 px-2 rounded-full inline-block cursor-pointer">{item}</div>
                        ))
                    }
                </div>
            </div> */}
            <div className="lg:overflow-x-auto sm:w-full w-[90%] mt-12 flex justify-center whitespace-nowrap bg-white rounded-xl">
                <table className="Table w-[90%] h-full flex flex-col items-center justify-center gap-8 sm:mt-4 whitespace-nowrap">
                    {/* <div className="flex w-full py-4 justify-center items-center whitespace-nowrap "> */}
                    <thead className="w-full">
                        <tr className="w-full">
                            <th className="w-[250px] py-2 text-center font-bold whitespace-nowrap sm:w-[200px] inline-block">Company</th>
                            <th className="w-[250px] py-2 text-center font-bold whitespace-nowrap sm:w-[200px] inline-block">Details</th>
                            <th className="w-[250px] py-2  text-center font-bold  whitespace-nowrap sm:w-[200px] inline-block">Team Leader</th>
                            <th className="w-[250px] py-2 text-center font-bold whitespace-nowrap sm:w-[200px] inline-block">Franchise</th>
                            <th className="w-[250px] py-2 text-center font-bold whitespace-nowrap sm:w-[200px] inline-block">Created At</th>
                        </tr>
                    </thead>
                    {/* </div> */}

                    <tbody className="w-full">

                        {/* companies listed by me */}
                        {data.reverse().map((d) => (            //border-[1px] border - gray - 500
                            <tr key={d._id} className=" rounded-lg w-full flex flex-row whitespace-nowrap">
                                <td className="w-1/5 px-2 pl-4 flex justify-center items-center whitespace-nowrap sm:w-[200px] border-[1px] py-3 border-black">{d.companyname}</td>

                                <td className="w-1/5 px-2 pl-4 flex justify-center items-center  text-blue-500 whitespace-nowrap sm:w-[200px] border-[1px] border-black py-3" ><a href={d.jobdetails} target="_blank" className="hover:underline">Click here</a></td>

                                <td className={d.teamleadername === "unassigned" ? " flex w-1/5 px-2  text-red-700 font-bold items-center justify-center h-auto whitespace-nowrap sm:w-[200px] border-[1px] border-black py-3" : "w-1/5 px-2 pl-4 items-center flex justify-center h-auto whitespace-nowrap sm:w-[200px]  border-[1px] border-black py-3"}>{d.teamleadername}</td>

                                <td className={d.franchisename === "unassigned" ? " flex w-1/5 px-2  text-red-700 items-center font-bold justify-center h-auto whitespace-nowrap sm:w-[200px]  border-[1px] border-black py-2" : "w-1/5 px-3 pl-4 text-center items-center flex justify-center h-auto  whitespace-nowrap sm:w-[200px]  border-[1px] border-black py-3"}>{d.franchisename}</td>

                                <td className="w-1/5 px-2 pl-4 flex justify-center items-center whitespace-nowrap sm:w-[200px]  border-[1px] border-black py-3">{formatCreatedAtDate(d.createdAt)}, {formatTime12hr(d.createdAt)} </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div >

    )
}

export default DashboardBD
