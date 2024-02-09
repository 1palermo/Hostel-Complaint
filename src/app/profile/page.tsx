"use client";
import type { NextPage } from "next";
import { useState, useEffect, ChangeEvent } from "react";
//import Return from '../components/Return';
import { signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faMultiply,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useAuth } from "../context/auth";
import axios from 'axios';

const Page2: NextPage = () => {
  const [auth, setAuth] = useAuth();
 //const [profile, setProfile] = useState();
  const [profile, setProfile] = useState({
    userImage: "/avatar.png",
    username: "",
    contact: "0",
    email: "xyz@admin.ac.in",
    tower: "",
    hostel_room_no: "",
    roll: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  async function removeSession() {
    localStorage.removeItem("customToken");
    console.log(localStorage.getItem("customToken"));
    await signOut();
    window.location.href = "/";
  }

  function handleFormChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    event.preventDefault();
    const { name, value } = event.target;
    
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  }

  async function update(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
  
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/update`,
        { data: profile },
        {
          validateStatus: (status) => status >= 200 && status <= 500
        }
      );

      if(response.status === 300){
        setAuth({
          ...auth,
          user: profile
        });
  
        alert("Profile updated");
      }
      
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle the error (e.g., display an error message to the user)
    }
  }  

  useEffect(() => {
    setProfile((prev)=>({
      ...prev,
      ...auth.user
    }))
  }, []);

  return (
    <div className="flex items-center justify-center p-5 min-h-screen bg-[url('/dtuLogo.jpg')] bg-cover">
      <div className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 p-8 rounded-lg shadow-md w-[720px]">
        <div className="flex items-center justify-between text-green-600">
          <div onClick={removeSession}>
            <FontAwesomeIcon icon={faSignOut} className="ml-2 h-8 w-8" />
          </div>
          <div
            onClick={() => {
              window.history.back();
            }}
          >
            <FontAwesomeIcon icon={faHome} className="ml-2 h-8 w-8" />
          </div>
        </div>

        <form className="space-y-4" onSubmit={update}>
          <div className="flex flex-col items-center">
            <img
              src={profile.userImage}
              alt="Avatar"
              className="rounded-full mb-2 w-full lg:w-1/4 max-w-[30vw] sm:max-h-[20vh] lg:max-h-[50vh]  shadow-2xl bg-slate-200 bg-gradient-to-br from-blue-500 to-blue-300"
            />
            <p>{profile.roll}</p>
          </div>

          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="your name"
              value={profile.username}
              onChange={handleFormChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email Address
            </label>
            <p id="email">{profile.email}</p>
          </div>

          <div>
            <label
              htmlFor="contactNo"
              className="block text-sm font-medium text-gray-600"
            >
              Contact Number
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              placeholder="your mobile number"
              value={profile.contact}
              onChange={handleFormChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="hostelName"
              className="block text-sm font-medium text-gray-600"
            >
              Hostel Name
            </label>
            <input
              type="text"
              id="hostelName"
              name="tower"
              placeholder="your hostel name"
              value={profile.tower}
              onChange={handleFormChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="hostelRoomNo"
              className="block text-sm font-medium text-gray-600"
            >
              Hostel Room Number
            </label>
            <input
              type="text"
              id="hostelRoomNo"
              name="hostel_room_no"
              value={profile.hostel_room_no}
              placeholder="your hostel room number"
              onChange={handleFormChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-white"
            />
          </div>

          <div className="flex items-center justify-center pt-16">
            <button
              type="submit"
              className="bg-green-600 text-white font-bold p-3 rounded-2xl hover:bg-black focus:outline-none focus:ring focus:border-blue-300 shadow-2xl w-32 hover:w-40 transition-all duration-300 ease-in-out"
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
