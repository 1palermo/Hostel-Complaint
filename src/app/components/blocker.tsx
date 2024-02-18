
'use client'
import { useEffect, useState } from "react";
import { useRouter} from 'next/navigation';
import { useAuth } from "../context/auth";


interface ProtectedRouteProps {
  children: React.ReactNode;
}


export default function BlockRoute({ children }: ProtectedRouteProps) {
  const [auth, setAuth] = useAuth() as any;
  const router = useRouter();

  
  useEffect(()=>{
    if(auth.token === ''){
       router.push('/');
    }
  }, [])
  
  return (
   // loading? <p>Loading...</p> : 
    <>{children}</>
  );
}

