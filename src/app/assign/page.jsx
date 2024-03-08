import React from 'react'

const AssignPage = () => {

    const data = [
        {
            id: 1,
            company: "xyz ltd",
            details: "Click here",
            detailsurl: "https://chromewebstore.google.com/detail/share-emails-via-secure-u/bceemhpgjlcpelcmnipjfinfnaangpfa",
            franchise: "none",
            status: "not assigned",
            rejectedBy: "rahul,hussain",
        },
        {
            id: 2,
            company: "abc ltd",
            details: "Click here",
            detailsurl: "https://chromewebstore.google.com/detail/share-emails-via-secure-u/bceemhpgjlcpelcmnipjfinfnaangpfa",
            franchise: "vivek",
            status: "pending response",
            rejectedBy: "vikas",

        },
        {
            id: 3,
            company: "pqr ltd",
            details: "Click here",
            detailsurl: "https://chromewebstore.google.com/detail/share-emails-via-secure-u/bceemhpgjlcpelcmnipjfinfnaangpfa",
            franchise: "none",
            status: "not assigned",
            rejectedBy: "none",

        },
        {
            id: 4,
            company: "infosys ltd",
            details: "Click here",
            detailsurl: "https://chromewebstore.google.com/detail/share-emails-via-secure-u/bceemhpgjlcpelcmnipjfinfnaangpfa",
            franchise: "vikas",
            status: "pending response",
            rejectedBy: "none",

        },
        {
            id: 5,
            company: "wipro ltd",
            details: "Click here",
            detailsurl: "https://chromewebstore.google.com/detail/share-emails-via-secure-u/bceemhpgjlcpelcmnipjfinfnaangpfa",
            franchise: "hussain",
            status: "pending response",
            rejectedBy: "none",
        },
    ]

    return (
        <div className="flex justify-center items-center">
            <div className="table w-4/5 h-full mt-12 flex flex-col items-center justify-center gap-8">
                <div className="tablehead w-full flex flex-row mb-6" >
                    <div className="w-1/5 py-2 pl-4 text-center font-bold">Company</div>
                    <div className="w-1/5 py-2 pl-4 text-center font-bold">Details</div>
                    <div className="w-1/5 py-2 pl-4 text-center font-bold">Franchise</div>
                    <div className="w-1/5 py-2 pl-4 text-center font-bold">Status</div>
                    <div className="w-1/5 py-2 pl-4 text-center font-bold">RejectBy</div>
                    <div className="w-1/5 py-2 pl-4 text-center font-bold">Reject ?</div>

                </div>

                {data.map((d) => (
                    <div key={d.id} className="border-[1px] border-gray-500 rounded-xl w-full flex flex-row mb-8 py-4">
                        <div className="w-1/6 mx-2  pl-4 flex justify-center items-center">{d.company}</div>
                        <div className="w-1/6  mx-2 pl-4 flex justify-center items-center text-blue-500" ><a href={d.detailsurl} target="_blank" className="hover:underline">{d.details}</a></div>
                        {d.franchise === "none" ? (
                            <select name="franchise" className="border-2 border-gray-400 w-1/6 py-2 pl-4">
                                <option value="ravi">ravi</option>
                                <option value="vikas">vikas</option>
                                <option value="hussain">hussain</option>
                                <option value="...">...</option>

                            </select>
                        ) : (

                            <div className="w-1/6  pl-4  items-center flex justify-center h-auto mx-2">{d.franchise}</div>
                        )}
                        <div className="w-1/6  pl-4  items-center flex justify-center h-auto mx-2">{d.status}</div>
                        <div className="w-1/6  pl-4  items-center flex justify-center h-auto mx-2">{d.rejectedBy}</div>
                        <button className="bg-red-600 py-2 px-4 w-1/6 rounded-xl mx-2 text-white hover:text-blac hover:border-2 hover:border-red-600 hover:bg-white hover:text-red-600">Reject ?</button>
                    </div>
                ))}
            </div>
        </div >

    )
}

export default AssignPage
