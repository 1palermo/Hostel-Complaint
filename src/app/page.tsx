'use client'
import { useState, useRef, useEffect } from 'react';
import Base64 from './Base64';
import { signIn, signOut, useSession } from "next-auth/react";
import Login from './components/Login';
import Signup from './components/Signup';

export default function Home() {
  const [signup, setSignup] = useState(true);
  
  return (
    <>
    {signup? 
    <div className="h-screen bg-blue-500 text-gray-500 flex items-center justify-center">
      <section className="max-w-md p-8 bg-white rounded-md shadow-md">
      <Login />
      <div>Do not have an account?<a className="underline text-blue-500" onClick={()=>{
        setSignup(false)
      }}>sign up</a></div>
      </section>
    </div>
    : 
    <div className="h-screen bg-blue-500 text-gray-500 flex items-center justify-center">
      <section className="max-w-md p-8 bg-white rounded-md shadow-md">
      <Signup />
      <div>Already have an account?<a className="underline text-blue-500" onClick={()=>{
        setSignup(true)
      }}>sign in</a></div>
      </section>
    </div>
    }
    </>
    );
  }

/*
  function setTime() {
    setOtp(0);
    setTimer(120);
    if (clearIntervalRef.current) {
      clearInterval(clearIntervalRef.current);
    }
    return;
  }

  async function sendOtp() {
    const mailformat = /^[a-zA-Z0-9._%+-]+@dtu\.ac\.in$/;
    const userEmailInput = document.getElementById('useremail') as HTMLInputElement | null;
    const alert = document.getElementById('alert') as HTMLInputElement | null;
  
    if (userEmailInput && formD.email.match(mailformat)) {
      userEmailInput.focus();
      const res = await send(formD.email);
      setOtp(Number(res));
  
      clearIntervalRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
  
      setAlertMessage('');
    } else {
      setAlertMessage('*Invalid email address');
    }
  }

  async function send(id:string){
    const response= await fetch("https://490bj8xz-8080.inc1.devtunnels.ms/otpVerification?id="+ id,{
      method: "GET" ,
     })
     const result = await response.text();
     return result;
  }
  

  function verify() {
    if (inputOtp === otp) {
      setVerified(true);
      setTimer(120);
      if (clearIntervalRef.current) {
        clearInterval(clearIntervalRef.current);
      }
      setAlertMessage(' ');
    }
    else{
      setAlertMessage('*Otp not verified');
    }
  }

  let timerDisplay: React.ReactNode;

  if (timer >= 0) {
    timerDisplay = timer;
  } else {
    setTime();
    timerDisplay = null; // or any default value you want to display when timer is less than 0
  }
*/
  