'use client'
import { useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation';


async function fetchData(token: string | null){
  try {
    const response = await fetch("https://490bj8xz-8080.inc1.devtunnels.ms/authenticate", {
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
  const router = useRouter();
  
  useEffect(() => {
    let token:any = null;

    try {
      const storedToken = window.localStorage.getItem("customToken") || "";
      token = JSON.parse(storedToken);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  
    if (token && token.expiryDate && Date.now() > token.expiryDate) {
      localStorage.removeItem("customToken");
      router.push("/");
      return;
    }
    const auth = async (): Promise<void> => {
      if (!token) {
        // Redirect if no token is found
        router.push("/");
        return;
      }

      try {
        const res = await fetchData(token.token);

        if (res.valid) {
          router.push(res.url);
        }
      } catch (error) {
        console.error("Error while authenticating:", error);
        // Handle error, you might want to redirect to an error page
      }
    };

    auth();
  }, [router]);

  return (
   <>
   </>
  );
}