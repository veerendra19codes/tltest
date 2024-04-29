import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import { Providers } from "./providers";
import UserContextProvider from "@/contexts/UserContextProvider";
// import { initializeCronJob } from '@/lib/cron';
// import { useEffect } from 'react';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Task Manager by Talent Corner",
  description: "Task manager",
};

export default function RootLayout({ children }) {
  // useEffect(() => {
  //   initializeCronJob(); // Call the function to start the cron job
  // }, []);

  return (
    <html lang="en">
      <head>
          <link rel="icon" href="/tclogo.png" />
        </head>
    <body className={inter.className + "h-full w-full flex flex-col bg-gradient-to-r from-[#5E376C] to-[#675080] overflow-x-hidden"}>
      <Providers>
        <UserContextProvider>
        <Navbar />
        {children}
        </UserContextProvider>
      </Providers>
    </body>
    </html>
  );
}
