// pages/form.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCog } from '@fortawesome/free-solid-svg-icons';


const FormPage = () => {
  return (
    <div className="flex items-center justify-center p-5 min-h-screen bg-[url('/brick.jpg')] bg-fixed">
      <div className="bg-white p-8 rounded-lg shadow-md w-[720px]">
      <div className="flex items-center justify-between text-blue-600">
        <FontAwesomeIcon icon={faBars} className="mr-2 h-8 w-8" />
        <h1 className="text-4xl font-semibold mb-4 text-blue-600 text-center">
          Personal Details
        </h1>
        <FontAwesomeIcon icon={faCog} className="ml-2 h-8 w-8" />
      </div>
      <div className='py-5'></div>

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
