// "use client";

import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
// import { SessionProvider } from "next-auth/react"
import { redirect } from "next/navigation"

// {session, ...pageProps}
export default async function Home() {

  const session = await getServerSession(authOptions);
  if(!session) {
    redirect("/login");
  }
  console.log("user in sesssion in home:", session.user);

  // const handleStart = () => {
  //   router.push("/login");
  // }

  return (
    //  <SessionProvider session={session}>
     
    <div className="flex flex-col justify-center items-start h-screen w-full">
      {/* <h2> Home page logged in  User: {session?.user?.username} his role is {session?.user?.role}</h2> */}

      <div className="hero flex flex-row justify-center items-center gap-4 w-full ">
        <div className="left w-1/2 h-auto flex flex-col justify-center items-start pl-48 sm:px-4 sm:w-full">

          <p className="text-2xl font-medium">Welcome to</p>
          <h1 className="text-4xl text-blue-500 font-black">Task Manager</h1>
          <p className="text-xl pb-12">Use Task manager and Manage your tasks efficiently</p>
          {/* <button onClick={handleStart} className="bg-blue-500 rounded py-2 px-4 text-white">Get Started</button> */}
          <Link href="/login" className="bg-blue-500 rounded py-2 px-4 text-white">Get Started</Link>
        </div>

        <div className="right flex justify-center items-center w-1/2 sm:hidden">
          <Image src="/home.jpg" width={500} height={500} alt="hero" priority={true} />
        </div>

      </div>
    </div>
    // </SessionProvider>

  );
}
