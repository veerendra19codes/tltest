// "use client";

import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
// import { SessionProvider } from "next-auth/react"
import { redirect } from "next/navigation"
import { GoArrowRight } from "react-icons/go";

// {session, ...pageProps}
export default async function Home() {

  const session = await getServerSession(authOptions);
  if(!session) {
    redirect("/login");
  }
  // console.log("user in sesssion in home:", session.user);

  // const handleStart = () => {
  //   router.push("/login");
  // }

  return (
    //  <SessionProvider session={session}>
     
    <div className="flex flex-col justify-center items-start h-screen w-full">
      {/* <h2> Home page logged in  User: {session?.user?.username} his role is {session?.user?.role}</h2> */}

      <div className="hero flex flex-row justify-center items-center gap-4 w-full">
        <div className="left w-1/2 h-auto flex flex-col gap-4 justify-center items-start pl-48 sm:px-4 sm:w-full">
          <p className="text-5xl font-black text-white">Welcome to</p>
          <h1 className="text-5xl text-white font-black text-gradient-to-r from-lightpurple to-darkpurple">Task Manager</h1>
          <p className="text-xl pb-12 text-white">Use Task manager and Manage your tasks efficiently</p>
          <Link href="/login" className="bg-white rounded-2xl py-2 px-8 text-purple flex font-semibold items-center text-2xl">Get Started <GoArrowRight size={50} /></Link>
        </div>

        <div className="right flex justify-center items-center w-1/2 sm:hidden">
          <Image src="/hero.png" width={500} height={500} alt="hero" priority={true} />
        </div>

      </div>
    </div>
    // </SessionProvider>

  );
}
