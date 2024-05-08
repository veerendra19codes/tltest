
import { NextResponse } from "next/server"

import fetch from 'node-fetch';
import { getAllUsers } from '@/lib/actions';

// Define the function to send emails to active franchises
const sendEmailToActiveFranchises = async () => {
  try {
    const allUsers = await getAllUsers();
    const admin = allUsers.filter((user) => user.role === "ad");
    const url = admin[0].deployedlink;


    // Fetch data from API or database
    const response = await fetch(url);
    const franchises = await response.json();

    const inactiveFranchises = [];
    const activeFranchises = [];

    for (const franchise in franchises) {
        const clientStatus = franchises[franchise].clientStatusCounts.activeCount;

        if (clientStatus === 0) {
        inactiveFranchises.push(franchise);
        } else {
        activeFranchises.push(franchise);
        }
    }

    console.log('Inactive Franchises:', inactiveFranchises);
    console.log('Active Franchises:', activeFranchises);

    const activeFranchiseEmails = allUsers
      .filter(user => activeFranchises.includes(user.username))
      .map(user => user.email);

    console.log("emails of active franhise:",activeFranchiseEmails);
    return activeFranchiseEmails;
  } catch (error) {
    console.error('Error sending emails:', error);
  }
};

// module.exports = { sendEmailToActiveFranchises };


export async function GET() {

    //logic to filter active franchises and send array of emails of active franhcises, let be activeFRranchiseArr
    // const actIiveFranchisess = sendEmailToActiveFranchises();
    // const activeFranchiseArr = ["yashkalia4215@gmail.com","veerendragumate@gmail.com"];
    const activeFranchiseArr = await sendEmailToActiveFranchises();
    console.log("activeFranchiseArr:", activeFranchiseArr);

    // sendEmail(activeFranchiseArr);
     try {
        // console.log("activeFranchiseArr:",activeFranchiseArr);
        // console.log("emails in sendEmail fn:", emails); 

        const emailContent = `
      <html>
        <head>
          <style>
            /* Add your CSS styles here */
          </style>
        </head>
        <body>
          <h1>Hello Active Franchises!</h1>
          <p>This is a test email message to check the email sending functionality.</p>
          <ul>
            ${activeFranchiseArr.map(email => `<li>${email}</li>`).join('')}
          </ul>
        </body>
      </html>
    `;
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
            bcc: ["veerendragumate@gmail.com","yashkalia4215@gmail.com"],
            subject: "Test Email: This is a Test Message ✔",
            text: "This is a test email message to check the email sending functionality from alert",
            // html: "<p>Kindly update your spreadsheet</p>",
            html: emailContent
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
    const result = "Helo, World! This is CRON route."

    return NextResponse.json({ data: result })
}