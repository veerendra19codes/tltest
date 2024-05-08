"use server";

import nodemailer from "nodemailer"
// import { promises as fs } from 'browserfs';
import { NextResponse } from "next/server";

export const sendEmail = async (emails) => {
    //when cron jobs triggers this function emails arr will have active franhcises email


    //but when tl hits an alert emails arr will have only a single email but in arr

    
    try {
        // console.log("activeFranchiseArr:",activeFranchiseArr);
        // console.log("emails in sendEmail fn:", emails); 

    //     const emailContent = `
    //   <html>
    //     <head>
    //       <style>
    //         /* Add your CSS styles here */
    //       </style>
    //     </head>
    //     <body>
    //       <h1>Hello Active Franchises!</h1>
    //       <p>This is a test email message to check the email sending functionality.</p>
    //       <ul>
    //         ${activeFranchiseArr.map(email => `<li>${email}</li>`).join('')}
    //       </ul>
    //     </body>
    //   </html>
    // `;
        var transport = nodemailer.createTransport({
            host: "bulk.smtp.mailtrap.io",
            port: 587,
            auth: {
              user: "api",
                pass: process.env.MAILTRAP_PASSWORD,
            }
          });

          const info = await transport.sendMail({
            from: 'info@talentcornertaskmanager.com',
            to: "me@gmail.com",
            bcc: emails,
            subject: "Test Email: This is a Test Message ✔",
            text: "This is a test email message to check the email sending functionality from alert",
            html: "<p>This is a <b>test email message</b> to check the email sending functionality from alert</p>",
            // html: emailContent
        });

        // console.log("Message sent: %s", info.messageId);
        return NextResponse.json({success:"successfully sent email"}, {status: 201})
    } catch (error) {
        // console.error("Error sending email:", error);
        if (error.code === 'ETIMEDOUT') {
            // Handle timeout error, e.g., retry after a delay
            // console.error("SMTP Connection Timeout:", error.message);
            return NextResponse.json({message:"Connection Timed Out , Please try again later sometime"}, {status:501})
        }
    }
}

