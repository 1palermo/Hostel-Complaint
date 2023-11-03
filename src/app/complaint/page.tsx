export default function complaint(complaint:{date: string, time: string, problem: string, title: string, description: string, department: string}){
    return(
        <div className="block">
        <div className="card w-90% m-5 bg-base-100 shadow-xl" >
           <div className="card-body">
              <div className="flex flex-wrap">
                 <div className="flex flex-wrap">
                    <div className="mr-1 font-bold">Date:</div>
                    <div className="mr-10">{complaint.date}</div>
                 </div>
                 <div className="flex flex-wrap">
                    <div className="mr-1 font-bold">Time:</div>
                    <div className="mr-0">{complaint.time}</div>
                 </div>
              </div>
              <div className="flex flex-wrap">
                 <div className="mr-1 font-bold">Title:</div>
                 <div className="mr-0">{complaint.title}</div>
              </div>
              <div className="flex flex-wrap">
                 <div className="mr-1 font-bold">Problem:</div>
                 <div className="mr-0">{complaint.problem}</div>
              </div>
              <div className="flex flex-wrap">
                 <div className="mr-1 font-bold">Description:</div>
                 <div className="mr-0">{complaint.description}</div>
              </div>
              <div className="flex flex-wrap">
                 <div className="mr-1 font-bold">Department:</div>
                 <div className="mr-0">{complaint.department}</div>
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
        </div>

    );
}