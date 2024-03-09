import { getAllCompanies } from "@/lib/actions"
const MailsPage = async () => {
    const data = await getAllCompanies();
    // console.log(data);

    // const data = [
    //     {
    //         id: 1,
    //         company: "xyz ltd",
    //         details: "Click here",
    //         detailsurl: "https://chromewebstore.google.com/detail/share-emails-via-secure-u/bceemhpgjlcpelcmnipjfinfnaangpfa",
    //         teamleader: "contact",
    //         status: "not contacted",
    //         rejectedBy: "none",
    //     },
    //     {
    //         id: 2,
    //         company: "abc ltd",
    //         details: "Click here",
    //         detailsurl: "https://chromewebstore.google.com/detail/share-emails-via-secure-u/bceemhpgjlcpelcmnipjfinfnaangpfa",
    //         teamleader: "surbhi",
    //         status: "workig",
    //         rejectedBy: "none"
    //     },
    //     {
    //         id: 3,
    //         company: "pqr ltd",
    //         details: "Click here",
    //         detailsurl: "https://chromewebstore.google.com/detail/share-emails-via-secure-u/bceemhpgjlcpelcmnipjfinfnaangpfa",
    //         teamleader: "surbhi",
    //         status: "accepted",
    //         rejectedBy: "none"
    //     },
    //     {
    //         id: 4,
    //         company: "infosys ltd",
    //         details: "Click here",
    //         detailsurl: "https://chromewebstore.google.com/detail/share-emails-via-secure-u/bceemhpgjlcpelcmnipjfinfnaangpfa",
    //         teamleader: "jyothi",
    //         status: "working",
    //         rejectedBy: "surbhi",
    //     },
    //     {
    //         id: 5,
    //         company: "wipro ltd",
    //         details: "Click here",
    //         detailsurl: "https://chromewebstore.google.com/detail/share-emails-via-secure-u/bceemhpgjlcpelcmnipjfinfnaangpfa",
    //         teamleader: "contact",
    //         status: "not contacted",
    //         rejectedBy: "surbhi,jyothi",
    //     },
    //     {
    //         id: 6,
    //         company: "hjk ltd",
    //         details: "Click here",
    //         detailsurl: "https://chromewebstore.google.com/detail/share-emails-via-secure-u/bceemhpgjlcpelcmnipjfinfnaangpfa",
    //         teamleader: "jyothi",
    //         status: "accepted",
    //         rejectedBy: "surbhi",
    //     },
    // ]

    return (
        <div className="flex flex-col gap-12 justify-center items-center">
            <h1 className="font-semibold text-blue-500 text-xl mt-4 w-4/5">Navigate to the dashboard to find the Team Leader whose franchise aligns with the job description. Check their availability status to ensure they are free and not currently occupied. This will allow you to contact them for further communication.</h1>
            <div className="table w-4/5 h-full flex flex-col items-center justify-center gap-8">
                <div className="tablehead w-full flex flex-row mb-6" >
                    <div className="w-1/5 py-2 text-center font-bold">Company</div>
                    <div className="w-1/5 py-2 text-center font-bold">Details</div>
                    <div className="w-1/5 py-2 text-center font-bold">Team Leader</div>
                    <div className="w-1/5 py-2 text-center font-bold">Status</div>
                    <div className="w-1/5 py-2 text-center font-bold">RejectedBy</div>

                </div>

                {data.map((d) => (
                    <div key={d.id} className="border-[1px] border-gray-500 rounded-xl w-full flex flex-row mb-8 py-4">
                        <div className="w-1/5 mx-2   flex justify-center items-center">{d.companyname}</div>
                        <div className="w-1/5  mx-2 flex justify-center items-center text-blue-500" ><a href={d.jobdetails} target="_blank" className="hover:underline">Clickhere</a></div>
                        {d.teamleader === "unassigned" ? (
                            <select name="teamleader" className="border-2 border-gray-400 w-1/5 py-2 pl-4">
                                <option value="surbhi">surbhi</option>
                                <option value="jyothi">jyothi</option>
                                <option value="...">...</option>
                            </select>
                        ) : (
                            <div className="w-1/5 mx-2   flex justify-center items-center">{d.teamleader}</div>

                        )}
                        <div className={d.status === "pending" ? " flex w-1/5  bg-red-600 text-white rounded-xl items-center justify-center h-auto mx-2" : "w-1/5   items-center flex justify-center h-auto mx-2"}>{d.status}</div>
                        <div className="w-1/5 mx-2  flex justify-center items-center">{d.rejectedTeamLeaders.length === 0 ? "none" : d.rejectedTeamLeaders}</div>
                    </div>
                ))}
            </div>
        </div >

    )
}

export default MailsPage


