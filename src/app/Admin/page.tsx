import Header from '../Header/page';
import Link from 'next/link';
import Navbar from './Navbar';

export default async function Page({ searchParams } : {
   searchParams: {close: string,cat:string, dept:string};
}){
   const apiResponse = await fetch(`https://490bj8xz-8080.inc1.devtunnels.ms/report?cat=${searchParams.cat}`,{cache : 'no-store'});
   const data = await apiResponse.json();
 
   return(
      <>
        <div className="overflow-x-auto hidden md:block">
            <Navbar cat={searchParams.cat} dept={searchParams.dept} />
            <table className="table table-xl">
               <Header />
               <tbody>
                  {data.map((res:{_id:string; date: string; time: string; problem: string; title: string; description: string; department: string; attended: string; solved: string},idx:number)=>(
                     <tr key={idx} >
                     <th>{idx+1}</th> 
                     <td>{res.date}</td> 
                     <td>{res.time}</td> 
                     <td>{res.title}</td> 
                     <td>{res.department}</td> 
                     <td>{res.attended}</td> 
                     <td>{res.solved}</td>
                     <td>
                     <Link href={{
                        pathname: "/complaint",
                        query: {...res, close: searchParams.close},
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
               <h1 className='w-full text-center font-bold'>LIST OF REPORTS</h1>
               {data.map((res:{_id:string; date: string; time: string; problem: string; title: string; description: string; department: string; attended: string; solved: string},idx:number)=>(
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
                        <div className="mr-0">{res.attended}</div>
                     </div>
                     <div className="flex flex-wrap">
                        <div className="mr-1 font-bold">Solved:</div>
                        <div className="mr-0">{res.solved}</div>
                     </div>
                     <div className='w-full flex justify-end'>
                        <Link href={{
                           pathname: "/complaint",
                           query: {...res, close: searchParams.close},
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