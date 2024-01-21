'use client'
import { useState, useRef, useEffect } from 'react';
import Base64 from './Base64';
import { signIn, signOut, useSession } from "next-auth/react";
import Login from './auth/signin/page';

export default function Home() {
  const [signup, setSignup] = useState(true);
  
  return (
    <>
    <Login />
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
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
              src="/dtu.jpg"
              alt="DTU Logo"
              width={180}
              height={37}
              priority
            />
      </div>
      <Link href="/auth/signin">Dashboard</Link>
      <p>Hostel Complaint Management</p>

  async function send(id:string){
    const response= await fetch("http://localhost:8080/otpVerification?id="+ id,{
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
  