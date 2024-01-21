// pages/report.tsx
'use client'
import { useState, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome ,faMultiply } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Base64 from '../../Base64';
import Navbar from '@/app/components/navbar';

interface FormDetails {
  title: string,
  issue: string,
  department: string,
  desc: string,
  image: string
}
const ReportPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [formD, setForm] = useState<FormDetails>({
    title: "",
    issue: "Wifi not working",
    department:"civil department",
    desc:"",
    image:""
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  function handleFormChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    event.preventDefault();
    const { name, value } = event.target;
    console.log(formD);
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }
  

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    let file;
    if(e.target.files){
        file= e.target.files[0];
    }
        const base64= await Base64(file);
    if(e.target.files && e.target.files[0]){
        setForm({...formD, image: base64});
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(formD);
    const token = JSON.parse(window.localStorage.getItem("customToken") || "");
    fetch(`https://hostel-complaint-website.onrender.com/submitReport`,{
    method: "POST" ,
    body: JSON.stringify({data:formD, userToken: token.token}) ,
    headers:{
        "Content-Type": "application/json",
    }})
    .then(data=>{
        console.log(data)
        window.location.reload();
    })
    .catch(error=>{
        console.log(error)
    })
    // const result= await response.json();
    setForm({
      title: "",
      issue: "Wifi not working",
      department:"civil department",
      desc:"",
      image:""
    });
    return;
  }

  return (
    <div className="flex justify-center min-h-screen p-5 bg-[url('/brick.jpg')] bg-cover">
      <div className="bg-white p-8 rounded-lg shadow-md w-[720px]">
        <Navbar />
        <div className='py-5'></div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="issue" className="block text-sm font-medium text-gray-600">
              Issue Type
            </label>
            <select
              id="issue"
              name="issue"
              onChange={handleFormChange}
              value={formD.issue}
              required
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            >
              <option value="wifi Not working">Internet Issues</option>
              <option value="Lighting issues">Electrical issues</option>
              <option value="Lighting issues">Civil issues</option>
              <option value="Lighting issues">Mess issues</option>
              <option value="other">Others</option>
            </select>
          </div>

          <div>
            <label htmlFor="issue" className="block text-sm font-medium text-gray-600">
              Department
            </label>
            <select
              id="issue"
              name="department"
              onChange={handleFormChange}
              value={formD.department}
              required
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            >
              <option value="civil department">Civil Department</option>
              <option value="electrical department">Electrical Department</option>
              <option value="computer centre">Computer Center</option>
              <option value="computer centre">Hostel Office</option>
            </select>
          </div>

          <div>
            <label htmlFor="reportTitle" className="block text-sm font-medium text-gray-600">
              Report Title
            </label>
            <input
              type="text"
              id="reportTitle"
              name="title"
              placeholder="Enter Report Title"
              onChange={handleFormChange}
              value={formD.title}
              required
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            />
          </div>

          <div>
            <label htmlFor="briefProblem" className="block text-sm font-medium text-gray-600">
              Brief of Problem
            </label>
            <textarea
              id="briefProblem"
              name="desc"
              placeholder="Your problem"
              onChange={handleFormChange}
              value={formD.desc}
              rows={5}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            />
          </div>

          <div>
            <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-600">
              Upload Image
            </label>
            <input
              type="file"
              id="imageUpload"
              name="imageUpload"
              accept="image/*"
              onChange={handleFileUpload}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            />
          </div>

        <div className="flex items-center justify-center pt-16">
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold p-3 rounded-2xl hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 shadow-2xl w-32 hover:w-40 transition-all duration-300 ease-in-out"
          >
            Submit
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default ReportPage;
