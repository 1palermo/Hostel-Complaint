'use client';
import SolutionDetails from "./SolutionDetails";
import Closed from "./clickClosed";
import Return from "../../Return";
import { useEffect, useState } from "react";
import { useAdmin } from "../../context/adminContext";

export default function SearchParams({ searchParams }: { searchParams: { _id: string; close: string }; }) {
    const [response, setResponse] = useState<any[]>([]);
    const [report, setReport] = useAdmin() as any[];
    const [repo, setRepo] = useState<any>({});

    useEffect(() => {
        async function get() {
            const data = await SolutionDetails(searchParams._id);
            setResponse(data);
            let val = report.filter((val: any) => val._id === searchParams._id);
            setRepo(val[0]);
        }

        get();
    }, [searchParams._id, report]);

    const formatDateTime = (dateTimeString: string) => {
        const dateTime = new Date(dateTimeString);
        return dateTime.toLocaleString(); // Adjust the format as per your requirement
    };

    return (
        <div className="block">
            <div className="pl-5"><Return /></div>
            {Object.keys(repo).length > 0  &&
                <div className="card w-90% m-5 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="text-lg font-bold">Complainer Details</div>
                        {repo.sender.userImage !== ""?<div className="flex flex-wrap">
                            <img src={repo.sender.userImage} alt="img" className="w-32" />
                        </div> : <></>}
                        <div className="flex flex-wrap">
                            <div className="mr-1 font-bold">Name:</div>
                            <div className="mr-0">{repo.sender.username}</div>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="mr-1 font-bold">Mobile Number:</div>
                            <div className="mr-0">{repo.sender.phone}</div>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="mr-1 font-bold">Email:</div>
                            <div className="mr-0">{repo.sender.email}</div>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="mr-1 font-bold">Tower:</div>
                            <div className="mr-0">{repo.sender.tower}</div>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="mr-1 font-bold">Hostel Room No:</div>
                            <div className="mr-0">{repo.sender.hostel_room_no}</div>
                        </div>
                    </div>
                </div>
            }
            <div className="card w-90% m-5 bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="text-lg font-bold">Report Details</div>
                    {Object.keys(repo).length > 0 && repo.image !== "" &&
                        <div className="flex flex-wrap">
                            <img src={repo.image} alt="img" className="w-32" />
                        </div>
                    }
                    <div className="flex flex-wrap">
                        <div className="mr-1 font-bold">Date & Time:</div>
                        <div className="mr-10">{formatDateTime(repo.createdAt)}</div>
                    </div>
                    <div className="flex flex-wrap">
                        <div className="mr-1 font-bold">Title:</div>
                        <div className="mr-0">{repo.title}</div>
                    </div>
                    <div className="flex flex-wrap">
                        <div className="mr-1 font-bold">Problem:</div>
                        <div className="mr-0">{repo.problem}</div>
                    </div>
                    <div className="flex flex-wrap">
                        <div className="mr-1 font-bold">Description:</div>
                        <div className="mr-0">{repo.description}</div>
                    </div>
                    <div className="flex flex-wrap">
                        <div className="mr-1 font-bold">Department:</div>
                        <div className="mr-0">{repo.department}</div>
                    </div>
                    <div className="flex flex-wrap">
                        <div className="mr-1 font-bold">Attended:</div>
                        <div className="mr-0">{repo.attended}</div>
                    </div>
                    <div className="flex flex-wrap">
                        <div className="mr-1 font-bold">Solved:</div>
                        <div className="mr-0">{repo.solved}</div>
                    </div>
                    {searchParams.close === "yes" &&
                        <div className="card-actions justify-end">
                            <Closed data={searchParams._id} />
                        </div>
                    }
                </div>
            </div>
            {response.length > 0 && response.map((data: any, idx: number) => (
                data.category === "Attended" ?
                    <div className="card w-90% m-5 bg-base-100 shadow-xl" key={idx}>
                        <div className="card-body">
                            <div className="text-lg font-bold">Attendant Details</div>
                            <div className="flex flex-wrap">
                                <div className="flex flex-wrap">
                                    <div className="mr-1 font-bold">Date:</div>
                                    <div className="mr-0">{formatDateTime(data.createdAt)}</div>
                                </div>
                            </div>
                            <div className="flex flex-wrap">
                                <div className="mr-1 font-bold">Attendant:</div>
                                <div className="mr-10">{data.sender.name}</div>
                            </div>
                            <div className="flex flex-wrap">
                                <div className="mr-1 font-bold">Phone:</div>
                                <div className="mr-0">{data.sender.phone}</div>
                            </div>
                            <div className="flex flex-wrap">
                                <div className="mr-1 font-bold">Description:</div>
                                <div className="mr-0">{data.description}</div>
                            </div>
                            <div className="flex flex-wrap ">
                                <img src={data.image} alt="attended" />
                            </div>
                        </div>
                    </div> :
                    data.category === "Solved" ?
                        <div className="card w-90% m-5 bg-base-100 shadow-xl" key={idx}>
                            <div className="card-body">
                                <div className="text-lg font-bold">Solution Details</div>
                                <div className="flex flex-wrap">
                                    <div className="flex flex-wrap">
                                        <div className="mr-1 font-bold">Date:</div>
                                        <div className="mr-0">{formatDateTime(data.createdAt)}</div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap">
                                    <div className="mr-1 font-bold">Solver:</div>
                                    <div className="mr-10">{data.sender.name}</div>
                                </div>
                                <div className="flex flex-wrap">
                                    <div className="mr-1 font-bold">Mobile No:</div>
                                    <div className="mr-0">{data.sender.phone}</div>
                                </div>
                                <div className="flex flex-wrap">
                                    <div className="mr-1 font-bold">Description:</div>
                                    <div className="mr-0">{data.description}</div>
                                </div>
                                <div className="flex flex-wrap">
                                    <img src={data.image} alt="solved" />
                                </div>
                            </div>
                        </div> : <div key={idx}></div>
            ))}
        </div>
    );
}
