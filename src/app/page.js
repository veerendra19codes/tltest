"use client";

import Image from "next/image";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import { useContext } from "react";
import UserContext from "@/contexts/UserContext";
// import { usePathname } from "next/navigation";

export default function Home() {
  const {session, status} = useContext(UserContext);
  // console.log("session on home:", session);
  // const pathName = usePathname();
  
  // console.log("pathname:" ,pathName);
  let route = "";

  if(status!=="loading") {
    if(session.user?.role === "ad") {
      route="/dashboardad";
    }
    else if(session.user?.role === "bd") {
      route="/new";
    }
    else if(session.user?.role === "sh") {
      route="/mails";
    }
    else if(session.user?.role === "tl") {
      route="/assign";
    }
    else {
      route="dashboardfr"
    }
  }
  // console.log("route:", route);

  return (     
    <div className="flex flex-col justify-center items-start h-screen w-full lg:justify-start ">

      <div className="hero flex lg:flex-col justify-center items-center gap-4 w-full lg:mt-12">
        <div className="left w-1/2 h-auto flex flex-col gap-4 justify-center items-start pl-48 lg:px-4 lg:w-full lg:gap-0 lg:items-center">
          <p className="text-5xl font-black text-white lg:text-3xl">Welcome to</p>
          <h1 className="text-5xl font-black text-blue-300  lg:text-4xl">Task Manager</h1>
          <p className="text-xl pb-12 text-slate-100 lg:text-[15px] pr-20 lg:pr-0 lg:mt-4 lg:pb-0 lg:text-center">Your go-to app for tracking statistics, tasks delegation, seamless communication, improving efficiency and much more...</p>
          <Link href={route} className="rounded-2xl py-2 px-8 text-white flex font-semibold items-center text-2xl bg-gradient-to-r from-[#6157ff] to-[#ee49fd] border-[1px] border-[#6157ff] hover:shadow-2xl lg:hidden">Get started <GoArrowRight size={50} /></Link>
        </div>

        <div className="right flex justify-center items-center w-1/2 lg:w-[80%] flex-col">
          <Image src="/hero.png" width={500} height={500} alt="hero" priority={true} className="size-auto" />
        </div>

        <Link href={route} className="hidden  lg:flex justify-center items-center text-white gap-2 bg-gradient-to-r from-[#6157ff] to-[#ee49fd] border-[1px] border-[#6157ff] rounded-xl px-4 text-xl py-2">Get started <GoArrowRight size={30} /></Link>


      </div>
    </div>
    // </SessionProvider>

  );
}
