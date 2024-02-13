"use client";
import { useState, ChangeEvent } from "react";
import Link from "next/link";
import axios from 'axios';

export default function Closed(props: { data: string }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleClosed = async (id: string) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/report?cat=${"Closed"}&Id=${id}`,{},
      {
        validateStatus: (status) => status>= 200 && status<=500
      }
    );

    const result = response.data;

    setShowConfirmation(true);
  };

  const handleNo = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <button
        className="px-3 py-1 bg-green-600 text-white text-lg rounded-md"
        onClick={async (res) => {
          await handleClosed(props.data);
        }}
      >
        Resolved
      </button>

      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-md">
            <p>Report is resolved successfully!</p>
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
              onClick={() =>
                (window.location.href =
                  "/Admin?close=yes&dept=Hostel-Admin")
              }
            >
              Ok
            </button>
            {/* <div className="flex mt-2">
              <Link href="/Admin" passHref>
                <button
                  className="bg-green-600 text-white px-4 py-1 rounded mr-2"
                  onClick={() =>
                    (window.location.href =
                      "/Admin?close=yes&dept=Hostel-Admin")
                  }
                >
                  Yes
                </button>
              </Link>
              <button
                className="bg-red-500 text-white px-4 py-1 rounded" onClick={handleNo}
              >
                No
              </button>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
}
