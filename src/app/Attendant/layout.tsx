import { Fascinate_Inline, Inter } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
//import { useEffect } from 'react';
//import { useRouter } from 'next/router';
import GoogleTranslate from '../components/translate';
import ProtectedRoute from '../components/RouteProtection';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AdminProvider } from '../context/adminContext';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  /*
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://hostel-complaint.vercel.appauthenticate', {
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
        <div className="navbar bg-green-600 text-white">
            <p className="btn btn-ghost normal-case text-xl ml-3 lg:ml-2">Attendant</p>
            <Link href="/profile" >
              <FontAwesomeIcon icon={faUser} className='absolute right-10 mb-1 h-5 w-5' />
            </Link>
        </div>
        <div className='bg-green-100'>
         <GoogleTranslate />
        </div>
        <AdminProvider>
        {children}
        </AdminProvider>
      </body>
    </html>
  );
}
