import { connectToDB } from "@/lib/connectToDB";
import  models  from "@/lib/models";
const User = models.User;
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
    try {
        await connectToDB();

        const {username, email, password, role, level, teamleadername, companiesCompleted, companiesRejected, companiesWorking, companiesCompletedName, companiesRejectedName, companiesWorkingName, spreadsheet, deployedlink, revenueapi,preference,reminders } = await req.json();
        console.log("new employee:", {username, password, email, role, level, teamleadername, companiesCompleted, companiesRejected, companiesWorking ,companiesCompletedName, companiesRejectedName, companiesWorkingName, spreadsheet,deployedlink, revenueapi, preference,reminders});

        const exists = await User.findOne({username});
        if(exists) {
            return NextResponse.json({message: "Username or Email already exists"},{status:500});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role,
            level, 
            teamleadername,
            companiesCompleted, 
            companiesRejected, 
            companiesWorking,
            companiesCompletedName, companiesRejectedName, companiesWorkingName,
            spreadsheet, deployedlink, revenueapi, preference,reminders
        });
        console.log("user added in db:", user);
        return NextResponse.json({message:"User registered successfully"}, {status: 201});
    }
    catch(err) {
        console.log("Error while registering user in route.js", err);
        return NextResponse.json({message: "Error in registered user in route.js"}, {status: 501});
    }
}



export async function PUT(req) {
    try {
        await connectToDB();

        const {username, email, password, role, level, teamleadername, companiesCompleted, companiesRejected, companiesWorking, companiesCompletedName, companiesRejectedName, companiesWorkingName, spreadsheet, deployedlink, revenueapi,preference } = await req.json();
        console.log("employee to be updated:", {username, password, email, role, level, teamleadername, companiesCompleted, companiesRejected, companiesWorking ,companiesCompletedName, companiesRejectedName, companiesWorkingName, spreadsheet,deployedlink, revenueapi, preference });

        const exists = await User.findOne({username});
        if(!exists) {
            return NextResponse.json({error:"User with this username does not exists"});
        }

        if(password !== "") {
            const hashedPassword = await bcrypt.hash(password, 10);
            const updatedUser = await User.updateOne(
                {username},
                {
                    $set: { 
                        email,
                        password: hashedPassword,
                        role,
                        level,
                        spreadsheet,
                        teamleadername,
                        preference,
                        deployedlink,
                        revenueapi,
                        companiesCompleted, 
                        companiesRejected, 
                        companiesWorking,
                        companiesCompletedName, 
                        companiesRejectedName, 
                        companiesWorkingName, 
                        revenueapi, 
                    },
                }
            );

            console.log("updated user in db:", updatedUser);
            return NextResponse.json({message:"User updated successfully"}, {status: 201});
        }

        else {

            const updatedUser = await User.updateOne(
                {username},
                {
                    $set: { 
                        email,
                        role,
                        level,
                        spreadsheet,
                        teamleadername,
                        preference,
                        deployedlink,
                        revenueapi,
                        companiesCompleted, 
                        companiesRejected, 
                        companiesWorking,
                        companiesCompletedName, 
                        companiesRejectedName, 
                        companiesWorkingName, 
                        revenueapi, 
                    },
                }
            );

            console.log("updated user in db:", updatedUser);
            return NextResponse.json({message:"User updated successfully"}, {status: 201});
        }
    }
    catch(err) {
        console.log("Error while registering user in route.js", err);
        return NextResponse.json({message: "Error in registered user in route.js"}, {status: 501});
    }
}
