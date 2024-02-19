import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Download from './download';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = (props:{cat:string; close:string; dept:string}) => {
  return (
    <>
    <div className="navbar bg-green-600 text-white hidden sm:block">
        <p className="btn btn-ghost normal-case text-xl">{props.cat}</p>
        <Link  href={{
            pathname: "/Admin",
            query: {...props},
            }} >
            <p className='mr-4'>Home</p>
        </Link>
        <Link  href={{
            pathname: "/Admin/closedReports",
            query: {...props},
            }} >
            <p className='mr-4'>Reports</p>
        </Link>
        {props.cat === "Hostel-Admin"?<Link  href={{
            pathname: "/Admin/hostellerList",
            query: {...props},
            }} >
            <p>Hostellers List</p>
        </Link>: <></>}
        <Link href={{
          pathname: "/profile",
          query: {cat: "admin"}
        }} >
            <FontAwesomeIcon icon={faUser} className='absolute right-10 mb-5 h-5 w-5' />  
        </Link>
        <div className=' items-center mb-3'>
          <Download Id={props.dept} />
        </div> 
    </div>
    <div className="navbar bg-green-600 text-white sm:hidden">
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow rounded-box w-52 bg-green-100 text-black">
          <li>
          <Link  href={{
            pathname: "/Admin",
            query: {...props},
            }} >
            <p className='mr-4 text-xl'>Home</p>
          </Link>
          </li>
          <li>
            <Link  href={{
                pathname: "/Admin/closedReports",
                query: {...props},
                }} >
                <p className='mr-4 text-xl'>Closed Reports</p>
            </Link>
          </li>
          <li>
          {props.cat === "Hostel-Admin"?<Link  href={{
                pathname: "/Admin/hostellerList",
                query: {...props},
                }} >
                <p className='mr-4 text-xl'>Hostellers List</p>
            </Link>: <></>}
          </li>
        </ul>
      </div>
    </div>
    <div className="navbar-center">
      <a className="btn btn-ghost text-xl">{props.cat}</a>
    </div>
    <div className="navbar-end">
      <Download Id={props.dept} />
      <button className="btn btn-ghost btn-circle">
        <Link href="/profile" >
          <FontAwesomeIcon icon={faUser} className='absolute right-5 h-5 w-5' />
        </Link>
      </button>
    </div>
  </div>
  </>
  );
};

export default Navbar;
