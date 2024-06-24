"use client";
import { useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";


interface SignupFormDetails {
  username: string;
  contact: string;
  password: string;
  tower: string;
  hostel_room_no: string;
  roll: string;
  image: string;
}

export default function Signup() {
  const { data: session } = useSession();
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [formD, setForm] = useState<SignupFormDetails>({
    username: "",
    contact: "",
    password: "",
    tower: "",
    hostel_room_no: "",
    roll: "",
    image: "",
  });

  const hostelList = [
    { id: 1, name: "Aryabhatt Hostel" },
    { id: 2, name: "Bhaskaracharya Hostel" },
    { id: 3, name: "Dr. APJ Abdul Kalam Hostel" },
    { id: 4, name: "Sir C. V. Raman Hostel" },
    { id: 5, name: "Kalpana Chawla Hostel" },
    { id: 6, name: "Ramanujan Hostel" },
    { id: 7, name: "Sister Nivediata Hostel" },
    { id: 8, name: "Sir J.C. Bose Hostel" },
    { id: 9, name: "Homi Jehangir Bhabha Hostel" },
    { id: 10, name: "Varahmihir Hostel" },
    { id: 11, name: "Virangana Lakshmibai Hostel" },
    { id: 12, name: "Sir Vishveshwarya Hostel" },
    { id: 13, name: "Type 2 hostel" },
  ];
  

  function handleSignupChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  async function addUser(newUser: SignupFormDetails) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/signup`,
        {...newUser, email: session?.user?.email}
      );
      const { valid, customToken, url, user } = response.data;
      if (valid) {
        const data = JSON.stringify({ token: customToken, user: user });
        localStorage.setItem("customToken", data);
        await signIn("google", { callbackUrl: url });
      } else {
        setAlertMessage("*Account exists or some error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session) {
      setAlertMessage("*please verify your email");
      return;
    }
    setLoading(true);

    addUser(formD);
    setForm({
      username: "",
      contact: "",
      password: "",
      tower: "",
      hostel_room_no: "",
      roll: "",
      image: "",
    });

    setLoading(false);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      // Check image size
      if (file.size > 100 * 1024) {
        // 100kb in bytes
        alert("Please select an image less than 100kb.");
        return;
      }
      // Convert image to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setForm({ ...formD, image: base64 });
      };
      reader.readAsDataURL(file);
    }
  }

  function handleClick(e:any){
    console.log(2)
    
    if(!session){
      e.preventDefault(); 
      toast.error('Please verify your email first!');
    }

    return;
  }

  return (
    <>
    <Toaster />
    <div className="flex justify-center min-h-screen p-5 bg-[url('/dtuLogo.svg')] bg-cover">
      <div className="bg-white p-8 rounded-lg shadow-md w-[560px]">
        <div className="flex items-center justify-center">
          <img
            className="dark:drop-shadow-[0_0_0.3rem_#ffffff70] mb-2 w-40 h-40"
            src="/dtu.png"
            alt="Next.js Logo"
          />
        </div>
        <div className="flex items-center justify-center text-green-600">
          <h1 className="text-4xl font-semibold text-green-600 ">Sign Up</h1>
        </div>
        <div className="py-5"></div>
        <form className="space-y-4" onSubmit={submitForm}>
          <div className="flex justify-center items-center mx-auto h-full">
            {session ? (
              <div className="flex">
                <p className="text-green-600 mr-5">verified</p>
                {/* <a onClick={async(e)=>{
                await signOut();
                await signIn("google");
              }} className='text-green-600 underline'>switch account</a> */}
              </div>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="btn bg-blue-200"
              >
                verify email first
              </button>
            )}
          </div>
          {!session? <p className="text-center text-sm font-semibold">Use DTU Email address</p> : <></>}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              onChange={handleSignupChange}
              value={formD.username}
              disabled={session? false : true}
              required
              placeholder="Enter your name"
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-600"
            >
              Phone Number
            </label>
            <input
              id="contact"
              name="contact"
              type="tel"
              autoComplete="contact"
              onChange={handleSignupChange}
              value={formD.contact}
              disabled={session? false : true}
              required
              placeholder="Enter your phone number"
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-600"
            >
              Roll Number
            </label>
            <input
              id="roll"
              name="roll"
              type="text"
              onChange={handleSignupChange}
              value={formD.roll}
              disabled={session? false : true}
              required
              placeholder="Enter your roll number"
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            />
          </div>

          <div>
            <label
              htmlFor="hostelname"
              className="block text-sm font-medium text-gray-600"
            >
              Hostel Name
            </label>
            <select
              id="hostelname"
              name="tower"
              onChange={handleSignupChange}
              value={formD.tower}
              disabled={session? false : true}
              required
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            >
              <option value="" disabled>
                Select your hostel name
              </option>
              {/* Add options dynamically based on your hostel list */}
              {hostelList.map((hostel) => (
                <option key={hostel.id} value={hostel.name}>
                  {hostel.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="hostelroomno"
              className="block text-sm font-medium text-gray-600"
            >
              Hostel Room Number
            </label>
            <input
              type="text"
              id="hostelroomno"
              name="hostel_room_no"
              onChange={handleSignupChange}
              value={formD.hostel_room_no}
              disabled={session? false : true}
              required
              placeholder="Enter your hostel room number"
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleSignupChange}
              value={formD.password}
              disabled={session? false : true}
              required
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            />
          </div>
          <div>
            <label
              htmlFor="profileImage"
              className="block text-sm font-medium text-gray-500"
            >
              Profile Image
            </label>
            <input
              id="profileImage"
              name="profileImage"
              type="file"
              accept="image/jpg, image/jpeg"
              onChange={handleFileUpload}
              disabled={session? false : true}
              className="mt-1 p-2 w-full rounded-md border border-gray-300 bg-white text-gray-900"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Link href="/">
                <p className="text-green-600 hover:underline">
                  Already have an account? Sign in
                </p>
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center pt-10">
            <button
              type="submit"
              className="bg-green-600 text-white font-bold p-3 rounded-2xl hover:bg-black focus:outline-none focus:ring focus:border-blue-300 shadow-2xl w-48 lg:w-80 hover:w-56 lg:hover:w-96 transition-all duration-300 ease-in-out"
              disabled={loading} // Disable the button when loading
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
