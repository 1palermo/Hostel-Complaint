'use client'
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Base64 from '../../Base64';
import { signIn, signOut, useSession } from "next-auth/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCog, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';


interface FormDetails {
    email: string;
    password: string;
}

interface NewNote {
    email: string;
    password: string;
}

interface ServerResponse {
    valid: boolean;
    customToken: string;
    url: string;
}

export default function Login(){
    const {data:session, status} = useSession();
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [formDetails, setFormDetails] = useState<FormDetails>({
        email: '',
        password: '',
    });
    
    useEffect(()=>{
        if(status === "loading"){
            <div>Loading...</div>
        }
     
        if(status === "authenticated"){
            oAuthLogin();
        }
    },[session])

    async function checkUser(newNote: NewNote){
      let data:any = null;
      let googleLogin = false;
      const storedToken = window.localStorage.getItem("customToken") || "";
      if(storedToken){
          data = JSON.parse(storedToken);
      }
    
      if(session){
        googleLogin = true;
      }
      
      const response = await fetch(`http://localhost:8080/login?google=${googleLogin}`, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify({...newNote, email: session?.user?.email || newNote.email}),
        headers: {
          "Content-Type": "application/json",
          "customToken": data?.token || "", // Handle the case where localStorage.getItem("customToken") may be null
        },
      });
    
      try {
        const res: ServerResponse = await response.json();
        console.log(res);
        if (res.valid === true) {
          window.localStorage.setItem("customToken", JSON.stringify({token:res.customToken,expiryDate: Date.now() + 30 * 24 * 60 * 60 * 1000}));
        } else {
          setAlertMessage("*please enter valid email or password"); // Add null check for getElementById
        }
        if(session){
          await signOut();
        }
        window.location.href = res.url;
      } catch (error) {
        // Handle JSON parsing error
        console.error("Error parsing JSON response", error);
      }
    }
    
    function submitNote(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      // const mailformat = /^[a-zA-Z0-9._%+-]+@dtu\.ac\.in$/;
      // if(!formDetails.email.match(mailformat)){
      //   setAlertMessage("*invalid email format");
      //   return;
      // }
      checkUser(formDetails);
      setFormDetails({
        email: '',
        password: '',
      });
      setAlertMessage("");
    }
  
    function oAuthLogin() {
      try {
          console.log(session?.user?.name);
    
          checkUser(formDetails);

          setFormDetails({
            email: '',
            password: '',
          });
          setAlertMessage("");
      } catch (err) {
        setAlertMessage('*login failed');
      }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const { name, value } = event.target;
  
      setFormDetails((prevNote) => ({
        ...prevNote,
        [name]: value,
      }));
    }

  return (
      <>
      <div className="flex justify-center min-h-screen p-5 bg-[url('/brick.jpg')] bg-cover">
      <div className="bg-white p-8 rounded-lg shadow-md w-[560px]">
        <div className="flex items-center justify-center">
        <img
          className="dark:drop-shadow-[0_0_0.3rem_#ffffff70] mb-2 w-40 h-40"
          src="/dtu.png"
          alt="Next.js Logo"
        />
        </div>
        <h1 className="text-4xl font-semibold mb-4 text-blue-600 flex items-center justify-center">Log In</h1>
        <div className='py-3'></div>
        <form className="space-y-4" onSubmit={submitNote}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              id="useremail"
              name="email"
              type="email"
              autoComplete="useremail"
              onChange={handleChange}
              value={formDetails.email}
              placeholder='enter your email'
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              id="new-password"
              name="password"
              type="password"
              autoComplete="new-password"
              onChange={handleChange}
              value={formDetails.password}
              placeholder='enter your password'
              required
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            />
          </div>
          <div className="flex-start text-red-500 text-sm" id="alert">{alertMessage}</div>
          <div className="flex items-center justify-between">
            <div>
              <Link href="/auth/signup">
                <p className="text-blue-600 hover:underline">Need an account? Sign up</p>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center pt-10">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold p-3 rounded-2xl hover:bg-black focus:outline-none focus:ring focus:border-blue-300 shadow-2xl w-48 lg:w-80 hover:w-56 lg:hover:w-96 transition-all duration-300 ease-in-out"
            >
              Log In
            </button>
          </div>
          <div className="flex items-center justify-center">or</div>
          <div className="flex items-center justify-center">
            <button
                onClick={async () => {
                await signIn("google");
                }}
                className="bg-blue-500 text-white font-bold p-3 rounded-2xl hover:bg-black focus:outline-none focus:ring focus:border-blue-300 shadow-2xl w-48 lg:w-80 hover:w-56 lg:hover:w-96 transition-all duration-300 ease-in-out flex items-center justify-center"
            >
                <img src='/google.png' className='w-6 h-6 mr-2' />
                <p>Sign In</p>
            </button>
          </div>
        </form>
        </div>
      </div>
      </>
  );
};


