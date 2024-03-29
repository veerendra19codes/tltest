import MailsDashboard from "@/Components/MailsDashboard/MailsDashboard";
import SelectComponent from "@/Components/SelectComponent/SelectComponent";
import { getAllCompanies } from "@/lib/actions"

//FETCHING DATA WITH API
const getUsers = async () => {
    // console.log("id insie getUser", id);
    const res = await fetch(`http://localhost:3000/api/user`);

    if (!res.ok) {
        console.log(res.json);
    }
    return res.json();
}

const MailsPage = async () => {
    const data = await getAllCompanies();
    // console.log(data);

    const users = await getUsers();
    // console.log("all users", users);

    const teamleaders = users.filter((user) => user.role === "tl");
    // console.log("teamleaders:", teamleaders);


    return (
        <div className="flex flex-col gap-12 justify-center items-center">

            <MailsDashboard data={data.reverse()} teamleaders={teamleaders} />
            {/* <div className="table w-4/5 h-full flex flex-col items-center justify-center gap-8">
                <div className="tablehead w-full flex flex-row mb-6" >
                    <div className="w-1/5 py-2 text-center font-bold">Company</div>
                    <div className="w-1/5 py-2 text-center font-bold">Details</div>
                    <div className="w-1/5 py-2 text-center font-bold">Team Leader</div>
                    <div className="w-1/5 py-2 text-center font-bold">Status</div>
                    <div className="w-1/5 py-2 text-center font-bold">RejectedBy</div>
                </div>

                {data.map((d) => (
                    <div key={d.id} className="border-[1px] border-gray-500 rounded-xl w-full flex flex-row mb-8 py-4 justify-between gap-0">
                        <div className="w-1/5 mx-2   flex justify-center items-center">{d.companyname}</div>
                        <div className="w-1/5  mx-2 flex justify-center items-center text-blue-500" ><a href={d.jobdetails} target="_blank" className="hover:underline">Clickhere</a></div>
                        {d.teamleader === "unassigned" ? (
                            <select name="teamleader"
                                value={selectedTeamleader}
                                onChange={handleSelectedTeamleader(d.id)} className="border-2 border-gray-400 w-1/5 py-2 pl-4">
                                <option value="surbhi">surbhi</option>
                                <option value="jyothi">jyothi</option>
                                <option value="...">...</option>
                                <option value="" disabled>Select Teamleader</option>
                                {teamleaders.map((teamleader) => (
                                    <option value={teamleader.teamleadername}>{teamleader.teamleadername}</option>
                                ))}
                            </select>
                        ) : (
                            <div className="w-1/5 mx-2   flex justify-center items-center">{d.teamleader}</div>
                        )}
                        <div className={d.status === "pending" ? " flex w-1/5  bg-red-600 text-white rounded-xl items-center justify-center h-auto mx-2" : "w-1/5   items-center flex justify-center h-auto mx-2"}>{d.status}</div>
                        <div className="w-1/5 mx-2  flex justify-center items-center">{d.rejectedTeamLeaders.length === 0 ? "none" : d.rejectedTeamLeaders}</div>
                    </div>
                ))}
            </div> */}
        </div >

    )
}

export default MailsPage


