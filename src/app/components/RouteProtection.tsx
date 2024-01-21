'use client'
import { useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation';
import { signOut, useSession } from "next-auth/react";


async function fetchData(token: string | null){
  try {
    const response = await fetch("https://hostel-complaint-website.onrender.com/authenticate", {
      method: "POST",
      body: JSON.stringify({ userToken: token }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();
    return res;
  } catch (err) {
    console.error("Cannot authenticate:", err);
    return {valid:false, url:'/'};
  }
}

export default function ProtectedRoute() {
  const {data:session} = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split('/');
  const role = segments[1];
  console.log(role)
  
  useEffect(() => {
    let token:any = null;

    try {
      const storedToken = window.localStorage.getItem("customToken") || "";
      if(storedToken) token = JSON.parse(storedToken);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  
    if (token && token.expiryDate && Date.now() > token.expiryDate) {
      window.localStorage.removeItem("customToken");
      router.push("/");
      return;
    }
    const auth = async (): Promise<void> => {
      if (!token) {
        if (role && role !== "auth"){
          if(session){
            await signOut();
          }
          router.push("/");
        }
        return;
      }

      try {
        const res = await fetchData(token.token);

        if (res.valid) {
          if(role !== "User") router.push(res.url);
        }
        else{
          window.localStorage.removeItem("customToken");
          router.push(res.url);
          return;
        }
      } catch (error) {
        console.error("Error while authenticating:", error);
      }
    };

    auth();
  }, [router]);

  return (
   <>
   </>
  );
}