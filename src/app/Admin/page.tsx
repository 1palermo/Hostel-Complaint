'use client'
import Header from "../Header/page";
import Link from "next/link";
import Navbar from "./Navbar";
import { useAdmin } from "../context/adminContext";
import { useEffect, useState } from "react";


export default function Page({
  searchParams,
}: {
  searchParams: { close: string; dept: string; cat: string };
}) {
  const [data, setData] = useState([]);
  const [report, setReport] = useAdmin();

  useEffect(()=>{
    let repo = report.filter((val:any)=> (val.status === "Open"));
  
    setData(repo);
  },[report])

  const formatDateTime = (dateTimeString: string) => {
      const dateTime = new Date(dateTimeString);
      return dateTime.toLocaleString(); // Adjust the format as per your requirement
  };
    
  return (
    <>
      <div className="overflow-x-auto hidden md:block">
        <Navbar
          cat={searchParams.cat}
          dept={searchParams.dept}
          close={searchParams.close}
        />
        <table className="table table-xl">
          <Header />
          <tbody>
            {data.length && data.map(
              (
                res: any,
                idx: number
              ) => {
                const [date, time] = new Date(res.createdAt)
                  .toISOString()
                  .split("T")
                  .map((value, index) =>
                    index === 0 ? value : value.split(".")[0]
                  );
                return (
                  <tr key={idx}>
                    <th>{idx + 1}</th>
                    <td>{date}</td>
                    <td>{time}</td>
                    <td>{res.sender?.tower || ""}</td>
                    <td>{res.sender?.hostel_room_no || ""}</td>
                    <td>{res.department}</td>
                    <td>{res.problem}</td>
                    <td>
                      {res.solved === "Solved" ? res.solved : res.attended}
                    </td>
                    <td>
                      <Link
                        href={{
                          pathname: "/Admin/complaint",
                          query: {
                            close: searchParams.close,
                            _id: res._id,
                          },
                        }}
                      >
                        <button className="px-4 py-2 bg-green-600 text-white text-lg rounded-md">
                          see
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
      <div className="block md:hidden">
        <Navbar
          cat={searchParams.cat}
          dept={searchParams.dept}
          close={searchParams.close}
        />
        <h1 className="w-full text-center font-bold mt-5">LIST OF REPORTS</h1>
        {data.length && data.map(
          (
            res: any,
            idx: number
          ) => (
            <div className="card w-90% m-5 bg-base-100 shadow-xl" key={idx}>
              <div className="card-body">
                <div className="flex flex-wrap">
                  <div className="flex flex-wrap">
                  <div className="mr-1 font-bold">Date & Time:</div>
                  <div className="mr-10">{formatDateTime(res.createdAt)}</div>
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <div className="mr-1 font-bold">Tower:</div>
                  <div className="mr-0">{res.sender.tower}</div>
                </div>
                <div className="flex flex-wrap">
                  <div className="mr-1 font-bold">Hostel Room No:</div>
                  <div className="mr-0">{res.sender.hostel_room_no}</div>
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
                  <div className="mr-0">
                    {res.solved === "Solved" ? res.solved : res.attended}
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <Link
                    href={{
                      pathname: "/Admin/complaint",
                      query: {close: searchParams.close, _id: res._id,},
                    }}
                  >
                    <button className="px-3 py-1 bg-green-600 text-white text-lg rounded-md">
                      see
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}
