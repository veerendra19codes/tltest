import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectToDB"
import models from "@/lib/models.js"
const User = models.User; 

export const GET = async (request, {params}) => {
    
    // console.log("params inside route.js:",params);
    const {slug}= params;
    // console.log("slug inside route.js",slug);

    try {
        connectToDB();

        const user = await User.findOne({_id: slug});
        return NextResponse.json(user);
    }
    catch(err) {
        console.error(err);
        console.log("failed to get a user from db");
    }
}
