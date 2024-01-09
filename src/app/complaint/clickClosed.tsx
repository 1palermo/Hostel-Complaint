'use client'
import { useState, ChangeEvent } from 'react';
import Link from 'next/link';

export default function Closed(props:{data:string}){
    const [showConfirmation, setShowConfirmation] = useState(false);
    const handleClosed = async(id:string) => {
        const response= await fetch(`https://490bj8xz-8080.inc1.devtunnels.ms/report?cat=${"Closed"}&Id=${id}`,{
          method: "POST" ,
          headers:{
            "Content-Type": "application/json",
          }
          })
          const result= await response.json();
          setShowConfirmation(true);
    };

   return(
    <>
      <button className="px-3 py-1 bg-blue-500 text-white text-lg rounded-md" onClick={async(res)=>{
        await handleClosed(props.data)
      }}>Resolved</button>

      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
           <div className="bg-white p-4 rounded-md">
                <p >Are you sure you want to redirect?</p>
                <Link href="/Admin" passHref>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={() => window.location.href="/Admin?close=yes&dept=Hostel-Admin"}>Yes</button>
                </Link>
            </div>
        </div>
    )}
  </>
   );
}