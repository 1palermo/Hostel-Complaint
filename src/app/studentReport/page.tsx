// pages/report.tsx
'use client'
import { useState, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome ,faMultiply } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const ReportPage = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  return (
    <div className="flex justify-center min-h-screen p-5 bg-[url('/brick.jpg')] bg-cover">
      <div className="bg-white p-8 rounded-lg shadow-md w-[720px]">
      <div className="flex items-center justify-between text-blue-600">
            <FontAwesomeIcon
                icon={faBars}
                className="mr-2 h-8 w-8 cursor-pointer"
                onClick={toggleMenu}
              />
            <h1 className="text-4xl font-semibold text-blue-600 text-center">Report</h1>
            <Link href="/userHome">
            <FontAwesomeIcon icon={faHome} className="ml-2 h-8 w-8" /></Link>
        </div>
        <div className={`absolute min-h-screen min-w-screen justify-center z-10 mx-[-32px] mt-[-72px] bg-white rounded-lg shadow-md w-[350px] lg:w-[720px] ${
              isOpen ? 'block' : 'hidden'
              }`}>
              <div className="flex items-center justify-between text-blue-600 p-8">
                  <FontAwesomeIcon
                    icon={faMultiply}
                    className="mr-2 h-8 w-8 cursor-pointer"
                    onClick={toggleMenu}
                  />
                </div>
              <div className="flex items-center justify-center">
                <div className="p-10 mt-32">
                  <Link href="/profile">
                  <h1 className="text-blue-600 text-2xl mb-4">Personal details</h1></Link>
                  <hr className="animate-shimmer h-1 w-full bg-gradient-to-r from-blue-400 to-blue-600 mt-2 mb-6"></hr>
                  <Link href="/studentReport">
                  <h1 className="text-blue-600 text-2xl mb-4">Report Form</h1></Link>
                  <hr className="animate-shimmer h-1 w-full bg-gradient-to-r from-blue-400 to-blue-600 mt-2 mb-6"></hr>
                  <h1 className="text-blue-600 text-2xl mb-4">About us</h1>
                  <hr className="animate-shimmer h-1 w-full bg-gradient-to-r from-blue-400 to-blue-600 mt-2 mb-6"></hr>
                  <h1 className="text-blue-600 text-2xl mb-4">Faq</h1>
                </div>
              </div>
            </div>

        <div className='py-5'></div>
        <form className="space-y-4">
          <div>
            <label htmlFor="issue" className="block text-sm font-medium text-gray-600">
              Your Issue
            </label>
            <select
              id="issue"
              name="issue"
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            >
              <option value="wifi Not working">Wifi not working</option>
              <option value="insect Attack">Insect attack</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="reportTitle" className="block text-sm font-medium text-gray-600">
              Report Title
            </label>
            <input
              type="text"
              id="reportTitle"
              name="reportTitle"
              placeholder="Enter Report Title"
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            />
          </div>

          <div>
            <label htmlFor="briefProblem" className="block text-sm font-medium text-gray-600">
              Brief of Problem
            </label>
            <textarea
              id="briefProblem"
              name="briefProblem"
              placeholder="Your problem"
              rows={5}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            ></textarea>
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
