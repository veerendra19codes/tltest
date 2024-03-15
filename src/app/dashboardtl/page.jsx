import { connectToDB } from "@/lib/connectToDB"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

//FETCHING DATA WITH API
const getUsers = async () => {
    // console.log("id insie getUser", id);
    const res = await fetch(`http://localhost:3000/api/user`);

    if (!res.ok) {
        console.log(res.json);
    }
    return res.json();
}

const DashboardTLPage = async () => {
    const session = await getServerSession(authOptions);
    if (session === null) {
        redirect("/login");
    }
    const users = await getUsers();
    // console.log("all users", users);

    //franchiseUnderMe
    const data = users.reverse().filter((data) => data.teamleader === session.user?.id);

    // console.log(data);

    // const data = [
    //     {
    //         id: 1,
    //         franchiseunderme: "ravi",
    //         franchiselevel: "junior",
    //         companiesworking: "free",
    //         companiescompleted: "none",
    //         companiesrejected: "none"
    //     },
    //     {
    //         id: 2,
    //         franchiseunderme: "ravi",
    //         franchiselevel: "junior",
    //         companiesworking: "abc",
    //         companiescompleted: "none",
    //         companiesrejected: "none"
    //     },
    //     {
    //         id: 3,
    //         franchiseunderme: "ravi",
    //         franchiselevel: "mid",
    //         companiesworking: "tata",
    //         companiescompleted: "bajaj",
    //         companiesrejected: "boat"
    //     },
    //     {
    //         id: 4,
    //         franchiseunderme: "vikas",
    //         franchiselevel: "senior",
    //         companiesworking: "free",
    //         companiescompleted: "amazon, neftlix",
    //         companiesrejected: "ola"
    //     },
    //     {
    //         id: 5,
    //         franchiseunderme: "hussain",
    //         franchiselevel: "senior",
    //         companiesworking: "zomato, google",
    //         companiescompleted: "microsoft",
    //         companiesrejected: "none"
    //     },
    //     {
    //         id: 6,
    //         franchiseunderme: "atharva",
    //         franchiselevel: "any",
    //         companiesworking: "microsoft,apple",
    //         companiescompleted: "netflix",
    //         companiesrejected: "amazon"
    //     },
    // ]

    return (
        <div className="flex justify-center items-center">
            <div className="table w-4/5 h-full mt-12 flex flex-col items-center justify-center gap-8">
                <div className="tablehead w-full flex flex-row mb-6" >
                    <div className="w-1/5 py-2 text-center font-bold">Franchise under me</div>
                    <div className="w-1/5 py-2 text-center font-bold">Franchise level</div>
                    <div className="w-1/5 py-2  text-center font-bold">Companes working</div>
                    <div className="w-1/5 py-2  text-center font-bold">Companies Completed</div>
                    <div className="w-1/5 py-2 text-center font-bold">Companies Rejected</div>

                </div>

                {/* franchiseUnderMe */}
                {data.map((d) => (
                    <div key={d._id} className="border-[1px] border-gray-500 rounded-xl w-full flex flex-row mb-8 py-4">
                        <div className="w-1/5 mx-2  flex justify-center items-center">{d.username}</div>
                        <div className="w-1/5  text-center items-center flex justify-center h-auto mx-2">{d.level}</div>
                        <div className={d.companiesWorkingName.length === 0 ? "w-1/5   items-center flex justify-center h-auto mx-2 bg-green-500 rounded-xl text-white" : "w-1/5  items-center flex justify-center h-auto mx-2"}>{d.companiesWorkingName.length === 0 ? "none" : d.companiesWorkingName}</div>
                        <div className="w-1/5   items-center flex justify-center h-auto mx-2">{d.companiesCompletedName.length === 0 ? "none" : d.companiesCompletedName}</div>
                        <div className="w-1/5  items-center flex justify-center h-auto mx-2">{d.companiesRejectedName.length === 0 ? " none" : d.companiesRejectedName}</div>
                    </div>
                ))}
            </div>
        </div >

    )
}

export default DashboardTLPage
