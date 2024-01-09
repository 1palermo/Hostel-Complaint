'use client'
import { useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome , faMultiply } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link'
import { Suspense } from 'react';
import Loading from '../../components/loading';
import Navbar from '@/app/components/navbar';


const ComplaintPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const [report, setReport] = useState([])

  async function getReports(){
    const data = JSON.parse(window.localStorage.getItem("customToken") || "");
    const response= await fetch("https://490bj8xz-8080.inc1.devtunnels.ms/report/user",{
      method: "POST" ,
      body: JSON.stringify({userToken: data.token}) ,
      headers:{
        "Content-Type": "application/json",
      }
     })
     const result= await response.json();
     if(result){
       setReport(result)
     }
  }

  useEffect(()=>{
    getReports();
  },[])

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return(
    <div className="flex justify-center min-h-screen p-5 bg-[url('/brick.jpg')] bg-cover">
    <div className="bg-[#EEEEEE] p-8 rounded-lg shadow-md w-[720px]">
    <Navbar />

    <div className="block">
        <h1 className='w-full text-center font-bold'>LIST OF REPORTS</h1>
        {report.map((res:{createdAt:string ; problem: string; title: string; image:string; description: string; department: string; attended: string; solved: string},idx:number)=>{
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
        )})}
    </div>
    </div>
    </div>
  )
};

export default ComplaintPage;