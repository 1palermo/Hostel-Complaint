'use client'
import Form from './form';
import SolutionDetails from '../../Admin/complaint/SolutionDetails';
import Return from '../../Return';
import { useState, useEffect } from 'react';
import { useAdmin } from '@/app/context/adminContext';

interface SearchParams {
  _id: string;
}

export default function SearchParams({ searchParams }: { searchParams: SearchParams }) {
  const [response, setResponse] = useState<any[]>([]);
  const [report, setReport] = useAdmin();
  const [repo, setRepo] = useState<any>({});

  useEffect(() => {
    async function get() {
      try {
        const data = await SolutionDetails(searchParams._id);
        setResponse(data);
        const val = report.filter((val: any) => val._id === searchParams._id);
        if (val.length > 0) {
          setRepo(val[0]);
        }
      } catch (error) {
        console.error('Error fetching solution details:', error);
      }
    }

    get();
  }, [searchParams._id, report]);
  
  const formatDateTime = (dateTimeString: string) => {
      const dateTime = new Date(dateTimeString);
      return dateTime.toLocaleString(); // Adjust the format as per your requirement
   };
  return (
    <div className="block">
      <Return />
      <div className="card w-80% m-5 bg-base-100 shadow-xl">
        <div className='w-full text-center font-bold text-lg text-gray-600'>USER COMPLAINT</div>
        {Object.keys(repo).length > 0 && (
          <div className="card-body">
            <div className="flex flex-wrap">
              <div className="flex flex-wrap">
                <div className="mr-1 font-bold">Date & Time:</div>
                <div className="mr-10">{formatDateTime(repo.createdAt)}</div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="mr-1 font-bold">Tower:</div>
              <div className="mr-0">{repo.sender?.tower}</div>
            </div>
            <div className="flex flex-wrap">
              <div className="mr-1 font-bold">Hostel Room No:</div>
              <div className="mr-0">{repo.sender?.hostel_room_no}</div>
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
          </div>
        )}
      </div>

      {response.length>0? (response.map((data: any, idx: number) => (
        data.category === 'Attended' ? (
          <div className="card w-90% m-5 bg-base-100 shadow-xl" key={idx}>
            <div className="card-body">
              <div className="text-lg font-bold">Attendant Details</div>
              <div className="flex flex-wrap">
                <div className="flex flex-wrap">
                  <div className="mr-1 font-bold">Date & Time:</div>
                  <div className="mr-0">{formatDateTime(repo.createdAt)}</div>
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="mr-1 font-bold">Attendant:</div>
                <div className="mr-10">{data.sender ? data.sender.username : ''}</div>
              </div>
              <div className="flex flex-wrap">
                <div className="mr-1 font-bold">Mobile No:</div>
                <div className="mr-0">{data.sender ? data.sender.contact : 0}</div>
              </div>
              <div className="flex flex-wrap">
                <div className="mr-1 font-bold">Description:</div>
                <div className="mr-0">{data.description}</div>
              </div>
              <div className="flex flex-wrap">
                <img src={data.image} />
              </div>
            </div>
          </div>
        ) : <></>)
      )):<></>}

      {repo.solved === 'Unsolved' ? <Form id={searchParams._id} attended={repo.attended} /> : <></>}

    </div>
  );
}
