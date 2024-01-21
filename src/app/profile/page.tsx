"use client"; 
import type { NextPage } from 'next';
import { useState, useEffect, ChangeEvent  } from "react";
//import Return from '../components/Return';
import { signOut } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome ,faMultiply, faSignOut } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';




  

const Page2: NextPage = () => {
  const [profile, setProfile] = useState({
    image: "/avatar.png",
    username: "",
    contact: "0",
    email: "xyz@admin.ac.in",
    hostel_name: "",
    hostel_room: "",
    roll: ""
  })

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  async function removeSession(){
    localStorage.removeItem("customToken")
    console.log(localStorage.getItem("customToken"));
    await signOut();
    window.location.href = '/';
  }

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
          image: result[0]?.userImage?result[0]?.userImage:"/avatar.png",
          roll: result[0]?.roll || ""
        }));
     }
  }

  function handleFormChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    event.preventDefault();
    const { name, value } = event.target;
    console.log(profile);
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  }

  async function update(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    console.log(profile)
    const data = JSON.parse(window.localStorage.getItem("customToken") || "");
    const response= await fetch("http://localhost:8080/update",{
      method: "POST" ,
      body: JSON.stringify({userToken: data.token, data:profile}) ,
      headers:{
        "Content-Type": "application/json",
      }
     })
     const result= await response.json();
     alert("Profile updated");

  }

  useEffect(()=>{
    getProfile();
  },[])

  return (
  <div className="flex items-center justify-center p-5 min-h-screen bg-[url('/brick.jpg')] bg-cover">
  <div className="bg-white p-8 rounded-lg shadow-md w-[720px]">
  <div className="flex items-center justify-between text-blue-600">
      <div  onClick={removeSession}>
        <FontAwesomeIcon icon={faSignOut} className="ml-2 h-8 w-8" /></div>
        <div onClick={()=>{
        window.history.back();
      }}>
      <FontAwesomeIcon icon={faHome} className="ml-2 h-8 w-8" /></div>
  </div>

  <form className="space-y-4" onSubmit={update}>
    <div className='flex flex-col items-center'>
      <img
        src={profile.image}
        alt="Avatar"
        className="rounded-full mb-2 w-full lg:w-1/2 max-w-[30vw] sm:max-h-[20vh] lg:max-h-[60vh]  shadow-2xl bg-slate-200 bg-gradient-to-br from-blue-500 to-blue-300"
      />
      <p>{profile.roll}</p>
    </div>

    <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
          Name
        </label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder= "your name"
          value={profile.username}
          onChange={handleFormChange}
          className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
        />
    </div>

    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-600">
        Email Address
      </label>
      <p id='email'>{profile.email}</p>
    </div>

    <div>
      <label htmlFor="contactNo" className="block text-sm font-medium text-gray-600">
        Contact Number
      </label>
      <input
        type="tel"
        id="contact"
        name="contact"
        placeholder='your mobile number'
        value= {profile.contact}
        onChange={handleFormChange}
        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
      />
    </div>

    <div>
      <label htmlFor="hostelName" className="block text-sm font-medium text-gray-600">
        Hostel Name
      </label>
      <input
        type="text"
        id="hostelName"
        name="hostel_name"
        placeholder='your hostel name'
        value= {profile.hostel_name}
        onChange={handleFormChange}
        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
      />
    </div>

    <div>
      <label htmlFor="hostelRoomNo" className="block text-sm font-medium text-gray-600">
        Hostel Room Number
      </label>
      <input
        type="text"
        id="hostelRoomNo"
        name="hostel_room"
        value= {profile.hostel_room}
        placeholder='your hostel room number'
        onChange={handleFormChange}
        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
      />
    </div>

    <div className="flex items-center justify-center pt-16">
    <button
      type="submit"
      className="bg-blue-500 text-white font-bold p-3 rounded-2xl hover:bg-black focus:outline-none focus:ring focus:border-blue-300 shadow-2xl w-32 hover:w-40 transition-all duration-300 ease-in-out"
    >
      Save info
    </button>
  </div>
  </form>
  </div>
  </div>
  );
};

export default Page2;

