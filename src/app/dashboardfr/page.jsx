import Image from 'next/image'
import { getAllCompanies } from '@/lib/actions';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import FranchiseDashboardPage from '@/Components/FranchiseDashboard/FranchiseDashboard';
import PieChart from '@/Components/PieComponent/PieComponent';
import FranchiseRevenue from '@/Components/FranchiseRevenue/FranchiseRevenue';

//FETCHING DATA WITH API
const getUser = async (id) => {
    // console.log("id insie getUser", id);
    const res = await fetch(`http://localhost:3000/api/user/${id}`);

    if (!res.ok) {
        console.log(res.json);
    }
    return res.json();
}

const DashboardFRPage = async () => {

    const session = await getServerSession(authOptions);
    // console.log("session in franchise page: ", session);

    if (session === null) {
        redirect("/login")
    }

    const teamleaderId = await session.user?.teamleader;
    // console.log("teamleader id of this user/franchise : ", teamleaderId);

    const teamleader = await getUser(teamleaderId);
    // console.log("user found:", user);

    const allCompanies = await getAllCompanies();
    // console.log(allCompanies);

    const data = allCompanies.filter((company) => company.franchisename === session.user?.username);
    // console.log(data);

    return (
        <div className="flex flex-col justify-center items-center w-full ">

            <div className="top flex flex-row justify-center items-center w-full px-12 gap-4 py-4 overflow-hidden">

                <div className="top userdetails flex justify-center items-center w-2/6 gap-12 h-full bg-white py-[122px] rounded-xl px-4">

                    {/* <div className="profile picture size-48 rounded-full relative flex justify-center items-center">
                        <Image src="/profile.jpg" priority="true" className="rounded-full" alt="profilepicture" width={200} height={200} />
                    </div> */}
                    <div className="userdetailstext flex flex-col justify-between  items-start w-full">
                        <div className="row flex justiy-start items-center w-full gap-4">
                            <label className="w-2/5 py-2 font-bold">Username</label>
                            <div className="w-3/5 py-2">{session.user?.username}</div>
                        </div>
                        <div className="row flex justiy-start items-center w-full gap-4">
                            <label className="w-2/5 py-2 font-bold">Email</label>
                            <div className="w-3/5 py-2">{session.user?.email}</div>
                        </div>
                        <div className="row flex justiy-start items-center w-full gap-4">
                            <label className="w-2/5 py-2 font-bold">Team Leader</label>
                            <div className="w-3/5 py-2">{teamleader.username}</div>
                        </div>
                        <div className="row flex justiy-start items-center w-full gap-4">
                            <label className="w-2/5 py-2 font-bold">Spreadsheet</label>
                            <a href={session.user?.spreadsheet} className="text-blue-500 hover:underline cursor-pointer">Click here</a>
                        </div>
                    </div>
                </div>

                <div className="w-2/6 flex justify-center items-center h-auto bg-white py-[115px] rounded-xl">
                    <FranchiseRevenue username={session.user?.username} />
                </div>

                <div className="w-2/6 flex justify-center items-center h-auto bg-white py-4 rounded-xl">
                    <PieChart username={session.user?.username} />
                </div>
            </div>


            <FranchiseDashboardPage data={data} session={session} />

            {/* <div className="table w-4/5 h-full mt-12 flex flex-col items-center justify-center gap-8">
                <div className="tablehead w-full flex flex-row mb-6" >
                    <div className="w-1/3 py-2 pl-4 text-center font-bold">Company</div>
                    <div className="w-1/3 py-2 pl-4 text-center font-bold">Details</div>
                    <div className="w-1/3 py-2 pl-4 text-center font-bold">Status</div>
                </div>

                {data.map((d) => (
                    <div key={d._id} className="border-[1px] border-gray-500 rounded-xl w-full flex flex-row mb-8 py-4">
                        <div className="w-1/3 mx-2  pl-4 flex justify-center items-center">{d.companyname}</div>
                        <div className="w-1/3  mx-2 pl-4 flex justify-center items-center text-blue-500" ><a href={d.jobdetails} target="_blank" className="hover:underline">Click here</a></div>
                        {d.status === "pending" ? (
                            <div className="buttons flex flex-row w-1/3 gap-4 mx-2">
                                <button className="w-1/2 bg-green-600 rounded-xl py-2 text-white">
                                    Interested
                                </button>
                                <button className="w-1/2 bg-red-600 rounded-xl py-2 text-white">
                                    Not Interested
                                </button>
                            </div>
                        ) : (
                            <div className="w-1/3  pl-4 text-center items-center flex justify-center h-auto mx-2">{d.status}</div>
                        )}
                    </div>
                ))}
            </div> */}
        </div>
    )
}

export default DashboardFRPage


// import Image from 'next/image'
// import models from "@/lib/models";
// import { connectToDB } from '@/lib/connectToDB';

// import { getServerSession } from 'next-auth';
// import { authOptions } from '../api/auth/[...nextauth]/route';
// import { redirect } from 'next/navigation';
// import PieComponent from '@/Components/PieComponent/PieComponent';

// //FETCHING DATA WITH API
// const getUser = async (id) => {
//     // console.log("id insie getUser", id);
//     const res = await fetch(`http://localhost:3000/api/user/${id}`);

//     if (!res.ok) {
//         console.log(res.json);
//     }
//     return res.json();
// }

// const DashboardFRPage = async () => {
//     //setting up state of api
//     // const [chartData, setChartData] = useState({
//     //     datasets: [{
//     //         data: [],
//     //         backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] // Colors for the pie chart slices
//     //     }],
//     //     labels: ['In Progress', 'Hold', 'Cancel', 'Closed']
//     // });
//     // //useEffect for updating things correctly
//     // useEffect(() => {
//     //     const fetchData = async () => {
//     //         try {
//     //             const response = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=lK4Cc-JgcEbSNBfMMuOToYR1Q2_38gpHqQ8TVVynYJRr2OyKqNaxHx9VKVqQJr5NhsLEsYjyL2KqGItU9zICkx8sf-hXLD9Rm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKE_Bi6_w8Iv3fi5IAlYV3tEAdbL6d2WDU2aqM2fhLcVYM4Wo6hVRkxvuKIAutcB2iq7xzmef4-XcL_fGo314wG8Cf_zVO3e0g&lib=MLML_NRMKbZzfyHtveTdE3LONwxaIsT7L');
//     //             const data = await response.json();

//     //             // Count occurrences of each status type
//     //             const statusCount = {
//     //                 'In Progress': 0,
//     //                 'Hold': 0,
//     //                 'Cancel': 0,
//     //                 'Closed': 0
//     //             };

//     //             data.forEach(entry => {
//     //                 const status = entry.status;
//     //                 if (statusCount.hasOwnProperty(status)) {
//     //                     statusCount[status]++;
//     //                 }
//     //             });

//     //             // Prepare data for the pie chart
//     //             const statusData = Object.values(statusCount);

//     //             setChartData(prevState => ({
//     //                 datasets: [{
//     //                     data: statusData
//     //                 }],
//     //                 labels: prevState.labels
//     //             }));
//     //         } catch (error) {
//     //             console.log("error", error);
//     //         }
//     //     };

//     //     fetchData();
//     // }, []);

//     const session = await getServerSession(authOptions);
//     if (session === null) {
//         redirect("/login")
//     }
//     console.log("session in franchise page: ", session);
//     const teamleaderId = await session.user?.teamleader;
//     // console.log("teamleader id of this user/franchise : ", teamleaderId);


//     const teamleader = await getUser(teamleaderId);
//     // console.log("user found:", user);


//     const data = [
//         {
//             id: 1,
//             company: "xyz",
//             details: "https://chromewebstore.google.com/detail/share-emails-via-secure-u/bceemhpgjlcpelcmnipjfinfnaangpfa",
//             status: "not decided",
//         },
//         {
//             id: 2,
//             company: "abc",
//             details: "https://chromewebstore.google.com/detail/share-emails-via-secure-u/bceemhpgjlcpelcmnipjfinfnaangpfa",
//             status: "working",
//         },
//         {
//             id: 3,
//             company: "pqr",
//             details: "https://chromewebstore.google.com/detail/share-emails-via-secure-u/bceemhpgjlcpelcmnipjfinfnaangpfa",
//             status: "completed",
//         },
//     ]


//     return (
//         <div className="flex flex-col justify-center items-center w-full">

//             <div className='flex flex-row'>
//                 <div className="top userdetails flex justify-start  items-center w-3/5 mt-12  gap-12">
//                     <div className="profile picture size-48 rounded-full relative">
//                         <Image src="/profile.jpg" priority="true" className="rounded-full" alt="profilepicture" width={200} height={200} />
//                     </div>
//                     <div className="userdetailstext flex flex-col justify-between  items-start w-full py-4">
//                         <div className="row flex justiy-start items-center w-full">
//                             <label className="w-1/5 py-2">Username</label>
//                             <div className="w-4/5 py-2">{session.user?.username}</div>
//                         </div>
//                         <div className="row flex justiy-start items-center w-full">
//                             <label className="w-1/5 py-2">Email</label>
//                             <div className="w-4/5 py-2">{session.user?.email}</div>
//                         </div>
//                         <div className="row flex justiy-start items-center w-full">
//                             <label className="w-1/5 py-2">My Team Leader</label>
//                             {/* <form action={formAction}>
//                             <input type="hidden" name="teamleader" value={teamleaderId} />
//                         </form> */}
//                             <div className="w-4/5 py-2">{teamleader.username}</div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="w-2/5 h-auto">
//                     {/* <Pie data={chartData} /> */}
//                     <PieComponent />
//                 </div>
//             </div>

//             <div className="table w-4/5 h-full mt-12 flex flex-col items-center justify-center gap-8">
//                 <div className="tablehead w-full flex flex-row mb-6" >
//                     <div className="w-1/3 py-2 pl-4 text-center font-bold">Company</div>
//                     <div className="w-1/3 py-2 pl-4 text-center font-bold">Details</div>
//                     <div className="w-1/3 py-2 pl-4 text-center font-bold">Status</div>
//                 </div>

//                 {data.map((d) => (
//                     <div key={d.id} className="border-[1px] border-gray-500 rounded-xl w-full flex flex-row mb-8 py-4">
//                         <div className="w-1/3 mx-2  pl-4 flex justify-center items-center">{d.company}</div>
//                         <div className="w-1/3  mx-2 pl-4 text-center text-blue-500" ><a href={d.details} target="_blank" className="hover:underline">Click here</a></div>
//                         {d.status === "not decided" ? (
//                             <div className="buttons flex flex-row w-1/3 gap-4 mx-2">
//                                 <button className="w-1/2 bg-green-600 rounded-xl py-2 text-white">
//                                     {/* onClick={() => statusInterested(d.id)} */}
//                                     Interested
//                                 </button>
//                                 <button className="w-1/2 bg-red-600 rounded-xl py-2 text-white">
//                                     {/* onClick={() => statusNotInterested(d.id)}  */}
//                                     Not Interested
//                                 </button>
//                             </div>
//                         ) : (

//                             <div className="w-1/3  pl-4 text-center items-center flex justify-center h-auto mx-2">{d.status}</div>
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default DashboardFRPage
