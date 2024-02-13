'use client'
import { useEffect, useState } from "react";
import { useRouter, usePathname } from 'next/navigation';
import { signOut, useSession } from "next-auth/react";
import { useAuth } from "../context/auth";
import axios from 'axios';

async function fetchData(){
  try {
    console.log("fetching..");
    const response = await axios.get(`http://localhost:8080/aut`,{
      validateStatus: (status) => status>= 200 && status<=500
    })
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Cannot authenticate:", err);
    return {valid:false, url:'/'};
  }
}

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// export default function ProtectedRoute({children}:ProtectedRouteProps) {
//   const [auth, setAuth] = useAuth() as any;
//   const [loading, setLoading] = useState(true);
//   const {data:session} = useSession();
//   const router = useRouter();
//   const pathname = usePathname();
//   const segments = pathname.split('/');
//   const role = segments[1];
//   console.log(role)
  
//   useEffect(() => {
//     // let token:any = null;

//     // try {
//     //   const storedToken = localStorage.getItem("customToken") || "";
//     //   if(storedToken) token = JSON.parse(storedToken);
//     // } catch (error) {
//     //   console.error("Error parsing JSON:", error);
//     // }
  
//     // if (token && token.expiryDate && Date.now() > token.expiryDate) {
//     //   localStorage.removeItem("customToken");
//     //   router.push("/");
//     //   return;
//     // }
//     const checker = async (): Promise<void> => {
//       if (auth?.token !== '') {
//         if (role && role !== "auth"){
//           if(session){
//             await signOut();
//           }
//           router.push("/");
//         }
//         return;
//       }

//       try {
//         const res = await fetchData(auth.token);

//         if (res.valid) {
//           setAuth((prev:any)=>({
//           ...prev,
//           user: res.data.user
//           }))
//           if(role !== "User") router.push(res.url);
//         }
//         else{
//           localStorage.removeItem("customToken");
//           router.push(res.url);
//           return;
//         }
//       } catch (error) {
//         console.error("Error while authenticating:", error);
//       }
//     if(auth?.token) checker();
//   }, [auth.token]);

//   return (
//    <>
//     {children}
//    </>
//   );
// }

// ... (previous imports)

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [auth, setAuth] = useAuth() as any;
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split('/');
  const role = segments[1];
  console.log("protection");
  useEffect(() => {
    try {
    const checker = async (): Promise<void> => {
      if (auth?.token === '') {
        if (role && role !== "auth") {
          if (session) {
            await signOut();
          }
          router.push("/");
        }
        return;
      }

      console.log("abe");
      const res = await fetchData();

      if (res.valid) {
        setAuth((prev: any) => ({
          ...prev,
          user: res.user
        }))
        if (res.user?.category === "Hosteller" && role !== "User"){
          router.push(res.url);
        }
        else if(res.user?.category !== "Hosteller" ){
          router.push(res.url);
        }
      } else {
        console.log("running")
        localStorage.removeItem("customToken");
        router.push(res.url);
        return;
      }
    }

    // setTimeout(()=>{
    //   setLoading(false);
    // },800);

    if (auth?.token){
      checker();
    }
    } catch (error) {
      console.error("Error while authenticating:", error);
    }
  }, [auth.token]);

  
  return (
   // loading? <p>Loading...</p> : 
    <>{children}</>
  );
}

// 'use client'
// import { useEffect, useState } from "react";
// import { useRouter, usePathname } from 'next/navigation';
// import { signOut, useSession } from "next-auth/react";
// import { useAuth } from "../context/auth";
// import axios from 'axios';

// async function fetchData(){
//   try {
//     console.log("fetching..");
//     const response = await axios.get(`http://localhost:8080/aut`,{
//       validateStatus: (status) => status>= 200 && status<=500
//     })
//     console.log(response.data);
//     return response.data;
//   } catch (err) {
//     console.error("Cannot authenticate:", err);
//     return {valid:false, url:'/'};
//   }
// }

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }


// export default function ProtectedRoute({ children }: ProtectedRouteProps) {
//   const [auth, setAuth] = useAuth() as any;
//   const [loading, setLoading] = useState(true);
//   const { data: session } = useSession();
//   const router = useRouter();
//   const pathname = usePathname();
//   const segments = pathname.split('/');
//   const role = segments[1];
//   console.log("protection");

  
//   useEffect(() => {
//     try {
//     const checker = async (): Promise<void> => {
//       if (auth.token === '') {
//         if (role && role !== "auth") {
//           if (session) {
//             await signOut();
//           }
//           router.push("/");
//         }
//         return;
//       }

//       if(auth.user && auth.user.category === 'Hosteller' && role !== 'profile' && role !== 'User'){
//         console.log('user');
//         router.push('/User/userHome');
//       }
       
//       if(auth.user && auth.user.category === 'Attendant' && role !== 'profile' &&role !== 'Attendant'){
//         console.log('attendant')
//         router.push('/Attendant');
//       }

//       if(auth.user && auth.user.category === 'Admin' && role !== 'profile' && role !== 'User'){
//         console.log('admin')
//         localStorage.removeItem('customToken');
//         await signOut();
//         router.push('/');
//       }
//     }

//     // setTimeout(()=>{
//     //   setLoading(false);
//     // },800);

//     if (auth.user){
//       checker();
//     }
//     } catch (error) {
//       console.error("Error while authenticating:", error);
//     }
//   }, [auth.user]);

  
//   return (
//    // loading? <p>Loading...</p> : 
//     <>{children}</>
//   );
// }

