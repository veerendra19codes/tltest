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

// export async function PUT(req) {
//     try {
//         const { id, companyname, jobdetails, createdBy, status } = req.body;

//         if (!id || !companyname || !jobdetails || !createdBy || !status) {
//             return NextResponse.error("Must provide all fields", { status: 400 });
//         }

//         connectToDB();

//         const updatedCompany = await Company.findByIdAndUpdate(id, {
//             companyname,
//             jobdetails,
//             createdBy,
//             status
//         }, { new: true });

//         if (!updatedCompany) {
//             return NextResponse.error("Company not found", { status: 404 });
//         }

//         console.log("Company updated successfully");

//         return NextResponse.json({ success: true });
//     } catch (err) {
//         console.error("Error in updating company in route.js:", err);
//         return NextResponse.error("Internal server error", { status: 500 });
//     }
// }


