import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome , faMultiply } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link'
import { Suspense } from 'react';
import Loading from './loading';

export default function Navbar(){
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return(
        <>
        <div className="flex items-center justify-between text-blue-600">
            <FontAwesomeIcon
            icon={faBars}
            className="mr-2 h-8 w-8 cursor-pointer"
            onClick={toggleMenu}
            /><Link href="/User/userHome">
            <FontAwesomeIcon icon={faHome} className="ml-2 h-8 w-8" /></Link>
        </div>
        <div className={`absolute min-h-screen min-w-screen justify-center z-10 mx-[-32px] mt-[-64px] bg-[#EEEEEE] rounded-lg  shadow-md w-[350px] lg:w-[520px] ${
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
                <h1 className="text-blue-600 text-2xl mb-4">Profile</h1></Link>
                <hr className="animate-shimmer h-1 w-full bg-gradient-to-r from-blue-400 to-blue-600 mt-2 mb-6"></hr>
                <Link href="/User/studentReport">
                <h1 className="text-blue-600 text-2xl mb-4">New Complaints</h1></Link>
                <hr className="animate-shimmer h-1 w-full bg-gradient-to-r from-blue-400 to-blue-600 mt-2 mb-6"></hr>
                <Link href="/User/userComplaints">
                <h1 className="text-blue-600 text-2xl mb-4">Existing Complaints</h1></Link>
                <hr className="animate-shimmer h-1 w-full bg-gradient-to-r from-blue-400 to-blue-600 mt-2 mb-6"></hr>
                <h1 className="text-blue-600 text-2xl mb-4">About us</h1>
            </div>
            </div>
        </div>
        <Suspense fallback={<Loading/>}
        ></Suspense>
        </>
    )
}