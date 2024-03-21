import models from "@/lib/models" // Import your Company model
const Company = models.Company;
import { connectToDB } from "@/lib/connectToDB"; // Import your database connection function
import { NextResponse } from "next/server";

export async function PUT(req) {
    try {
        const updatedFields = await req.json(); // Access updatedFields from req.body

        console.log("updatedFields", updatedFields);

        //check if companyId is provided from frontend
        const companyId = updatedFields.companyId;
        if (!companyId) {
            // return res.status(400).json({ error: "Company ID not provided" });
            return NextResponse.json({error: "Company ID not provided"}, {status: 400})
        }

        connectToDB();

        //check if company exists in models with the companyId provided from frontend
        const company = await Company.findById(companyId);
        if (!company) {
            //  return res.status(404).json({ error: "Company not found" });
            return NextResponse.json({error: "Company not found"}, {status: 400})
        }

        const result = await Company.updateOne(
        { _id: companyId }, 
        {
            $set: { 
                teamleadername: updatedFields.teamleadername, 
                teamleader: updatedFields.teamleader 
            },
            // $set: { teamleader: updatedFields.teamleader},
        }
    );

    console.log(result);
    return NextResponse.json({ success: true, company });
        
    } catch (error) {
        console.error("Error updating company:", error);
        return NextResponse.json({ error: "Internal server error" }, {status: 500});
    }
}
