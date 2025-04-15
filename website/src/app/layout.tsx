"use client"

import "./globals.css";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import { getUserData, initializeUserData } from "../utils/mockData/mockInfo";

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userData, setUserData] = useState({
      name: "",
      email: "",
      phone: "",
      address: "",
      nhsNumber: "",
      dateOfBirth: "",
    })
  
  useEffect(() => {
    // Initialize mock data if it doesn't exist
    initializeUserData()
  }, [])

  useEffect(() => {
    const data = getUserData()
    if (data) {
      setUserData(data)
    }
  }, [])

  return (
    <html lang="en">
      <head>
        <script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <nav className="bg-[var(--phr)]">
          <div className="flex items-center
                          py-5 px-14 sm:px-16 md:px-22 lg:px-28 xl:px-35">
            <div className="text-white font-bold text-xl sm:text-2xl lg:text-3xl">
              PHR system (Usability Test)
            </div>

            <a
              href="/info"
              className=" ml-auto text-white font-bold
                          transition duration-500
                          hover:drop-shadow-[0_0_1px_#555,0_0_7px_#eeef,0_0_15px_#eee5]"
            >
              {userData.name}
            </a>
          </div>
          <hr className="w-10/12 mx-auto border-white"></hr>
          <Navbar side={false} />
          
        </nav>

        {/* <main className="w-full h-full bg-emerald-500">
          {children}
        </main> */}
        {children}
      </body>
    </html>
  );
}
