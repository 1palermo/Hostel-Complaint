// pages/form.tsx
'use client'
import { useState, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome ,faMultiply } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';


const FormPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="flex items-center justify-center p-5 min-h-screen bg-[url('/brick.jpg')] bg-cover">
      <div className="bg-white p-8 rounded-lg shadow-md w-[720px]">
      <div className="flex items-center justify-between text-blue-600">
        <FontAwesomeIcon
          icon={faBars}
          className="mr-2 h-8 w-8 cursor-pointer"
          onClick={toggleMenu}
        />
        <h1 className="text-4xl font-semibold text-blue-600 text-center">
          Personal Details
        </h1>
        <Link href="/userHome">
            <FontAwesomeIcon icon={faHome} className="ml-2 h-8 w-8" /></Link>
      </div>
      <div className='py-5'></div>

            <div className={`absolute min-h-screen min-w-screen justify-center z-10 mx-[-32px] mt-[-110px] bg-white rounded-lg shadow-md w-[350px] lg:w-[720px] ${
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



        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email"
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            />
          </div>

          <div>
            <label htmlFor="contactNo" className="block text-sm font-medium text-gray-600">
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNo"
              name="contactNo"
              placeholder="ContactNo"
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            />
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-600 ">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              placeholder="Country"
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            />
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-600">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              placeholder="State"
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-600">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="City"
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            />
          </div>

          <div>
            <label htmlFor="hostelName" className="block text-sm font-medium text-gray-600">
              Hostel Name
            </label>
            <input
              type="text"
              id="hostelName"
              name="hostelName"
              placeholder="hostelName"
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            />
          </div>

          <div>
            <label htmlFor="hostelRoomNo" className="block text-sm font-medium text-gray-600">
              Hostel Room Number
            </label>
            <input
              type="text"
              id="hostelRoomNo"
              name="hostelRoomNo"
              placeholder="hostelRoomNo"
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

export default FormPage;
