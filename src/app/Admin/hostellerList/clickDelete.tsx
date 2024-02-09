"use client";
import { useState, ChangeEvent } from "react";
import Link from "next/link";
import axios from 'axios';

export default function Delete(props: { data: string }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleDelete = async (id: string) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/delete?Id=${id}`,
      {
        validateStatus: (status) => status>= 200 && status<=500
      }
    );
    const result = response.data;
    setShowConfirmation(true);
  };

  return (
    <>
      <button
        className="px-3 py-1 bg-green-600 text-white text-lg rounded-md"
        onClick={async (res) => {
          await handleDelete(props.data);
        }}
      >
        Remove
      </button>

      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-md">
            <p>Deleted successfully!</p>
            <Link href="/Admin" passHref>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded mr-2"
                onClick={() => window.location.reload()}
              >
                OK
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
