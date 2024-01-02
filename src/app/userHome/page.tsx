// pages/userHome.tsx
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCog } from '@fortawesome/free-solid-svg-icons';


const UserHomePage = () => {
  return (
        <div className="flex justify-center min-h-screen p-5 bg-[url('/brick.jpg')] bg-cover">
          <div className="bg-[#EEEEEE] p-8 rounded-lg shadow-md w-[720px]">
            <div className="flex items-center justify-between text-blue-600">
              <FontAwesomeIcon icon={faBars} className="mr-2 h-8 w-8 cursor-pointer" />
              <FontAwesomeIcon icon={faCog} className="ml-2 h-8 w-8" />
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/userPhoto.png"
                alt="User Image"
                className="rounded-full h-32 w-32 mb-2"
              />
              <p className="text-xl font-semibold text-blue-600">Aman Deep</p>
              <p className="text-xl font-semibold text-blue-600 pt-4">2K21/EE/37</p>
            </div>
            <hr className="animate-shimmer h-1 w-full bg-gradient-to-r from-blue-400 to-blue-600 mt-10"></hr>

            <div className="flex justify-around mt-8">
              <div className="items-center">
                <img
                  src="/complaint.png"
                  alt="Image 1"
                  className="rounded-md h-32 w-32"
                />
                <p className='text-lg font-semibold text-blue-600 p-4'>Complaints</p>
              </div>
              <div className="items-center mt-4">
                <img
                  src="/Mess.png"
                  alt="Image 2"
                  className="rounded-md h-32 w-32"
                />
                <p className='text-lg font-semibold text-blue-600 p-4 text-center'>Mess</p>
              </div>
            </div>

            <div className="flex justify-around ">
              <div className="items-center mt-4">
                <img
                  src="/Misc.png"
                  alt="Image 1"
                  className="rounded-md h-32 w-32"
                />
                <p className='text-lg font-semibold text-blue-600 p-2'>Miscellaneous</p>
              </div>
              <div className="items-center mt-4">
                <img
                  src="/leave.jpg"
                  alt="Image 2"
                  className="rounded-md h-32 w-32"
                />
                <p className='text-lg font-semibold text-blue-600 p-2'>Leave/Outing</p>
              </div>
            </div>
          </div>
        </div>
      );
};

export default UserHomePage;
