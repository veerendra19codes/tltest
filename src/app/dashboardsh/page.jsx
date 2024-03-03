import React from 'react'

const DashboardBD = () => {
    const data = [
        {
            id: 1,
            teamleader: "surbhi",
            franchise: "hitesh",
            level: "junior",
            status: "free",
        },
        {
            id: 2,
            teamleader: "surbhi",
            franchise: "rahul",
            level: "junior",
            status: "free",
        },
        {
            id: 3,
            teamleader: "surbhi",
            franchise: "yash",
            level: "mid",
            status: "working",
        },
        {
            id: 4,
            teamleader: "jyothi",
            franchise: "atharva",
            level: "mid",
            status: "free",
        },
        {
            id: 5,
            teamleader: "jyothi",
            franchise: "hussain",
            level: "senior",
            status: "free",
        },
        {
            id: 6,
            teamleader: "jyothi",
            franchise: "vivek",
            level: "normal",
            status: "working",
        },
    ]

    return (
        <div className="flex flex-col justify-center items-center gap-8">
            <h1 className="text-xl font-bold text-blue-500 mt-4">Select a Team Leader whose franchise's level matches with the job description and is currently not working</h1>
            <div className="table w-4/5 h-full flex flex-col items-center justify-center gap-8">
                <div className="tablehead w-full flex flex-row mb-6" >
                    <div className="w-1/4 py-2 pl-4 text-center font-bold">Team Leader</div>
                    <div className="w-1/4 py-2 pl-4 text-center font-bold">Franchise</div>
                    <div className="w-1/4 py-2 pl-4 text-center font-bold">Level</div>
                    <div className="w-1/4 py-2 pl-4 text-center font-bold">Status</div>
                </div>

                {data.map((d) => (
                    <div key={d.id} className="border-[1px] border-gray-500 rounded-xl w-full flex flex-row mb-8 py-4">
                        <div className="w-1/4 mx-2  pl-4 text-center">{d.teamleader}</div>
                        <div className="w-1/4 mx-2  pl-4 text-center">{d.franchise}</div>
                        <div className="w-1/4 mx-2  pl-4 text-center">{d.level}</div>
                        <div className={d.status === "free" ? " flex w-1/4  text-center bg-red-700 text-white rounded-xl items-center justify-center h-auto mx-2" : "w-1/4  pl-4 text-center items-center flex bg-green-600 justify-center h-auto mx-2 rounded-xl"}>{d.status}</div>
                    </div>
                ))}
            </div>
        </div >

    )
}

export default DashboardBD
