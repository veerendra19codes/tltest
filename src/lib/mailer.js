import nodemailer from "nodemailer-browser"
import { promises as fs } from 'browserfs';

export const sendEmail = async (emails) => {
    //when cron jobs triggers this function emails arr will have active franhcises email


    //but when tl hits an alert emails arr will have only a single email but in arr

    console.log("emails in sendEmail fn:", emails);  //dam hai to ye krke dikha
    
    // try {
    //     var transport = nodemailer.createTransport({
    //         host: "bulk.smtp.mailtrap.io",
    //         port: 587,
    //         auth: {
    //           user: "api",
    //           pass: process.env.MAILTRAP_PASSWORD,
    //         }
    //       });

    //       const info = await transport.sendMail({
    //         from: 'info@talentcornertaskmanager.com',
    //         to: "me@gmail.com",
    //         bcc: ["yashadvkdbv",[riwr]],
    //         subject: "Test Email: This is a Test Message ✔",
    //         text: "This is a test email message to check the email sending functionality.",
    //         html: "<p>This is a <b>test email message</b> to check the email sending functionality.</p>",
    //     });

    //     console.log("Message sent: %s", info.messageId);
    // } catch (error) {
    //     console.error("Error sending email:", error);
    // }
}

