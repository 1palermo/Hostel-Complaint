import { Inter } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
//import { useEffect } from 'react';
//import { useRouter } from 'next/router';
import GoogleTranslate from '../components/translate';
import ProtectedRoute from '../components/RouteProtection';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  /*
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://490bj8xz-3000.inc1.devtunnels.ms/authenticate', {
          method: 'GET',
        });

        const res = await response.json();
        console.log(res.Id);

        // Use router to navigate within the Next.js app
        router.push(`/${res.Id}`);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Don't forget to invoke the async function
    fetchData();
  }, [router]);
  */

  
  

  return (
    <html lang="en">
      <body>
        <ProtectedRoute />
        <div className="navbar bg-custom-primary text-primary-content">
            <p className="btn btn-ghost normal-case text-xl">Attendant</p>
            <Link href="/profile" >
            <Image
                src="/avatar.png" 
                alt="Description of the image"
                width={50}
                height={50}
                className='absolute right-5 mb-1'
            />
            </Link>
        </div>
        <div className='bg-blue-100'>
         <GoogleTranslate />
        </div>
        <div>{children}</div>
      </body>
    </html>
  );
}
