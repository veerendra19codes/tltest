import models from "@/lib/models";
const Company = models.Company;
import { connectToDB } from "@/lib/connectToDB";
import { NextResponse } from "next/server";

// export async function POST(req) {
//     try {
//         await connectToDB();

//         const {companyname, jobdetails} = await req.json();
//         // console.log({username, password, email, role});
//         const exists = await Company.findOne({jobdetails});
//         if(exists) {
//             return NextResponse.json({message: "Job Details already exists"},{status:500});
//         }
       
//         await Company.create({
//             companyname,
//             jobdetails,
//         });
//         return NextResponse.json({message:"Company sent successfully"}, {status: 201});
//     }
//     catch(err) {
//         console.log("Error while sending Company details in route.js", err);
//         return NextResponse.json({message: "Error in  Company details in route.js"}, {status: 501});
//     }
// }
// to post new Company details, server actions used

export async function GET(req){
    try {
        connectToDB();

        const companies = await Company.find();
        return NextResponse.json(companies);
    }
    catch(err) {
        console.log("Error in getting companies in route.js:", err);
    }
}