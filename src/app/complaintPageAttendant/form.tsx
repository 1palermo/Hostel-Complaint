'use client'
import { useState, ChangeEvent } from 'react';
import Link from 'next/link';

export default function Form(props:{id:string, attended:string }){

    const [textValue, setTextValue] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    //const [Attended, setAttended] = useState(0);

    const handleTextChange = (e:ChangeEvent<HTMLInputElement>) => {
        setTextValue(e.target.value);
    };

    
    const handleImageChange = (e:ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setImageFile(file || null);
    };
    
    function handleSolved(id:string, textValue:string) {
    // Handle form submission logic here
        fetch(`https://490bj8xz-8080.inc1.devtunnels.ms/report?cat=${"Solved"}&Id=${id}`,{
        method: "POST" ,
        body: JSON.stringify({
            desc: textValue,
        }) ,
        headers:{
            "Content-Type": "application/json",
        }})
        .then(data=>{
            console.log(data)
        })
        .catch(error=>{
            console.log(error)
        })
       // const result= await response.json();
        setTextValue("");
        setImageFile(null);
        setShowConfirmation(true);
        return;
    }

    function handleAttended(id:string, textValue:string) {
    // Handle form submission logic here
        fetch(`https://490bj8xz-8080.inc1.devtunnels.ms/report?cat=${"Attended"}&Id=${id}`,{
        method: "POST" ,
        body: JSON.stringify({
            desc: textValue,
        }) ,
        headers:{
            "Content-Type": "application/json",
        }})
        .then(data=>{
            console.log(data)
        })
        .catch(error=>{
            console.log(error)
        })
        // const result= await response.json();
        setTextValue("");
        setImageFile(null);
        setShowConfirmation(true);
        return;
    }
    

    return(
        <>
            <br />
            <hr />
            <br />
            <h1 className="font-bold mb-4 w-full text-center text-2xl">Enter Your Response</h1>
            {
               props.attended === "Unattended"? 
               <div className="w-3/4 mx-auto mt-8 p-4 bg-gray-100">
               <div className="mb-4">
               <label className="block text-sm font-medium text-gray-700">Description</label>
               <input
                  type="text"
                  value={textValue}
                  onChange={handleTextChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full "
               />
               </div>
         
               <div className="mb-4">
               <label className="block text-sm font-medium text-gray-700">Upload Image</label>
               <input
                  type="file"
                  onChange={handleImageChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
               />
               </div>
   
               <button onClick={()=>{
                   handleAttended(props.id, textValue)
                   }} className="bg-blue-500 text-white p-2 rounded-md text-center w-full">
                   Attended
               </button>
               </div>:
               <div className="w-3/4 mx-auto mt-8 p-4 bg-gray-100">
                <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                type="text"
                value={textValue}
                onChange={handleTextChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full "
                />
                </div>
        
                <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                <input
                type="file"
                onChange={handleImageChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
                </div>

                <button onClick={()=>{
                    handleSolved(props.id, textValue)
                    }} className="bg-blue-500 text-white p-2 rounded-md text-center w-full">
                    Solved
                </button>
                </div>
            }
            

            {showConfirmation && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                   <div className="bg-white p-4 rounded-md">
                        <p >Are you sure you want to redirect?</p>
                        <Link href="/Attendant" passHref>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={() => window.location.href="/Attendant"}>Yes</button>
                        </Link>
                    </div>
                </div>
            )}
            <br />
         </>
    );
}