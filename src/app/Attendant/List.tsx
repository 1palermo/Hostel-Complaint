import { Result } from 'postcss';
import data from './data';
import Attended from './clickAttended';
import Link from 'next/link';

export default async function list(){
  const Data = await data();
  

    return(
        <tbody>
            {Data.map((res:{_id:string; date: string; time: string; problem: string; title: string; description: string; department: string; attended: string; solved: string},idx:number)=>(
                <tr key={idx} >
                <th>{idx+1}</th> 
                <td>{res.date}</td> 
                <td>{res.time}</td> 
                <td>{res.title}</td> 
                <td>{res.department}</td>
                <td>{res.attended === "Attended"? res.attended : <Attended data={res._id} />}</td> 
                <td>
                <Link href={{
                    pathname: "/complaintPageAttendant",
                    query:res
                    }} >
                    <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md">Solved</button>
                </Link>
                </td>
                <td>
                <Link href={{
                    pathname: "/complaintPageAttendant",
                    query:res
                    }} >
                    <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md">see</button>
                </Link>
                </td>
                </tr>
            ))}
        </tbody> 
    );
}