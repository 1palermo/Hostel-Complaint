"use client"; 
import type { NextPage } from 'next';
import { useState, useEffect } from "react";
import Return from '../Return';

const Page2: NextPage = () => {
  const [profile, setProfile] = useState({
    username: "xyz",
    contact: 0,
    email: "xyz@admin.ac.in",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur magni, nemo tempora iste at corrupti quasi magnam culpa qui! Accusantium eligendi doloremque, deleniti perferendis iste quo consectetur! Amet, est culpa?"
  })

  function removeSession(){
    localStorage.removeItem("customToken")
    console.log(localStorage.getItem("customToken"));
    window.location.href = '/';
  }

  async function getProfile(){
    //console.log(localStorage.getItem("customToken"))
    const response= await fetch("https://490bj8xz-8080.inc1.devtunnels.ms/profile",{
      method: "POST" ,
      body: JSON.stringify({userToken:localStorage.getItem("customToken")}) ,
      headers:{
        "Content-Type": "application/json",
      }
     })
     const result= await response.json();
     //console.log(result[0]);
     if(result){
        setProfile((prevProfile)=>({
          ...prevProfile,
          username: result[0].username,
          email: result[0].email,
          contact: result[0].contact,
          desc: result[0].description? result[0].description : prevProfile.desc
        }));
     }
  }

  function updateProfile(e:{target:{value:string}}){
    setProfile((prev)=>({
      ...prev,
      desc: e.target.value
    }))
  }

  async function update(){
    const response= await fetch("https://490bj8xz-8080.inc1.devtunnels.ms/update",{
      method: "POST" ,
      body: JSON.stringify({userToken:localStorage.getItem("customToken"), user:profile.desc}) ,
      headers:{
        "Content-Type": "application/json",
      }
     })
     const result= await response.json();

     //console.log(result[0]);
     alert('Profile updated!');
  }

  useEffect(()=>{
    getProfile();
  },[])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-blue-500 p-4 shadow-lg w-5/6 lg:w-90vw">
        <div className="lg:flex lg:flex-row lg:bg-slate-200 lg:p-8 lg:rounded-lg lg:shadow-2xl lg:bg-gradient-to-br lg:from-blue-400 lg:to-blue-700 lg:w-full">
          <img
            src="/avatar.png"
            alt="Avatar"
            className="w-full lg:w-1/2 max-w-lg rounded-lg shadow-2xl bg-slate-200 bg-gradient-to-br from-blue-500 to-blue-300"
          />
          <div className="lg:w-1/2 p-4 text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 lg:mb-6 text-slate-200">Your Profile</h1>
            <div className="flex flex-wrap m-2">
              <div className="mr-1 lg:mr-4 font-bold text-3xl lg:text-4xl">Name:</div>
              <div className="text-2xl lg:text-3xl text-white">{profile.username}</div>
            </div>
            <div className="flex flex-wrap m-2">
              <div className="mr-1 lg:mr-4 font-bold text-3xl lg:text-4xl">Contact No:</div>
              <div className="text-2xl lg:text-3xl text-white">{profile.contact}</div>
            </div>
            <div className="flex flex-wrap m-2">
              <div className="mr-1 lg:mr-4 font-bold text-3xl lg:text-4xl">Email Id:</div>
              <div className="text-2xl lg:text-3xl text-white">{profile.email}</div>
            </div>
            <div className="m-2 text-center lg:text-left">
              <div className="mr-1 lg:mr-4 font-bold text-3xl lg:text-4xl">Description:</div>
              <textarea
                className="text-2xl lg:text-3xl text-white bg-transparent w-full resize-none "
                value={profile.desc}
                name="desc"
                onChange={updateProfile}
              />
            </div>
            <div className="flex flex-col lg:flex-row m-2">
              <button
                type="button"
                className="w-full lg:w-auto px-3 py-2 bg-gradient-to-br from-red-400 to-red-600 text-white text-md rounded-md mt-2  mr-0 lg:mr-2"
                onClick={removeSession}
              >
                Log Out
              </button>
              <button
                type="button"
                className="w-full lg:w-auto px-3 py-2 bg-gradient-to-br from-blue-800 to-blue-600 text-white mt-2 text-md rounded-md mr-0 lg:mr-2"
                onClick={() => {
                  update();
                  // Show an alert or use a notification library here
                  alert('Profile updated!');
                }}
              >
                Update Profile
              </button>
              <Return />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page2;

