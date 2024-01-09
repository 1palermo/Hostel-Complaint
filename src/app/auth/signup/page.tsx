'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCog, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Base64 from '../../Base64';
import { signIn, signOut, useSession } from "next-auth/react";

interface SignupFormDetails {
    username: string;
    contact: string;
    password: string;
    tower: string,
    hostel_room_no: string,
    roll: string,
    image: string;
}

interface ServerResponse {
    valid: boolean;
    customToken: string;
    url: string;
}
export default function Signup(){
const {data:session, status} = useSession();

const [alertMessage, setAlertMessage] = useState<string>('');
//const [file, setFile] = useState(new File([],'dummy.jpg'));
const [formD, setForm] = useState<SignupFormDetails>({
  username: '',
  contact: '',
  password: '',
  tower: '',
  hostel_room_no: '',
  roll: '',
  image: ''
});

function handleSignupChange(event: React.ChangeEvent<HTMLInputElement>) {
  const { name, value } = event.target;

  setForm((prevForm) => ({
    ...prevForm,
    [name]: value,
  }));
}

function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
  const { name, value } = event.target;

  setForm((prevForm) => ({
    ...prevForm,
    [name]: value,
  }));
}

async function addUser(Newnote:{ username:string; contact:string; password:string; image:string; tower:string; hostel_room_no: string}){
  let data:any = null;

  try {
      const storedToken = window.localStorage.getItem("customToken") || "";
      if(storedToken) data = JSON.parse(storedToken);
      } catch (error) {
      console.error("Error parsing JSON:", error);
      }
      const response= await fetch("https://490bj8xz-8080.inc1.devtunnels.ms/signup",{
      method: "POST",
      body: JSON.stringify({...Newnote, email: session?.user?.email}) ,
      credentials: 'include',
      headers:{
          "Content-Type": "application/json",
          "customToken": data?.token || ''
      }
      })
      const res= await response.json();
      console.log(res);
      if(res.valid === true){
      window.localStorage.setItem("customToken", JSON.stringify({token:res.customToken,expiryDate: Date.now() + 30 * 24 * 60 * 60 * 1000}));
      } else{
      setAlertMessage("*Account exists or some error occured");
      }
      await signOut();
      window.location.href = res.url;
  }

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      if(!session){
        setAlertMessage('*please verify your email');
        return;
      }
      console.log(session.user?.email);
      addUser(formD);
      setForm({
        username: '',
        contact: '',
        password: '',
        tower: '',
        hostel_room_no: '',
        roll: '',
        image:''
      });
  }
  
  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
      let file;
      if(e.target.files){
          file= e.target.files[0];
      }
          const base64= await Base64(file);
      if(e.target.files && e.target.files[0]){
          setForm({...formD, image: base64});
      }
  }
  return (
    <div className="flex justify-center min-h-screen p-5 bg-[url('/brick.jpg')] bg-cover">
      <div className="bg-white p-8 rounded-lg shadow-md w-[560px]">
       <div className="flex items-center justify-center">
        <img
          className="dark:drop-shadow-[0_0_0.3rem_#ffffff70] mb-2 w-40 h-40"
          src="/dtu.png"
          alt="Next.js Logo"
        />
        </div>
        <div className="flex items-center justify-center text-blue-600">
          <h1 className="text-4xl font-semibold text-blue-600 ">Sign Up</h1>
        </div>
        <div className='py-5'></div>
        <form className="space-y-4" onSubmit={submitForm}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              onChange={handleSignupChange}
              value={formD.username}
              required
              placeholder="Enter your name"
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
              Phone Number
            </label>
            <input
              id="contact"
              name="contact"
              type="tel"
              autoComplete="contact"
              onChange={handleSignupChange}
              value={formD.contact}
              required
              placeholder="Enter your phone number"
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
              Roll Number
            </label>
            <input
              id="roll"
              name="roll"
              type="text"
              onChange={handleSignupChange}
              value={formD.roll}
              required
              placeholder="Enter your roll number"
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            />
          </div>
          <div>
          {session?
          <div className='flex'>
            <p className='text-green-600 mr-5'>verified</p>
            {/* <a onClick={async(e)=>{
              await signOut();
              await signIn("google");
            }} className='text-blue-600 underline'>switch account</a> */}
          </div>
          : <button onClick={()=>signIn("google")} className='btn bg-blue-200'>verify email</button>} 
          </div>
          <div>
            <label htmlFor="hostelname" className="block text-sm font-medium text-gray-600">
              Hostel Name
            </label>
            <input
              type="text"
              id="hostelname"
              name="tower"
              onChange={handleSignupChange}
              value={formD.tower}
              required
              placeholder="Enter your hostel name"
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            />
          </div>
          <div>
            <label htmlFor="hostelroomno" className="block text-sm font-medium text-gray-600">
              Hostel Room Number
            </label>
            <input
              type="text"
              id="hostelroomno"
              name="hostel_room_no"
              onChange={handleSignupChange}
              value={formD.hostel_room_no}
              required
              placeholder="Enter your hostel room number"
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleSignupChange}
              value={formD.password}
              required
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            />
          </div>
          <div>
          <label htmlFor="profileImage" className="block text-sm font-medium text-gray-500">
            Profile Image
          </label>
          <input
            id="profileImage"
            name="profileImage"
            type="file"
            accept="image/jpg image/jpeg"
            onChange={handleFileUpload}
            className="mt-1 p-2 w-full rounded-md border border-gray-300 bg-white text-gray-900"
            required
          />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Link href="/">
                <p className="text-blue-600 hover:underline">Already have an account? Sign in</p>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center pt-10">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold p-3 rounded-2xl hover:bg-black focus:outline-none focus:ring focus:border-blue-300 shadow-2xl w-32 hover:w-40 transition-all duration-300 ease-in-out"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

