import Link from 'next/link';
import Image from 'next/image';
import Download from './download';
export default function navbar(props:{dept:string, cat:string}){
    return(
        <div className="navbar bg-custom-primary text-primary-content">
            <p className="btn btn-ghost normal-case text-xl">{props.cat}</p>
            <Link href="/profile">
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