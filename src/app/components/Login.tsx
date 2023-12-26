'use client'
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Base64 from '../Base64';
import { signIn, signOut, useSession } from "next-auth/react";


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
       
        const response = await fetch(`https://490bj8xz-8080.inc1.devtunnels.ms/login?google=${googleLogin}`, {
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
            <button type="submit" className="px-3 py-2 bg-blue-500 text-white text-md rounded-md w-full">
                Sign in
            </button>
            </form>
            <div className="help text-gray-500 flex flex-col items-center justify-center">
                <p>or</p>
                <button
                    onClick={async () => {
                    await signIn("google");
                    }}
                    className='bg-blue-500 px-3 py-2 text-white text-md rounded-md w-full flex'
                >
                    <img src='/google.png' className='w-6 h-6 mr-2' />
                    <p>Sign In with Google</p>
                </button>
                <p id="alert" className="mt-2 text-red-500 text-sm">
                    {alertMessage}
                </p>
            </div>
        </>
    )
}