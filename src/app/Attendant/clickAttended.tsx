import React from 'react';

interface AttendedProps {
  data: string;
}

export default function Attended(props: AttendedProps) {
  const handleAttended = async (id: string) => {
    try {
      const response = await fetch(`https://hostel-complaint-website.onrender.com/report?cat=${"Attended"}&Id=${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      
      // Only reload the page if the fetch request was successful
      if (response.ok) {
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
