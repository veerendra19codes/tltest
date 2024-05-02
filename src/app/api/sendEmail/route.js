import { sendEmail } from "@/lib/mailer";

export default async function POST(req) {
    try {
        const { emails } = await req.json();
        console.log("emails in sendEmail route:", emails);
        // Call the sendEmail function here
        // await sendEmail(emails); // Assuming sendEmail function takes an array of emails
    } catch (err) {
        console.log("error in sendEmail Route:", err);
    }
}
