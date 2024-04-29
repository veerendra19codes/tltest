// src/lib/cron.js

import cron from 'node-cron';
import { sendEmailToActiveFranchises } from './mailer';

// Define the cron job schedule to run every 5 minutes on Tuesdays in India timezone (IST)
// cron.schedule('*/5 * * * 2', () => {
//   // Send emails to active franchises
//   sendEmailToActiveFranchises();
// }, {
//   timezone: 'Asia/Kolkata' // Set the timezone to 'Asia/Kolkata' for Indian Standard Time
// });


