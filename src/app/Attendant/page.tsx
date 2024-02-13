"use client";
import Header from '../Header/page';
import List from './List';
import Link from 'next/link';
import { useAdmin } from '../context/adminContext';

//const socket = io(`${process.env.NEXT_PUBLIC_BASE_URL}/`);

export default function Page(){
   const [report, setReport] = useAdmin() as any[];
   const formatDateTime = (dateTimeString: string) => {
      const dateTime = new Date(dateTimeString);
      return dateTime.toLocaleString(); // Adjust the format as per your requirement
   };
   /*
   useEffect(() => {
     socket.on("connect", async () => {
       console.log(socket.id);
       try {
         const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/report?cat=${encodeURIComponent("Attendant")}`, { credentials: 'include' });
 
         const responsereport = await apiResponse.json();
 
         setreport(responsereport);
       } catch (error) {
         console.error("Error fetching report:", error);
       }
     });
 
     return () => {
       socket.disconnect();
     };
   }, []); 

   useEffect(() => {
      socket.on("getReports", async (report) => {
        console.log(report);
        try {
          const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/report?cat=${encodeURIComponent("Attendant")}`, { credentials: 'include' });
  
          const responsereport = await apiResponse.json();
  
          setreport(responsereport);
        } catch (error) {
          console.error("Error fetching report:", error);
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
               <h1 className='w-full text-center font-bold mt-5 '>LIST OF REPORTS</h1>
               {report.length > 0 ? (
               report.map((res: any, idx: number) => (
                  <div className="card w-90% m-5 bg-base-100 shadow-xl" key={idx}>
                     <div className="card-body">
                     <div className="flex flex-wrap">
                        <div className="flex flex-wrap">
                           <div className="mr-1 font-bold">Date & Time:</div>
                           <div className="mr-10">{formatDateTime(res.createdAt)}</div>
                        </div>
                     </div>
                     <div className="flex flex-wrap">
                        <div className="mr-1 font-bold">Tower:</div>
                        <div className="mr-0">{res.sender.tower}</div>
                     </div>
                     <div className="flex flex-wrap">
                        <div className="mr-1 font-bold">Hostel Room No:</div>
                        <div className="mr-0">{res.sender.hostel_room_no}</div>
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
                        <Link
                           href={{
                           pathname: "/Attendant/complaint",
                           query: { _id: res._id },
                           }}
                        >
                           <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-md">see</button>
                        </Link>
                     </div>
                     </div>
                  </div>
               ))
               ) : (
               <></>
               )}
         </div>
      </>
   );
}
