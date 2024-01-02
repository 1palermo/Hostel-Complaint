// pages/report.tsx
// import React from 'react';
// import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCog } from '@fortawesome/free-solid-svg-icons';
// import { useRouter } from 'next/router';

const ReportPage = () => {
//     const [isMenuOpen, setMenuOpen] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     // Close the menu when navigating to a new page
//     const handleRouteChange = () => {
//       setMenuOpen(false);
//     };

//     router.events.on('routeChangeStart', handleRouteChange);

//     return () => {
//       router.events.off('routeChangeStart', handleRouteChange);
//     };
//   }, [router]);

//   const openMenu = () => {
//     setMenuOpen(true);
//   };

//   const closeMenu = () => {
//     setMenuOpen(false);
//   };
  return (
    <div className="flex justify-center min-h-screen p-5 bg-[url('/brick.jpg')] bg-cover">
      <div className="bg-white p-8 rounded-lg shadow-md w-[720px]">
      <div className="flex items-center justify-between text-blue-600">
          <FontAwesomeIcon icon={faBars} className="mr-2 h-8 w-8 cursor-pointer" /*onClick={openMenu}*/ />
          <h1 className="text-4xl font-semibold mb-4 text-blue-600 text-center">Report</h1>
          <FontAwesomeIcon icon={faCog} className="ml-2 h-8 w-8" />
        </div>
        <div className='py-5'></div>
        {/* {isMenuOpen && (
          <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg">
              <p>Menu Content Goes Here</p>
              <button onClick={closeMenu}>Close Menu</button>
            </div>
          </div>
        )} */}

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
