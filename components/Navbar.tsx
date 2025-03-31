import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Navbar() {
  const session = await auth();
  // console.log("session",session);
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href={"/"}>
          <Image src="/logo.png" alt="logo" width={100} height={50} />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href={"/startup/create"}>
                <p>Create</p>
              </Link>
              <form action={async ()=>{
                "use server";
                await signOut({redirectTo: "/"});
              }}>
                <button type="submit">
                  Sign Out
                </button>
              </form>
              <Link href={`/user/${session.user.name}`}>
                <p>{session.user.name}</p>
              </Link>
            </>
          ) : (

            // here we are using a form to submit the request to the server
            // we are using the async function to make the request to the server and passing serverFunction in action of form for further details 
            // refer to Readme.md qustion no. 2

            <form
              action={async () => {
                "use server";
                // console.log("im called")
                await signIn("github");
              }}
            >
              <button type="submit" className="text-gray-700">
                Sign In
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
}
