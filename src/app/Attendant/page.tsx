//"use client"
import Header from '../Header/page';
import List from './List';
import Link from 'next/link';
//import Reports from './Reports';
//import io from 'socket.io-client';
//import { useEffect, useState } from "react";

//const socket = io("https://hostel-complaint-website.onrender.com/");

export default async function Page(){
   const apiResponse = await fetch(`https://hostel-complaint-website.onrender.com/report?cat=${"Attendant"}`,{cache : 'no-store',credentials: 'include'});
   const data = await apiResponse.json();
   //const [data, setData] = useState([]);

   /*
   useEffect(() => {
     socket.on("connect", async () => {
       console.log(socket.id);
       try {
         const apiResponse = await fetch(`https://hostel-complaint-website.onrender.com/report?cat=${"Attendant"}`, { credentials: 'include' });
 
         const responseData = await apiResponse.json();
 
         setData(responseData);
       } catch (error) {
         console.error("Error fetching data:", error);
       }
     });
 
     return () => {
       socket.disconnect();
     };
   }, []); 

   useEffect(() => {
      socket.on("getReports", async (data) => {
        console.log(data);
        try {
          const apiResponse = await fetch(`https://hostel-complaint-website.onrender.com/report?cat=${"Attendant"}`, { credentials: 'include' });
  
          const responseData = await apiResponse.json();
  
          setData(responseData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      });
  
      return () => {
        socket.disconnect();
      };
    }, []); 
   */
   return(
      <>
        <div className="overflow-x-auto hidden md:block">
            <table className="table table-xl">
               <Header />
               <List />
            </table>
         </div>
         <div className="block md:hidden">
               <h1 className='w-full text-center font-bold'>LIST OF REPORTS</h1>
               {data.map((res:{_id:string; date: string; tower:string; hostel_room_no:string; time: string; problem: string; title: string; description: string; department: string; attended: string; solved: string},idx:number)=>(
                  <div className="card w-90% m-5 bg-base-100 shadow-xl" key={idx}>
                  <div className="card-body">
                     <div className="flex flex-wrap">
                        <div className="flex flex-wrap">
                           <div className="mr-1 font-bold">Date:</div>
                           <div className="mr-10">{res.date}</div>
                        </div>
                        <div className="flex flex-wrap">
                           <div className="mr-1 font-bold">Time:</div>
                           <div className="mr-0">{res.time}</div>
                        </div>
                     </div>
                     <div className="flex flex-wrap">
                        <div className="mr-1 font-bold">Tower:</div>
                        <div className="mr-0">{res.tower}</div>
                     </div>
                     <div className="flex flex-wrap">
                        <div className="mr-1 font-bold">Hostel Room No:</div>
                        <div className="mr-0">{res.hostel_room_no}</div>
                     </div>
                     <div className="flex flex-wrap">
                        <div className="mr-1 font-bold">Department:</div>
                        <div className="mr-0">{res.department}</div>
                     </div>
                     <div className="flex flex-wrap">
                        <div className="mr-1 font-bold">Title:</div>
                        <div className="mr-0">{res.title}</div>
                     </div>
                     <div className="flex flex-wrap">
                        <div className="mr-1 font-bold">Status:</div>
                        <div className="mr-0">{res.attended}</div>
                     </div>
                     <div className="flex flex-wrap justify-between">
                        <Link href={{
                              pathname: "/complaintPageAttendant",
                              query: res
                           }} >
                              <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md">see</button>
                        </Link>
                     </div>
                  </div>
                  </div>
               ))}
         </div>
      </>
   );
}
