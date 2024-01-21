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
    const response= await fetch("http://localhost:8080/profile",{
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
        <div className="flex justify-center min-h-screen p-5 bg-[url('/brick.jpg')] bg-cover">
          <div className="bg-[#EEEEEE] p-8 rounded-lg shadow-md w-[720px]">
          <Navbar />

          <div className="flex flex-col items-center">
            <img
              src={profile.image}
              alt="User Image"
              className="rounded-full h-32 w-32 mb-2"
            />
            <p className="text-xl font-semibold text-blue-600">{profile.username}</p>
            <p className="text-xl font-semibold text-blue-600 pt-4">{profile.roll}</p>
          </div>
          <hr className="animate-shimmer h-1 w-full bg-gradient-to-r from-blue-400 to-blue-600 mt-10"></hr>

          <div className="flex justify-around mt-8">
            <div className="items-center">
            <Link href="/User/studentReport" >
              <FontAwesomeIcon
              icon={faPlus}
              className="mr-10 h-8 w-8 cursor-pointer"
              />
              <p className='text-lg font-semibold text-blue-600 p-4'>New Complaints</p>
            </Link>
            </div>
            <div className="items-center">
            <Link href="/User/userComplaints" >
              <img
                src="/Mess.png"
                alt="Image 1"
                className="rounded-md h-32 w-32"
              />
              <p className='text-lg font-semibold text-blue-600 p-4'>Previous Complaints</p>
            </Link>
            </div>
            {/* <div className="items-center mt-4">
              <img
                src="/Mess.png"
                alt="Image 2"
                className="rounded-md h-32 w-32"
              />
              <p className='text-lg font-semibold text-blue-600 p-4 text-center'>Mess</p>
            </div> */}
          </div>

          {/* <div className="flex justify-around ">
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
          </div> */}
        </div>
        </div>
      );
};

export default UserHomePage;
