"use client"
import { useEffect } from "react";
import axios from 'axios';

export default function Checker(){
    useEffect(()=>{
    async function check(){
        const res = await axios.get("https://490bj8xz-3000.inc1.devtunnels.ms/authenticate",{
            validateStatus: (status) => status>= 200 && status<=500
          });
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