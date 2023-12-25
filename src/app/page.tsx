'use client'
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Base64 from './Base64';
import { signIn, signOut, useSession } from "next-auth/react";
//import { File } from 'buffer';


/*
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Hostel Complaint Management</p>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[3120px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] "
          src="/dtu.jpg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
           <a href='/Hostel-Admin'>Admin</a>
           <a href='/Attendant'>Attendant</a>
      </div>
 
    </main>
  )
}
*/


interface FormDetails {
  email: string;
  password: string;
}

interface LoginProps {
  onCheck: (formDetails: FormDetails) => void;
}

interface SignupFormDetails {
  username: string;
  contact: string;
  password: string;
  category: string;
  image: string;
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

export default function Home() {
  
  const {data:session} = useSession();
  
  const [formDetails, setFormDetails] = useState<FormDetails>({
    email: '',
    password: '',
  });

  const [signup, setSignup] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormDetails((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  function submitNote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const mailformat = /^[a-zA-Z0-9._%+-]+@dtu\.ac\.in$/;
    if(!formDetails.email.match(mailformat)){
      setAlertMessage("*invalid email format");
      return;
    }
    checkUser(formDetails);
    setFormDetails({
      email: '',
      password: '',
    });
    setAlertMessage("");
  }

  

  const clearIntervalRef = useRef<NodeJS.Timeout>();
  const [timer, setTimer] = useState(120);
  const [isVerified, setVerified] = useState(false);
  const [inputOtp, setInput] = useState(0);
  const [otp, setOtp] = useState(0);
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
    const data = JSON.parse(window.localStorage.getItem("customToken") || "");
    const response= await fetch("https://490bj8xz-8080.inc1.devtunnels.ms/signup",{
      method: "POST",
      body: JSON.stringify({...Newnote, email: session?.user?.email}) ,
      credentials: 'include',
      headers:{
        "Content-Type": "application/json",
        "customToken": data.token || ''
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

  async function checkUser(newNote: NewNote){
    const data = JSON.parse(window.localStorage.getItem("customToken") || "");
    const response = await fetch("https://490bj8xz-8080.inc1.devtunnels.ms/login", {
      method: "POST",
      credentials: 'include',
      body: JSON.stringify(newNote),
      headers: {
        "Content-Type": "application/json",
        "customToken": data.token || "", // Handle the case where localStorage.getItem("customToken") may be null
      },
    });
  
    try {
      const res: ServerResponse = await response.json();
  
      if (res.valid === true) {
        console.log(res);
        window.localStorage.setItem("customToken", JSON.stringify({token:res.customToken,expiryDate: Date.now() + 30 * 24 * 60 * 60 * 1000}));
      } else {
        setAlertMessage("*please enter valid email or password"); // Add null check for getElementById
      }
  
      window.location.href = res.url;
    } catch (error) {
      // Handle JSON parsing error
      console.error("Error parsing JSON response", error);
    }
  }
  

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
   /* if (isVerified === false) {
      setAlertMessage('*please verify your email');
      return;
    }*/
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
    //setVerified(false);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    let file;
    if(e.target.files){
      file= e.target.files[0];
    }
		const base64= await Base64(file);
    //console.log(base64);
    if(e.target.files && e.target.files[0]){
      setForm({...formD, image: base64});
    }
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
  return (
    <>
    {signup? <div className="h-screen bg-blue-500 text-white flex items-center justify-center">
      <section className="max-w-md p-8 bg-white rounded-md shadow-md">
        <div className='flex flex-col items-center'>
          <Image
            className="dark:drop-shadow-[0_0_0.3rem_#ffffff70] mb-2"
            src="/dtu.png"
            alt="Next.js Logo"
            width={80}
            height={50}
            priority
          />
          <h1 className="text-3xl font-bold mb-4 text-slate-600">Sign In</h1>
        </div>
        <hr className="mb-4" />
        <form onSubmit={submitNote}>
          <section className="mb-4">
            <label htmlFor="useremail" className="block text-sm font-medium text-gray-500">
              Email
            </label>
            <input
              id="useremail"
              name="email"
              type="email"
              autoComplete="useremail"
              onChange={handleChange}
              value={formDetails.email}
              required
              className="mt-1 p-2 w-full rounded-md border border-gray-300 bg-white text-gray-900"
            />
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
              onChange={handleChange}
              value={formDetails.password}
              required
              className="mt-1 p-2 w-full rounded-md border border-gray-300 bg-white text-gray-900"
            />
          </section>
          <button type="submit" className="px-3 py-2 bg-blue-500 text-white text-md rounded-md">
            Sign in
          </button>
          <p id="alert" className="mt-2 text-red-500 text-sm">
            {alertMessage}
          </p>
        </form>
        <p className="help text-gray-500">
          Don't have an account? <a className="text-blue-500" onClick={()=>{
            setSignup(false);
          }} >Sign up</a>
        </p>
      </section>
    </div> :
    <div className="min-h-screen flex items-center justify-center bg-blue-500 text-white">
    <section className="max-w-md p-8 bg-white rounded-md shadow-md">
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
              await signIn();
              e.preventDefault();
            }} className='text-blue-600 underline'>switch account</a>
          </div>
          : <button onClick={()=>signIn()} className='btn bg-blue-200'>verify email</button>} 
        </section>
      {/*  <section className="mb-4">
          <label htmlFor="useremail" className="block text-sm font-medium text-gray-500">
            Email
          </label>
          <input
            id="useremail"
            name="email"
            type="email"
            autoComplete="useremail"
            onChange={handleSignupChange}
            value={formD.email}
            required
            className="mt-1 p-2 w-full rounded-md border border-gray-300 bg-white text-gray-900"
          />
        </section>
        {otp === 0 ? (
          <button
            onClick={sendOtp}
            id="sendOtp"
            className="px-2 py-1 bg-blue-500 text-white text-md rounded-md"
          >
            send otp
          </button>
        ) : isVerified === false ? (
          <>
            <input
              placeholder="enter otp"
              onChange={(e) => {
                setInput(Number(e.target.value));
              }}
              className="mt-2 p-2 w-full rounded-md border border-gray-300 bg-white text-gray-900"
            />
            <button
              onClick={verify}
              className="px-3 py-2 bg-blue-500 text-white text-md rounded-md"
            >
              verify
            </button>
            <p style={{ color: 'red' }} className="mt-2">
              {timerDisplay}
            </p>
          </>
        ) : (
          <p style={{ color: 'green' }} className="mt-2">
            verified
          </p>
        )} */}
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
      <p className="help mt-2 text-slate-500">
        Already have an account? <a className="text-blue-500" onClick={()=>{
          setSignup(true);
        }}>Sign in</a>
      </p>
    </section>
  </div>
  }  
  </>
);
}