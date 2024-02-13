// pages/userHome.tsx
'use client'
import { useState, useEffect} from 'react';
import Link from 'next/link'
import Navbar from '@/app/components/navbar';
import { useAuth } from '@/app/context/auth';


const UserHomePage = () => {
  const [auth, setAuth] = useAuth() as any;
  // const [profile, setProfile] = useState({
  //   userImage: "/avatar.png",
  //   username: "xyz",
  //   roll: "",
  // })

  // useEffect(() => {
  //   setProfile((prev)=>({
  //     ...prev,
  //     ...auth.user
  //   }));

  // }, []);

  return (
        <div className="flex justify-center min-h-screen p-5 bg-[url('/brick.webp')] bg-cover">
          <div className=" bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 p-8 rounded-lg shadow-md w-[720px]">
          <Navbar />

          <div className="flex flex-col items-center">
            <img
              src={auth.user? auth.user.userImage : '/avatar.png'}
              alt="User Image"
              className="rounded-full h-32 w-32 mb-2 border-4 border-black"
              />
            <p className="text-xl font-semibold text-black">{auth.user? auth.user.username : ''}</p>
            <p className="text-xl font-semibold text-black pt-4">{auth.user? auth.user.roll : ''}</p>
          </div>
          <hr className="animate-shimmer h-1 w-full bg-gradient-to-r from-green-700 via-green-400 to-green-600 mt-10"></hr>

          <div className="flex flex-col sm:flex-row justify-around mt-8">

          <div className="items-center">
            <Link href="/User/studentReport">
              <button className="w-full sm:w-150 p-1 my-5 sm:my-0 sm:pl-[-4] rounded-full from-green-700 via-green-400 to-green-600 bg-gradient-to-r">
                <span className="block text-black px-4 py-2 font-semibold rounded-full bg-white">New Complaints</span>
              </button>
            </Link>
          </div>
          <div className="items-center">
            <Link href="/User/userComplaints">
              <button className="w-full sm:w-150 my-5 sm:my-0 p-1 rounded-full from-green-700 via-green-400 to-green-600 bg-gradient-to-r">
                <span className="block text-black lg:px-4 px-2 py-2 font-semibold rounded-full bg-white">Previous Complaints</span>
              </button>
            </Link>
          </div>
          
        </div>
        

          {/* <div className="flex justify-around ">
            <div className="items-center mt-4">
              <img
                src="/Misc.png"
                alt="Image 1"
                className="rounded-md h-32 w-32"
              />
              <p className='text-lg font-semibold text-black p-2'>Miscellaneous</p>
            </div>
            <div className="items-center mt-4">
              <img
                src="/leave.jpg"
                alt="Image 2"
                className="rounded-md h-32 w-32"
              />
              <p className='text-lg font-semibold text-black p-2'>Leave/Outing</p>
            </div>
          </div> */}
        </div>
        </div>
      );
};

export default UserHomePage;
