'use client'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

export default function Download(props:{Id:string}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    try {
      // Set loading state
      setIsLoading(true);

      // Make API call to download the reports
      const response = await fetch(`https://hostel-complaint-website.onrender.com/report/download?dept=${props.Id}`, {
        method: 'GET',
      });

      // Check if the API call was successful (status code 200)
      if (response.ok) {
        // Trigger download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'reports.xlsx'; // Specify the desired filename
        document.body.appendChild(a);
        a.click();

        // Clean up
        window.URL.revokeObjectURL(url);
      } else {
        // Handle error response
        console.error('Failed to download reports:', response.statusText);
      }
    } catch (error) {
      console.error('Error downloading reports:', error);
    } finally {
      // Reset loading state
      setIsLoading(false);
    }
  };

  return (
    <>
    <button
      onClick={handleDownload}
      className={`absolute right-20 hidden md:block px-3 py-1 bg-white text-black text-sm rounded-md ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      disabled={isLoading}
    >
      {isLoading ? 'Downloading...' : 'Download Reports'}
    </button>
    <button className=' md:hidden' onClick={handleDownload}>
       {/* <img src='/download.png'className='w-10 h-10' /> */}
       <FontAwesomeIcon icon={faDownload} className='absolute right-16 mb-5 pb-5 h-5 w-5' />
    </button>
    </>
  );
}
