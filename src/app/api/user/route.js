import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectToDB"
import models from "@/lib/models.js"
const User = models.User; 

export const GET = async (request) => {

    try {
        connectToDB();

        const users = await User.find();
        return NextResponse.json(users);
    }
    catch(err) {
        console.log("failed to get a user from db", err);
    }
}
