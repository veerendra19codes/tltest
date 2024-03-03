import React from 'react'

const DashboardTLPage = () => {
    const data = [
        {
            id: 1,
            franchiseunderme: "ravi",
            franchiselevel: "junior",
            companiesworking: "free",
            companiescompleted: "none",
            companiesrejected: "none"
        },
        {
            id: 2,
            franchiseunderme: "ravi",
            franchiselevel: "junior",
            companiesworking: "abc",
            companiescompleted: "none",
            companiesrejected: "none"
        },
        {
            id: 3,
            franchiseunderme: "ravi",
            franchiselevel: "mid",
            companiesworking: "tata",
            companiescompleted: "bajaj",
            companiesrejected: "boat"
        },
        {
            id: 4,
            franchiseunderme: "vikas",
            franchiselevel: "senior",
            companiesworking: "free",
            companiescompleted: "amazon, neftlix",
            companiesrejected: "ola"
        },
        {
            id: 5,
            franchiseunderme: "hussain",
            franchiselevel: "senior",
            companiesworking: "zomato, google",
            companiescompleted: "microsoft",
            companiesrejected: "none"
        },
        {
            id: 6,
            franchiseunderme: "atharva",
            franchiselevel: "any",
            companiesworking: "microsoft,apple",
            companiescompleted: "netflix",
            companiesrejected: "amazon"
        },
    ]

    return (
        <div className="flex justify-center items-center">
            <div className="table w-4/5 h-full mt-12 flex flex-col items-center justify-center gap-8">
                <div className="tablehead w-full flex flex-row mb-6" >
                    <div className="w-1/5 py-2 pl-4 text-center font-bold">Franchise under me</div>
                    <div className="w-1/5 py-2 pl-4 text-center font-bold">Franchise level</div>
                    <div className="w-1/5 py-2 pl-4 text-center font-bold">Companes working</div>
                    <div className="w-1/5 py-2 pl-4 text-center font-bold">Companies Completed</div>
                    <div className="w-1/5 py-2 pl-4 text-center font-bold">Companies Rejected</div>

                </div>

                {data.map((d) => (
                    <div key={d.id} className="border-[1px] border-gray-500 rounded-xl w-full flex flex-row mb-8 py-4">
                        <div className="w-1/5 mx-2  pl-4 flex justify-center items-center">{d.franchiseunderme}</div>
                        <div className="w-1/5  pl-4 text-center items-center flex justify-center h-auto mx-2">{d.franchiselevel}</div>
                        <div className={d.companiesworking === "free" ? "w-1/5  pl-4  items-center flex justify-center h-auto mx-2 bg-green-500 rounded-xl text-white" : "w-1/5  pl-4  items-center flex justify-center h-auto mx-2"}>{d.companiesworking}</div>
                        <div className="w-1/5  pl-4  items-center flex justify-center h-auto mx-2">{d.companiescompleted}</div>
                        <div className="w-1/5  pl-4  items-center flex justify-center h-auto mx-2">{d.companiesrejected}</div>

                    </div>
                ))}
            </div>
        </div >

    )
}

export default DashboardTLPage
