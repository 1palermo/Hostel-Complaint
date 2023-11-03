//import { useRouter } from "next/navigation";
import data from './hostelDatabase.reports.json';

export default async function Page(){
   // const apiResponse = await fetch('http://localhost:3000/api/controller',{cache : 'no-store'});
   // const data = await apiResponse.json();
   // const router = useRouter()
   return(
      <>
        <div className="overflow-x-auto hidden md:block">
            <table className="table table-xl">
               <thead>
                  <tr className="text-lg" >
                  <th>S.No</th>
                  <th>Date</th> 
                  <th>Time</th> 
                  <th>Title</th> 
                  <th>Department</th>
                  <th>Attended</th> 
                  <th>Solved</th> 
                  <th></th>
                  </tr>
               </thead> 
               <tbody>
                  {data.map((res,idx:number)=>(
                     <tr key={idx} >
                     <th>{idx+1}</th> 
                     <td>{res.date}</td> 
                     <td>{res.time}</td> 
                     <td>{res.title}</td> 
                     <td>{res.department}</td> 
                     <td>No</td> 
                     <td>No</td>
                     <td><button className="btn btn-primary bg-red-500 ">close</button></td>
                     </tr>
                  ))}
               </tbody> 
            </table>
         </div>
         <div className="block md:hidden">
               {data.map((res,idx:number)=>(
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
                        <div className="mr-1 font-bold">Title:</div>
                        <div className="mr-0">{res.title}</div>
                     </div>
                     <div className="flex flex-wrap">
                        <div className="mr-1 font-bold">Department:</div>
                        <div className="mr-0">{res.department}</div>
                     </div>
                     <div className="flex flex-wrap">
                        <div className="mr-1 font-bold">Attended:</div>
                        <div className="mr-0">No</div>
                     </div>
                     <div className="flex flex-wrap">
                        <div className="mr-1 font-bold">Solved:</div>
                        <div className="mr-0">No</div>
                     </div>

                     <div className="card-actions justify-end">
                        <button className="btn btn-primary bg-red-500">close</button>
                     </div>
                  </div>
                  </div>
               ))}
         </div>
      </>
   );
}