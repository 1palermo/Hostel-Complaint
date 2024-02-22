"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Base64 from "../../Base64";
import { signIn, signOut, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCog, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "@/app/context/auth";

interface FormDetails {
  email: string;
  password: string;
}

interface NewNote {
  email: string;
  password: string;
}

export default function Login() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth() as any;
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [formDetails, setFormDetails] = useState<FormDetails>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (status === "loading") {
      <div>Loading...</div>;
    }

    if (status === "authenticated") {
      oAuthLogin();
    }
  }, [session]);

  async function checkUser(newNote: NewNote) {
    let googleLogin = false;
    //const data = localStorage.getItem("customToken") || "";
    // if (storedToken) {
    //   data = JSON.parse(storedToken);
    // }

    if (session) {
      googleLogin = true;
    }
    setLoading(true);

    newNote = {
      ...newNote,
      email: session?.user?.email || newNote.email,
    };

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/login?google=${googleLogin}`,
      newNote,
      {
        validateStatus: (status) => status >= 200 && status <= 500,
      }
    );

    try {
      const res: any = response.data;
      if (res.valid === true) {
        const data = JSON.stringify({
          token: res.customToken,
          user: res.temp,
        });

        localStorage.setItem("customToken", data);

        // const user = res.temp;
        // console.log(user);
        // setAuth((prev:any) => ({
        //   ...prev,
        //   user: user
        // }));
      } else {
        setAlertMessage("*please enter valid email or password"); // Add null check for getElementById
      }
      if (session) {
        await signOut();
      }
      window.location.href = res.url;
    } catch (error) {
      console.error("Error during login", error);
      setAlertMessage("*login failed");
    } finally {
      setLoading(false);
    }
  }

  async function submitNote(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      // ... (other form validation or logic)

      await checkUser(formDetails);

      setFormDetails({
        email: "",
        password: "",
      });

      setAlertMessage("");

    } catch (error) {
      console.error("Error submitting note:", error);
      // Handle the error appropriately (e.g., show an error message to the user)
    }
  }

  function oAuthLogin() {
    try {
      checkUser(formDetails);

      setFormDetails({
        email: "",
        password: "",
      });
      setAlertMessage("");
    } catch (err) {
      setAlertMessage("*login failed");
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
      <div className="flex justify-center min-h-screen p-5 bg-[url('/dtuLogo.svg')] bg-cover">
        <div className="bg-white p-8 rounded-lg shadow-md w-[560px]">
          <div className="flex items-center justify-center">
            <img
              className="dark:drop-shadow-[0_0_0.3rem_#ffffff70] mb-2 w-40 h-40"
              src="/dtu.png"
              alt="Next.js Logo"
            />
          </div>
          <h1 className="text-4xl font-semibold mb-4 text-green-600 flex items-center justify-center">
            Log In
          </h1>
          <div className="py-3"></div>
          <form className="space-y-4" onSubmit={submitNote}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email Address
              </label>
              <input
                id="useremail"
                name="email"
                type="email"
                autoComplete="useremail"
                onChange={handleChange}
                value={formDetails.email}
                placeholder="Enter your email"
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
                required
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
                id="new-password"
                name="password"
                type="password"
                autoComplete="new-password"
                onChange={handleChange}
                value={formDetails.password}
                placeholder="Enter your password"
                required
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
              />
            </div>
            <div className="flex-start text-red-500 text-sm" id="alert">
              {alertMessage}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Link href="/auth/signup">
                  <p className="text-green-600 hover:underline">
                    Need an account? Sign up
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
                  "Log In"
                )}
              </button>
            </div>
            <div className="flex items-center justify-center">or</div>
            <div className="flex items-center justify-center">
              <button
                onClick={async () => {
                  await signIn("google");
                }}
                className="bg-green-600 text-white font-bold p-3 rounded-2xl hover:bg-black focus:outline-none focus:ring focus:border-blue-300 shadow-2xl w-48 lg:w-80 hover:w-56 lg:hover:w-96 transition-all duration-300 ease-in-out flex items-center justify-center"
              >
                <img src="/google.png" className="w-6 h-6 mr-2" />
                <p className="text-white">Sign In</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
