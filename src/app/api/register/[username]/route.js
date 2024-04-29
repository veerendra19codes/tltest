import { connectToDB } from "@/lib/connectToDB";
import { NextResponse } from "next/server";
import models from "@/lib/models"
const User = models.User;

export async function DELETE(req, {params}) {
    const {username} = params;
    console.log("username to be deleted in route.js:", username);
    try {
        connectToDB();
        // const user = await User.findOne({username});
        // console.log("user:", user);

        const result = await User.findOneAndDelete({username});
        // console.log("result:", result);
        return NextResponse.json(result,{status: 201});
        // return NextResponse.json({message: "testng"}, {status: 201})

    } catch(err) {
        console.log("error in deleting user from db in");
        return NextResponse.json({message: "Error in deleting user in db:"}, {status: 501})
    }
}