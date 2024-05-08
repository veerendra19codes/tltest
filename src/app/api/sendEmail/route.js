import { sendEmail } from "@/lib/mailer";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { emails } = await req.json();
        console.log("emails in sendEmail route:", emails);

        // Call the sendEmail function here
        // const res = await sendEmail(emails);
        // const message = await res.json();
        // console.log("response from sendEmail fn:", res); // Assuming sendEmail function takes an array of emails
        if(res.ok) {
        return NextResponse.json({success:"sent successfully"}, {status: 201})
        }
        else {
        return NextResponse.json({error:"error in sending email"} , {status: 501})
        }
    } catch (err) {
        // console.log("error in sendEmail Route:", err);
        return NextResponse.json({error:"Try again later sometimes"} , {status: 501})
    }
}
