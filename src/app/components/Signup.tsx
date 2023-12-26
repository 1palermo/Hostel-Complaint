'use client'
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Base64 from '../Base64';
import { signIn, signOut, useSession } from "next-auth/react";

interface SignupFormDetails {
    username: string;
    contact: string;
    password: string;
    category: string;
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
    category: '',
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

  async function addUser(Newnote:{ username:string; contact:string; password:string; image:string; category:string}){
    let data:any = null;

    try {
      const storedToken = window.localStorage.getItem("customToken") || "";
        data = JSON.parse(storedToken);
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
        if(res.valid === true){
        window.localStorage.setItem("customToken", JSON.stringify({token:res.customToken,expiryDate: Date.now() + 30 * 24 * 60 * 60 * 1000}))
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
          category: '',
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

    return(
        <>
        <div className='flex flex-col items-center'>
        <Image
          className="dark:drop-shadow-[0_0_0.3rem_#ffffff70] mb-2"
          src="/dtu.png"
          alt="Next.js Logo"
          width={80}
          height={50}
          priority
        />
        <h1 className="text-3xl font-bold mb-4 text-slate-600">Sign Up</h1>
      </div>
      <hr className="mb-4" />
      <form onSubmit={submitForm}>
        <section className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-500">
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
            className="mt-1 p-2 w-full rounded-md border border-gray-300 bg-white text-gray-900"
          />
        </section>
        <section className="mb-4">
          <label htmlFor="contact" className="block text-sm font-medium text-gray-500">
            Mobile No
          </label>
          <input
            id="contact"
            name="contact"
            type="number"
            autoComplete="contact"
            onChange={handleSignupChange}
            value={formD.contact}
            required
            className="mt-1 p-2 w-full rounded-md border border-gray-300 bg-white text-gray-900"
          />
        </section>
        <section className='mb-4'>
          {session?
          <div className='flex'>
            <p className='text-green-600 mr-5'>verified</p>
            <a onClick={async(e)=>{
              await signOut();
              await signIn("google");
              e.preventDefault();
            }} className='text-blue-600 underline'>switch account</a>
          </div>
          : <button onClick={()=>signIn("google")} className='btn bg-blue-200'>verify email</button>} 
        </section>
        <section className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-500">
            Choose a category:
          </label>
          <select id="category" name="category" onChange={handleSelectChange} className="mt-1 p-2 w-full rounded-md border border-gray-300 bg-white text-gray-900" required>
            <option value="Attendant">select your category</option>
            <option value="Attendant">Attendant</option>
            <option value="Hosteller">Hosteller</option>
          </select>
        </section>
        <section className="mb-4">
          <label htmlFor="new-password" className="block text-sm font-medium text-gray-500">
            Password
          </label>
          <input
            id="new-password"
            name="password"
            type="password"
            autoComplete="new-password"
            onChange={handleSignupChange}
            value={formD.password}
            required
            className="mt-1 p-2 w-full rounded-md border border-gray-300 bg-white text-gray-900"
          />
        </section>
        <section className="mb-4">
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
        </section>
        <button type="submit" className="px-3 py-2 bg-blue-500 text-white text-md rounded-md">
          Sign up
        </button>
        <p id="alert" style={{ color: 'red', fontSize: '14px' }} className="mt-2">
        {alertMessage}
        </p>
        </form>
        </>
    )
}

