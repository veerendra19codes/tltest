"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
// import { SessionProvider } from "next-auth/react"

// {session, ...pageProps}
export default function Home() {
  const router = useRouter();


  const handleStart = () => {
    router.push("/login");
  }

  return (
    //  <SessionProvider session={session}>
     
    <div className="flex flex-col justify-center items-start h-screen w-full">

      <div className="hero flex flex-row justify-center items-center gap-4 w-full ">
        <div className="left w-1/2 h-auto flex flex-col justify-center items-start pl-48 sm:px-4 sm:w-full">

          <p className="text-2xl font-medium">Welcome to</p>
          <h1 className="text-4xl text-blue-500 font-black">Task Manager</h1>
          <p className="text-xl pb-12">Use Task manager and Manage your tasks efficiently</p>
          <button onClick={handleStart} className="bg-blue-500 rounded py-2 px-4 text-white">Get Started</button>
        </div>

        <div className="right flex justify-center items-center w-1/2 sm:hidden">
          <Image src="/home.jpg" width={500} height={500} alt="hero" priority={true} />
        </div>

      </div>
    </div>
    //  </SessionProvider>

  );
}
