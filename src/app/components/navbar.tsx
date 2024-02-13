'use client'
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome, faMultiply } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Suspense } from "react";
import { signOut } from "next-auth/react";
import Loading from "./loading";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  async function removeSession() {
    localStorage.removeItem("customToken");
    console.log(localStorage.getItem("customToken"));
    await signOut();
    window.location.href = "/";
  }

  return (
    <>
      <div className="flex items-center justify-between text-green-600">
        <FontAwesomeIcon
          icon={faBars}
          className="mr-2 h-8 w-8 cursor-pointer"
          onClick={toggleMenu}
        />
        <Link href="/User/userHome">
          <FontAwesomeIcon icon={faHome} className="ml-2 h-8 w-8" />
        </Link>
      </div>
      <div
        className={`absolute justify-center h-100vh z-10 mx-[-32px] mt-[-66px] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-80 lg:w-[720px] ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex items-center justify-between text-green-600 p-8">
          <FontAwesomeIcon
            icon={faMultiply}
            className="mr-2 h-8 w-8 cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
        <div className="flex items-center justify-center">
          <div className="p-10 mt-32">
            <Link href="/profile">
              <h1 className="text-green-600 text-2xl mb-4">My Profile</h1>
            </Link>
            <hr className="animate-shimmer h-1 w-full bg-gradient-to-r from-blue-400 to-blue-600 mt-2 mb-6"></hr>
            <Link href="/User/studentReport">
              <h1 className="text-green-600 text-2xl mb-4">New Complaints</h1>
            </Link>
            <hr className="animate-shimmer h-1 w-full bg-gradient-to-r from-blue-400 to-blue-600 mt-2 mb-6"></hr>
            <Link href="/User/userComplaints">
              <h1 className="text-green-600 text-2xl mb-4">
                All Complaints
              </h1>
            </Link>
            <hr className="animate-shimmer h-1 w-full bg-gradient-to-r from-blue-400 to-blue-600 mt-2 mb-6"></hr>
            <h1 className="text-green-600 text-2xl mb-4">About us</h1>
            <hr className="animate-shimmer h-1 w-full bg-gradient-to-r from-blue-400 to-blue-600 mt-2 mb-6"></hr>
            <div onClick={removeSession}>
              <h1 className="text-green-600 text-2xl mb-4">
                Log Out
              </h1>
            </div>
          </div>
        </div>
      </div>
      <Suspense fallback={<Loading />}></Suspense>
    </>
  );
}
