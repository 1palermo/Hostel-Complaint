"use client"; 
import type { NextPage } from 'next';
import { useState } from "react";

const Page2: NextPage = () => {
  const [profile, setProfile] = useState({
    name: "xyz",
    contact: 0,
    email: "xyz@admin.ac.in",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur magni, nemo tempora iste at corrupti quasi magnam culpa qui! Accusantium eligendi doloremque, deleniti perferendis iste quo consectetur! Amet, est culpa?"
  })
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-8 shadow-lg">
        <div className="flex flex-col lg:flex-row bg-slate-200 p-8 rounded-lg shadow-2xl bg-gradient-to-br from-blue-400 to-blue-700 ">
          <img src="/avatar.png" className="w-full lg:w-1/2 max-w-lg rounded-lg shadow-2xl bg-slate-200 bg-gradient-to-br from-blue-500 to-blue-300 " />
          <div className="lg:w-1/2 p-4">
            <h1 className="text-5xl lg:text-6xl font-bold text-slate-200 mb-4 lg:mb-6">Your Profile!</h1>
            <div className="flex flex-wrap m-2">
              <div className="mr-1 lg:mr-4 font-bold text-3xl lg:text-4xl">Name:</div>
              <div className="text-2xl lg:text-3xl">{profile.name}</div>
            </div>
            <div className="flex flex-wrap m-2">
              <div className="mr-1 lg:mr-4 font-bold text-3xl lg:text-4xl">Contact No:</div>
              <div className="text-2xl lg:text-3xl">{profile.contact}</div>
            </div>
            <div className="flex flex-wrap m-2">
              <div className="mr-1 lg:mr-4 font-bold text-3xl lg:text-4xl">Email Id:</div>
              <div className="text-2xl lg:text-3xl">{profile.email}</div>
            </div>
            <div className='m-2'>
              <div className="mr-1 lg:mr-4 font-bold text-3xl lg:text-4xl">Description:</div>
              <div className="text-2xl lg:text-3xl">{profile.desc}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page2;

