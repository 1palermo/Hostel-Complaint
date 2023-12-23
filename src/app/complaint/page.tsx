
import SolutionDetails from "./SolutionDetails";
import Closed from "./clickClosed";
import Return from "../Return";

export default async function searchParams({ searchParams ,} : {
   searchParams: {_id:string; date: string; time: string;tower:string; hostel_room_no:string; problem: string; title: string; description: string; department: string; attended: string; solved: string; close:string};
}){
   const response = await SolutionDetails(searchParams._id);

   return(
      <div className="block">
      <Return />
      <div className="card w-90% m-5 bg-base-100 shadow-xl" >
         <div className="card-body">
         <div className="text-lg font-bold">Report Details</div>
            <div className="flex flex-wrap">
               <div className="flex flex-wrap">
                  <div className="mr-1 font-bold">Date:</div>
                  <div className="mr-10">{searchParams.date}</div>
               </div>
               <div className="flex flex-wrap">
                  <div className="mr-1 font-bold">Time:</div>
                  <div className="mr-0">{searchParams.time}</div>
               </div>
            </div>
            <div className="flex flex-wrap">
               <div className="mr-1 font-bold">Tower:</div>
               <div className="mr-0">{searchParams.tower}</div>
            </div>
            <div className="flex flex-wrap">
               <div className="mr-1 font-bold">Hostel Room No:</div>
               <div className="mr-0">{searchParams.hostel_room_no}</div>
            </div>
            <div className="flex flex-wrap">
               <div className="mr-1 font-bold">Title:</div>
               <div className="mr-0">{searchParams.title}</div>
            </div>
            <div className="flex flex-wrap">
               <div className="mr-1 font-bold">Problem:</div>
               <div className="mr-0">{searchParams.problem}</div>
            </div>
            <div className="flex flex-wrap">
               <div className="mr-1 font-bold">Description:</div>
               <div className="mr-0">{searchParams.description}</div>
            </div>
            <div className="flex flex-wrap">
               <div className="mr-1 font-bold">Department:</div>
               <div className="mr-0">{searchParams.department}</div>
            </div>
            <div className="flex flex-wrap">
               <div className="mr-1 font-bold">Attended:</div>
               <div className="mr-0">{searchParams.attended}</div>
            </div>
            <div className="flex flex-wrap">
               <div className="mr-1 font-bold">Solved:</div>
               <div className="mr-0">{searchParams.solved}</div>
            </div>
            {searchParams.close === "yes"?<div className="card-actions justify-end">
               <Closed data={searchParams._id}/>
            </div>:<></>}
         </div>
      </div>


      {response.map((data:{createdAt:string;sender:JSON;category:string;description:string;image:string},idx:number)=>(
         data.category === "Attended"?
         <div className="card w-90% m-5 bg-base-100 shadow-xl" key={idx}>
            <div className="card-body">
               <div className="text-lg font-bold">Attendant Details</div>
               <div className="flex flex-wrap">
                  <div className="flex flex-wrap">
                     <div className="mr-1 font-bold">Date:</div>
                     <div className="mr-0">{data.createdAt?.substring(0,10)}</div>
                  </div>
               </div>
               <div className="flex flex-wrap">
                  <div className="mr-1 font-bold">Time:</div>
                  <div className="mr-0">{data.createdAt?.substring(12,22)}</div>
               </div>
               <div className="flex flex-wrap">
                     <div className="mr-1 font-bold">Attendant:</div>
                     <div className="mr-10">{data.sender?response.sender?.name:""}</div>
               </div>
               <div className="flex flex-wrap">
                  <div className="mr-1 font-bold">Phone:</div>
                  <div className="mr-0">{data.sender?response.sender?.phone:0}</div>
               </div>
               <div className="flex flex-wrap">
                  <div className="mr-1 font-bold">Description:</div>
                  <div className="mr-0">{data.description}</div>
               </div>
               <div className="flex flex-wrap">
                  <img src={data.image} />
               </div>
            </div>
         </div>:
         data.category === "Solved"?
         <div className="card w-90% m-5 bg-base-100 shadow-xl" key={idx}>
            <div className="card-body">
            <div className="text-lg font-bold">Solution Details</div>
            <div className="flex flex-wrap">
               <div className="flex flex-wrap">
                  <div className="mr-1 font-bold">Date:</div>
                  <div className="mr-0">{data.createdAt?.substring(0,10)}</div>
               </div>
            </div>
            <div className="flex flex-wrap">
               <div className="mr-1 font-bold">Time:</div>
               <div className="mr-0">{data.createdAt?.substring(12,22)}</div>
            </div>
            <div className="flex flex-wrap">
                  <div className="mr-1 font-bold">Solver:</div>
                  <div className="mr-10">{data.sender?response.sender?.name:""}</div>
            </div>
            <div className="flex flex-wrap">
               <div className="mr-1 font-bold">Mobile No:</div>
               <div className="mr-0">{data.sender?response.sender?.phone:0}</div>
            </div>
            <div className="flex flex-wrap">
               <div className="mr-1 font-bold">Description:</div>
               <div className="mr-0">{data.description}</div>
            </div>
            <div className="flex flex-wrap">
               <img src={data.image} />
            </div>
            </div>
         </div> : <></>))}
   </div>
   );
}