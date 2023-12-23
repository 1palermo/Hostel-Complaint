import Header from '../Header/page';
import List from './List';
import Link from 'next/link';
import Attended from './clickAttended';
//import Authentication from '../apiResponse';

export default async function Page(){
  // <Authentication />
   const apiResponse = await fetch(`https://490bj8xz-8080.inc1.devtunnels.ms/report?cat=${"Attendant"}`,{cache : 'no-store',credentials: 'include'});
   const data = await apiResponse.json();
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

/*
{res.attended === "Attended"? res.attended : <Attended data={res._id} />}
<Link href={{
   pathname: "/complaintPageAttendant",
   query: res
   }} >
   <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md">Solved</button>
</Link>
*/