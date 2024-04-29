import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectToDB"
import models from "@/lib/models.js"
const User = models.User; 

export const GET = async (request, {params}) => {
    
    // console.log("params inside route.js:",params);
    const {username}= params;
    // console.log("slug inside route.js",slug);

    try {
        connectToDB();

        const user = await User.findOne({username});
        return NextResponse.json(user);
    }
    catch(err) {
        console.error(err);
        console.log("failed to get a user from db");
    }
}




export async function PUT(req, {params}) {
    try {
        const {userId} = params;
        const updatedFields = await req.json(); // Access updatedFields from req.body

        console.log("userId", userId );
        console.log("updatedFields", updatedFields);
        const newCompaniesRejectedName = updatedFields.companyname;
        console.log(newCompaniesRejectedName);

        if (!userId) {
            // return res.status(400).json({ error: "Company ID not provided" });
            return NextResponse.json({error: "user ID not provided"}, {status: 400})
        }

        connectToDB();

        const result = await User.updateOne(
            { _id: userId }, 
            {
                // $set: { franchisename: updatedFields.franchisename }, // Set the new franchisename
                $push: { companiesrejectedName: newCompaniesName }, // Push the new rejected franchise name
            }
        );

        console.log(result);

        // if (result.nModified === 0) {
        //     console.log(result);
        //     console.log('Franchise name and rejected franchise name updated successfully.');
        // } else {
        //     console.log('No document found or no modification made.');
        // }


        // await company.save();
        // console.log(company);
        return NextResponse.json({ success: true, company });
        // return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Error updating company:", error);
        return NextResponse.json({ error: "Internal server error" }, {status: 500});
    }
}

