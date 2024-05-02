
import { NextResponse } from "next/server"
import sendEmail from "@/lib/mailer.js"


import fetch from 'node-fetch';
import { getAllUsers } from './actions';

// Define the function to send emails to active franchises
const sendEmailToActiveFranchises = async () => {
  try {

    // Fetch data from API or database
    const response = await fetch('https://script.google.com/macros/s/AKfycbxl6CDmbyH3-jHGYCeq79P76Ix2V4N2qVli9cFO6KXBygMXhgDo6XdvuWGf38K1Fyka/exec');
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

//     // Fetch all users from the database
//     const allUsers = await getAllUsers();

//    const activeFranchiseEmails = allUsers
//             .filter(user => activeFranchises.includes(user.franchise))
//             .map(user => user.email);

//         console.log("Active Franchise Emails:", activeFranchiseEmails);

//     // Send emails to active franchise users
//     // Your email sending logic here
//     console.log('Emails sent to active franchises:', activeFranchiseEmails);
return ({emails})
  } catch (error) {
    console.error('Error sending emails:', error);
  }
};

module.exports = { sendEmailToActiveFranchises };


export async function GET() {

    //logic to filter active franchises and send array of emails of active franhcises, let be activeFRranchiseArr

    sendEmail(activeFranchiseArr);
    const result = "Helo, World! This is CRON route."

    return NextResponse.json({ data: result })
}