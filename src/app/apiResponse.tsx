"use client"
import { useEffect } from "react";

export default function Checker(){
    useEffect(()=>{
    async function check(){
        const res = await fetch("https://490bj8xz-3000.inc1.devtunnels.ms/authenticate",{cache : 'no-store'});
        if(!res){
        window.location.href = "/";
        }
        return;
    }
    check();
    },[])
   return(
      <></>
   );
}