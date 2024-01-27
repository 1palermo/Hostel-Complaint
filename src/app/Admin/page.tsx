import Header from "../Header/page";
import Link from "next/link";
import Navbar from "./Navbar";

export default async function Page({
  searchParams,
}: {
  searchParams: { close: string; cat: string; dept: string };
}) {
  const apiResponse = await fetch(
    `https://hostel-complaint-website.onrender.com/report?cat=${
      searchParams.cat
    }&status=${"Open"}`,
    { cache: "no-store" }
  );
  const data = await apiResponse.json();

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
            {data.map(
              (
                res: {
                  _id: string;
                  createdAt: string;
                  sender: {
                    _id: string;
                    username: string;
                    contact: number;
                    email: string;
                    userImage: string;
                    category: string;
                    tower: string;
                    hostel_room_no: string;
                    roll: string;
                  };
                  tower: string;
                  hostel_room_no: string;
                  problem: string;
                  title: string;
                  description: string;
                  department: string;
                  attended: string;
                  solved: string;
                },
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
                          pathname: "/complaint",
                          query: {
                            name: res.sender?.username || "",
                            image: res.sender?.userImage || "",
                            hostel_room_no: res.sender?.hostel_room_no || "",
                            tower: res.sender?.tower || "",
                            phone: res.sender?.contact || "",
                            close: searchParams.close,
                            date: date,
                            time: time,
                            _id: res._id,
                            problem: res.problem,
                            title: res.title,
                            description: res.description,
                            department: res.department,
                            attended: res.attended,
                            solved: res.solved,
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
        {data.map(
          (
            res: {
              _id: string;
              date: string;
              time: string;
              tower: string;
              hostel_room_no: string;
              problem: string;
              title: string;
              description: string;
              department: string;
              attended: string;
              solved: string;
            },
            idx: number
          ) => (
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
                  <div className="mr-0">
                    {res.solved === "Solved" ? res.solved : res.attended}
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <Link
                    href={{
                      pathname: "/complaint",
                      query: { ...res, close: searchParams.close },
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
