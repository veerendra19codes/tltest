// Import necessary modules and functions
import fetch from 'node-fetch';
import { getAllUsers } from './actions';

// Define the function to send emails to active franchises
const sendEmailToActiveFranchises = async () => {
  try {
    // const currentTime = new Date();
    // Your logic to check if it's Monday and get active franchises

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


    // Fetch all users from the database
    const allUsers = await getAllUsers();

   const activeFranchiseEmails = allUsers
            .filter(user => activeFranchises.includes(user.franchise))
            .map(user => user.email);

        console.log("Active Franchise Emails:", activeFranchiseEmails);

    // Send emails to active franchise users
    // Your email sending logic here
    console.log('Emails sent to active franchises:', activeFranchiseEmails);
  } catch (error) {
    console.error('Error sending emails:', error);
  }
};

module.exports = { sendEmailToActiveFranchises };

// import nodemailer from 'nodemailer';


// const transporter = nodemailer.createTransport({
    //   // configure your email transport options here
    //   host: "bulk.smtp.mailtrap.io",
    //         //     port: 587,
    //         //     auth: {
        //         //       user: "api",
        //         //       pass: process.env.MAILTRAP_PASSWORD,
        //         //     }
        // });
        
        // export async function sendEmail(options) {
            //   try {
                //     // await transporter.sendMail(options);
                //     console.log("options:", options);
                //     console.log('Email sent successfully');
                //   } catch (error) {
                    //     console.error('Error sending email:', error);
                    //   }
                    // }
                    
                    // // export default async function sendEmail(email) {

                        // //     try {
// //         console.log("email:",email);
// //         // var transport = nodemailer.createTransport({
    // //         //     host: "bulk.smtp.mailtrap.io",
    // //         //     port: 587,
// //         //     auth: {
    // //         //       user: "api",
    // //         //       pass: process.env.MAILTRAP_PASSWORD,
    // //         //     }
    // //         //   });
    
    // //         //   const info = await transport.sendMail({
        // //         //     from: 'info@talentcornertaskmanager.com',
// //         //     to: "me@gmail.com",
// //         //     bcc:"veerendragumate@gmail.com,veerendraforwork@gmail.com",
// //         //     subject: "Test Email: This is a Test Message ✔",
// //         //     text: "This is a test email message to check the email sending functionality.",
// //         //     html: "<p>This is a <b>test email message</b> to check the email sending functionality.</p>",
// //         // });

// //         console.log("Message sent: %s", info.messageId);
// //     } catch (error) {
    // //         console.error("Error sending email:", error);
    // //     }
    // // }
    
    // // Define a function to send emails in a loop
    // // export default function sendEmailInLoop() {
        // //     // Send email immediately
        // //     sendEmail();
        
        // //     // Calculate the time interval for 7 days in milliseconds
        // //     // const intervalInDays = 7;
        // //     // const intervalInMilliseconds = intervalInDays * 24 * 60 * 60 * 1000;
        // //     // setInterval(sendEmail, intervalInDays);
        
        // //     // Set interval to send email every 1 min
        // //     setInterval(sendEmail, 60 * 1000);
        // // }

        // // Call the function to start sending emails in a loop
// //sendEmailInLoop();
// //sendEmail();
// console.log("mailer");

// const { getAllUsers } = require('./actions');
// const fetch = require('node-fetch');

// // Import required modules
// const currentTime = new Date();
// const dayOfWeek = currentTime.getDay();
// // if(dayOfWeek == 1) {} this is to check if day is monday , 0 for sunday 1 for monday and so on

// if (currentTime.getMinutes() % 2 === 0) {
//     console.log("this was run at :",currentTime);
    
    
    
//     // Define the fetchSheetData function to fetch data from the API
// const fetchSheetData = async () => {
//     try {
//         const response = await fetch('https://script.google.com/macros/s/AKfycby0YKBkdWDeiTZygA7WuarwQGls3lQ2eX898a3rGufxKBmtdcebL84m-k7UpUOSZXoE/exec');
        
//         const franchises = await response.json();
//     // console.log("data:", data);

//     // Call the filterFranchises function after fetching data
//     filterFranchises(franchises);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

// // Function to filter franchises based on client status
// const filterFranchises = (franchises) => {
//   const inactiveFranchises = [];
//   const activeFranchises = [];

//   for (const franchise in franchises) {
//     const clientStatus = franchises[franchise].clientStatusCounts.activeCount;

//     if (clientStatus === 0) {
//       inactiveFranchises.push(franchise);
//     } else {
//       activeFranchises.push(franchise);
//     }
//   }

//   console.log('Inactive Franchises:', inactiveFranchises);
//   console.log('Active Franchises:', activeFranchises);
// };

// // Call the fetchSheetData function to fetch data and filter franchises
// fetchSheetData();

//  const fetchAllUsers = async (activeFranchises) => {
//         const allUsers = await getAllUsers();
//         console.log("allUsers", allUsers);

//         // Extract emails of active franchise users
//         const activeFranchiseEmails = allUsers
//             .filter(user => activeFranchises.includes(user.franchise))
//             .map(user => user.email);

//         console.log("Active Franchise Emails:", activeFranchiseEmails);
//         // Now you can use these emails to send emails to active franchise users
//     };
// fetchAllUsers();
// }

