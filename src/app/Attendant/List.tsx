'use client'
import Link from 'next/link';
import { useAdmin } from '../context/adminContext';

export default function List() {
  const [report, setReport] = useAdmin() as any[];


  return (
    <tbody>
      {report.length ? report.map((res:any, idx:number) => {
        const [date, time] = new Date(res.createdAt)
        .toISOString()
        .split("T")
        .map((value, index) =>
          index === 0 ? value : value.split(".")[0]
        );
        return(
        <tr key={idx}>
          <th>{idx + 1}</th>
          <td>{date}</td>
          <td>{time}</td>
          <td>{res.sender.tower}</td>
          <td>{res.sender.hostel_room_no}</td>
          <td>{res.department}</td>
          <td>{res.title}</td>
          <td>{res.attended}</td>
          <td>
            <Link href={{ pathname: '/Attendant/complaint', query: {_id: res._id} }}>
              <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-md">
                See
              </button>
            </Link>
          </td>
        </tr>
       )}): <></>}
    </tbody>
  );
}
