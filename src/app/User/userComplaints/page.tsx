'use client'
import { useState, useEffect} from 'react';
import Navbar from '@/app/components/navbar';
import { useAuth } from '@/app/context/auth';
import {getUserReports} from '@/app/actions';

const ComplaintPage = () => {
  const [report, setReport] = useState([]);
  const [auth, setAuth] = useAuth() as any;

useEffect(() => {
  async function getReports() {
    try {
      if (auth.token !== '') {
        const repo = await getUserReports(auth.token);
        setReport(repo);
      }
    } catch (error) {
        console.error('Error fetching reports:', error);
        }
    }

    getReports();
    }, [auth.token]);

  return(
    <div className="flex justify-center min-h-screen p-5 bg-[url('/brick.webp')] bg-cover">
    <div className="bg-[#EEEEEE] p-8 rounded-lg shadow-md w-[720px]">
    <Navbar />

    <div className="block">
        <h1 className='w-full text-center font-bold mt-5'>LIST OF REPORTS</h1>
        {report.length>0? report.map((res:{createdAt:string ; problem: string; title: string; image:string; description: string; department: string; attended: string; solved: string},idx:number)=>{
            const [date, time] = new Date(res.createdAt).toISOString().split('T').map((value, index) => (index === 0 ? value : value.split('.')[0]));
            return (
            <div className="card w-90% m-5 bg-base-100 shadow-xl" key={idx}>
            <div className="card-body">
                <div className="flex flex-wrap">
                    <div className="flex flex-wrap">
                    <div className="mr-1 font-bold">Date:</div>
                    <div className="mr-10">{date}</div>
                    </div>
                    <div className="flex flex-wrap">
                    <div className="mr-1 font-bold">Time:</div>
                    <div className="mr-0">{time}</div>
                    </div>
                </div>
                <div className="flex flex-wrap">
                    <div className="mr-1 font-bold">Problem:</div>
                    <div className="mr-0">{res.problem}</div>
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
                    <div className="mr-1 font-bold">Description:</div>
                    <div className="mr-0">{res.description}</div>
                </div>
                <div className="flex flex-wrap">
                    <div className="mr-1 font-bold">Status:</div>
                    <div className="mr-0">{res.attended === "Attended"? "Unsolved" : res.attended}</div>
                </div>
               {res.image !== ""? <div className="flex flex-wrap">
                   <img src={res.image} alt="img" />
                </div> : <></>}
            </div>
            </div>
        )}) : <></>}
    </div>
    </div>
    </div>
  )
};


export default ComplaintPage;
