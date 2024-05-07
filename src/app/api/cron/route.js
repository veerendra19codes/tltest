
import { NextResponse } from "next/server"
import sendEmail from "@/lib/mailer.js"


import fetch from 'node-fetch';
import { getAllUsers } from './actions';

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

    sendEmail(["yashkalia4215","veerendragumate@gmail.com"],activeFranchiseArr);
    const result = "Helo, World! This is CRON route."

    return NextResponse.json({ data: result })
}