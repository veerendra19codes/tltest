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