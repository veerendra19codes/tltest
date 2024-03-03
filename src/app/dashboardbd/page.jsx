import React from 'react'

const DashboardBD = () => {
    const data = [
        {
            id: 1,
            company: "xyz ltd",
            details: "Click here",
            detailsurl: "https://chromewebstore.google.com/detail/share-emails-via-secure-u/bceemhpgjlcpelcmnipjfinfnaangpfa",
            teamleader: "unassigned",
            franchise: "unassigned",
            status: "unassigned",
        },
        {
            id: 2,
            company: "abc ltd",
            details: "Click here",
            detailsurl: "https://chromewebstore.google.com/detail/share-emails-via-secure-u/bceemhpgjlcpelcmnipjfinfnaangpfa",
            teamleader: "surbhi",
            franchise: "unassigned",
            status: "unassigned",
        },
        {
            id: 3,
            company: "pqr ltd",
            details: "Click here",
            detailsurl: "https://chromewebstore.google.com/detail/share-emails-via-secure-u/bceemhpgjlcpelcmnipjfinfnaangpfa",
            teamleader: "jyothi",
            franchise: "ravi",
            status: "working",
        },
        {
            id: 4,
            company: "infosys ltd",
            details: "Click here",
            detailsurl: "https://chromewebstore.google.com/detail/share-emails-via-secure-u/bceemhpgjlcpelcmnipjfinfnaangpfa",
            teamleader: "surbhi",
            franchise: "vikas",
            status: "working",
        },
        {
            id: 5,
            company: "wipro ltd",
            details: "Click here",
            detailsurl: "https://chromewebstore.google.com/detail/share-emails-via-secure-u/bceemhpgjlcpelcmnipjfinfnaangpfa",
            teamleader: "jyothi",
            franchise: "hussain",
            status: "completed",
        },
    ]

    return (
        <div className="flex justify-center items-center">
            <div className="table w-4/5 h-full mt-24 flex flex-col items-center justify-center gap-8">
                <div className="tablehead w-full flex flex-row mb-6" >
                    <div className="w-1/5 py-2 pl-4 text-center font-bold">Company</div>
                    <div className="w-1/5 py-2 pl-4 text-center font-bold">Details</div>
                    <div className="w-1/5 py-2 pl-4 text-center font-bold">Team Leader</div>
                    <div className="w-1/5 py-2 pl-4 text-center font-bold">Franchise</div>
                    <div className="w-1/5 py-2 pl-4 text-center font-bold">Status</div>
                </div>

                {data.map((d) => (
                    <div key={d.id} className="border-[1px] border-gray-500 rounded-xl w-full flex flex-row mb-8 py-4">
                        <div className="w-1/5 mx-2  pl-4 text-center">{d.company}</div>
                        <div className="w-1/5  mx-2 pl-4 text-center text-blue-500" ><a href={d.detailsurl} target="_blank" className="hover:underline">{d.details}</a></div>
                        <div className={d.teamleader === "unassigned" ? " flex w-1/5 bg-red-700 text-white rounded-xl items-center justify-center h-auto mx-2" : "w-1/5  pl-4 flex items-center flex justify-center h-auto mx-2 "}>{d.teamleader}</div>
                        <div className={d.franchise === "unassigned" ? " flex w-1/5 bg-red-700 text-white rounded-xl items-center justify-center h-auto mx-2" : "w-1/5  pl-4 text-center items-center flex justify-center h-auto mx-2"}>{d.franchise}</div>
                        <div className={d.status === "unassigned" ? " flex w-1/5 bg-red-700 text-white rounded-xl items-center justify-center h-auto mx-2" : "w-1/5  pl-4  items-center flex justify-center h-auto mx-2"}>{d.status}</div>
                    </div>
                ))}
            </div>
        </div >

    )
}

export default DashboardBD
