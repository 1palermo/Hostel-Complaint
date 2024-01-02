import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCog, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const ReportPage = () => {
  return (
    <div className="flex justify-center min-h-screen p-5 bg-[url('/brick.jpg')] bg-cover">
      <div className="bg-white p-8 rounded-lg shadow-md w-[560px]">
        <div className="flex items-center justify-between text-blue-600">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2 h-8 w-8 cursor-pointer" />
          <h1 className="text-4xl font-semibold text-blue-600 ">Sign Up</h1>
          <FontAwesomeIcon icon={faCog} className="ml-2 h-0 w-0" />
        </div>
        <div className='py-5'></div>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            />
          </div>
          <div>
            <label htmlFor="dtuemailid" className="block text-sm font-medium text-gray-600">
              DTU Email ID
            </label>
            <input
              type="email"
              id="dtuemailid"
              name="dtuemailid"
              placeholder="Enter your DTU Email ID"
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            />
          </div>
          <div>
            <label htmlFor="rollno" className="block text-sm font-medium text-gray-600">
              Roll Number
            </label>
            <input
              type="text"
              id="rollno"
              name="rollno"
              placeholder="Enter your roll number"
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            />
          </div>
          <div>
            <label htmlFor="hostelname" className="block text-sm font-medium text-gray-600">
              Hostel Name
            </label>
            <input
              type="text"
              id="hostelname"
              name="hostelname"
              placeholder="Enter your hostel name"
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            />
          </div>
          <div>
            <label htmlFor="hostelroomno" className="block text-sm font-medium text-gray-600">
              Hostel Room Number
            </label>
            <input
              type="text"
              id="hostelroomno"
              name="hostelroomno"
              placeholder="Enter your hostel room number"
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#EEEEEE]"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Link href="/signin">
                <p className="text-blue-600 hover:underline">Already have an account? Sign in</p>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center pt-16">
            <Link href="/userHome">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold p-3 rounded-2xl hover:bg-black focus:outline-none focus:ring focus:border-blue-300 shadow-2xl w-32 hover:w-40 transition-all duration-300 ease-in-out"
            >
              Sign Up
            </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportPage;
