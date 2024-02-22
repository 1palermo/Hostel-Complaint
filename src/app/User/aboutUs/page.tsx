"use client";
import Link from "next/link";
import Navbar from "@/app/components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

const aboutUs = () => {
  return (
    <div className="flex justify-center min-h-screen p-5 bg-[url('/dtuLogo.svg')] bg-cover">
      <div className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 p-8 rounded-lg shadow-md w-[720px]">
        <Navbar />

        {/* About Us Content */}
        <div className="flex flex-col items-center mt-10 justify-center text-justify">
          <h1 className="lg:text-3xl sm:1xl font-bold text-black mb-4">
            Welcome to Hostel Complaint Management System
          </h1>
          <p className="lg:text-md sm:text-md text-black ">
            The Hostel Complaint Management System is designed to streamline the
            process of lodging and tracking complaints within the hostel
            premises. Our goal is to provide a user-friendly platform for hostel
            residents to report complaints and for the administration to
            efficiently manage and resolve them.
          </p>
          {/* Additional information can be added here */}
        </div>

        {/* Separator */}
        <div className="flex flex-col sm:flex-row justify-around mt-8">
          <div className="items-center">
            <Link href="https://docs.google.com/forms/d/e/1FAIpQLSf6ZadhZi8JvOhRoHViR1WqmV2PaGjdLwu2VFdNA8Rvl-Gm8w/viewform?usp=sf_link">
              <button className="w-full sm:w-150 p-1 my-5 sm:my-0 sm:pl-[-4] rounded-full from-green-700 via-green-400 to-green-600 bg-gradient-to-r">
                <span className="block text-black px-4 py-2 font-semibold rounded-full bg-white">
                  Feedback Form
                </span>
              </button>
            </Link>
          </div>
        </div>
        <hr className="animate-shimmer h-1 w-full bg-gradient-to-r from-green-700 via-green-400 to-green-600 mt-32" />
        <div className="items-center mt-8">
          <p className="text-lg text-gray-700 mr-2">
            Connect with us on LinkedIn:
          </p>
          <div className="flex items-center mt-4">
            <div className="flex items-center">
              <a
                href="https://www.linkedin.com/in/aman-deep121/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faLinkedin}
                  size="1x"
                  className="text-blue-600 cursor-pointer"
                />
              </a>
              <p className="ml-2">Aman Deep</p>
            </div>

            <div className="flex items-center ml-4">
              <a
                href="https://www.linkedin.com/in/ayushguptacoder/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faLinkedin}
                  size="1x"
                  className="text-blue-600 cursor-pointer"
                />
              </a>
              <p className="ml-2">Ayush Gupta</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default aboutUs;
