import Header from '../Header/page';
import Link from 'next/link';
import Navbar from '../Admin/Navbar';

export default async function Page({ searchParams } : {
   searchParams: {cat:string, dept:string, close: string};
}){
   const apiResponse = await fetch(`https://hostel-complaint-website.onrender.com/report?cat=${searchParams.cat}&status=${"Closed"}`,{cache : 'no-store'});
   const data = await apiResponse.json();
   
   return(
      <>
        <div className="overflow-x-auto hidden md:block">
            <Navbar cat={searchParams.cat} dept={searchParams.dept} close={searchParams.close} />
            <table className="table table-xl">
               <Header />
               <tbody>
                  {data.map((res:{_id:string; date: string; time: string; tower:string; hostel_room_no:string; problem: string; title: string; description: string; department: string; attended: string; solved: string},idx:number)=>(
                     <tr key={idx} >
                     <th>{idx+1}</th> 
                     <td>{res.date}</td> 
                     <td>{res.time}</td> 
                     <td>{res.tower}</td> 
                     <td>{res.hostel_room_no}</td>
                     <td>{res.department}</td> 
                     <td>{res.title}</td>
                     <td>Closed</td>  
                     <td>
                     <Link href={{
                        pathname: "/complaint",
                        query: {...res, close: 'no'},
                     }} >
                       <button className="px-4 py-2 bg-blue-500 text-white text-lg rounded-md">see</button>
                     </Link>
                     </td>
                     </tr>
                  ))}
               </tbody> 
            </table>
         </div>
         <div className="block md:hidden">
         <Navbar cat={searchParams.cat} dept={searchParams.dept} close={searchParams.close} />
         <h1 className='w-full text-center font-bold'>LIST OF REPORTS</h1>
         {data.map((res:{_id:string; date: string; time: string; tower:string; hostel_room_no:string; problem: string; title: string; description: string; department: string; attended: string; solved: string},idx:number)=>(
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
                  <div className="mr-0">Closed</div>
               </div>
               <div className='w-full flex justify-end'>
                  <Link href={{
                     pathname: "/complaint",
                     query: {...res, close: "no"},
                  }}>
                     <button className="px-3 py-1 bg-blue-500 text-white text-lg rounded-md">see</button>
                  </Link>
               </div>
            </div>
            </div>
         ))}
         </div>
      </>
   );
}