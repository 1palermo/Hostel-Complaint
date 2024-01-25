// pages/userHome.tsx
'use client'
import { useState, useEffect} from 'react';
import Link from 'next/link'
import { Suspense } from 'react';
import Navbar from '@/app/components/navbar';
import Loading from '@/app/components/loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


const UserHomePage = () => {
  
  const [profile, setProfile] = useState({
    image: "/avatar.png",
    username: "xyz",
    contact: "0",
    email: "xyz@admin.ac.in",
    roll: "",
    hostel_name: "xyz",
    hostel_room: "xxx"
  })

  async function getProfile(){
    let data:any;
    const storedToken = window.localStorage.getItem("customToken") || "";
    if(storedToken) data = JSON.parse(storedToken);
    const response= await fetch("https://hostel-complaint-website.onrender.com/profile",{
      method: "POST" ,
      body: JSON.stringify({userToken: data?.token}) ,
      headers:{
        "Content-Type": "application/json",
      }
     })
     const result= await response.json();
     if(result){
        setProfile((prevProfile)=>({
          ...prevProfile,
          username: result[0]?.username,
          email: result[0]?.email,
          contact: result[0]?.contact,
          hostel_name:result[0]?.tower || "",
          hostel_room: result[0]?.hostel_room_no || "",
          roll: result[0]?.roll || "",
          image: result[0]?.userImage?result[0]?.userImage:"/avatar.png"
        }));
     }
  }

  useEffect(()=>{
    getProfile();
  },[])

  
  
  return (
        <div className="flex justify-center min-h-screen p-5 bg-[url('/brick.webp')] bg-cover">
          <div className="bg-green-100 p-8 rounded-lg shadow-md w-[720px]">
          <Navbar />

          <div className="flex flex-col items-center">
            <img
              src={profile.image}
              alt="User Image"
              className="rounded-full h-32 w-32 mb-2 border-4 border-black"
              />
            <p className="text-xl font-semibold text-black">{profile.username}</p>
            <p className="text-xl font-semibold text-black pt-4">{profile.roll}</p>
          </div>
          <hr className="animate-shimmer h-1 w-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 mt-10"></hr>

          <div className="flex justify-around mt-8">
            <div className="items-center">
              <Link href="/User/studentReport" >
              <button className="w-150 m-4 p-1 rounded-full from-rose-400 via-fuchsia-500 to-indigo-500 bg-gradient-to-r">
                <span className="block text-black px-4 py-2 font-semibold rounded-full bg-white">New Complaints</span>
              </button>
              </Link>
            </div>
            <div className="items-center">
              <Link href="/User/userComplaints" >
              <button className=" w-150 m-4 p-1 rounded-full from-rose-400 via-fuchsia-500 to-indigo-500 bg-gradient-to-r">
                <span className="block text-black px-4 py-2 font-semibold rounded-full bg-white">Previous Complaints</span>
              </button>
              </Link>
            </div>
            {/* <div className="items-center mt-4">
              <img
                src="/Mess.png"
                alt="Image 2"
                className="rounded-md h-32 w-32"
              />
              <p className='text-lg font-semibold text-black p-4 text-center'>Mess</p>
            </div> */}
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
