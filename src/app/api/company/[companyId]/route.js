import models from "@/lib/models" // Import your Company model
const Company = models.Company;
const User = models.User;
import { connectToDB } from "@/lib/connectToDB"; // Import your database connection function
import { NextResponse } from "next/server";

export async function PUT(req, {params}) {
    try {
        const {companyId} = params;
        const updatedFields = await req.json(); // Access updatedFields from req.body

        // console.log("companyId:", companyId );
        // console.log("updatedFields", updatedFields);

        const newRejectedFranchiseName = updatedFields.rejectedFranchiseName;
        // console.log(newRejectedFranchiseName);

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

        if( updatedFields.message === "assign tl") {
            // Update only the specified fields
            // for (const field in updatedFields) {
            //     if (updatedFields.hasOwnProperty(field)) {
            //         company[field] = updatedFields[field];
            //     }
            // }

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

            // console.log(result);
            return NextResponse.json({ success: true, company });
        }
        else if( updatedFields.message === "reject fr") {

            const updatedCompany = await Company.updateOne(
                { _id: companyId }, 
                {
                    $set: { 
                        franchise: null,
                        franchisename: updatedFields.franchisename, 
                    },
                    $push: {
                        rejectedFranchise: updatedFields.rejectedFranchise,
                        rejectedFranchiseName:updatedFields.rejectedFranchiseName,
                    }
                }

            );

            const updatedUser = await User.updateOne(
                { _id: updatedFields.franchise }, 
                {
                    $push: { 
                        companiesRejected: updatedFields.companiesRejected,
                        companiesRejectedName:updatedFields.companiesRejectedName,
                    },
                }
            );

            // console.log(updatedCompany);
            return NextResponse.json({ success: true, company });
        }
        else if( updatedFields.message === "assign fr") {
            // Update only the specified fields
            // for (const field in updatedFields) {
            //     if (updatedFields.hasOwnProperty(field)) {
            //         company[field] = updatedFields[field];
            //     }
            // }

             const result = await Company.updateOne(
                { _id: companyId }, 
                {
                    $set: { 
                        franchisename: updatedFields.franchisename, 
                        franchise: updatedFields.franchise 
                    },
                    // $set: { teamleader: updatedFields.teamleader},
                }
            );

            // console.log(result);
            return NextResponse.json({ success: true, company });
        }
        else {

        const result = await Company.updateOne(
            { _id: companyId }, 
            {
                $set: { 
                    franchisename: updatedFields.franchisename,
                    franchise: updatedFields.franchise,
                    teamleader: updatedFields.teamleader,
                    teamleadername: updatedFields.teamleadername,
                },
                $push: { 
                    rejectedTeamLeadersName: updatedFields.rejectedTeamLeadersName,
                    rejectedTeamLeaders: updatedFields.rejectedTeamLeaders,
                }, // Push the new rejected franchise name
            }
        );

        // console.log(result);

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
        }
        // return NextResponse.json({ success: true, company });
        
    } catch (error) {
        // console.error("Error updating company:", error);
        return NextResponse.json({ error: "Internal server error" }, {status: 500});
    }
}
