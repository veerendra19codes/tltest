import models from "@/lib/models" // Import your Company model
const Company = models.Company;
import { connectToDB } from "@/lib/connectToDB"; // Import your database connection function
import { NextResponse } from "next/server";

export async function PUT(req, {params}) {
    try {
        const {companyId} = params;
        const updatedFields = await req.json(); // Access updatedFields from req.body

        console.log("companyId:", companyId );
        console.log("updatedFields", updatedFields);

        if (!companyId) {
            // return res.status(400).json({ error: "Company ID not provided" });
            return NextResponse.json({error: "Company ID not provided"}, {status: 400})
        }

        connectToDB();

        const company = await Company.findById(companyId);

        if (!company) {
            //  return res.status(404).json({ error: "Company not found" });
            return NextResponse.json({error: "Company not found"}, {status: 400})
        }

        // Update only the specified fields
        for (const field in updatedFields) {
            if (updatedFields.hasOwnProperty(field)) {
                company[field] = updatedFields[field];
            }
        }

        await company.save();
        console.log(company);
        return NextResponse.json({ success: true, company });
        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Error updating company:", error);
        return NextResponse.json({ error: "Internal server error" }, {status: 500});
    }
}
