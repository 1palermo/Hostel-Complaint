import Link from 'next/link';
import Image from 'next/image';
import Download from './download';
import searchParams from '../complaint/page';
export default function navbar(props:{dept:string, cat:string, close:string}){
    return(
        <div className="navbar bg-custom-primary text-primary-content">
            <p className="btn btn-ghost normal-case text-xl">{props.cat}</p>
            <Link  href={{
                pathname: "/Admin",
                query: {...props},
                }} >
                <p className='mr-4'>Home</p>
            </Link>
            <Link  href={{
                pathname: "/closedReports",
                query: {...props},
                }} >
                <p className='mr-4'>Closed Reports</p>
            </Link>
            <div>
            {
                props.cat === "Hostel-Admin"?
                <Link  href={{
                    pathname: "/hostellerList",
                    query: {...props},
                    }} >
                    <p>Hostellers List</p>
                </Link> : <></>
            }
            </div>
            <Link href="/profile" >
            <Image
                src="/avatar.png" 
                alt="Description of the image"
                width={50}
                height={50}
                className='absolute right-5'
            />
            </Link>
            <Download Id={props.dept} />
        </div>
    );
}