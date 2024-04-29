// activeFranchiseEmailSender.js

// Import necessary modules and functions
import fetch from 'node-fetch';
import { getAllUsers } from './actions.js';
import cron from 'node-cron';

// Define the function to send emails to active franchises
const sendEmailToActiveFranchises = async () => {
  try {
    // Fetch data from API or database
    const response = await fetch('https://script.google.com/macros/s/AKfycby0YKBkdWDeiTZygA7WuarwQGls3lQ2eX898a3rGufxKBmtdcebL84m-k7UpUOSZXoE/exec');
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

    // Fetch all users from the database
    const allUsers = await getAllUsers();

    const activeFranchiseEmails = allUsers
            .filter(user => activeFranchises.includes(user.franchise))
            .map(user => user.email);

    // Send emails to active franchise users
    // Your email sending logic here
    console.log('Emails sent to active franchises:', activeFranchiseEmails);
  } catch (error) {
    console.error('Error sending emails:', error);
  }
};

// Define a cron job to call the function every 15 seconds
cron.schedule('*/15 * * * * *', () => {
  sendEmailToActiveFranchises();
});