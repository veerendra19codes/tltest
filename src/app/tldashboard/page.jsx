import { connectToDB } from "@/lib/connectToDB"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import PieChartComponent from "@/Components/PieChart_dropdown/PieChart_dropdown"

// FETCHING DATA WITH API
const getUsers = async () => {
    const res = await fetch("http://localhost:3000/api/user");

    if (!res.ok) {
        console.log(res.json());
    } else {
        console.log(res.json())
    }
    return res.json();
}

const TLDashboardPage = async () => {
    const session = await getServerSession(authOptions);
    if (session === null) {
        redirect("/login");
    }
    const users = await getUsers();
    const data = users.reverse().filter((data) => data.teamleader === session.user?.id);

    return (

        <div className="flex flex-col space-y-7"> {/* Added space-y-7 to add space between children */}
            <div>
                <PieChartComponent />
            </div>
            <div><h1>Click on the button to send an alert to the fr</h1></div>
            <div>
                <button className="bg-red-500 w-19 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Alert</button> {/* Added Tailwind CSS classes */}
            </div>
        </div>
        // <div><h1>Heello</h1></div>

    )
}

export default TLDashboardPage