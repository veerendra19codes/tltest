"use client";

// import from "next/";
import UserContext from "@/contexts/UserContext";
// import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useContext } from "react";

// const IoMdClose = (() => import("react-icons/io").then(module => module.IoMdClose));
// const MdDone = (() => import("react-icons/md").then(module => module.MdDone));
// const useMediaQuery = (() => import("react-responsive").then(module => module.useMediaQuery));

import { IoMdClose } from "react-icons/io";
import { MdDone } from "react-icons/md";
import { useMediaQuery } from "react-responsive";

const RejectFr = async (updatedFields) => {
    try {
        const res = await fetch(`/api/rejectfr`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFields),
        })

        if (!res) {
            // console.log(res.json());
        }

        const data = res.json();
        // console.log(data);
    }
    catch (err) {
        console.log("error while rejected company:", err);
    }
}

const AcceptFr = async (updatedFields) => {
    try {
        const res = await fetch(`/api/acceptfr`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFields),
        })

        if (!res) {
            console.log(res.json());
        }

        const data = res.json();
        // console.log(data);
    }
    catch (err) {
        // console.log("error while accepting company:", err);
    }
}

const FranchiseDashboardPage = ({ data }) => {
    const { session, status } = useContext(UserContext);
    // console.log("session:", session);
    const router = useRouter();
    const isMobile = useMediaQuery({ maxWidth: 768 });

    if (status === "loading") {
        return (
            <div className="text-white"> Loading ...</div>
        )
    }

    const handleNotInterested = (id, companyname) => {
        // console.log("company rejected: ", id);
        // console.log("rejected Company name: ", companyname);

        const updatedFields = {
            companyId: id, //this is to change Company model with this company id only
            // updates in Company model
            franchisename: "unassigned", //set
            franchise: null, //set
            rejectedFranchiseName: session?.user?.username, //push
            rejectedFranchise: session?.user?.id, //push

            userId: session?.user?.id, // this is to change user model with this user id only
            //updated in User model
            companiesRejected: id, //push
            companiesRejectedName: companyname, //push

        }
        // console.log("companyId: ", companyId);
        // console.log("updatedFields", updatedFields);

        RejectFr(updatedFields);

        router.refresh("/dashboardfr");
        router.refresh("/dashboardbd");
        router.refresh("/dashboardsh");
        router.refresh("/mails");
        router.refresh("/assign");



        // revalidatePath("/dashboardbd")
        // revalidatePath("/dashboardsh")
        // revalidatePath("/mails")
        // revalidatePath("/assign")
        // revalidatePath("/dashboardfr")
    }

    const handleInterested = (id, companyname) => {
        // console.log("company rejected: ", id);
        // console.log("rejected Company name: ", companyname);

        const updatedFields = {
            companyId: id, //this is to change Company model with this company id only
            // updates in Company model
            status: "assigned",

            userId: session?.user?.id, // this is to change user model with this user id only
            //updated in User model
            companiesAccepted: id, //push
            companiesAcceptedName: companyname, //push

        }
        // console.log("companyId: ", companyId);
        // console.log("updatedFields", updatedFields);

        AcceptFr(updatedFields);

        router.refresh("/dashboardfr");
    }

    return (
        <div className="w-full h-full flex justify-center items-center flex-col px-12 lg:px-4">
            <div className="Table w-full h-full  flex flex-col items-center justify-center border-gray-400 border-[1px] bg-white rounded whitespace-nowrap lg:overflow-x-auto ">
                <div className="w-full flex" >
                    <div className="w-1/3 md:w-[200px] whitespace-nowrap text-center font-bold inline-block  border-gray-400 border-y-[1px] py-2 lg:py-1">Company</div>
                    <div className="w-1/3 md:w-[200px] whitespace-nowrap text-center font-bold inline-block  border-gray-400 border-y-[1px] py-2 lg:py-1">Details</div>
                    <div className="w-1/3 md:w-[200px] whitespace-nowrap text-center font-bold inline-block  border-gray-400 border-y-[1px] py-2 lg:py-1">Status</div>
                </div>

                <div className="w-full">

                    {data &&

                        data.map((d) => (
                            <div key={d._id} className="w-full flex">
                                <div className="w-1/3 md:w-[200px] whitespace-nowrap  text-center inline-block  border-gray-400 border-y-[1px] py-2 lg:py-1">{d.companyname}</div>
                                <div className="w-1/3 sm:w-[200px] whitespace-nowrap text-center text-blue-500 inline-block  border-gray-400 border-y-[1px] py-2 lg:py-1" ><a href={d.jobdetails} target="_blank" className="hover:underline">Click here</a></div>
                                {d.status === "in progress" &&
                                    <div className="buttons flex items-center w-1/3 md:w-[200px] whitespace-nowrap text-center border-gray-400 border-y-[1px] py-2 lg:py-1">

                                        {isMobile ? (
                                            <>
                                                <button className="w-1/2 flex justify-center items-center">
                                                    <MdDone size={20} color="white" className="rounded-full bg-green-500" />
                                                </button>
                                                <button onClick={() => handleNotInterested(d._id, d.companyname)} className="w-1/2 flex justify-center items-center">
                                                    <IoMdClose size={20} color="white" className="rounded-full bg-red-500" />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => handleInterested(d._id, d.companyname)} className="w-1/2 flex items-center justify-center bg-green-500 rounded-xl text-white mx-2">
                                                    <MdDone size={20} color="white" className="rounded-full bg-green-500" />
                                                    Interested
                                                </button>
                                                <button onClick={() => handleNotInterested(d._id, d.companyname)} className="w-1/2 flex items-center justify-center bg-red-500 rounded-xl text-white mx-2">
                                                    <IoMdClose size={20} color="white" className="rounded-full bg-red-500" />
                                                    Not Interested
                                                </button>
                                            </>
                                        )}
                                    </div>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default FranchiseDashboardPage
