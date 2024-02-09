import React from 'react';
import axios from 'axios';
interface AttendedProps {
  data: string;
}

export default function Attended(props: AttendedProps) {
  const handleAttended = async (id: string) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/report?cat=${"Attended"}&Id=${id}`,{},{
        validateStatus: (status) => status>= 200 && status<=500
      });

      const result = await response.data;
      
      // Only reload the page if the fetch request was successful
      if (response.data.ok) {
        window.location.reload();
      } else {
        // Handle the case where the fetch request was not successful
        console.error('Failed to mark as attended:', result);
        // You might want to show an error message or handle this in some way
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('Error:', error);
    }
  };

  return (
    <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-md" onClick={async (res) => {
      await handleAttended(props.data);
    }}>
      Attended
    </button>
  );
}
