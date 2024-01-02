import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCog, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const ReportPage = () => {
  return (
    <div className="flex justify-center min-h-screen p-5 bg-[url('/brick.jpg')] bg-cover">
      <div className="bg-white p-8 rounded-lg shadow-md w-[560px]">
        <div className="flex items-center justify-between text-blue-600">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2 h-8 w-8 cursor-pointer" />
          <h1 className="text-4xl font-semibold text-blue-600 text-center">Welcome</h1>
          <FontAwesomeIcon icon={faCog} className="ml-2 h-0 w-0" />
        </div>
        <div className='py-5'></div>
        <h1 className="text-4xl font-semibold mb-4 ml-3 text-blue-600 text-center">Log In</h1>
        <div className='py-3'></div>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
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
              <Link href="/forgot-password">
                <p className="text-blue-600 hover:underline">Forgot your password?</p>
              </Link>
            </div>
            <div>
              <Link href="/auth/signup">
                <p className="text-blue-600 hover:underline">Need an account? Sign up</p>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center pt-16">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold p-3 rounded-2xl hover:bg-black focus:outline-none focus:ring focus:border-blue-300 shadow-2xl w-32 hover:w-40 transition-all duration-300 ease-in-out"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportPage;
