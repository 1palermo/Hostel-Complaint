// pages/userHome.tsx
import Head from 'next/head';
'use client'
import { useState, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome , faMultiply } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link'
import { Suspense } from 'react';
import Loading from './loading';


const UserHomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  return (
        <div className="flex justify-center min-h-screen p-5 bg-[url('/brick.jpg')] bg-cover">
          <div className="bg-[#EEEEEE] p-8 rounded-lg shadow-md w-[720px]">
            <div className="flex items-center justify-between text-blue-600">
              <FontAwesomeIcon
                icon={faBars}
                className="mr-2 h-8 w-8 cursor-pointer"
                onClick={toggleMenu}
              /><Link href="/userHome">
              <FontAwesomeIcon icon={faHome} className="ml-2 h-8 w-8" /></Link>
            </div>
            <div className={`absolute min-h-screen min-w-screen justify-center z-10 mx-[-32px] mt-[-64px] bg-[#EEEEEE] rounded-lg  shadow-md w-[350px] lg:w-[720px] ${
              isOpen ? 'block' : 'hidden'
              }`}>
              <div className="flex items-center justify-between text-blue-600 p-8">
                  <FontAwesomeIcon
                    icon={faMultiply}
                    className="mr-2 h-8 w-8 cursor-pointer"
                    onClick={toggleMenu}
                  />
                </div>
              <div className="flex items-center justify-center">
                <div className="p-10 mt-32">
                  <Link href="/profile">
                  <h1 className="text-blue-600 text-2xl mb-4">Personal details</h1></Link>
                  <hr className="animate-shimmer h-1 w-full bg-gradient-to-r from-blue-400 to-blue-600 mt-2 mb-6"></hr>
                  <Link href="/studentReport">
                  <h1 className="text-blue-600 text-2xl mb-4">Report Form</h1></Link>
                  <hr className="animate-shimmer h-1 w-full bg-gradient-to-r from-blue-400 to-blue-600 mt-2 mb-6"></hr>
                  <h1 className="text-blue-600 text-2xl mb-4">About us</h1>
                  <hr className="animate-shimmer h-1 w-full bg-gradient-to-r from-blue-400 to-blue-600 mt-2 mb-6"></hr>
                  <h1 className="text-blue-600 text-2xl mb-4">Faq</h1>
                </div>
              </div>
            </div>
            <Suspense fallback={<Loading/>}
            >


            <div className="flex flex-col items-center">
              <img
                src="/userPhoto.png"
                alt="User Image"
                className="rounded-full h-32 w-32 mb-2"
              />
              <p className="text-xl font-semibold text-blue-600">Aman Deep</p>
              <p className="text-xl font-semibold text-blue-600 pt-4">2K21/EE/37</p>
            </div>
            <hr className="animate-shimmer h-1 w-full bg-gradient-to-r from-blue-400 to-blue-600 mt-10"></hr>

            <div className="flex justify-around mt-8">
              <div className="items-center">
                <img
                  src="/complaint.png"
                  alt="Image 1"
                  className="rounded-md h-32 w-32"
                />
                <p className='text-lg font-semibold text-blue-600 p-4'>Complaints</p>
              </div>
              <div className="items-center mt-4">
                <img
                  src="/Mess.png"
                  alt="Image 2"
                  className="rounded-md h-32 w-32"
                />
                <p className='text-lg font-semibold text-blue-600 p-4 text-center'>Mess</p>
              </div>
            </div>

            <div className="flex justify-around ">
              <div className="items-center mt-4">
                <img
                  src="/Misc.png"
                  alt="Image 1"
                  className="rounded-md h-32 w-32"
                />
                <p className='text-lg font-semibold text-blue-600 p-2'>Miscellaneous</p>
              </div>
              <div className="items-center mt-4">
                <img
                  src="/leave.jpg"
                  alt="Image 2"
                  className="rounded-md h-32 w-32"
                />
                <p className='text-lg font-semibold text-blue-600 p-2'>Leave/Outing</p>
              </div>
            </div>
            
            </Suspense>
          </div>
        </div>
      );
};

export default UserHomePage;
